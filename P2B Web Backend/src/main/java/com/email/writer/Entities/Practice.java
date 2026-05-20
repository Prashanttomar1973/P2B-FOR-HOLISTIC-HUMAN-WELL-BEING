package com.email.writer.Entities;
import java.util.List;
import java.util.Map;

public class Practice {
    private List<Exercise> hands_on_exercises;
    private MiniProject mini_project_guide;
    private List<String> interview_preparation_questions;
    private Map<String, String> glossary_cheat_sheet;

    public List<Exercise> getHands_on_exercises() { return hands_on_exercises; }
    public void setHands_on_exercises(List<Exercise> hands_on_exercises) { this.hands_on_exercises = hands_on_exercises; }
    public MiniProject getMini_project_guide() { return mini_project_guide; }
    public void setMini_project_guide(MiniProject mini_project_guide) { this.mini_project_guide = mini_project_guide; }
    public List<String> getInterview_preparation_questions() { return interview_preparation_questions; }
    public void setInterview_preparation_questions(List<String> interview_preparation_questions) { this.interview_preparation_questions = interview_preparation_questions; }
    public Map<String, String> getGlossary_cheat_sheet() { return glossary_cheat_sheet; }
    public void setGlossary_cheat_sheet(Map<String, String> glossary_cheat_sheet) { this.glossary_cheat_sheet = glossary_cheat_sheet; }
}
