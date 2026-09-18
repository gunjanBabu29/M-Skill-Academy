/* =========================================================================
   NEXORA SKILLS & CAREER ACADEMY — DATA LAYER
   -------------------------------------------------------------------------
   Every piece of brand information, course, trainer, testimonial and
   certificate shown on the site is defined ONCE in this file.
   Change a value here and it updates everywhere it is used.

   DEMO DATA NOTICE:
   Trainer profiles, testimonials and certificate records in this file are
   SAMPLE / PLACEHOLDER data for the frontend demo. They are clearly labelled
   as such in the UI. Before going live, replace them with real, verified
   information, and move certificate verification to a secure backend.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. SITE-WIDE STATS (factual / configurable numbers shown as counters)
   Institute identity, branding and contact details now live in
   js/config.js as the INSTITUTE object (single source of truth).
   ------------------------------------------------------------------------- */
const instituteStats = [
  { value: 5, suffix: "", label: "Skill Tracks" },
  { value: 20, suffix: "+", label: "Programs Offered" },
  { value: 11, suffix: "", label: "Month Flagship Track" },
  { value: 6, suffix: "", label: "Days a Week, Open" },
];

/* -------------------------------------------------------------------------
   2. COURSE CATEGORIES
   ------------------------------------------------------------------------- */
const categories = [
  {
    id: "communication-languages",
    name: "Communication & Languages",
    icon: "message-circle",
    description:
      "Speak with clarity and confidence — in English, in French, and in the room.",
  },
  {
    id: "career-employability",
    name: "Career & Employability",
    icon: "briefcase",
    description:
      "Interview-ready, resume-ready, workplace-ready — the practical side of getting hired.",
  },
  {
    id: "technology-programming",
    name: "Technology & Programming",
    icon: "code",
    description:
      "From your first line of code to a full-stack, production-style project.",
  },
  {
    id: "data-ai",
    name: "Data & AI",
    icon: "bar-chart-3",
    description:
      "Analytics, machine learning and applied AI, taught the way industry actually uses it.",
  },
  {
    id: "personal-development",
    name: "Personal Development",
    icon: "sprout",
    description:
      "Mindset, confidence and workplace wellbeing — the skills behind every other skill.",
  },
];

/* -------------------------------------------------------------------------
   3. LEVEL SYSTEM
   ------------------------------------------------------------------------- */
const levels = {
  FOUNDATION: { label: "Foundation", color: "var(--accent)" },
  PROFESSIONAL: { label: "Professional", color: "var(--secondary)" },
  ADVANCED: { label: "Advanced", color: "var(--warning)" },
  CAREER_PROGRAM: { label: "Career Program", color: "var(--primary)" },
};

/* -------------------------------------------------------------------------
   4. COURSE DATABASE
   Structure kept identical for every course so the UI can render any of
   them without special-casing. Fees are indicative ranges in INR.
   ------------------------------------------------------------------------- */
