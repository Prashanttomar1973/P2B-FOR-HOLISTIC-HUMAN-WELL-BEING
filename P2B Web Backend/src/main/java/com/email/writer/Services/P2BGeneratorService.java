package com.email.writer.Services;

// IN IMPORTS KO ADD KARO (Error solve ho jayega)
import com.email.writer.Entities.ChatLog;
import com.email.writer.Entities.ReportEntity;
// Agar aapne Repositories alag folder mein rakhi hain toh yahan sahi path dein:
// import com.email.writer.Repositories.ReportRepository;

import com.email.writer.P2BReportRequest;
import com.email.writer.Repositories.ChatRepository;
import com.email.writer.Repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class P2BGeneratorService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Autowired
    private ReportRepository reportRepository; // Error Fix: Ab import mil jayega

    @Autowired
    private ChatRepository chatRepository; // Error Fix: Ab import mil jayega

    private final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    public String generateReport(Map<String, Object> formData) {
        RestTemplate restTemplate = new RestTemplate();

        String systemPrompt = "You are the P2B Universal Intelligence Engine (Psychosomatic Architect). " +
                "Your goal is to map human distress across three interconnected layers: Hardware (Biology), Software (Psychology), and Director (Philosophy). "
                +
                "\n\nCRITICAL CONSTRAINTS: " +
                "1. Respond ONLY with a single, flat, valid JSON object. No markdown backticks. "+
                "2. Use snake_case for all keys to match the frontend expectations. " +
                "3. Ensure every single field listed in the REQUIRED JSON STRUCTURE is present. Use '-' or 'Not analyzed' if data is missing, but keep the structure intact. "
                + "4. TRUTH OVER AGREEMENT: If user inputs are contradictory, explicitly flag the 'Dissonance' in the logic_justification fields. " +
                "5. CROSS-LAYER LOGIC: Every analysis must correlate how a leak in one layer (e.g., Biology) is impacting the others (Psychology/Philosophy)."
                +
                "\n\nREQUIRED JSON STRUCTURE: " +
                "{" +
                "  \"date\": \"Current Date (e.g. Feb 25, 2026)\"," +

                "  \"summary\": {" +
                "    \"status_check\": \"High-level synthesis of system alignment.\"," +
                "    \"core_imbalance\": \"Identification of the primary system leak.\"" +
                "  }," +

                "  \"main_body\": {" +
                "    \"introduction\": { \"system_context\": \"...\", \"objective\": \"...\" }," +
                "    \"methodology\": { \"audit_process\": \"...\", \"data_reliability\": \"...\" }," +
                "    \"analysis\": {" +
                "      \"suggested_domain\": \"(Philosophy/Psychology/Biology)\"," +
                "      \"identified_sub_domain\": \"Specify sub-unit (e.g. Vagal Tone, Cognitive Load, or Dharma Protocol)\"," +
                "      \"logic_justification\": \"Explain WHY this domain is the root cause based on symptoms.\"," +
                "      \"cross_layer_impact\": \"How this imbalance ripples into the other two layers.\"" +
                "    }" +
                "  }," +

                "  \"biology_section\": {" +
                "    \"title\": \"Biological Infrastructure Analysis\"," +
                "    \"status\": \"Optimal/Sub-optimal/Critical\"," +
                "    \"system_architecture\": { \"operating_mode\": \"...\", \"logic_justification\": \"...\" }," +
                "    \"energy_efficiency\": { \"current_level\": \"...\", \"drain_source\": \"...\", \"recovery_status\": \"...\" },"
                +
                "    \"autonomic_tone\": { \"vagal_status\": \"...\", \"heart_rate_variability\": \"...\" }," +
                "    \"bio_chemical_pulse\": {" +
                "      \"operating_mode\": \"...\", \"logic_justification\": \"...\"," +
                "      \"anabolic_neurotransmitters\": { \"serotonin\": \"...\", \"dopamine\": \"...\", \"gaba\": \"...\" }"
                +
                "    }," +
                "    \"somatic_feedback_loop\": { \"input_symptom\": \"...\", \"biological_bridge\": \"...\", \"mechanism\": \"...\", \"somatization_index\": \"...\" },"
                +
                "    \"cellular_vitality\": { \"mitochondrial_health\": \"...\", \"oxygenation\": \"...\", \"hydration_status\": \"...\" },"
                +
                "    \"circadian_alignment\": { \"status\": \"...\", \"root_cause\": \"...\", \"sleep_architecture_risk\": \"...\" },"
                +
                "    \"hardware_optimization_protocol\": { \"immediate_emergency_resets\": \"...\", \"long_term_maintenance\": \"...\" }"
                +
                "  }," +
                "  \"psychology_section\": {" +
                "    \"title\": \"Psychological Operating System\"," +
                "    \"status\": \"Aligned/Conflicted/Overloaded\"," +
                "    \"mental_operating_system\": {" +
                "      \"current_state\": \"...\", \"logic_justification\": \"...\"," +
                "      \"cognitive_load\": { \"current_level\": \"...\", \"bandwidth_status\": \"...\", \"resilience_index\": \"...\" }"
                +
                "    }," +
                "    \"behavioral_architecture\": { \"root_drivers\": \"...\", \"subconscious_loops\": { \"pattern\": \"...\" }, \"personality_archetype\": \"...\", \"shadow_trait\": \"...\" },"
                +
                "    \"mind_body_bridge\": { \"psychosomatic_conversion\": \"...\", \"neural_bridge_status\": \"...\", \"pain_logic\": \"...\" },"
                +
                "    \"software_optimization_protocol\": { \"cognitive_reframing\": \"...\", \"actionable_mental_resets\": \"...\", \"digital_hygiene\": \"...\" }"
                +
                "  }," +
                "  \"philosophy_section\": {" +
                "    \"title\": \"Existential Direction & Director Logic\"," +
                "    \"status\": \"Evolving/Entropic/Stable\"," +
                "    \"existential_perspective\": { \"framework\": \"...\", \"context_mapping\": \"...\", \"narrative_shift\": \"...\", \"logic_of_struggle\": \"...\" },"
                +
                "    \"control_matrix_analysis\": { \"within_sphere_of_influence\": \"...\", \"outside_sphere_of_influence\": \"...\", \"focus_recommendation\": \"...\" },"
                +
                "    \"value_reframing_logic\": { \"meaning_of_pain\": \"...\", \"identity_evolution\": \"...\", \"dharma_protocol\": \"...\" },"
                +
                "    \"curated_universal_wisdom\": { \"core_principle\": \"...\", \"key_quote\": \"...\", \"author\": \"...\" },"
                +
                "    \"actionable_wisdom_protocol\": { \"contemplative_practice\": \"...\", \"daily_mantra\": \"...\", \"ethical_commitment\": \"...\", \"purpose_alignment\": \"...\" }"
                +
                "  }," +


                "  \"back_matter\": {" +
                "    \"conclusion\": { \"final_verdict\": \"...\", \"system_stability_index\": \"...\" }," +
                "    \"recommendations\": { \"immediate_emergency_reset\": \"...\", \"long_term_maintenance\": \"...\" }," +
                "    \"appendices\": { \"source_citations\": [\"Link 1\", \"Link 2\"], \"p2b_wisdom_protocol\": \"...\" }" +
                "  }"+

                "}";

        StringBuilder userPrompt = new StringBuilder("Analyze this profile and return valid JSON:\n");
        formData.forEach((key, value) -> userPrompt.append(String.format("- %s: %s\n", key, value)));

        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", systemPrompt));
        messages.add(Map.of("role", "user", "content", userPrompt.toString()));

        P2BReportRequest request = new P2BReportRequest();
        request.setMessages(messages);
        request.setTemperature(0.1);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<P2BReportRequest> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_API_URL, entity, Map.class);
            List choices = (List) response.getBody().get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");
            String content = (String) message.get("content");

            // --- DATABASE LOGIC ---
            String userEmail = (String) formData.getOrDefault("email", "anonymous@p2b.ai");
            saveToDatabases(content, messages, userEmail);

            return content;
        } catch (Exception e) {
            return "{\"error\": \"AI Engine Sync Error: " + e.getMessage().replace("\"", "'") + "\"}";
        }
    }

    public String generateChatResponse(Map<String, Object> chatData) {
        RestTemplate restTemplate = new RestTemplate();

        String contextStr = "";
        try {
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            contextStr = mapper.writeValueAsString(chatData.get("context"));
        } catch (Exception e) {
            contextStr = String.valueOf(chatData.get("context"));
        }
        List<Map<String, Object>> history = (List<Map<String, Object>>) chatData.get("history");
        String userQuery = (String) chatData.get("userQuery");
        String activeDomain = (String) chatData.get("activeDomain");
        String sessionId = (String) chatData.getOrDefault("sessionId", "session-" + System.currentTimeMillis());

        String systemPrompt = "You are the P2B Chatbot, an expert in " + activeDomain + ". " +
                "You have access to the user's report context: " + contextStr + ". " +
                "Answer the user's query in a helpful, professional, and empathetic tone. " +
                "Keep your response concise and focused on the identified " + activeDomain + " state.";

        List<Map<String, String>> messagesForAI = new ArrayList<>();
        messagesForAI.add(Map.of("role", "system", "content", systemPrompt));

        Object userIdObj = chatData.getOrDefault("userId", "Guest_User");
        String userId = String.valueOf(userIdObj);

        // Incorporate history from frontend if available
        if (history != null) {
            for (Map<String, Object> msg : history) {
                String sender = (String) msg.get("sender");
                String text = (String) msg.get("text");
                if (text != null && !text.isEmpty()) {
                    String role = "USER".equalsIgnoreCase(sender) ? "user" : "assistant";
                    messagesForAI.add(Map.of("role", role, "content", text));
                }
            }
        }

        // Add the new user query
        messagesForAI.add(Map.of("role", "user", "content", userQuery));

        P2BReportRequest request = new P2BReportRequest();
        request.setMessages(messagesForAI);
        request.setTemperature(0.7);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<P2BReportRequest> entity = new HttpEntity<>(request, headers);

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(GROQ_API_URL, entity, Map.class);
            List choices = (List) response.getBody().get("choices");
            Map firstChoice = (Map) choices.get(0);
            Map message = (Map) firstChoice.get("message");
            String aiResponse = (String) message.get("content");

            // --- PERSISTENCE LOGIC: Group into a single session document ---
            // Only save to Chat history if it's NOT a recommendation request
            if (!"Recommendations".equalsIgnoreCase(activeDomain)) {
                try {
                    ChatLog chatLog = chatRepository.findBySessionId(sessionId).orElse(new ChatLog());
                    
                    if (chatLog.getSessionId() == null) {
                        chatLog.setSessionId(sessionId);
                        chatLog.setUserId(userId);
                        chatLog.setUserQuery(userQuery); 
                        chatLog.setMessages(new ArrayList<>());
                    }
                    
                    chatLog.setAiResponse(aiResponse);
                    
                    List<Map<String, String>> savedMessages = chatLog.getMessages();
                    if (savedMessages == null) savedMessages = new ArrayList<>();
                    
                    savedMessages.add(Map.of("role", "user", "content", userQuery));
                    savedMessages.add(Map.of("role", "assistant", "content", aiResponse));
                    
                    chatLog.setMessages(savedMessages);
                    chatLog.setSessionTimestamp(java.time.LocalDateTime.now());
                    chatRepository.save(chatLog);
                } catch (Exception e) {
                    System.err.println("Chat DB Save Error: " + e.getMessage());
                }
            }

            return aiResponse;
        } catch (Exception e) {
            return "Neural signal interrupted: " + e.getMessage();
        }
    }

    private void saveToDatabases(String rawJson, List<Map<String, String>> chatMessages, String userEmail) {
        try {
            ReportEntity report = new ReportEntity();
            report.setReportData(rawJson);
            report.setPrimaryDomain("Universal-3.0");
            report.setUserEmail(userEmail);
            reportRepository.save(report);

        } catch (Exception e) {
            System.err.println("Database Sync Warning: " + e.getMessage());
        }
    }
}