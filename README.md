🧠 P2B — Problem to Benefit

Holistic Human Well-Being Platform

P2B is a high-performance, full-stack, AI-powered web application that transforms personal challenges across three fundamental human layers—Biology (Hardware), Psychology (Software), and Philosophy (Director)—into structured, actionable, and personalized benefit protocols.

📋 Table of Contents

🔍 What is P2B?

🌀 Core Philosophy & Concept

🎯 Live Application Flow

✨ Complete Feature Set

🛠️ Tech Stack

📁 Project Structure

🌐 Backend API Reference

🗄️ Database Architecture

🤖 AI Engine — How It Works

⚙️ Environment Setup & Configuration

🚀 Installation & Running Locally

🗺️ Frontend Component Map

🔒 Security Architecture

📊 Tutorial Categories

🤝 Contributing

🔍 What is P2B?

P2B (Problem to Benefit) is a comprehensive holistic health intelligence platform. Users describe their life problems—mental, physical, or philosophical—and the P2B AI engine (powered by the Groq API) produces a structured, multi-domain JSON report that:

Identifies Root Causes: Pinnpoints the primary failure layer—Biology, Psychology, or Philosophy.

Maps Cross-Layer Dynamics: Explains how a biological issue (e.g., circadian disruption) ripples into psychological states (e.g., cognitive fatigue) and vice versa.

Delivers Actionable Protocols: Provides immediate structural resets and sustainable long-term maintenance actions.

Persists Sessions: Securely saves all analysis reports and interactive chat logs to a high-availability PostgreSQL + MongoDB hybrid database system.

🌀 Core Philosophy & Concept

The P2B Intelligence Engine models human health and performance as a deeply integrated, three-tiered system:

Layer

System Analogy

P2B Domain Focus

Key Metrics Analyzed

Biology

💻 Hardware

Physical symptoms, neurochemical pathways, circadian rhythm, baseline energy

Sleep efficiency, diet patterns, physical somatic strain, movement

Psychology

⚙️ Software

Cognitive load, behavioral loops, deeply rooted emotional schemas

Cognitive distortions, emotional coping mechanisms, trigger loops

Philosophy

🎬 Director

Existential framework, alignment of actions with values, sense of purpose (Dharma)

Core value conflicts, existential dread, worldview coherence

Instead of addressing symptoms in isolation, the AI performs a cross-layer causal diagnosis, examining the structural dependencies of the entire system simultaneously.

🎯 Live Application Flow

The user journey is structured into an intuitive, guided step-by-step experience:

graph TD
    A[Accept T&C Gate] --> B[Secure Login / Google OAuth]
    B --> C[Step 1: Personal Profile]
    C --> D[Step 2: Lifestyle Auditing]
    D --> E[Step 3: Biology & Health Metrics]
    E --> F[Step 4: Psychology & Cognitive Load]
    F --> G[Step 5: Philosophy & Alignment]
    G --> H[Step 6: Raw Problem Statement]
    H --> I[Step 7: Rich UI Final Report]
    I --> J[Step 8: Context-Aware P2B Chatbot]


✨ Complete Feature Set

🔐 Authentication & Security

Hybrid Native Sign-Up: Secure Email/Password registration powered by salted BCrypt hashing (BCryptPasswordEncoder).

Google OAuth 2.0 Integration: Server-side ID token verification using Google's GoogleIdTokenVerifier.

Silent Migration Pipeline: Legacy plain-text passwords are automatically detected, re-hashed using BCrypt, and updated seamlessly upon successful login.

T&C Overlay Gate: A modern glassmorphism blur prevents interaction with the interface until the legal Terms & Conditions are formally accepted.

Persistent Sessions: Client state is safely retained in localStorage via encrypted token patterns.

🧬 Holistic Assessment Engine

The interactive assessment guides users through seven highly optimized slides:

Step

React Component

Data Points Collected

1

PersonalInfoSlide.jsx

