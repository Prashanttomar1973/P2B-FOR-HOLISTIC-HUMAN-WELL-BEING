package com.email.writer.Entities;

public class TutorialMetadata {
    private String category;
    private String topic_id;
    private String topic_name;
    private String difficulty_level;
    private String estimated_reading_time;
    private String last_updated;

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getTopic_id() { return topic_id; }
    public void setTopic_id(String topic_id) { this.topic_id = topic_id; }
    public String getTopic_name() { return topic_name; }
    public void setTopic_name(String topic_name) { this.topic_name = topic_name; }
    public String getDifficulty_level() { return difficulty_level; }
    public void setDifficulty_level(String difficulty_level) { this.difficulty_level = difficulty_level; }
    public String getEstimated_reading_time() { return estimated_reading_time; }
    public void setEstimated_reading_time(String estimated_reading_time) { this.estimated_reading_time = estimated_reading_time; }
    public String getLast_updated() { return last_updated; }
    public void setLast_updated(String last_updated) { this.last_updated = last_updated; }
}
