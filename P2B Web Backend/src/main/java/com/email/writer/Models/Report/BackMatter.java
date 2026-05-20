package com.email.writer.Models.Report;

import lombok.Data;
import java.util.List;

@Data
public class BackMatter {
  private ConclusionSection conclusion;
  private RecommendationSection recommendations;
  private AppendixSection appendices;
}

@Data
class ConclusionSection {
  private String final_verdict;
  private String system_stability_index; // e.g., "75%"
}

@Data
class RecommendationSection {
  private String immediate_emergency_reset;
  private String long_term_maintenance;
}

@Data
class AppendixSection {
  private List<String> source_citations; // Scientific links
  private String p2b_wisdom_protocol;    // Framework references
}