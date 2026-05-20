package com.email.writer.Controllers;

import com.email.writer.Entities.Feedback;
import com.email.writer.Repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @PostMapping("/sync")
    public ResponseEntity<?> saveFeedback(@RequestBody Feedback feedback) {
        try {
            feedback.setTimestamp(LocalDateTime.now());
            Feedback savedFeedback = feedbackRepository.save(feedback);
            return ResponseEntity.ok(savedFeedback);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving feedback: " + e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(feedbackRepository.findAll());
    }
}
