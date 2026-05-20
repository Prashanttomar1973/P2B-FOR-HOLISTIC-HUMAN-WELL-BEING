package com.email.writer.Entities;
import java.util.List;

public class Footer {
    private String previous_topic_link;
    private String next_topic_link;
    private List<String> suggested_reading;

    public String getPrevious_topic_link() { return previous_topic_link; }
    public void setPrevious_topic_link(String previous_topic_link) { this.previous_topic_link = previous_topic_link; }
    public String getNext_topic_link() { return next_topic_link; }
    public void setNext_topic_link(String next_topic_link) { this.next_topic_link = next_topic_link; }
    public List<String> getSuggested_reading() { return suggested_reading; }
    public void setSuggested_reading(List<String> suggested_reading) { this.suggested_reading = suggested_reading; }
}
