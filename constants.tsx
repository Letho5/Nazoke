
import { ResumeData, TemplateType } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    profession: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  certifications: [],
  languages: [],
  interests: [],
  references: [],
  referencesAvailable: false,
  skills: [],
  projects: [],
  targetIndustry: '',
  // Set default values for template and accent color for new resumes
  template: TemplateType.CLASSIC,
  accentColor: '#3b82f6',
};

export const ACCENT_COLORS = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Gray', value: '#4b5563' },
  { name: 'Black', value: '#000000' },
];

export const FORM_SECTIONS = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education & Certs' },
  { id: 'additional', label: 'Additional Info' },
  { id: 'skills', label: 'Skills' },
];

export const TEMPLATES = [
  { 
    id: TemplateType.CLASSIC, 
    name: 'Classic', 
    description: 'Traditional format with clear sections',
    preview: 'Clean, professional look ideal for corporate roles'
  },
  { 
    id: TemplateType.MODERN, 
    name: 'Modern', 
    description: 'Sleek design with color accents',
    preview: 'Contemporary style for tech and creative fields'
  },
  { 
    id: TemplateType.MINIMAL, 
    name: 'Minimal', 
    description: 'Ultra-clean, content-focused',
    preview: 'Simple elegance that lets your experience shine'
  },
  { 
    id: TemplateType.PROFESSIONAL, 
    name: 'Professional', 
    description: 'Executive-level presentation',
    preview: 'Sophisticated layout for senior positions'
  }
];
