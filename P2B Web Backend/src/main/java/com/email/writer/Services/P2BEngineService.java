package com.email.writer.Services;

import com.email.writer.Entities.ChatLog;
import com.email.writer.Entities.ReportEntity;
import com.email.writer.Repositories.ChatRepository;
import com.email.writer.Repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class P2BEngineService {

    @Autowired
    private ReportRepository reportRepo; // PostgreSQL

    @Autowired
    private ChatRepository chatRepo;     // MongoDB

    public void processUniversalRequest(String domain, String userMessage, String aiResponse, String userEmail) {
        // 1. Save Structured Data in Postgres
        ReportEntity report = new ReportEntity();
        report.setPrimaryDomain(domain);
        report.setReportData(aiResponse); // Fix: Set report content!
        report.setUserEmail(userEmail); // Associated User
        report.setCreatedAt(LocalDateTime.now());
        reportRepo.save(report);

        System.out.println("P2B Engine: Synchronized save complete!");
    }
}
