export const ME = {
  name: "Aahana Bobade",
  role: "Junior Software Developer @ EduVanceAI",
  location: "India 🇮🇳",
  email: "aahanabobade@gmail.com",
  phone: "9833588502",
  dob: "28th August 2003",
  bio: "I live at the crossroads of backend engineering, AI/ML, and data science. I build systems that aren't just functional but genuinely intelligent and scalable. I make data stories that non-data people actually get.",
  bio2:"Hi, Aahana on this side! I am an aspiring computer engineer and am curious to learn new things about life every day! Perfection is something I always aim for. Being big on integrity and authenticity is something I always believe in. I enjoy painting, photography, designing, and editing. Growing up, I have always loved spending quality time making music on the keyboard. Glad to see you, cheers! " ,
  links: {
    github:    "https://github.com/aahanabobade",
    linkedin:  "https://www.linkedin.com/in/aahana-bobade",
    medium:    "https://medium.com/@aahanabobade",
    tableau:   "https://public.tableau.com/app/profile/aahana.bobade/vizzes",
    youtube:   "https://www.youtube.com/@aahanabobade",
    instagram: "https://www.instagram.com/aahanabobade1",
    leetcode:  "https://leetcode.com/u/aahanabobade/",
  },
};

export const TYPEWRITER_LINES = [
  "Building intelligent backend systems 🚀",
  "Turning data into decisions 🧠",
  "Exploring LLMs & RAG pipelines 🤖",
  "Always learning, always shipping ✨",
  "Passionate about AI & Data Science 💜",
];

export const FILES = [
  { id: "home",       name: "home.tsx",                  folder: "src",  lang: "TypeScript React" },
  { id: "about",      name: "about.html",                folder: "src",  lang: "HTML"             },
  { id: "projects",   name: "projects.js",               folder: "src",  lang: "JavaScript"       },
  { id: "skills",     name: "skills.json",               folder: "data", lang: "JSON"             },
  { id: "experience", name: "experience.ts",             folder: "src",  lang: "TypeScript"       },
  { id: "contact",    name: "contact.css",               folder: "src",  lang: "CSS"              },
  { id: "readme",     name: "README.md",                 folder: "root", lang: "Markdown"         },
  { id: "resume",     name: "Aahana_Bobade_Resume.pdf",  folder: "root", lang: "PDF", download: true },
];

export const EDUCATION = [
  {
    id: 1,
    institution: "SIES Graduate School of Technology",
    university: "University of Mumbai",
    degree: "Bachelor of Engineering in Computer Engineering",
    minor: "Minors: Artificial Intelligence & Machine Learning (AI/ML)",
    gpa: "GPA: 9.28",
    period: "2021 – 2025",
    location: "Navi Mumbai, MH",
    icon: "🎓",
  },
  {
    id: 2,
    institution: "New Horizon Public School, Airoli",
    degree: "Higher Secondary Education",
    gpa: "Class 12th: 89.6%  |  Class 10th: 91.8%",
    period: "2007 – 2021",
    location: "Airoli, MH",
    icon: "🏫",
  },
];

