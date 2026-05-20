package com.email.writer.Entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tutorials")
public class Tutorial {
    @Id
    private String id;
    private TutorialMetadata tutorial_metadata;
    private Introduction section_1_introduction_the_what;
    private Essentials section_2_essentials_the_why;
    private Implementation section_3_core_implementation_the_how;
    private Practice section_4_practice_and_projects_application;
    private Footer footer_navigation;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public TutorialMetadata getTutorial_metadata() { return tutorial_metadata; }
    public void setTutorial_metadata(TutorialMetadata tutorial_metadata) { this.tutorial_metadata = tutorial_metadata; }

    public Introduction getSection_1_introduction_the_what() { return section_1_introduction_the_what; }
    public void setSection_1_introduction_the_what(Introduction s1) { this.section_1_introduction_the_what = s1; }

    public Essentials getSection_2_essentials_the_why() { return section_2_essentials_the_why; }
    public void setSection_2_essentials_the_why(Essentials s2) { this.section_2_essentials_the_why = s2; }

    public Implementation getSection_3_core_implementation_the_how() { return section_3_core_implementation_the_how; }
    public void setSection_3_core_implementation_the_how(Implementation s3) { this.section_3_core_implementation_the_how = s3; }

    public Practice getSection_4_practice_and_projects_application() { return section_4_practice_and_projects_application; }
    public void setSection_4_practice_and_projects_application(Practice s4) { this.section_4_practice_and_projects_application = s4; }

    public Footer getFooter_navigation() { return footer_navigation; }
    public void setFooter_navigation(Footer footer) { this.footer_navigation = footer; }
}