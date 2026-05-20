package com.email.writer.Models.Report;

import lombok.Data;

@Data
public class MainBody {
  private IntroductionSection introduction;
  private MethodologySection methodology;
  private AnalysisSection analysis; // Ab ye ek Object hai
}

@Data
class IntroductionSection {
  private String system_context;
  private String objective;
}

@Data
class MethodologySection {
  private String audit_process;
  private String data_reliability;
}

@Data
class AnalysisSection {
  private String suggested_domain;    // Philosophy, Psychology, ya Biology
  private String identified_sub_domain; // e.g., "Autonomic Tone"
  private String logic_justification;   // "Kyun hai ye" part
  private String cross_layer_impact;    // Iska asar dusre layers pe kya hai
}