Demographic foundations (Name, age, occupation, overarching goals)

2

LifestyleSlide.jsx

Daily circadian routines, sleep hygiene, occupational stressors

3

HealthBiologySlide.jsx

Physical symptoms, nutritional intake, somatic conditions, exercise habits

4

PsychologySlide.jsx

Current mental states, emotional loops, psychological clinical history

5

PhilosophySlide.jsx

Core worldview, existential frameworks, value hierarchy, life meaning

6

ProblemDescriptionSlide.jsx

Free-form problem statement in the user's authentic language

7

FinalReportSlide.jsx

Renders the parsed AI report with live print-to-PDF capabilities

🤖 AI Intelligence Engine

Inference Provider: Powered by lightning-fast Groq API (llama model suite) orchestrated via P2BGeneratorService.java.

Deterministic Diagnostics: The report generation pipeline runs at a highly precise temperature of $T = 0.1$ to enforce structural JSON integrity and analytical consistency.

Creative Guidance: Interactive chat sessions run at a warmer temperature of $T = 0.7$ to encourage natural, empathetic conversational flow.

Immediate Persistence: Every generated report is instantly serialized and written to the relational database.

💬 Context-Aware Chatbot (P2BChatbot.jsx)

Stateful Memory: The entire generated report is loaded into the LLM system context alongside previous message histories for hyper-personalized conversations.

Smart Merging Pipeline: The backend intelligently de-duplicates, orders, and merges chat frames matching the active sessionId prior to UI mounting.

Storage Exclusions: Sensitive or transient system messages (e.g., active Recommendation queries) bypass MongoDB persistence layer to preserve clean historical records.

🛠️ Tech Stack

Frontend Architecture

Core Framework: React 19.x & Vite 7.x (optimized development builds)

State & Animations: Framer Motion 12.x & Animate.css 4.x for micro-interactions

styling Framework: Bootstrap 5.3.x & react-bootstrap for consistent utility-first layout designs

Iconographies: Lucide React 0.563.x & Bootstrap Icons 1.13.x

API Client: Axios 1.13.x

Document Export: react-to-print 3.x

Backend Engine

Language Runtime: Java 21 (LTS)

Framework System: Spring Boot 3.5.7 with built-in Spring WebFlux support

Relational Mapping: Spring Data JPA (PostgreSQL Dialect)

Document Mapping: Spring Data MongoDB

Crypto Libraries: Spring Security Crypto 6.4.2

Token Verification: Google API Client 2.0.0 & Google HTTP Client (Gson)

📁 Project Structure

