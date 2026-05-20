package com.email.writer.Models.Report;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class ReportData {
  private String date;
  private SummarySection summary; // String ki jagah Object
  private BiologySection biology_section;
  private PsychologySection psychology_section;
  private PhilosophySection philosophy_section;
  private MainBody main_body;
  private BackMatter back_matter;
}

@Data
class SummarySection {
  private String status_check;   // Overall state
  private String core_imbalance; // Main issue identified
}
