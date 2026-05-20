package com.email.writer.Repositories;



import com.email.writer.Entities.ReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<ReportEntity, Long> {
    List<ReportEntity> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    
    @org.springframework.data.jpa.repository.Query("SELECT CAST(r.createdAt AS date), COUNT(r) FROM ReportEntity r WHERE r.userEmail = :email GROUP BY CAST(r.createdAt AS date)")
    List<Object[]> countReportsByDay(@org.springframework.data.repository.query.Param("email") String email);
}
