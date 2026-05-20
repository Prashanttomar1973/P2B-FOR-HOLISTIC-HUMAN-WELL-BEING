package com.email.writer.Controllers;

import com.email.writer.Entities.Tutorial;
import com.email.writer.Repositories.TutorialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tutorials")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class TutorialController {

    @Autowired
    private TutorialRepository tutorialRepository;

    @Autowired
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    @GetMapping
    public List<Tutorial> getAllTutorials() {
        String[] collections = {"Biology_Tutorials", "Philosophy_Tutorials", "Psychology_Tutorials", "tutorials"};
        java.util.List<Tutorial> allTutorials = new java.util.ArrayList<>();
        for (String collection : collections) {
            try {
                List<Tutorial> docs = mongoTemplate.findAll(Tutorial.class, collection);
                for (Tutorial doc : docs) {
                    if (doc.getTutorial_metadata() != null && doc.getTutorial_metadata().getCategory() == null) {
                        // Infer category from topic_id prefix
                        String topicId = doc.getTutorial_metadata().getTopic_id();
                        String inferred = inferCategoryFromId(topicId);
                        if (inferred != null) {
                            doc.getTutorial_metadata().setCategory(inferred);
                        } else if (collection.equals("Biology_Tutorials")) {
                            doc.getTutorial_metadata().setCategory("Internal Medicine");
                        }
                    }
                }
                allTutorials.addAll(docs);
            } catch (Exception e) {}
        }
        return allTutorials;
    }

    @GetMapping("/{topicId}")
    public ResponseEntity<Tutorial> getTutorialByTopicId(@PathVariable String topicId) {
        Optional<Tutorial> tutorial = tutorialRepository.findByTopicId(topicId);
        return tutorial.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Tutorial> getTutorialsByCategory(@PathVariable String category) {
        String[] collections = {"Biology_Tutorials", "Philosophy_Tutorials", "Psychology_Tutorials", "tutorials"};
        java.util.List<Tutorial> allTutorials = new java.util.ArrayList<>();
        
        for (String collection : collections) {
            try {
                // Search by category field
                org.springframework.data.mongodb.core.query.Query catQuery = new org.springframework.data.mongodb.core.query.Query();
                catQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("tutorial_metadata.category").is(category));
                List<Tutorial> docs = mongoTemplate.find(catQuery, Tutorial.class, collection);
                
                // If not found by category, try matching topic_id prefixes if possible
                if (docs.isEmpty()) {
                    String prefix = getPrefixForCategory(category);
                    if (prefix != null) {
                        org.springframework.data.mongodb.core.query.Query prefixQuery = new org.springframework.data.mongodb.core.query.Query();
                        prefixQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("tutorial_metadata.topic_id").regex("^" + prefix));
                        docs = mongoTemplate.find(prefixQuery, Tutorial.class, collection);
                    }
                }
                
                // Ensure category is set on metadata for frontend filtering consistency
                for (Tutorial doc : docs) {
                    if (doc.getTutorial_metadata() != null && doc.getTutorial_metadata().getCategory() == null) {
                        doc.getTutorial_metadata().setCategory(category);
                    }
                }
                allTutorials.addAll(docs);
            } catch (Exception e) {}
        }
        
        return allTutorials;
    }

    private String getPrefixForCategory(String category) {
        switch (category.toLowerCase()) {
            case "clinical psychology": return "CLI";
            case "social psychology": return "SOC";
            case "cognitive psychology": return "COG";
            case "developmental psychology": return "DEV";
            case "neuropsychology": return "NEU";
            case "physiological psychology": return "PHY";
            case "abnormal psychology": return "ABN";
            case "metaphysics": return "META|PHI-MET";
            case "epistemology": return "EPI|PHI-EPI";
            case "ethics": return "ETH|PHI-ETH";
            case "logic": return "LOG|PHI-LOG";
            case "aesthetics": return "AES|PHI-AES";
            case "political philosophy": return "POL|PHI-POL";
            case "internal medicine": return "INT";
            case "pediatrics": return "PED";
            case "surgery": return "SUR";
            case "dermatology": return "DER";
            case "obstetrics & gynecology": return "OBG";
            case "fundamentals": return "FUN|GEN";
            case "zoology": return "ZOO";
            case "botany": return "BOT";
            case "microbiology": return "MIC";
            case "genetics": return "GEN";
            default: return null;
        }
    }

    private String inferCategoryFromId(String topicId) {
        if (topicId == null) return null;
        if (topicId.startsWith("INT")) return "Internal Medicine";
        if (topicId.startsWith("PED")) return "Pediatrics";
        if (topicId.startsWith("SUR")) return "Surgery";
        if (topicId.startsWith("DER")) return "Dermatology";
        if (topicId.startsWith("OBG")) return "Obstetrics & Gynecology";
        if (topicId.startsWith("FUN") || topicId.startsWith("GEN")) return "Fundamentals";
        if (topicId.startsWith("CLI")) return "Clinical Psychology";
        if (topicId.startsWith("SOC")) return "Social Psychology";
        if (topicId.startsWith("DEV") || topicId.startsWith("DEP") || topicId.startsWith("DVP") || topicId.startsWith("DVL") || topicId.startsWith("CHI") || topicId.startsWith("PSY-DEV")) return "Developmental Psychology";
        if (topicId.startsWith("PHY") || topicId.startsWith("BIO-PSY") || topicId.startsWith("NEU")) return "Physiological Psychology";
        if (topicId.startsWith("ABN") || topicId.startsWith("PSY-ABN")) return "Abnormal Psychology";
        if (topicId.startsWith("SOC") || topicId.startsWith("PSY-SOC")) return "Social Psychology";
        if (topicId.startsWith("CLI") || topicId.startsWith("PSY-CLI")) return "Clinical Psychology";
        if (topicId.startsWith("META") || topicId.startsWith("PHI-MET")) return "Metaphysics";
        if (topicId.startsWith("EPI") || topicId.startsWith("PHI-EPI")) return "Epistemology";
        if (topicId.startsWith("ETH") || topicId.startsWith("PHI-ETH")) return "Ethics";
        if (topicId.startsWith("LOG") || topicId.startsWith("PHI-LOG")) return "Logic";
        if (topicId.startsWith("POL") || topicId.startsWith("PHI-POL")) return "Political Philosophy";
        return null;
    }

    @PostMapping
    public Tutorial createTutorial(@RequestBody Tutorial tutorial) {
        return tutorialRepository.save(tutorial);
    }
}