export const PROJECTS = [
  {
    id: 1, icon: "🛡️", accent: "#ff6fd8",
    type: "Mobile · AI · Safety Tech",
    name: "Safe Yatra – Women's Safety App",
    desc: "Mobile app with 100% route tracking and voice-triggered emergency alerts. Integrated TensorFlow.js for voice emotion recognition with 70% distress detection accuracy. Won 1st Prize at SIES GST Innovations 2025.",
    tags: ["TensorFlow.js", "Python", "React Native", "NLP", "Voice AI"],
    link: "https://github.com/aahanabobade/Women-safety-app",
    period: "Aug 2024 – Apr 2025",
  },
  {
    id: 2, icon: "🧠", accent: "#6c63ff",
    type: "AI · GraphRAG · Full Stack",
    name: "OrgMind - Company Intelligence Assistant",
    desc: "Hybrid GraphRAG system combining Neo4j knowledge graph traversal with Pinecone vector search. Answers org questions standard RAG can't , like 'Who owns this project and what have they written about security?' Built with FastAPI, React, and GPT-4o.",
    tags: ["Neo4j", "Pinecone", "GPT-4o", "FastAPI", "React", "LangChain", "GraphRAG"],
    link: "https://github.com/aahanabobade/OrgMind",
    demo: "https://orgmind.vercel.app/",
    period: "Feb 2026",
  },

  {
    id: 3, icon: "🕉️", accent: "#4ec9b0",
    type: "Full Stack · NLP · GenAI",
    name: "Gita-GPT",
    desc: "Web app that suggests Bhagavad Gita verses based on user emotion. Integrated Hume AI for empathetic chatbot support , boosted engagement by 60%. Won 1st Prize at Cognition Technical Fest 2023.",
    tags: ["TypeScript", "Hume AI", "LangChain", "NLP", "Next.js"],
    link: "https://github.com/aahanabobade/gita-gpt",
    period: "Aug 2023 – May 2024",
  },
  {
    id: 3, icon: "⚡", accent: "#4fc1ff",
    type: "Backend · API · ML",
    name: "Smart Resource Tracker",
    desc: "LRU Cache with TTL, eviction metrics, FastAPI backend, and React frontend. Production-grade resource management system with real-time monitoring.",
    tags: ["FastAPI", "React", "JavaScript", "Python", "LRU Cache"],
    link: "https://github.com/aahanabobade/smart-resource-tracker",
    period: "Jan 2025",
  },
  {
    id: 4, icon: "🐳", accent: "#c586c0",
    type: "MLOps · Docker · API",
    name: "Dockerized ML Prediction API",
    desc: "Containerized ML model serving with FastAPI and Docker. Demonstrates production MLOps patterns: clean REST API, containerization, and ML inference pipelines.",
    tags: ["Docker", "FastAPI", "Python", "MLOps", "scikit-learn"],
    link: "https://github.com/aahanabobade/Dockerized-ML-Prediction-API",
    period: "2025",
  },
  {
    id: 5, icon: "🤖", accent: "#f7df1e",
    type: "TypeScript · DevTools · AI",
    name: "AI Code Review Bot",
    desc: "Automated AI-powered code review bot built in TypeScript. Integrates into developer workflows to provide intelligent, context-aware code feedback.",
    tags: ["TypeScript", "AI", "DevTools", "Automation"],
    link: "https://github.com/aahanabobade/ai-code-review-bot",
    period: "2025",
  },
  {
    id: 6, icon: "📡", accent: "#ff9d4b",
    type: "Monitoring · HTML · DevOps",
    name: "API Health Monitor",
    desc: "Lightweight API health monitoring dashboard. Tracks endpoint availability, response times, and status codes , giving developers real-time visibility into their services.",
    tags: ["HTML", "JavaScript", "DevOps", "Monitoring"],
    link: "https://github.com/aahanabobade/api-health-monitor",
    period: "Jan 2025",
  },
];

export const SKILLS = [
  {
    group: "Languages",
    items: [
      { name: "Python", pct: 92, color: "#ff6fd8" },
      { name: "Java", pct: 72, color: "#f97316" },
      { name: "JavaScript", pct: 78, color: "#facc15" },
      { name: "TypeScript", pct: 74, color: "#38bdf8" },
      { name: "SQL", pct: 88, color: "#a855f7" },
    ],
  },

  {
    group: "Generative AI & LLM Engineering",
    items: [
      { name: "LangChain", pct: 82, color: "#34d399" },
      { name: "LangGraph", pct: 78, color: "#22c55e" },
      { name: "RAG Pipelines", pct: 85, color: "#38bdf8" },
      { name: "Prompt Engineering", pct: 90, color: "#fbbf24" },
      { name: "Agentic Workflows", pct: 80, color: "#a855f7" },
      { name: "Hugging Face Transformers", pct: 83, color: "#f97316" },
    ],
  },

  {
    group: "AI · ML · Data Science",
    items: [
      { name: "PyTorch", pct: 85, color: "#ef4444" },
      { name: "TensorFlow", pct: 80, color: "#f97316" },
      { name: "scikit-learn", pct: 90, color: "#facc15" },
      { name: "Pandas", pct: 88, color: "#6366f1" },
      { name: "NumPy", pct: 86, color: "#38bdf8" },
      { name: "spaCy", pct: 80, color: "#22c55e" },
      { name: "NLTK", pct: 75, color: "#6366f1" },
    ],
  },

  {
    group: "Backend & APIs",
    items: [
      { name: "FastAPI", pct: 90, color: "#34d399" },
      { name: "Flask", pct: 82, color: "#6366f1" },
      { name: "Django", pct: 76, color: "#22c55e" },
    ],
  },

  {
    group: "Databases",
    items: [
      { name: "PostgreSQL", pct: 85, color: "#38bdf8" },
      { name: "Redis", pct: 72, color: "#ef4444" },
      { name: "Neo4j", pct: 80, color: "#4cceb4" },
    ],
  },

  {
    group: "Vector Databases",
    items: [
      { name: "FAISS", pct: 82, color: "#38bdf8" },
      { name: "Pinecone", pct: 78, color: "#a855f7" },
    ],
  },

  {
    group: "DevOps & Tools",
    items: [
      { name: "Docker", pct: 80, color: "#38bdf8" },
      { name: "Git", pct: 90, color: "#f97316" },
      { name: "Linux", pct: 88, color: "#facc15" },
      { name: "AWS", pct: 74, color: "#f97316" },
      { name: "GitHub Actions", pct: 80, color: "#6366f1" },
      { name: "Jupyter", pct: 85, color: "#ff6fd8" },
    ],
  },

  {
    group: "Frontend",
    items: [
      { name: "React", pct: 80, color: "#38bdf8" },
      { name: "Next.js", pct: 72, color: "#a855f7" },
      { name: "TailwindCSS", pct: 85, color: "#34d399" },
      { name: "Responsive Design", pct: 88, color: "#22c55e" },
    ],
  },

  {
    group: "Design",
    items: [
      { name: "Figma", pct: 78, color: "#a855f7" },
      { name: "UX Prototyping", pct: 75, color: "#34d399" },
    ],
  },


  {
    group: "Data Analytics",
    items: [
      { name: "Tableau", pct: 72, color: "#f97316" },
      { name: "Power BI", pct: 74, color: "#facc15" },
    ],
  },
];

