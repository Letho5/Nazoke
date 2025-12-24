
import { ResumeData } from "./types";

export const parseResumeDataFromText = (text: string): Partial<ResumeData> | null => {
  const regex = /<!--RESUME_DATA\s*([\s\S]*?)\s*RESUME_DATA-->/;
  const match = text.match(regex);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1].trim());
    } catch (e) {
      console.error("Failed to parse resume data JSON", e);
    }
  }
  return null;
};

export const cleanDisplayContent = (text: string): string => {
  return text.replace(/<!--RESUME_DATA[\s\S]*?RESUME_DATA-->/g, '').trim();
};

export const formatDate = (date: string): string => {
  if (!date) return '';
  // Simple check for 'present'
  if (date.toLowerCase() === 'present') return 'Present';
  return date;
};