P2B-Platform/
│
├── README.md
│
├── P2B_FRONTEND/                           # React 19 Frontend App
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx                        # React entry point
│       ├── App.jsx                         # Master routing & state orchestrator
│       ├── Navbar.jsx                      # Navigation header
│       ├── Footer.jsx                      # Footer layout
│       ├── MainBody.jsx                    # Landing page component
│       ├── api/
│       │   └── p2bService.js               # API service layer for payload requests
│       └── components/
│           ├── LegalModal.jsx              # T&C backdrop-blur gateway
│           ├── AccountSettingsAuth.jsx     # Dual native/Google auth modal
│           ├── PersonalInfoSlide.jsx       # Assessment Slide 1
│           ├── LifestyleSlide.jsx          # Assessment Slide 2
│           ├── HealthBiologySlide.jsx      # Assessment Slide 3
│           ├── PsychologySlide.jsx         # Assessment Slide 4
│           ├── PhilosophySlide.jsx         # Assessment Slide 5
│           ├── ProblemDescriptionSlide.jsx # Assessment Slide 6
│           ├── FinalReportSlide.jsx        # Assessment Slide 7
│           ├── P2BChatbot.jsx              # Dynamic AI chatbot panel
│           ├── PersonalInformation.jsx     # User Dashboard & Stats Grid
│           ├── ChangePassword.jsx          # Secured credential updating
│           ├── PrivacySecurity.jsx         # Data governance controls
│           ├── DeleteAccountSection.jsx    # Complete GDPA profile erasure flow
│           ├── Explore[Biology/Psychology/Philosophy].jsx # Deep-dive hubs
│           └── DynamicTutorialViewer.jsx   # NoSQL Tutorial Document Parser
│
└── P2B Web Backend/                        # Spring Boot REST API
    ├── pom.xml
    └── src/main/
        ├── resources/
        │   └── application.properties      # Port binding, credentials, database configurations
        └── java/com/email/writer/
            ├── P2BApplication.java         # Master boot class
            ├── WebConfig.java              # CORS filters & global password encoder beans
            ├── Controllers/
            │   ├── AuthController.java     # Signup, Native, and Google Authentication
            │   ├── P2BGeneratorController.java # Primary Report Generation Endpoint
            │   ├── ChatController.java     # Chat Retrieval, Persistence, and Deletion
            │   ├── P2BReportController.java # Analytics & Historical Reports Query
            │   └── TutorialController.java  # NoSQL Educational Hub Router
            ├── Services/
            │   ├── P2BGeneratorService.java # Primary LLM Prompt Orchestration
            │   └── P2BEngineService.java   # Internal Sync & Database Dispatcher
            ├── Repositories/
            │   ├── UserRepository.java     # PostgreSQL Users Mapper
            │   ├── ReportRepository.java   # PostgreSQL Report Data Access
            │   ├── ChatRepository.java     # MongoDB Chat Logs Access
            │   └── TutorialRepository.java # MongoDB Knowledge Document Access
            └── Entities/
                ├── User.java               # PostgreSQL Relational User Model
                ├── ReportEntity.java       # PostgreSQL JSON/TEXT Report Model
                ├── ChatLog.java            # MongoDB Chat Session Document Schema
                └── Tutorial.java           # MongoDB Educational Nested Document Schema


🌐 Backend API Reference

