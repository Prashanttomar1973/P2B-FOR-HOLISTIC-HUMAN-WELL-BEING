package com.email.writer.Models.Report;

import lombok.Data;

@Data
public class PsychologySection {
  private String title;
  private String status;
  private MentalOperatingSystem mental_operating_system;
  private BehavioralArchitecture behavioral_architecture;
  private MindBodyBridge mind_body_bridge;
  private SoftwareOptimizationProtocol software_optimization_protocol;

  @Data
  public static class MentalOperatingSystem {
    private String current_state;
    private String logic_justification;
    private CognitiveLoad cognitive_load;

    @Data
    public static class CognitiveLoad {
      private String current_level;
      private String bandwidth_status;
      private String resilience_index;
    }
  }

  @Data
  public static class BehavioralArchitecture {
    private String root_drivers;
    private SubconsciousLoops subconscious_loops;
    private String personality_archetype;
    private String shadow_trait;

    @Data
    public static class SubconsciousLoops {
      private String pattern;
    }
  }

  @Data
  public static class MindBodyBridge {
    private String psychosomatic_conversion;
    private String neural_bridge_status;
    private String pain_logic;
  }

  @Data
  public static class SoftwareOptimizationProtocol {
    private String cognitive_reframing;
    private String actionable_mental_resets;
    private String digital_hygiene;
  }
}
