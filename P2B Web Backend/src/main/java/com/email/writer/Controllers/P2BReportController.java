package com.email.writer.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.List;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/p2b-report")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class P2BReportController {

  @Autowired
  private com.email.writer.Repositories.ReportRepository reportRepo;

  @GetMapping("/user-stats")
  public ResponseEntity<?> getUserStats(@RequestParam String email) {
    try {
      System.out.println("P2B Stats: Fetching data for email: " + email);
      java.util.List<com.email.writer.Entities.ReportEntity> reports = reportRepo.findByUserEmailOrderByCreatedAtDesc(email);
      System.out.println("P2B Stats: Found " + reports.size() + " reports for " + email);
      
      java.util.List<Object[]> counts = reportRepo.countReportsByDay(email);
      System.out.println("P2B Stats: Activity Grid contains " + counts.size() + " unique days.");
      
      Map<String, Object> stats = new java.util.HashMap<>();
      stats.put("recentReports", reports.stream().limit(5).map(r -> {
          Map<String, Object> m = new java.util.HashMap<>();
          m.put("id", r.getId()); // Support open details
          String title = r.getPrimaryDomain();
          if (title == null || title.equalsIgnoreCase("Unknown") || title.trim().isEmpty()) {
              title = "Neural_P2B_Analysis";
          }
          m.put("title", title);
          m.put("date", r.getCreatedAt().toString());
          return m;
      }).collect(java.util.stream.Collectors.toList()));
      
      Map<String, Long> activityGrid = new java.util.HashMap<>();
      for (Object[] row : counts) {
          String dayKey = row[0].toString();
          activityGrid.put(dayKey, (Long) row[1]);
          System.out.println("   -> Day: " + dayKey + " Count: " + row[1]);
      }
      stats.put("activityGrid", activityGrid);
      stats.put("totalInvocations", reports.size());
      
      return ResponseEntity.ok(stats);
    } catch (Exception e) {
      System.err.println("P2B Stats Error: " + e.getMessage());
      return ResponseEntity.status(500).body("Error fetching user stats: " + e.getMessage());
    }
  }

  @GetMapping("/details/{id}")
  public ResponseEntity<?> getReportDetails(@PathVariable Long id) {
    try {
      java.util.Optional<com.email.writer.Entities.ReportEntity> report = reportRepo.findById(id);
      if (report.isPresent()) {
        return ResponseEntity.ok(report.get());
      } else {
        return ResponseEntity.status(404).body("Report not found");
      }
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error fetching report: " + e.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteReport(@PathVariable Long id) {
    try {
      if (reportRepo.existsById(id)) {
        reportRepo.deleteById(id);
        return ResponseEntity.ok("Report deleted successfully");
      } else {
        return ResponseEntity.status(404).body("Report not found");
      }
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error deleting report: " + e.getMessage());
    }
  }
}
