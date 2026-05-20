package com.email.writer.Entities;
import java.util.List;

public class Introduction {
    private String formal_definition;
    private String simplified_concept_analogy;
    private List<String> historical_timeline;
    private String core_architecture_diagram_description;
    private List<String> key_characteristics_list;

    public String getFormal_definition() { return formal_definition; }
    public void setFormal_definition(String formal_definition) { this.formal_definition = formal_definition; }
    public String getSimplified_concept_analogy() { return simplified_concept_analogy; }
    public void setSimplified_concept_analogy(String simplified_concept_analogy) { this.simplified_concept_analogy = simplified_concept_analogy; }
    public List<String> getHistorical_timeline() { return historical_timeline; }
    public void setHistorical_timeline(List<String> historical_timeline) { this.historical_timeline = historical_timeline; }
    public String getCore_architecture_diagram_description() { return core_architecture_diagram_description; }
    public void setCore_architecture_diagram_description(String core_architecture_diagram_description) { this.core_architecture_diagram_description = core_architecture_diagram_description; }
    public List<String> getKey_characteristics_list() { return key_characteristics_list; }
    public void setKey_characteristics_list(List<String> key_characteristics_list) { this.key_characteristics_list = key_characteristics_list; }
}
