package com.email.writer.Entities;
import java.util.List;

public class SyntaxBox {
    private String primary_logic;
    private List<String> line_by_line_explanation;

    public String getPrimary_logic() { return primary_logic; }
    public void setPrimary_logic(String primary_logic) { this.primary_logic = primary_logic; }
    public List<String> getLine_by_line_explanation() { return line_by_line_explanation; }
    public void setLine_by_line_explanation(List<String> line_by_line_explanation) { this.line_by_line_explanation = line_by_line_explanation; }
}
