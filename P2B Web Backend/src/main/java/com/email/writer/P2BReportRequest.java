package com.email.writer;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class P2BReportRequest {
    // Llama 3.3 70B Versatile is excellent for complex JSON extraction
    private String model = "llama-3.3-70b-versatile";
    private List<Map<String, String>> messages;

    // Low temperature (0.1 - 0.2) ensure karta hai ki JSON format break na ho
    private double temperature = 0.2;

    // Optional: Max tokens set kar sakte hain agar report bahut lambi ho
    private int max_tokens = 4096;
}