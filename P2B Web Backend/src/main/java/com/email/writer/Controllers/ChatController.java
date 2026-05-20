package com.email.writer.Controllers;

import com.email.writer.Services.P2BGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class ChatController {

  @Autowired
  private P2BGeneratorService service;

  @Autowired
  private com.email.writer.Repositories.ChatRepository chatRepository;

  @GetMapping
  public ResponseEntity<?> getAllChats(@RequestParam(required = false) String userId) {
      List<com.email.writer.Entities.ChatLog> all;
      if (userId != null && !userId.trim().isEmpty()) {
          all = chatRepository.findAllByUserId(userId);
      } else {
          all = chatRepository.findAll();
      }

      // Step 1: Group ALL documents by sessionId (some sessions have multiple docs due to past bugs)
      java.util.Map<String, List<com.email.writer.Entities.ChatLog>> grouped = new java.util.LinkedHashMap<>();
      for (com.email.writer.Entities.ChatLog log : all) {
          String sid = log.getSessionId();
          if (sid != null && !sid.trim().isEmpty()) {
              grouped.computeIfAbsent(sid, k -> new java.util.ArrayList<>()).add(log);
          }
      }

      // Step 2: For each sessionId, merge all messages from all docs into one representative ChatLog
      List<com.email.writer.Entities.ChatLog> result = new java.util.ArrayList<>();
      for (java.util.Map.Entry<String, List<com.email.writer.Entities.ChatLog>> entry : grouped.entrySet()) {
          List<com.email.writer.Entities.ChatLog> docs = entry.getValue();

          // Sort docs by timestamp ascending (oldest first) to preserve conversation order
          docs.sort((a, b) -> {
              if (a.getSessionTimestamp() == null) return 1;
              if (b.getSessionTimestamp() == null) return -1;
              return a.getSessionTimestamp().compareTo(b.getSessionTimestamp());
          });

          // Use the first doc as the base (has original userQuery/title)
          com.email.writer.Entities.ChatLog base = docs.get(0);

          // Merge all messages from all docs into one ordered list (no duplicates by content)
          List<java.util.Map<String, String>> mergedMessages = new java.util.ArrayList<>();
          java.util.Set<String> seen = new java.util.LinkedHashSet<>();
          for (com.email.writer.Entities.ChatLog doc : docs) {
              if (doc.getMessages() != null) {
                  for (java.util.Map<String, String> msg : doc.getMessages()) {
                      String key = msg.get("role") + "::" + msg.get("content");
                      if (seen.add(key)) {
                          mergedMessages.add(msg);
                      }
                  }
              }
          }

          // If no messages array at all, build one from the top-level fields
          if (mergedMessages.isEmpty() && base.getUserQuery() != null) {
              java.util.Map<String, String> uMsg = new java.util.HashMap<>();
              uMsg.put("role", "user");
              uMsg.put("content", base.getUserQuery());
              mergedMessages.add(uMsg);
              if (base.getAiResponse() != null && !base.getAiResponse().isEmpty()) {
                  java.util.Map<String, String> aMsg = new java.util.HashMap<>();
                  aMsg.put("role", "assistant");
                  aMsg.put("content", base.getAiResponse());
                  mergedMessages.add(aMsg);
              }
          }

          base.setMessages(mergedMessages);
          // Use the latest doc's timestamp for sorting in the sidebar
          base.setSessionTimestamp(docs.get(docs.size() - 1).getSessionTimestamp());
          result.add(base);
      }

      // Step 3: Sort result by latest timestamp descending (most recent sessions first)
      result.sort((a, b) -> {
          if (a.getSessionTimestamp() == null) return 1;
          if (b.getSessionTimestamp() == null) return -1;
          return b.getSessionTimestamp().compareTo(a.getSessionTimestamp());
      });

      System.out.println(">>> P2B Backend: Merged " + all.size() + " docs into " + result.size() + " sessions.");
      return ResponseEntity.ok(result);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteChat(@PathVariable String id) {
      chatRepository.deleteById(id);
      return ResponseEntity.ok(Map.of("message", "Deleted successfully"));
  }

  @PostMapping
  public ResponseEntity<?> chat(@RequestBody Map<String, Object> payload) {
    try {
      String reply = service.generateChatResponse(payload);
      Map<String, String> response = new HashMap<>();
      response.put("reply", reply);
      return ResponseEntity.ok(response);
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error in Chat Engine: " + e.getMessage());
    }
  }
}
