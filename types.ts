
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  linkedin: string;
  website: string;
  photo?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa: string;
}

export interface Project {
  id: string;
  name: string;
  url: string;
  description: string;
  technologies: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  url: string;
}

export interface Language {
  language: string;
  proficiency: string;
}

export interface Reference {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

/**
 * Added template and accentColor to ResumeData to ensure type safety 
 * when these properties are updated via the context or rendered in previews.
 */
export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  certifications?: Certification[];
  languages?: Language[];
  interests?: string[];
  references?: Reference[];
  referencesAvailable?: boolean;
  skills: string[];
  projects: Project[];
  targetIndustry?: string;
  template?: string;
  accentColor?: string;
}

export enum TemplateType {
  CLASSIC = 'classic',
  MODERN = 'modern',
  MINIMAL = 'minimal',
  PROFESSIONAL = 'professional'
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export type BuildMode = 'FORM' | 'CHAT';

export interface AppState {
  resumeData: ResumeData;
  mode: BuildMode;
  currentSection: string;
  template: TemplateType;
  accentColor: string;
  chatHistory: ChatHistory;
  isGenerating: boolean;
}

export type ChatHistory = ChatMessage[];
