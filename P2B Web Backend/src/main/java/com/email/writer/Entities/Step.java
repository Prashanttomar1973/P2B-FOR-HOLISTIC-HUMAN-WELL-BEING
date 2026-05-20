package com.email.writer.Entities;

public class Step {
    private String step_number;
    private String process_name;
    private String technical_explanation;
    private String visual_reference_link;

    public String getStep_number() { return step_number; }
    public void setStep_number(String step_number) { this.step_number = step_number; }
    public String getProcess_name() { return process_name; }
    public void setProcess_name(String process_name) { this.process_name = process_name; }
    public String getTechnical_explanation() { return technical_explanation; }
    public void setTechnical_explanation(String technical_explanation) { this.technical_explanation = technical_explanation; }
    public String getVisual_reference_link() { return visual_reference_link; }
    public void setVisual_reference_link(String visual_reference_link) { this.visual_reference_link = visual_reference_link; }
}
