package com.email.writer.Entities;
import java.util.List;

public class Essentials {
    private List<String> real_world_use_cases;
    private List<String> industry_relevance_and_jobs;
    private ComparisonTable pros_and_cons_comparison_table;
    private String ethical_considerations;

    public List<String> getReal_world_use_cases() { return real_world_use_cases; }
    public void setReal_world_use_cases(List<String> real_world_use_cases) { this.real_world_use_cases = real_world_use_cases; }
    public List<String> getIndustry_relevance_and_jobs() { return industry_relevance_and_jobs; }
    public void setIndustry_relevance_and_jobs(List<String> industry_relevance_and_jobs) { this.industry_relevance_and_jobs = industry_relevance_and_jobs; }
    public ComparisonTable getPros_and_cons_comparison_table() { return pros_and_cons_comparison_table; }
    public void setPros_and_cons_comparison_table(ComparisonTable pros_and_cons_comparison_table) { this.pros_and_cons_comparison_table = pros_and_cons_comparison_table; }
    public String getEthical_considerations() { return ethical_considerations; }
    public void setEthical_considerations(String ethical_considerations) { this.ethical_considerations = ethical_considerations; }
}
