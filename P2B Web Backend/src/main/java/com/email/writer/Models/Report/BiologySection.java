package com.email.writer.Models.Report;

import lombok.Data;

@Data
public class BiologySection {
  private String title;
  private String status;
  private SystemArchitecture system_architecture;
  private EnergyEfficiency energy_efficiency;
  private AutonomicTone autonomic_tone;
  private BioChemicalPulse bio_chemical_pulse;
  private SomaticFeedbackLoop somatic_feedback_loop;
  private CellularVitality cellular_vitality;
  private CircadianAlignment circadian_alignment;
  private HardwareOptimizationProtocol hardware_optimization_protocol;

  @Data
  public static class SystemArchitecture {
    private String operating_mode;
    private String logic_justification;
  }

  @Data
  public static class EnergyEfficiency {
    private String current_level;
    private String drain_source;
    private String recovery_status;
  }

  @Data
  public static class AutonomicTone {
    private String vagal_status;
    private String heart_rate_variability;
  }

  @Data
  public static class BioChemicalPulse {
    private String operating_mode;
    private String logic_justification;
    private AnabolicNeurotransmitters anabolic_neurotransmitters;

    @Data
    public static class AnabolicNeurotransmitters {
      private String serotonin;
      private String dopamine;
      private String gaba;
    }
  }

  @Data
  public static class SomaticFeedbackLoop {
    private String input_symptom;
    private String biological_bridge;
    private String mechanism;
    private String somatization_index;
  }

  @Data
  public static class CellularVitality {
    private String mitochondrial_health;
    private String oxygenation;
    private String hydration_status;
  }

  @Data
  public static class CircadianAlignment {
    private String status;
    private String root_cause;
    private String sleep_architecture_risk;
  }

  @Data
  public static class HardwareOptimizationProtocol {
    private String immediate_emergency_resets;
    private String long_term_maintenance;
  }
}