export const PILLS = [
  "Pandas", "NumPy", "Matplotlib", "spaCy", "NLTK", "Jupyter",
  "RAG", "FAISS", "Pinecone", "LangGraph", "OpenAI API",
  "Tableau", "Power BI", "Figma", "JIRA",
  "MLOps", "LLM Fine-tuning", "Vector DBs",
];

export const EXPERIENCE = [
  {
    date: "2025 - Present", current: true,
    role: "Junior Software Developer",
    company: "EduVanceAI",
    location: "",
    desc: "Building intelligent backend systems and AI integrations for an EdTech platform. ML-powered personalization, RAG pipelines, and scalable APIs serving thousands of learners daily.",
    tags: ["FastAPI","Python", "Django", "PostgreSQL", "Docker", "AWS","GenAI","React"],
  },
  {
    date: "Jun 2023 - Aug 2023", current: false,
    role: "User Experience Designer",
    company: "Zepto Digital Labs",
    location: "Thane",
    desc: "Designed UI for a simulation platform and improved user experience through design thinking principles. Delivered research-backed interface improvements that enhanced usability.",
    tags: ["Figma", "UX Research", "Design Thinking", "Prototyping"],
  },
  {
    date: "Jun 2023 - Jul 2023", current: false,
    role: "Back End Intern",
    company: "Laser Technologies Pvt Ltd",
    location: "Navi Mumbai",
    desc: "Managed and maintained backend systems and databases to support enterprise-level web applications. Ensured uptime, performance, and data integrity across production systems.",
    tags: ["Backend", "Databases", "SQL", "Web Applications"],
  },
];

export const ACHIEVEMENTS = [
  {
    icon: "🥇",
    title: "1st Prize – Innovations Project Presentation",
    event: "SIES GST (2025)",
    desc: "For 'Safe Yatra', a women's safety app integrating voice emotion recognition and real-time alerts.",
  },
  {
    icon: "🥇",
    title: "1st Prize – TechXter Research Paper Presentation",
    event: "SIES GST (2025)",
    desc: "For research and development on Safe Yatra, focusing on women's safety innovations.",
  },
  {
    icon: "🥈",
    title: "2nd Prize – CSI TechNext Research Paper Presentation",
    event: "VIT (2024)",
    desc: "'From Traditional to Digital: Evaluating the Role of Spirituality in Mental Health and Therapy.'",
  },
  {
    icon: "🥇",
    title: "1st Prize – Cognition Technical Fest",
    event: "SIES GST (2023)",
    desc: "For GitaGPT, a web app providing personalized emotional support using AI.",
  },
];

// export const CERTIFICATIONS = [
//   { name: "Introduction to Statistics",       platform: "Stanford University (via Coursera)", color: "#f97316" },
//   { name: "Introduction to Machine Learning", platform: "Kaggle",                             color: "#4ec9b0" },
//   { name: "AWS Cloud Foundation",             platform: "AWS Educate / Academy",              color: "#facc15" },
// ];

export const TERMINAL_FS_FILES = [
  "home.tsx", "about.html", "projects.js", "skills.json",
  "experience.ts", "contact.css", "README.md", "Aahana_Bobade_Resume.pdf"
];

export const TERMINAL_FILE_MAP = {
  "home.tsx":       "home",
  "about.html":     "about",
  "projects.js":    "projects",
  "skills.json":    "skills",
  "experience.ts":  "experience",
  "contact.css":    "contact",
  "README.md":      "readme",
};