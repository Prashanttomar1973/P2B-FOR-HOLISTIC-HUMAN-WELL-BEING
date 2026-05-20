package com.email.writer.Entities;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Document(collection = "feedbacks")
public class Feedback {
    @Id
    private String id;
    private String text;
    private LocalDateTime timestamp;
}
