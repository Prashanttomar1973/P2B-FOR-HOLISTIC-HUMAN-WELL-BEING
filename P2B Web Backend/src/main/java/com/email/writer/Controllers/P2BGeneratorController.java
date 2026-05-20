package com.email.writer.Controllers;

import com.email.writer.Services.P2BGeneratorService;
import com.email.writer.Services.P2BEngineService; // Correct Import
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/generate")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class P2BGeneratorController {

    @Autowired
    private P2BGeneratorService service;

    @Autowired
    private P2BEngineService p2bEngineService; // Injected Instance

    @PostMapping("/report")
    public ResponseEntity<?> getReport(@RequestBody Map<String, Object> formData) {
        // 1. AI Engine se Raw Response (Markdown/JSON) lena
        String rawResponse = service.generateReport(formData);

        try {
            // 2. Cleaning logic: Backticks hatana
            String cleanedJson = rawResponse.trim();
            if (cleanedJson.startsWith("```")) {
                cleanedJson = cleanedJson.replaceAll("^```(?:json)?|```$", "").trim();
            }

            // 3. Data Extraction for DB Sync
            String domain = (String) formData.get("primaryDomain"); // Check frontend key
            if (domain == null) domain = (String) formData.getOrDefault("domain", "Neural_Analysis"); 
            
            String userQuery = (String) formData.getOrDefault("targetDomain", "Universal System Analysis");
            String userEmail = (String) formData.getOrDefault("email", "anonymous@p2b.ai");

            // 4. DATABASE SYNC (PostgreSQL + MongoDB)
            // Note: Small 'p' use karna hai variable ke liye
            p2bEngineService.processUniversalRequest(domain, userQuery, cleanedJson, userEmail);

            // 5. Final JSON Parsing for Frontend
            ObjectMapper mapper = new ObjectMapper();
            Map<String, Object> jsonMap = mapper.readValue(cleanedJson, Map.class);

            return ResponseEntity.ok(jsonMap);

        } catch (Exception e) {
            // Useful for debugging in Postman
            return ResponseEntity.status(500).body("P2B Engine Sync Error: " + e.getMessage());
        }
    }
}