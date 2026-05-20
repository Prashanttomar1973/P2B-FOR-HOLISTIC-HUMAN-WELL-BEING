package com.email.writer.Repositories;

import com.email.writer.Entities.Tutorial;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TutorialRepository extends MongoRepository<Tutorial, String> {
    // Custom query to find by topic_id inside the metadata object
    @Query("{ 'tutorial_metadata.topic_id' : ?0 }")
    Optional<Tutorial> findByTopicId(String topicId);

    // Custom query to find by category inside the metadata object
    @Query("{ 'tutorial_metadata.category' : ?0 }")
    List<Tutorial> findByCategory(String category);
}
