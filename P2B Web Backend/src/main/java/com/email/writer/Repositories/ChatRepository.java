package com.email.writer.Repositories;

import com.email.writer.Entities.ChatLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends MongoRepository<ChatLog, String> {
    Optional<ChatLog> findBySessionId(String sessionId);
    List<ChatLog> findAllBySessionId(String sessionId);
    List<ChatLog> findAllByUserId(String userId);
}
