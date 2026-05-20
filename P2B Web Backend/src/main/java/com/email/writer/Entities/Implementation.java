package com.email.writer.Entities;
import java.util.List;

public class Implementation {
    private List<String> prerequisites_knowledge;
    private List<String> environment_setup_or_tools_required;
    private List<Step> step_by_step_mechanism;
    private SyntaxBox syntax_or_formulas_box;
    private List<String> common_errors_and_troubleshooting;

    public List<String> getPrerequisites_knowledge() { return prerequisites_knowledge; }
    public void setPrerequisites_knowledge(List<String> prerequisites_knowledge) { this.prerequisites_knowledge = prerequisites_knowledge; }
    public List<String> getEnvironment_setup_or_tools_required() { return environment_setup_or_tools_required; }
    public void setEnvironment_setup_or_tools_required(List<String> environment_setup_or_tools_required) { this.environment_setup_or_tools_required = environment_setup_or_tools_required; }
    public List<Step> getStep_by_step_mechanism() { return step_by_step_mechanism; }
    public void setStep_by_step_mechanism(List<Step> step_by_step_mechanism) { this.step_by_step_mechanism = step_by_step_mechanism; }
    public SyntaxBox getSyntax_or_formulas_box() { return syntax_or_formulas_box; }
    public void setSyntax_or_formulas_box(SyntaxBox syntax_or_formulas_box) { this.syntax_or_formulas_box = syntax_or_formulas_box; }
    public List<String> getCommon_errors_and_troubleshooting() { return common_errors_and_troubleshooting; }
    public void setCommon_errors_and_troubleshooting(List<String> common_errors_and_troubleshooting) { this.common_errors_and_troubleshooting = common_errors_and_troubleshooting; }
}
