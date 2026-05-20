package com.email.writer.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "p2b_chat_history")
public class ChatLog {

    @Id
    private String id;

    private String sessionId; // Groups all messages in one conversation
    private String userId;
    private String userQuery;
    private String aiResponse;

    private List<Map<String, String>> messages;

    private LocalDateTime sessionTimestamp = LocalDateTime.now();

    public ChatLog() {
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserQuery() {
        return userQuery;
    }

    public void setUserQuery(String userQuery) {
        this.userQuery = userQuery;
    }

    public String getAiResponse() {
        return aiResponse;
    }

    public void setAiResponse(String aiResponse) {
        this.aiResponse = aiResponse;
    }

    public List<Map<String, String>> getMessages() {
        return messages;
    }

    public void setMessages(List<Map<String, String>> messages) {
        this.messages = messages;
    }

    public LocalDateTime getSessionTimestamp() {
        return sessionTimestamp;
    }

    public void setSessionTimestamp(LocalDateTime sessionTimestamp) {
        this.sessionTimestamp = sessionTimestamp;
    }
}