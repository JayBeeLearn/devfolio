
export interface Skill {
  name: string;
  years: number;
  proficiency: number;
}

export interface ProgrammingSkills {
  languages: Skill[];
  frameworks: Skill[];
  tools: Skill[];
}

export interface Education {
  school: string;
  course: string;
  year: string;
  cgpa: number | null;
  class: string | null;
}

export interface Certification {
  certification: string;
  institution: string;
  year: string;
  skills: string[];
}

export interface WorkExperience {
  place: string;
  position: string;
  startYear: number | string;
  endYear: number | string;
  duties: string[];
}

export interface Project {
  name: string;
  website: string;
  techStack: string[];
  description: string;
  duties: string[];
  roles: string[];
  startDate: string;
  endDate: string | null;
}

export interface ContactInfo {
  facebook: string;
  linkedin: string;
  github: string;
  phoneNumber: string;
  email: string;
  website: string;
}

export type ThemeType = 'minimal' | 'cyberpunk' | 'elegant';

export interface SectionConfig {
  id: string;
  name: string; // Display name
  visible: boolean;
  order: number;
}

export interface AppSettings {
  theme: ThemeType;
  darkMode: boolean;
  adminPassword: string | null;
  resumeUrl: string | null;
  visitCount: Record<string, number>;
  sections: SectionConfig[];
  sectionTitles?: {
    experience?: string;
    education?: string;
    certifications?: string;
    projects?: string;
    skills?: string;
    contact?: string;
  };
  customColors?: {
    light?: {
      primary?: string;
      bgMain?: string;
      textMain?: string;
      cardBg?: string;
      border?: string;
    };
    dark?: {
      primary?: string;
      bgMain?: string;
      textMain?: string;
      cardBg?: string;
      border?: string;
    };
  };
}

export interface PortfolioData {
  bio: {
    name: string;
    role: string;
    description: string;
    avatarUrl: string;
  };
  programmingSkills: ProgrammingSkills;
  education: Education[];
  professionalCourses: Certification[];
  softSkills: string[];
  workExperiences: WorkExperience[];
  projects: Project[];
  contactInfo: ContactInfo;
  settings: AppSettings;
}