All requests must target the active host server (Default: http://localhost:8080).

Authentication Matrix — /api/auth

Method

Endpoint

Description

Expected Payload

POST

/api/auth/signup

Register user with standard BCrypt hashing

{ "email": "...", "password": "...", "fullName": "..." }

POST

/api/auth/login

Authenticate native user; migrates weak hashes

{ "email": "...", "password": "..." }

POST

/api/auth/google

Verify Google ID token and provision session

{ "idToken": "..." }

Synthesis Engine — /api/generate

Method

Endpoint

Description

Expected Payload

POST

/api/generate/report

Submit assessment form to build full diagnostic

JSON map of all 6 assessment slides

Interactive Dialogue — /api/chat

Method

Endpoint

Description

GET

/api/chat?userId={email}

Returns all aggregated conversation logs linked to user.

POST

/api/chat

Post message; saves and returns system response.

DELETE

/api/chat/{id}

Permanently purge a conversation session matching the targeted database ID.

Diagnostic History — /api/p2b-report

Method

Endpoint

Description

GET

/api/p2b-report/user-stats?email={email}

Fetch metadata list and daily generation volume.

GET

/api/p2b-report/details/{id}

Access raw payload of a specific report.

🗄️ Database Architecture

P2B utilizes a robust polyglot database strategy to optimize speed, consistency, and compliance.

                  ┌────────────── P2B Backend ──────────────┐
                  │                                         │
                  ▼                                         ▼
      ┌──────────────────────┐                  ┌──────────────────────┐
      │  PostgreSQL (ACID)   │                  │  MongoDB (Document)  │
      ├──────────────────────┤                  ├──────────────────────┤
      │ • User Profiles      │                  │ • Conversation Logs  │
      │ • Diagnostic Reports │                  │ • Education Nodes    │
      │ • Feedback Forms     │                  │ • Complex Curriculums│
      └──────────────────────┘                  └──────────────────────┘


PostgreSQL (Transactional Engine)

users: Encrypted access tables containing profiles and native access secrets.

p2b_reports: High-durability storage of historical reports serialized as heavy-text JSON.

feedback: Structured customer logs with timestamp sequences.

MongoDB (Flexible Document Store)

chat_logs: Multi-layered history trees mapping unique transaction sessions.

tutorials (grouped collections): Multi-category markdown sheets containing modular education steps, comparative tables, and interactive code implementations.

🤖 AI Engine — How It Works

Report Generation Pipeline

sequenceDiagram
    participant FE as Frontend (App.jsx)
    participant BE as Spring Boot Controller
    participant GS as P2BGeneratorService
    participant LLM as Groq Inference Engine
    participant DB as PostgreSQL (ReportEntity)

    FE->>BE: POST /api/generate/report (Form Data Map)
    BE->>GS: Orchestrate system instructions
    Note over GS: Loads core prompt rules<br/>Enforces strict snake_case JSON output<br/>Sets temperature (T = 0.1)
    GS->>LLM: Dispatch payload request
    LLM-->>GS: Returns raw structural JSON response
    GS->>DB: Save raw response context
    GS-->>FE: Stream parsed JSON diagnostic


Generated Report Contract Schema

{
  "date": "2026-05-20T10:05:05.000Z",
  "summary": {
    "status_check": "Optimized biological markers with elevated intellectual cognitive load.",
    "core_imbalance": "Circadian misalignment cascading somatic stress into executive planning."
  },
  "main_body": {
    "introduction": {
      "system_context": "Systems analysis of user trajectory patterns.",
      "objective": "Identify feedback loops suppressing nervous system recovery."
    },
    "analysis": {
      "suggested_domain": "Biology",
      "identified_sub_domain": "Vagal Tone Adjustment",
      "logic_justification": "Somatic stress scores indicate autonomic nervous system fatigue.",
      "cross_layer_impact": "Lowered physical vagal tone prevents successful deep sleep, driving morning cognitive fog."
    }
  },
  "biology_section": {},
  "psychology_section": {},
  "philosophy_section": {},
  "back_matter": {
    "conclusion": {
      "final_verdict": "Resilient system requiring strategic biological resetting.",
      "system_stability_index": "82%"
    },
    "recommendations": {
      "immediate_emergency_reset": "Engage in 10-minute Non-Sleep Deep Rest (NSDR) breathing sequence immediately.",
      "long_term_maintenance": "Establish 10,000 lux light exposure within 30 minutes of waking up."
    }
  }
}


⚙️ Environment Setup & Configuration

Configure your application.properties configuration located in P2B Web Backend/src/main/resources/:

# Server Port Configuration
server.port=8080

# --- LLM API Credentials ---
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro
gemini.api.key=YOUR_GEMINI_API_SECRET_KEY
groq.api.key=YOUR_GROQ_API_SECRET_KEY

# --- Relational Database: PostgreSQL ---
spring.datasource.url=jdbc:postgresql://localhost:5432/p2b_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_ACCESS_PASSWORD
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# --- Document Database: MongoDB ---
spring.data.mongodb.uri=mongodb://localhost:27017/p2b_db

# --- Google OAuth Identity Management ---
google.client.id=YOUR_GOOGLE_CLOUD_CONSOLE_CLIENT_ID


[!WARNING]
Never commit standard configurations containing raw secret values to version control. Utilize system variables or secure environment containers (.env) for production deployments.

🚀 Installation & Running Locally

Prerequisites

Node.js (v18+) & Java SDK (v21)

Apache Maven (v3.8+)

PostgreSQL active database named p2b_db

MongoDB instance active on port 27017

Step 1: Initialize Database Services

Verify that both Database services are running locally before launching the backend engine:

# Check PostgreSQL status
pg_isready

# Launch Local MongoDB Daemon
mongod --dbpath /your/data/directory


Step 2: Build and Run Backend Engine

cd "P2B Web Backend"

# Run Maven build phase
mvn clean install

# Launch Spring Boot Server
mvn spring-boot:run


Once initialized, the REST API gateway will listen on http://localhost:8080.

Step 3: Start Frontend Live Server

cd P2B_FRONTEND

# Install dependencies
npm install

# Start development build server
npm run dev


The client app will launch and run natively at http://localhost:5173.

🗺️ Frontend Component Map

App.jsx (Global Application State Tree & Router Node)
 │
 ├── LegalModal.jsx (Overlay Backdrop Shield Gate)
 └── P2BLayout (Responsive Navbar & Footer Matrix)
      │
      ├── view = 'home'           ──> MainBody.jsx (Primary Pitch Slide)
      ├── view = 'about'          ──> AboutUsSlide.jsx (System Creators Bio)
      │
      ├── view = 'explore_biology'──> ExploreBiology.jsx
      ├── view = 'explore_psych'  ──> ExplorePsychology.jsx
      ├── view = 'explore_philo'  ──> ExplorePhilosophy.jsx
      │
      ├── view = 'profile'        ──> PersonalInformation.jsx (User Dash)
      │                                ├── ChangePassword.jsx
      │                                ├── PrivacySecurity.jsx
      │                                └── DeleteAccountSection.jsx
      │
      └── view = 'session' (Wizard Slide Controller)
           ├── step 1 ──> PersonalInfoSlide.jsx
           ├── step 2 ──> LifestyleSlide.jsx
           ├── step 3 ──> HealthBiologySlide.jsx
           ├── step 4 ──> PsychologySlide.jsx
           ├── step 5 ──> PhilosophySlide.jsx
           ├── step 6 ──> ProblemDescriptionSlide.jsx (Launches Analysis Prompt)
           ├── step 7 ──> FinalReportSlide.jsx (Renders report & active recommendations)
           └── step 8 ──> P2BChatbot.jsx (Report-contextual helper chat)


🔒 Security Architecture

Security Category

Implementation Method

Functionality

Data Encryption

BCryptPasswordEncoder

Salted, one-way structural hashes protecting native passwords.

Credential Upgrades

Dynamic Re-hash Workflow

Auto-detects legacy storage configurations on login and promotes records silently.

OAuth Safeguard

Server-side Audience Token Check

Ensures incoming Google credentials match the application client identifier.

Access Control

Global CORS Config

Restricts access scopes strictly to designated local development environments.

Privacy Safeguards

Visual Overlay Barrier

Blurs application pages programmatically via CSS backdrop styling until terms are signed.

📊 Tutorial Content Categories

The dynamic system supports custom content routes structured by the backend following this categorization map:

Database Collection Name

Standard Categories Hosted

Sample IDs

Psychology_Tutorials

Clinical Psychology, Social, Cognitive, Developmental, Neuropsychology, Physiological, Abnormal

CLI-001, COG-012

Philosophy_Tutorials

Metaphysics, Epistemology, Ethics, Logic, Aesthetics, Political Philosophy

ETH-002, MET-104

Biology_Tutorials

Internal Medicine, Pediatrics, Surgery, Dermatology, Obstetrics, Botany, Zoology, Genetics

MED-040, GEN-003

🤝 Contributing

We welcome community collaborations to make P2B a more robust, scientifically accurate system!

Form Slide Modifications: All interactive form steps must register state back to App.jsx. When appending a slide, map variables to the central formData state.

Prompt Adjustments: Keep key terms intact when modifying prompt criteria in P2BGeneratorService.java to prevent parsing breaks in the React rendering slides.

NoSQL Database Updates: If adding a dynamic tutorial model, match structural nested schemas configured within Tutorial.java to ensure complete UI generation.

P2B is a living platform. The intersection of artificial intelligence, holistic somatic medicine, and cognitive philosophy makes this system a continuously evolving project.