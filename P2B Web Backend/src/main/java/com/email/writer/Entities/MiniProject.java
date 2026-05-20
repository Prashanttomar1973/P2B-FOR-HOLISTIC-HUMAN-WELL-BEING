package com.email.writer.Entities;
import java.util.List;

public class MiniProject {
    private String project_title;
    private String objective;
    private List<String> step_wise_instructions;

    public String getProject_title() { return project_title; }
    public void setProject_title(String project_title) { this.project_title = project_title; }
    public String getObjective() { return objective; }
    public void setObjective(String objective) { this.objective = objective; }
    public List<String> getStep_wise_instructions() { return step_wise_instructions; }
    public void setStep_wise_instructions(List<String> step_wise_instructions) { this.step_wise_instructions = step_wise_instructions; }
}
