
import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  bio: {
    name: "John Doe",
    role: "Full-Stack Software Engineer",
    description: "I build robust, scalable web applications with a focus on high-performance backends and intuitive user interfaces. Passionate about AI integration and automation.",
    avatarUrl: "https://picsum.photos/400/400"
  },
  programmingSkills: {
    languages: [
      { name: "HTML", years: 6, proficiency: 100 },
      { name: "CSS", years: 6, proficiency: 90 },
      { name: "JavaScript", years: 6, proficiency: 90 },
      { name: "PHP", years: 5, proficiency: 80 },
      { name: "Python", years: 3, proficiency: 70 },
      { name: "TypeScript", years: 2, proficiency: 65 },
    ],
    frameworks: [
      { name: "Laravel", years: 5, proficiency: 85 },
      { name: "React", years: 4, proficiency: 85 },
      { name: "Express.js", years: 4, proficiency: 80 },
      { name: "Next.js", years: 2, proficiency: 70 },
      { name: "CodeIgniter", years: 2, proficiency: 60 },
    ],
    tools: [
      { name: "Bootstrap", years: 5, proficiency: 95 },
      { name: "Tailwind", years: 4, proficiency: 90 },
      { name: "Firebase", years: 3, proficiency: 75 },
      { name: "Supabase", years: 1, proficiency: 50 },
    ],
  },
  education: [
    {
      school: "University of Technology",
      course: "B.Sc. Computer Science",
      year: "2018 - 2022",
      cgpa: 3.85,
      class: "First Class",
    }
  ],
  professionalCourses: [
    {
      certification: "Full Stack Web Development",
      institution: "Tech Academy",
      year: "2023",
      skills: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    }
  ],
  softSkills: [
    "Office management and secretariat duties.",
    "Ability to organize meetings and events.",
    "Multi-tasking efficiency.",
    "Independent problem solving.",
    "Graphics Design proficiency.",
    "Project management and entrepreneurship.",
    "Negotiation techniques.",
  ],
  workExperiences: [
    {
      place: "Global Solutions Inc.",
      position: "Senior Full Stack Developer",
      startYear: 2022,
      endYear: "present",
      duties: [
        "Architected scalable microservices using Node.js and AWS.",
        "Led a team of 5 developers in delivering a high-traffic fintech platform.",
        "Optimized database queries reducing latency by 40%."
      ],
    },
    {
      place: "Innovate AI",
      position: "Junior Developer",
      startYear: 2020,
      endYear: 2022,
      duties: [
        "Developed and maintained responsive React components.",
        "Integrated third-party APIs for real-time data processing.",
        "Collaborated with UX designers to improve accessibility."
      ],
    }
  ],
  projects: [
    {
      name: "Alpha-Ed - ScriptMarka",
      website: "scriptmarka.com",
      techStack: ["ReactJs", "NodeJs", "Firebase", "OCR", "NLP"],
      description: "AI-driven EdTech tool for automated grading of handwritten descriptive exam scripts.",
      duties: [
        "Engineered a Semantic Grading Model using NLP.",
        "Built end-to-end OCR pipelines for handwritten digitizing.",
        "Architected secure backend infrastructure on Firebase."
      ],
      roles: ["Founder", "CTO"],
      startDate: "Jan 2024",
      endDate: null,
    }
  ],
  contactInfo: {
    facebook: "https://facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    phoneNumber: "+1 234 567 890",
    email: "john.doe@example.com",
    website: "johndoe.dev",
  },
  settings: {
    theme: 'minimal',
    darkMode: true,
    adminPassword: null, // Will be set on first login
    resumeUrl: null,
    visitCount: {},
    sections: [
      { id: 'hero', name: 'Hero Section', visible: true, order: 1 },
      { id: 'skills', name: 'Skills & Tech', visible: true, order: 2 },
      { id: 'experience', name: 'Work Experience', visible: true, order: 3 },
      { id: 'projects', name: 'Projects', visible: true, order: 4 },
      { id: 'contact', name: 'Contact Info', visible: true, order: 5 },
    ],
    sectionTitles: {
      experience: 'Timeline',
      education: 'Knowledge',
      certifications: 'Verified',
      projects: 'Showcase',
      skills: 'Explored Tech',
      contact: "Let's Talk"
    },
    customColors: {
      light: {
        primary: '',
        bgMain: '',
        textMain: '',
        cardBg: '',
        border: ''
      },
      dark: {
        primary: '',
        bgMain: '',
        textMain: '',
        cardBg: '',
        border: ''
      }
    }
  }
};
