package com.email.writer.Models.Report;

import lombok.Data;

@Data
public class PhilosophySection {
  private String title;
  private String status;
  private ExistentialPerspective existential_perspective;
  private ControlMatrixAnalysis control_matrix_analysis;
  private ValueReframingLogic value_reframing_logic;
  private CuratedUniversalWisdom curated_universal_wisdom;
  private ActionableWisdomProtocol actionable_wisdom_protocol;

  @Data
  public static class ExistentialPerspective {
    private String framework;
    private String context_mapping;
    private String narrative_shift;
    private String logic_of_struggle;
  }

  @Data
  public static class ControlMatrixAnalysis {
    private String within_sphere_of_influence;
    private String outside_sphere_of_influence;
    private String focus_recommendation;
  }

  @Data
  public static class ValueReframingLogic {
    private String meaning_of_pain;
    private String identity_evolution;
    private String dharma_protocol;
  }

  @Data
  public static class CuratedUniversalWisdom {
    private String core_principle;
    private String key_quote;
    private String author;
  }

  @Data
  public static class ActionableWisdomProtocol {
    private String contemplative_practice;
    private String daily_mantra;
    private String ethical_commitment;
    private String purpose_alignment;
  }
}