const courses = [
  {
    id: "spoken-english",
    title: "Spoken English & Communication Skills",
    category: "communication-languages",
    duration: "3 Months",
    durationMonths: 3,
    level: "FOUNDATION",
    feeMin: 7500,
    feeMax: 12000,
    featured: false,
    badge: "",
    description:
      "Build day-to-day fluency, correct grammar habits and the confidence to speak up — in class, in interviews and at work.",
    prerequisites: ["No prior English proficiency required"],
    skills: ["Everyday conversation", "Grammar fundamentals", "Vocabulary building", "Voice & clarity"],
    modules: [
      "Foundations of spoken grammar",
      "Vocabulary for daily & professional use",
      "Sentence construction & fluency drills",
      "Group conversation practice",
      "Presentation basics",
    ],
    projects: ["Recorded self-introduction", "Group discussion role-play"],
    assessment: ["Weekly speaking assessments", "Final fluency evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "french-language",
    title: "French Language & Communication",
    category: "communication-languages",
    duration: "6 Months",
    durationMonths: 6,
    level: "FOUNDATION",
    feeMin: 20000,
    feeMax: 28000,
    featured: false,
    badge: "",
    description:
      "A structured, conversation-first path to functional French for study, travel or work opportunities abroad.",
    prerequisites: ["No prior French knowledge required"],
    skills: ["A1–A2 level French", "Conversational practice", "Grammar & tenses", "Cultural context"],
    modules: [
      "Alphabets, sounds & greetings",
      "Everyday vocabulary & grammar",
      "Conversational practice",
      "Reading & writing basics",
      "Mock conversation assessments",
    ],
    projects: ["Self-introduction video", "Roleplay: ordering, travel, work"],
    assessment: ["Monthly oral tests", "Written evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "corporate-communication",
    title: "Corporate Communication & Professional Etiquette",
    category: "communication-languages",
    duration: "1 Month",
    durationMonths: 1,
    level: "PROFESSIONAL",
    feeMin: 3500,
    feeMax: 5000,
    featured: false,
    badge: "",
    description:
      "Email writing, meeting etiquette, professional tone and workplace communication norms for a corporate environment.",
    prerequisites: ["Basic spoken English"],
    skills: ["Business writing", "Meeting etiquette", "Professional tone", "Email communication"],
    modules: ["Professional email writing", "Meeting & call etiquette", "Workplace communication norms", "Cross-team communication"],
    projects: ["Draft a professional email chain", "Simulated meeting exercise"],
    assessment: ["Written assignments", "Roleplay evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "public-speaking",
    title: "Public Speaking & Presentation Skills",
    category: "communication-languages",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 3000,
    feeMax: 4500,
    featured: false,
    badge: "",
    description:
      "Overcome stage fear, structure a talk, and present with clarity — for classrooms, interviews and the workplace.",
    prerequisites: ["None"],
    skills: ["Stage confidence", "Talk structuring", "Voice modulation", "Slide storytelling"],
    modules: ["Overcoming stage fear", "Structuring a talk", "Voice & body language", "Presentation design basics"],
    projects: ["5-minute solo presentation", "Impromptu speaking exercise"],
    assessment: ["Peer + trainer evaluated presentations"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "business-english",
    title: "Business English",
    category: "communication-languages",
    duration: "1 Month",
    durationMonths: 1,
    level: "PROFESSIONAL",
    feeMin: 3500,
    feeMax: 5000,
    featured: false,
    badge: "",
    description:
      "English for the workplace — reports, presentations, negotiation language and professional correspondence.",
    prerequisites: ["Intermediate spoken English"],
    skills: ["Business vocabulary", "Report writing", "Negotiation language", "Professional correspondence"],
    modules: ["Business vocabulary building", "Written business communication", "Presentation English", "Negotiation phrases"],
    projects: ["Business report draft", "Mock negotiation exercise"],
    assessment: ["Written test", "Spoken assessment"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "pre-placement",
    title: "Pre-Placement & Career Readiness",
    category: "career-employability",
    duration: "1 Month",
    durationMonths: 1,
    level: "CAREER_PROGRAM",
    feeMin: 4000,
    feeMax: 5500,
    featured: false,
    badge: "",
    description:
      "A focused, exam-season-friendly program covering aptitude, GD, resume and interview basics before you start applying.",
    prerequisites: ["Final-year students or recent graduates"],
    skills: ["Aptitude basics", "Group discussion", "Resume writing", "Interview readiness"],
    modules: ["Quantitative & logical aptitude", "Group discussion practice", "Resume building", "Mock interviews"],
    projects: ["Personal resume draft", "Recorded mock interview"],
    assessment: ["Aptitude test", "Mock interview scorecard"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "interview-preparation",
    title: "Interview Preparation",
    category: "career-employability",
    duration: "1 Month",
    durationMonths: 1,
    level: "CAREER_PROGRAM",
    feeMin: 3000,
    feeMax: 4500,
    featured: false,
    badge: "",
    description:
      "Structured mock interviews, common question banks and feedback loops to walk into interviews prepared.",
    prerequisites: ["None"],
    skills: ["Answering frameworks (STAR)", "Body language", "Domain Q&A prep", "Salary conversation basics"],
    modules: ["Interview structure & etiquette", "STAR-method answers", "Technical/HR mock rounds", "Feedback & improvement"],
    projects: ["3 recorded mock interviews"],
    assessment: ["Trainer feedback on each mock round"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "resume-linkedin",
    title: "Resume & LinkedIn Development",
    category: "career-employability",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2500,
    feeMax: 4000,
    featured: false,
    badge: "",
    description:
      "Build a resume and LinkedIn profile that clearly communicate your skills and projects to recruiters.",
    prerequisites: ["None"],
    skills: ["Resume structuring", "ATS-friendly formatting", "LinkedIn optimization", "Personal branding basics"],
    modules: ["Resume content & structure", "Formatting for ATS", "LinkedIn profile optimization", "Personal branding"],
    projects: ["Final resume", "Optimized LinkedIn profile"],
    assessment: ["Resume review checklist"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "aptitude-reasoning",
    title: "Aptitude & Logical Reasoning",
    category: "career-employability",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2500,
    feeMax: 4000,
    featured: false,
    badge: "",
    description:
      "Quantitative aptitude, logical reasoning and verbal ability practice for placement and entrance exams.",
    prerequisites: ["Basic mathematics"],
    skills: ["Quantitative aptitude", "Logical reasoning", "Verbal ability", "Time management in tests"],
    modules: ["Number systems & arithmetic", "Logical reasoning patterns", "Verbal ability", "Timed mock tests"],
    projects: ["Practice test portfolio"],
    assessment: ["Weekly timed mock tests"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "gd-public-speaking",
    title: "Group Discussion & Public Speaking",
    category: "career-employability",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2500,
    feeMax: 4000,
    featured: false,
    badge: "",
    description:
      "Practice structured group discussions and public speaking scenarios common in placement processes.",
    prerequisites: ["None"],
    skills: ["GD structuring", "Active listening", "Assertive communication", "Group dynamics"],
    modules: ["GD etiquette & structure", "Current affairs practice", "Mock group discussions", "Feedback sessions"],
    projects: ["Participation in 5+ mock GDs"],
    assessment: ["Peer & trainer evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "workplace-skills",
    title: "Workplace Skills",
    category: "career-employability",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2500,
    feeMax: 4000,
    featured: false,
    badge: "",
    description:
      "The everyday professional skills that don't get taught in college — teamwork, time management, workplace tools.",
    prerequisites: ["None"],
    skills: ["Time management", "Teamwork", "Workplace tools", "Professional conduct"],
    modules: ["Workplace etiquette", "Collaboration & teamwork", "Time & task management", "Common office tools"],
    projects: ["Team task simulation"],
    assessment: ["Participation & task evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "corporate-readiness",
    title: "Corporate Readiness",
    category: "career-employability",
    duration: "1 Month",
    durationMonths: 1,
    level: "CAREER_PROGRAM",
    feeMin: 3500,
    feeMax: 5000,
    featured: false,
    badge: "",
    description:
      "A capstone readiness module combining communication, etiquette and workplace behaviour before joining a company.",
    prerequisites: ["Completion of any Career track course recommended"],
    skills: ["Professional conduct", "Workplace communication", "Adaptability", "Feedback handling"],
    modules: ["Corporate culture & conduct", "Communication in teams", "Handling feedback", "First-90-days planning"],
    projects: ["Personal onboarding plan"],
    assessment: ["Final readiness evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "python-programming",
    title: "Python Programming",
    category: "technology-programming",
    duration: "3 Months",
    durationMonths: 3,
    level: "FOUNDATION",
    feeMin: 9000,
    feeMax: 14000,
    featured: false,
    badge: "",
    description:
      "A hands-on introduction to programming using Python — logic, syntax and small real projects, no prior coding needed.",
    prerequisites: ["No prior programming experience required"],
    skills: ["Python syntax", "Control flow", "Functions", "Data structures", "File handling"],
    modules: ["Python basics & syntax", "Control flow & loops", "Functions & modules", "Data structures", "Mini projects"],
    projects: ["Expense tracker", "Number guessing game", "File-based contact book"],
    assessment: ["Weekly coding tests", "Final project evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "advanced-python",
    title: "Advanced Python",
    category: "technology-programming",
    duration: "3 Months",
    durationMonths: 3,
    level: "ADVANCED",
    feeMin: 12000,
    feeMax: 18000,
    featured: false,
    badge: "",
    description:
      "OOP, file & exception handling, working with APIs and libraries — Python skills that carry into data and web tracks.",
    prerequisites: ["Python Programming (Foundation) or equivalent"],
    skills: ["OOP in Python", "Exception handling", "Working with APIs", "Virtual environments", "Package management"],
    modules: ["Object-oriented Python", "Exception & file handling", "Working with external APIs", "Intro to automation scripts"],
    projects: ["Automation script", "API-based data fetcher"],
    assessment: ["Coding assignments", "Final applied project"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "sql-database",
    title: "SQL & Database Management",
    category: "technology-programming",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 4000,
    feeMax: 6000,
    featured: false,
    badge: "",
    description:
      "Query, join and manage relational databases — a core skill for both software and data roles.",
    prerequisites: ["Basic computer literacy"],
    skills: ["SQL queries", "Joins & subqueries", "Database design basics", "Aggregation & grouping"],
    modules: ["SQL fundamentals", "Joins & relationships", "Aggregate functions", "Database design basics"],
    projects: ["Query a sample business database"],
    assessment: ["Practical query assessments"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "programming-fundamentals",
    title: "Programming Fundamentals",
    category: "technology-programming",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2500,
    feeMax: 4000,
    featured: false,
    badge: "",
    description:
      "Core computational thinking and logic building for absolute beginners before choosing a specific language track.",
    prerequisites: ["None"],
    skills: ["Computational thinking", "Flowcharts & pseudocode", "Basic logic building"],
    modules: ["Computational thinking", "Flowcharts & algorithms", "Intro to a programming language", "Practice problems"],
    projects: ["Logic-building problem set"],
    assessment: ["Logic assessment test"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "ai-tools-genai",
    title: "AI Tools & Generative AI",
    category: "technology-programming",
    duration: "1 Month",
    durationMonths: 1,
    level: "PROFESSIONAL",
    feeMin: 4500,
    feeMax: 6500,
    featured: false,
    badge: "",
    description:
      "Practical, responsible use of modern AI tools for study, work and everyday productivity.",
    prerequisites: ["Basic computer literacy"],
    skills: ["Prompting techniques", "AI writing tools", "AI for productivity", "Responsible AI use"],
    modules: ["Understanding generative AI", "Prompting techniques", "AI tools for work & study", "Limitations & responsible use"],
    projects: ["AI-assisted project or report"],
    assessment: ["Applied task evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "full-stack-web-development",
    title: "Full-Stack Web Development",
    category: "technology-programming",
    duration: "6 Months",
    durationMonths: 6,
    level: "PROFESSIONAL",
    feeMin: 30000,
    feeMax: 40000,
    featured: true,
    badge: "Flagship",
    description:
      "Go from HTML basics to building and deploying a complete web application — front end, back end and database.",
    prerequisites: ["Basic computer literacy; no prior coding required"],
    skills: ["HTML, CSS, JavaScript", "A backend framework", "Databases", "Git & deployment", "API integration"],
    modules: [
      "HTML, CSS & responsive design",
      "JavaScript fundamentals",
      "Backend development basics",
      "Databases & SQL",
      "APIs & integration",
      "Git, deployment & capstone project",
    ],
    projects: ["E-commerce website", "Booking system", "Institute management system"],
    assessment: ["Module tests", "Capstone project evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "data-analytics",
    title: "Professional Data Analytics",
    category: "data-ai",
    duration: "6 Months",
    durationMonths: 6,
    level: "PROFESSIONAL",
    feeMin: 30000,
    feeMax: 40000,
    featured: true,
    badge: "Flagship",
    description:
      "Excel, SQL, Python and BI tools to clean, analyse and present data the way analytics teams actually work.",
    prerequisites: ["Basic computer literacy; comfort with numbers"],
    skills: ["Excel for analytics", "SQL", "Python for data", "Data visualization", "Business dashboards"],
    modules: [
      "Excel for data analysis",
      "SQL for analytics",
      "Python for data analysis",
      "Data cleaning & visualization",
      "Dashboarding & BI tools",
      "Capstone analytics project",
    ],
    projects: ["Sales dashboard", "HR analytics", "E-commerce analytics"],
    assessment: ["Module assessments", "Final dashboard project"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "data-visualization-bi",
    title: "Data Visualization & Business Intelligence",
    category: "data-ai",
    duration: "3 Months",
    durationMonths: 3,
    level: "PROFESSIONAL",
    feeMin: 15000,
    feeMax: 20000,
    featured: false,
    badge: "",
    description:
      "Turn raw data into clear, decision-ready dashboards using modern BI and visualization practice.",
    prerequisites: ["Basic Excel or spreadsheet familiarity"],
    skills: ["Chart design principles", "BI dashboarding", "Data storytelling", "KPI design"],
    modules: ["Principles of data visualization", "Dashboard design", "BI tool practice", "Storytelling with data"],
    projects: ["Business KPI dashboard"],
    assessment: ["Dashboard review & presentation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "data-science-ml",
    title: "Data Science & Machine Learning",
    category: "data-ai",
    duration: "11 Months",
    durationMonths: 11,
    level: "CAREER_PROGRAM",
    feeMin: 49999,
    feeMax: 75000,
    launchFee: 49999,
    regularFeeMin: 65000,
    regularFeeMax: 75000,
    featured: true,
    badge: "Flagship",
    description:
      "The institute's flagship 11-month career program — from Python foundations to deployed machine learning and generative AI projects, ending in a capstone and career preparation.",
    prerequisites: ["Basic computer literacy; comfort with mathematics is helpful"],
    skills: [
      "Python & statistics",
      "NumPy, Pandas",
      "SQL",
      "Machine learning",
      "Deep learning",
      "NLP & generative AI",
      "Deployment & Git",
    ],
    modules: [
      "Month 1 — Python Foundation",
      "Month 2 — Statistics & Probability",
      "Month 3 — NumPy, Pandas & Advanced Python",
      "Month 4 — Data Cleaning & Visualization",
      "Month 5 — SQL",
      "Month 6 — Machine Learning",
      "Month 7 — Advanced Machine Learning",
      "Month 8 — Deep Learning",
      "Month 9 — NLP & Generative AI",
      "Month 10 — Deployment, Git & APIs",
      "Month 11 — Capstone Project & Career Preparation",
    ],
    projects: ["Customer churn prediction", "House price prediction", "Recommendation system", "Capstone project"],
    assessment: ["Monthly module assessments", "Capstone project evaluation", "Career readiness review"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    category: "data-ai",
    duration: "3 Months",
    durationMonths: 3,
    level: "ADVANCED",
    feeMin: 18000,
    feeMax: 25000,
    featured: false,
    badge: "",
    description:
      "Core supervised and unsupervised learning algorithms, model evaluation and applied projects.",
    prerequisites: ["Python Programming and basic statistics"],
    skills: ["Supervised learning", "Unsupervised learning", "Model evaluation", "Scikit-learn"],
    modules: ["ML foundations", "Supervised learning algorithms", "Unsupervised learning", "Model evaluation & tuning"],
    projects: ["Prediction model project"],
    assessment: ["Assignments", "Final model project"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "ai-generative-ai",
    title: "AI & Generative AI",
    category: "data-ai",
    duration: "3 Months",
    durationMonths: 3,
    level: "ADVANCED",
    feeMin: 18000,
    feeMax: 25000,
    featured: false,
    badge: "",
    description:
      "Applied AI concepts, large language models and generative AI tools with a project-based approach.",
    prerequisites: ["Python Programming recommended"],
    skills: ["AI fundamentals", "LLM concepts", "Prompt engineering", "Applied GenAI projects"],
    modules: ["AI & ML foundations", "Understanding LLMs", "Prompt engineering", "Applied generative AI project"],
    projects: ["GenAI-powered mini application"],
    assessment: ["Project evaluation"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "personal-development-life-skills",
    title: "Personal Development & Life Skills",
    category: "personal-development",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2500,
    feeMax: 4000,
    featured: false,
    badge: "",
    description:
      "Practical life skills, confidence building and mindset training to support personal and career growth.",
    prerequisites: ["None"],
    skills: ["Self-confidence", "Goal setting", "Communication", "Emotional awareness basics"],
    modules: ["Self-awareness & confidence", "Goal setting frameworks", "Communication in daily life", "Building positive habits"],
    projects: ["Personal goal plan"],
    assessment: ["Reflection assignments"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "confidence-building",
    title: "Confidence Building",
    category: "personal-development",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2000,
    feeMax: 3000,
    featured: false,
    badge: "",
    description:
      "Structured practice and feedback to build genuine, situation-tested self-confidence.",
    prerequisites: ["None"],
    skills: ["Self-expression", "Handling criticism", "Assertiveness", "Comfort with public settings"],
    modules: ["Understanding confidence", "Practice in group settings", "Handling feedback & criticism", "Assertive communication"],
    projects: ["Group activity participation log"],
    assessment: ["Trainer observation & feedback"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "mindset-growth",
    title: "Motivation, Mindset & Personal Growth",
    category: "personal-development",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2000,
    feeMax: 3000,
    featured: false,
    badge: "",
    description:
      "Practical frameworks for motivation, growth mindset and consistency in personal and academic life.",
    prerequisites: ["None"],
    skills: ["Growth mindset", "Habit building", "Motivation frameworks", "Self-reflection"],
    modules: ["Understanding mindset", "Motivation frameworks", "Habit formation", "Self-reflection practice"],
    projects: ["30-day habit tracker"],
    assessment: ["Reflection journal review"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "goal-setting-time-management",
    title: "Goal Setting & Time Management",
    category: "personal-development",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2000,
    feeMax: 3000,
    featured: false,
    badge: "",
    description:
      "Practical planning tools and time-management systems for students and working professionals.",
    prerequisites: ["None"],
    skills: ["SMART goals", "Prioritization", "Time-blocking", "Productivity systems"],
    modules: ["Goal-setting frameworks", "Prioritization techniques", "Time-blocking & planning tools", "Review & consistency"],
    projects: ["Personal 90-day plan"],
    assessment: ["Plan review"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "personality-development",
    title: "Personality Development",
    category: "personal-development",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2500,
    feeMax: 4000,
    featured: false,
    badge: "",
    description:
      "Grooming, etiquette, communication and interpersonal skills for a well-rounded professional presence.",
    prerequisites: ["None"],
    skills: ["Interpersonal skills", "Etiquette", "Communication style", "Professional presence"],
    modules: ["Self-presentation & etiquette", "Interpersonal communication", "Body language", "Professional presence"],
    projects: ["Self-presentation exercise"],
    assessment: ["Trainer feedback"],
    certificate: "Institute-issued Certificate of Completion",
  },
  {
    id: "workplace-wellbeing",
    title: "Workplace Wellbeing",
    category: "personal-development",
    duration: "1 Month",
    durationMonths: 1,
    level: "FOUNDATION",
    feeMin: 2000,
    feeMax: 3000,
    featured: false,
    badge: "",
    description:
      "Practical habits for managing stress, workload and balance as you enter or navigate a workplace.",
    prerequisites: ["None"],
    skills: ["Stress management basics", "Work-life balance", "Communication under pressure", "Healthy routines"],
    modules: ["Understanding workplace stress", "Balance & routines", "Communication under pressure", "Building support systems"],
    projects: ["Personal wellbeing plan"],
    assessment: ["Reflection assignment"],
    certificate: "Institute-issued Certificate of Completion",
  },
];

// Flagship program: extended fee display fields for Data Science & ML
const flagshipHighlights = ["data-analytics", "data-science-ml", "full-stack-web-development", "python-programming-professional"];

/* -------------------------------------------------------------------------
   5. DATA SCIENCE PROGRAM ROADMAP (11 months)
   ------------------------------------------------------------------------- */
const dataScienceRoadmap = [
  { stage: 1, title: "Python Foundation", detail: "Syntax, logic, data types and problem solving in Python." },
  { stage: 2, title: "Statistics & Probability", detail: "The statistical foundation every data role depends on." },
  { stage: 3, title: "NumPy, Pandas & Advanced Python", detail: "Working efficiently with real, messy datasets." },
  { stage: 4, title: "Data Cleaning & Visualization", detail: "Turning raw data into clean, readable insight." },
  { stage: 5, title: "SQL", detail: "Querying and managing data at the database level." },
  { stage: 6, title: "Machine Learning", detail: "Core supervised & unsupervised learning algorithms." },
  { stage: 7, title: "Advanced Machine Learning", detail: "Model tuning, ensembling and evaluation in depth." },
  { stage: 8, title: "Deep Learning", detail: "Neural networks and their practical applications." },
  { stage: 9, title: "NLP + Generative AI", detail: "Language models, text data and applied GenAI." },
  { stage: 10, title: "Deployment + Git + APIs", detail: "Shipping a model as a usable, version-controlled product." },
  { stage: 11, title: "Capstone Project + Career Preparation", detail: "A portfolio capstone plus resume, LinkedIn and interview prep." },
];

/* -------------------------------------------------------------------------
   6. LEARNING METHODOLOGY
   ------------------------------------------------------------------------- */
const methodology = [
  { step: 1, title: "Learn", detail: "Concepts explained clearly, in small batches, at a pace that sticks." },
  { step: 2, title: "Practice", detail: "Guided exercises that build muscle memory before independence." },
  { step: 3, title: "Solve", detail: "Real-world style problems that mirror what the skill is actually used for." },
  { step: 4, title: "Build", detail: "Portfolio projects you can show, not just describe." },
  { step: 5, title: "Prepare", detail: "Resume, LinkedIn and interview preparation tied to what you built." },
];

/* -------------------------------------------------------------------------
   7. CAREER SUPPORT FLOW
   ------------------------------------------------------------------------- */
const careerSupportFlow = [
  "Skill Assessment",
  "Training",
  "Projects",
  "Resume",
  "LinkedIn",
  "Mock Interview",
  "Career Guidance",
];

const careerSupportServices = [
  "Resume building",
  "LinkedIn optimization",
  "Mock interviews",
  "Group discussion preparation",
  "Communication coaching",
  "Interview preparation",
  "Portfolio building",
  "Job search guidance",
];

/* -------------------------------------------------------------------------
   8. WHY CHOOSE US
   ------------------------------------------------------------------------- */
const whyChooseUs = [
  { icon: "target", title: "Practical First", detail: "Every module is built around doing, not just watching." },
  { icon: "users", title: "Small Batches", detail: "Enough room for the trainer to actually know your name." },
  { icon: "layers", title: "Project-Based Learning", detail: "You leave with work you can show, not just notes." },
  { icon: "briefcase", title: "Industry-Oriented Curriculum", detail: "Built around what roles in the field actually need." },
  { icon: "user-check", title: "Personal Attention", detail: "Doubt-clearing and feedback built into every session." },
  { icon: "compass", title: "Career Readiness", detail: "Skills paired with resume, interview and communication prep." },
  { icon: "clipboard-check", title: "Assessment-Based Learning", detail: "Progress is measured, not assumed." },
  { icon: "shield-check", title: "Certificate Verification", detail: "Every certificate issued can be checked with an ID." },
];

/* -------------------------------------------------------------------------
   9. TRUST BAR
   ------------------------------------------------------------------------- */
const trustBar = [
  { icon: "hammer", label: "Practical Learning" },
  { icon: "users", label: "Small Batch Training" },
  { icon: "graduation-cap", label: "Experienced Trainers" },
  { icon: "layers", label: "Project Based Education" },
  { icon: "clipboard-check", label: "Assessment Based Certification" },
  { icon: "compass", label: "Career Guidance" },
];

/* -------------------------------------------------------------------------
   10. PROJECT SHOWCASE
   ------------------------------------------------------------------------- */
const projects = [
  { id: "sales-dashboard", title: "Sales Dashboard", category: "Data Analytics", tech: "Excel, SQL, Power BI", description: "An interactive dashboard tracking regional sales performance and trends." },
  { id: "hr-analytics", title: "HR Analytics", category: "Data Analytics", tech: "SQL, Python, Dashboards", description: "Attrition and workforce analysis for a simulated HR dataset." },
  { id: "ecommerce-analytics", title: "E-commerce Analytics", category: "Data Analytics", tech: "SQL, Excel, Python", description: "Customer and order analysis for a sample online store." },
  { id: "churn-prediction", title: "Customer Churn Prediction", category: "Data Science", tech: "Python, Scikit-learn", description: "A classification model predicting which customers are likely to churn." },
  { id: "house-price-prediction", title: "House Price Prediction", category: "Data Science", tech: "Python, Regression", description: "A regression model estimating property prices from listing features." },
  { id: "recommendation-system", title: "Recommendation System", category: "Data Science", tech: "Python, ML", description: "A content-based recommender built on a sample product catalogue." },
  { id: "ecommerce-website", title: "E-commerce Website", category: "Web Development", tech: "HTML, CSS, JS, Backend", description: "A full-stack storefront with product listings and a cart flow." },
  { id: "booking-system", title: "Booking System", category: "Web Development", tech: "Full-Stack", description: "An appointment/booking application with a database-backed schedule." },
  { id: "institute-management", title: "Institute Management System", category: "Web Development", tech: "Full-Stack", description: "A student and course management system built as a capstone project." },
  { id: "expense-tracker", title: "Expense Tracker", category: "Python", tech: "Python", description: "A command-line and file-based tool for tracking personal expenses." },
  { id: "student-management", title: "Student Management System", category: "Python", tech: "Python", description: "A Python application to manage student records and grades." },
  { id: "automation-tool", title: "Automation Tool", category: "Python", tech: "Python", description: "A script that automates a repetitive, real-world file or data task." },
];

/* -------------------------------------------------------------------------
   11. TRAINERS  — Sample Faculty Profiles
   Clearly labelled as sample data until real faculty details are supplied.
   ------------------------------------------------------------------------- */
const trainers = [
  { id: "t1", name: "Ananya Sharma", designation: "Lead Trainer — Data & AI", expertise: "Data Analytics, Machine Learning", experience: "Sample profile", bio: "Focuses on making statistics and ML intuitive through real datasets and projects.", sample: true },
  { id: "t2", name: "Rohit Malhotra", designation: "Lead Trainer — Technology", expertise: "Python, Full-Stack Development", experience: "Sample profile", bio: "Believes the fastest way to learn to code is to build something that breaks, then fix it.", sample: true },
  { id: "t3", name: "Priya Nair", designation: "Lead Trainer — Communication", expertise: "Spoken English, Corporate Communication", experience: "Sample profile", bio: "Runs sessions around real conversation practice rather than grammar drills alone.", sample: true },
  { id: "t4", name: "Karan Mehta", designation: "Career Coach", expertise: "Interview Prep, Resume & LinkedIn", experience: "Sample profile", bio: "Works with students on translating classroom skills into interview-ready stories.", sample: true },
  { id: "t5", name: "Gunjan Kumar (Tech)", designation: "Trainer — Technology & Programming", expertise: "Python, Full-Stack Web Development", experience: "Faculty", bio: "Teaches programming through hands-on builds, focused on writing clean, working code from day one.", sample: false },
];

/* -------------------------------------------------------------------------
   12. TESTIMONIALS — Sample Student Testimonials
   ------------------------------------------------------------------------- */
const testimonials = [
  { id: "ts1", quote: "The project-based approach meant I actually had something to show in interviews, not just a certificate.", name: "Sample Student", course: "Professional Data Analytics", type: "Sample Student Testimonial" },
  { id: "ts2", quote: "Small batches made a real difference — the trainer knew exactly where each of us was stuck.", name: "Sample Student", course: "Full-Stack Web Development", type: "Sample Student Testimonial" },
  { id: "ts3", quote: "I came in nervous about speaking in groups. The practice sessions genuinely built that confidence.", name: "Sample Student", course: "Spoken English & Communication Skills", type: "Sample Student Testimonial" },
  { id: "ts4", quote: "The mock interviews before placement season were the most useful part of the entire program.", name: "Sample Student", course: "Pre-Placement & Career Readiness", type: "Sample Student Testimonial" },
];

/* -------------------------------------------------------------------------
   13. FAQ
   ------------------------------------------------------------------------- */
const faqs = [
  { q: "Who can join the courses?", a: "Students, graduates and working professionals looking to build practical skills can join. Each course page lists any specific prerequisites." },
  { q: "Do I need prior programming knowledge?", a: "No — our foundation-level Technology and Data courses are designed for beginners. Advanced courses list prerequisites clearly on their course page." },
  { q: "Are classes offline?", a: "Yes, all current batches are conducted offline at our Jaipur classroom for hands-on, in-person learning." },
  { q: "What is the batch size?", a: "We intentionally keep batches small so trainers can give individual attention and feedback." },
  { q: "Do students receive certificates?", a: "Yes — students who complete the assessment requirements of a course receive an institute-issued Certificate of Completion, which can be verified using a certificate ID." },
  { q: "How are students assessed?", a: "Through a mix of module tests, assignments, projects and, for career-track programs, mock interviews and capstone evaluations." },
  { q: "Is placement guaranteed?", a: "No program guarantees placement. We provide structured career assistance — resume building, mock interviews, LinkedIn optimization and job search guidance — to support your search." },
  { q: "Do you provide career assistance?", a: "Yes, career assistance is built into our Career & Employability track and into the flagship programs' final modules." },
  { q: "Can I attend a demo class?", a: "Yes — use the enquiry form or contact us directly to arrange a demo session for most courses." },
  { q: "Can I pay course fees in installments?", a: "Installment options are available for longer programs. Please discuss this during your counselling session." },
  { q: "Are short-term courses available?", a: "Yes, we offer 1-month and 3-month short-term courses alongside our 6 and 11-month professional programs." },
  { q: "Can I switch batches?", a: "Batch changes are possible subject to availability — speak with our counselling team to arrange this." },
];

/* -------------------------------------------------------------------------
   14. CERTIFICATE VERIFICATION — FRONTEND DEMO DATA ONLY
   -------------------------------------------------------------------------
   IMPORTANT: This is sample data for demonstrating the certificate
   verification UI only. It must be replaced with a secure backend /
   database lookup before real certificate IDs are issued or shared
   publicly. Do not store real student personal information here.
   ------------------------------------------------------------------------- */
const certificates = (function () {
  // Reads INSTITUTE.certificatePrefix from js/config.js (loaded earlier),
  // so changing the prefix there automatically updates every sample ID
  // below, and the "try a sample ID" buttons on the verify page (which
  // are generated from these keys — see js/certificate.js).
  const prefix = (typeof INSTITUTE !== "undefined" && INSTITUTE.certificatePrefix) || "NSA";
  const records = {};
  records[`${prefix}-DA-26-00142`] = {
    student: "Sample Student",
    course: "Professional Data Analytics",
    duration: "6 Months",
    issueDate: "15 September 2026",
    status: "Valid",
  };
  records[`${prefix}-FS-26-00087`] = {
    student: "Sample Student",
    course: "Full-Stack Web Development",
    duration: "6 Months",
    issueDate: "02 August 2026",
    status: "Valid",
  };
  records[`${prefix}-PY-26-00231`] = {
    student: "Sample Student",
    course: "Python Programming",
    duration: "3 Months",
    issueDate: "20 June 2026",
    status: "Valid",
  };
  return records;
})();
