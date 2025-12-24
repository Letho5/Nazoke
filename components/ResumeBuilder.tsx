import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Download, X, Target } from 'lucide-react';
import { BuildMode, ChatMessage, ResumeData } from '../types';
import { FORM_SECTIONS, TEMPLATES } from '../constants';
import { useResume } from '../context/ResumeContext';

import ResumePreview from './ResumePreview';
import ChatInterface from './ChatInterface';
import ResumeForm from './ResumeForm';
import EducationCertifications from './EducationCertifications';
import AdditionalInfo from './AdditionalInfo';
import IndustryDropdown from './IndustryDropdown';
import ExportModal from './ExportModal';
import ATSScore from './ATSScore';
import IndustrySelector from './IndustrySelector';

function StepIndicator({ currentStep, totalSteps, onStepClick }: { currentStep: number, totalSteps: number, onStepClick: (i: number) => void }) {
  return (
    <div className="step-progress flex justify-center gap-4 py-4 bg-slate-50 border-b overflow-x-auto no-print">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <div key={step} className="flex items-center">
          <button
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === currentStep ? 'bg-indigo-600 text-white shadow-lg' : 
              step < currentStep ? 'bg-emerald-500 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'
            }`}
            onClick={() => onStepClick(step - 1)}
          >
            {step < currentStep ? '✓' : step}
          </button>
          {step < totalSteps && <div className={`w-8 h-0.5 mx-2 ${step < currentStep ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
        </div>
      ))}
    </div>
  );
}

function ATSScoreBadge({ data }: { data: ResumeData }) {
  const calculateATSScore = (resume: ResumeData) => {
    let score = 0;
    if (resume.personalInfo?.email && resume.personalInfo?.phone) score += 15;
    if (resume.summary?.length > 50) score += 20;
    if (resume.experience?.length > 0) score += 25;
    if (resume.education?.length > 0) score += 15;
    if (resume.skills?.length >= 5) score += 15;
    if (resume.targetIndustry) score += 10;
    return score;
  };
  const score = calculateATSScore(data);
  const color = score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2" style={{ borderColor: color }}>
      <Target size={16} style={{ color }} />
      <span className="font-bold text-xs">ATS Score: <span style={{ color }}>{score}%</span></span>
    </div>
  );
}

const ResumeBuilder: React.FC<{ user: any, onLogout: () => void }> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch } = useResume();
  const [mode, setMode] = useState<BuildMode>('CHAT');
  const [currentSection, setCurrentSection] = useState('personal');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showOptimization, setShowOptimization] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!id) navigate('/dashboard');
    // In a real app, we'd fetch the specific resume by ID here
  }, [id, navigate]);

  const currentSectionIndex = FORM_SECTIONS.findIndex(s => s.id === currentSection);

  const updateChatHistory = (newHistory: ChatMessage[]) => setChatHistory(newHistory);
  const updateResumeData = (newData: ResumeData) => dispatch({ type: 'LOAD_RESUME', payload: newData });

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#f1f5f9]">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between z-40 no-print">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">R</div>
            <h1 className="text-xl font-black tracking-tight text-slate-800">resume<span className="text-indigo-600">.</span></h1>
          </button>
          <div className="flex bg-slate-100 p-1 rounded-full">
            <button onClick={() => setMode('CHAT')} className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${mode === 'CHAT' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>AI Chat</button>
            <button onClick={() => setMode('FORM')} className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${mode === 'FORM' ? 'bg-white shadow text-indigo-600' : 'text-slate-400'}`}>Form</button>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button 
            onClick={() => setShowOptimization(!showOptimization)} 
            className={`px-6 py-2 rounded-full text-xs font-bold border-2 transition-all ${showOptimization ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'border-slate-100 bg-white text-slate-600'}`}
          >
            Optimize
          </button>
          <button onClick={() => setShowTemplates(!showTemplates)} className="px-6 py-2 rounded-full text-xs font-bold border-2 border-slate-100 bg-white text-slate-600">Styles</button>
          <button onClick={() => setShowExportModal(true)} className="px-6 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-xl flex items-center gap-2 hover:bg-indigo-700 transition-all"><Download size={14} /> Download</button>
          <button onClick={onLogout} className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">Logout</button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        <div className="w-[480px] border-r border-slate-200 bg-white flex flex-col relative overflow-hidden no-print">
          {mode === 'FORM' && (
            <StepIndicator currentStep={currentSectionIndex + 1} totalSteps={FORM_SECTIONS.length} onStepClick={(i) => setCurrentSection(FORM_SECTIONS[i].id)} />
          )}
          <div className="flex-1 overflow-hidden">
            {mode === 'CHAT' ? (
              <ChatInterface resumeData={state.currentResume} chatHistory={chatHistory} onUpdateData={updateResumeData} onUpdateHistory={updateChatHistory} />
            ) : (
              <div className="h-full overflow-y-auto custom-scrollbar">
                {currentSection === 'personal' && <ResumeForm data={state.currentResume} activeSection="personal" onUpdate={updateResumeData} />}
                {currentSection === 'summary' && <ResumeForm data={state.currentResume} activeSection="summary" onUpdate={updateResumeData} />}
                {currentSection === 'experience' && <ResumeForm data={state.currentResume} activeSection="experience" onUpdate={updateResumeData} />}
                {currentSection === 'education' && <EducationCertifications data={state.currentResume} onUpdate={updateResumeData} />}
                {currentSection === 'additional' && <AdditionalInfo data={state.currentResume} onUpdate={updateResumeData} />}
                {currentSection === 'skills' && <ResumeForm data={state.currentResume} activeSection="skills" onUpdate={updateResumeData} />}
              </div>
            )}
          </div>
          
          {showTemplates && (
            <div className="absolute inset-x-0 bottom-0 bg-white border-t p-8 z-50 rounded-t-3xl shadow-2xl animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Templates</h3>
                <button onClick={() => setShowTemplates(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {TEMPLATES.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => dispatch({ type: 'SET_TEMPLATE', payload: t.id })} 
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${state.currentResume.template === t.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="font-bold text-sm text-slate-800">{t.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{t.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {showOptimization && (
            <div className="absolute inset-x-0 bottom-0 bg-white border-t p-8 z-50 rounded-t-3xl shadow-2xl animate-slide-up max-h-[80%] overflow-y-auto custom-scrollbar">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Optimization</h3>
                <button onClick={() => setShowOptimization(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <div className="space-y-6">
                <IndustrySelector data={state.currentResume} onUpdate={updateResumeData} />
                <ATSScore data={state.currentResume} />
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col relative bg-slate-200/50 overflow-hidden">
          <div className="preview-header-bar flex justify-between items-center p-4 bg-white border-b no-print">
            <IndustryDropdown data={state.currentResume} onUpdate={updateResumeData} />
            <ATSScoreBadge data={state.currentResume} />
          </div>
          <div className="flex-1 overflow-auto p-12 flex justify-center items-start custom-scrollbar">
            <div id="resume-preview-container" className="shadow-2xl bg-white w-full max-w-[800px]">
              <ResumePreview 
                data={state.currentResume} 
                template={state.currentResume.template as any} 
                accentColor={state.currentResume.accentColor as any} 
              />
            </div>
          </div>
        </div>
      </main>
      <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} resumeData={state.currentResume} />
    </div>
  );
};

export default ResumeBuilder;