
import React, { createContext, useContext, useReducer, PropsWithChildren } from 'react';

const ResumeContext = createContext<any>(null);

const initialState = {
  currentResumeId: null,
  currentResume: {
    personalInfo: { fullName: '', email: '', phone: '', location: '', profession: '', linkedin: '', website: '' },
    summary: '',
    experience: [],
    education: [],
    certifications: [],
    skills: [],
    languages: [],
    interests: [],
    references: [],
    referencesAvailable: false,
    template: 'classic',
    accentColor: 'blue',
    targetIndustry: ''
  }
};

function resumeReducer(state: any, action: any) {
  switch (action.type) {
    case 'LOAD_RESUME':
      return { ...state, currentResume: action.payload };
    case 'SET_RESUME_ID':
      return { ...state, currentResumeId: action.payload };
    case 'UPDATE_PERSONAL_INFO':
      return { ...state, currentResume: { ...state.currentResume, personalInfo: { ...state.currentResume.personalInfo, ...action.payload } } };
    case 'UPDATE_SUMMARY':
      return { ...state, currentResume: { ...state.currentResume, summary: action.payload } };
    case 'SET_TEMPLATE':
      return { ...state, currentResume: { ...state.currentResume, template: action.payload } };
    case 'SET_ACCENT_COLOR':
      return { ...state, currentResume: { ...state.currentResume, accentColor: action.payload } };
    case 'SET_TARGET_INDUSTRY':
      return { ...state, currentResume: { ...state.currentResume, targetIndustry: action.payload } };
    case 'ADD_EXPERIENCE':
      return { ...state, currentResume: { ...state.currentResume, experience: [...state.currentResume.experience, action.payload] } };
    case 'ADD_EDUCATION':
      return { ...state, currentResume: { ...state.currentResume, education: [...state.currentResume.education, action.payload] } };
    case 'ADD_SKILL':
      return { ...state, currentResume: { ...state.currentResume, skills: [...state.currentResume.skills, action.payload] } };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

/**
 * ResumeProvider component that manages the global resume state.
 * Fixed: Explicitly using PropsWithChildren to resolve the TypeScript error in App.tsx
 * where the component was not correctly recognized as accepting children.
 */
export function ResumeProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export const useResume = () => useContext(ResumeContext);
