import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Sparkles, Plus, X } from 'lucide-react';
import { ResumeData, Experience, Education, Project } from '../types';
import { enhanceText } from '../geminiService';

interface Props {
  data: ResumeData;
  activeSection: string;
  onUpdate: (data: ResumeData) => void;
}

const ResumeForm: React.FC<Props> = ({ data, activeSection, onUpdate }) => {
  const [isEnhancing, setIsEnhancing] = React.useState<string | null>(null);

  const handlePersonalChange = (field: string, value: string) => {
    onUpdate({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const handleSummaryChange = (value: string) => {
    onUpdate({ ...data, summary: value });
  };

  const handleEnhanceSummary = async () => {
    setIsEnhancing('summary');
    const enhanced = await enhanceText('summary', data.summary, data.personalInfo.profession || 'Professional');
    onUpdate({ ...data, summary: enhanced });
    setIsEnhancing(null);
  };

  const handleEnhanceSkills = async () => {
    if (!data.skills.length) return;
    setIsEnhancing('skills');
    const skillsString = data.skills.join(', ');
    const enhanced = await enhanceText('skills', skillsString, data.personalInfo.profession || 'Professional');
    const enhancedSkills = enhanced.split(',').map(s => s.trim()).filter(Boolean);
    onUpdate({ ...data, skills: enhancedSkills });
    setIsEnhancing(null);
  };

  const addItem = (section: 'experience' | 'education' | 'projects') => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...(section === 'experience' && { title: '', company: '', location: '', startDate: '', endDate: '', description: '' }),
      ...(section === 'education' && { degree: '', institution: '', location: '', graduationYear: '', gpa: '' }),
      ...(section === 'projects' && { name: '', url: '', description: '', technologies: '' }),
    };
    onUpdate({ ...data, [section]: [...data[section], newItem] });
  };

  const removeItem = (section: 'experience' | 'education' | 'projects', id: string) => {
    onUpdate({ ...data, [section]: data[section].filter((item: any) => item.id !== id) });
  };

  const updateItem = (section: 'experience' | 'education' | 'projects', id: string, field: string, value: string) => {
    onUpdate({
      ...data,
      [section]: data[section].map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const renderPersonal = () => (
    <div className="space-y-8 p-10 animate-fade-in">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Full Name</label>
          <input 
            type="text" 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner" 
            value={data.personalInfo.fullName}
            onChange={(e) => handlePersonalChange('fullName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Profession</label>
          <input 
            type="text" 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner" 
            value={data.personalInfo.profession}
            onChange={(e) => handlePersonalChange('profession', e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5"><Mail size={12} /> Email Address</label>
          <input 
            type="email" 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner" 
            value={data.personalInfo.email}
            onChange={(e) => handlePersonalChange('email', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5"><Phone size={12} /> Phone Number</label>
          <input 
            type="tel" 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner" 
            value={data.personalInfo.phone}
            onChange={(e) => handlePersonalChange('phone', e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5"><MapPin size={12} /> Current Location</label>
        <input 
          type="text" 
          className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner" 
          placeholder="e.g. San Francisco, CA"
          value={data.personalInfo.location}
          onChange={(e) => handlePersonalChange('location', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5"><Linkedin size={12} /> LinkedIn URL</label>
          <input 
            type="text" 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner" 
            value={data.personalInfo.linkedin}
            onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-1.5"><Globe size={12} /> Website / Portfolio</label>
          <input 
            type="text" 
            className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:bg-white focus:border-indigo-500 outline-none transition-all shadow-inner" 
            value={data.personalInfo.website}
            onChange={(e) => handlePersonalChange('website', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="p-10 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Career Vision</label>
        <button 
          onClick={handleEnhanceSummary}
          disabled={isEnhancing === 'summary' || !data.summary}
          className="group relative px-5 py-2.5 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
        >
          {isEnhancing === 'summary' ? <Sparkles size={12} className="animate-pulse" /> : <Sparkles size={12} />}
          {isEnhancing === 'summary' ? 'Enhancing...' : 'AI Enhance'}
        </button>
      </div>
      <textarea 
        className="w-full h-64 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] p-8 text-sm font-medium leading-relaxed focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner custom-scrollbar"
        value={data.summary}
        onChange={(e) => handleSummaryChange(e.target.value)}
        placeholder="Craft your professional narrative..."
      />
    </div>
  );

  const renderExperience = () => (
    <div className="p-10 space-y-10 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Career Journey</h3>
        <button onClick={() => addItem('experience')} className="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest flex items-center gap-1.5"><Plus size={14} /> Add Experience</button>
      </div>
      <div className="space-y-8">
        {data.experience.map((exp) => (
          <div key={exp.id} className="relative bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors"></div>
            <button 
              onClick={() => removeItem('experience', exp.id)}
              className="absolute top-6 right-6 text-slate-200 hover:text-red-500 transition-colors bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center text-xs"
            ><X size={14} /></button>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Role Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold focus:bg-white outline-none transition-all shadow-inner" value={exp.title} onChange={(e) => updateItem('experience', exp.id, 'title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Organization</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold focus:bg-white outline-none transition-all shadow-inner" value={exp.company} onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Joined</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold focus:bg-white outline-none transition-all shadow-inner" placeholder="Jan 2020" value={exp.startDate} onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Departed</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold focus:bg-white outline-none transition-all shadow-inner" placeholder="Present" value={exp.endDate} onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Region</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold focus:bg-white outline-none transition-all shadow-inner" value={exp.location} onChange={(e) => updateItem('experience', exp.id, 'location', e.target.value)} />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Key Impact & Outcomes</label>
                <button 
                  onClick={async () => {
                    setIsEnhancing(exp.id);
                    const enhanced = await enhanceText('experience', exp.description, data.personalInfo.profession);
                    updateItem('experience', exp.id, 'description', enhanced);
                    setIsEnhancing(null);
                  }}
                  disabled={isEnhancing === exp.id || !exp.description}
                  className="text-[9px] font-black text-indigo-600 hover:text-indigo-800 transition-colors bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-tighter flex items-center gap-1.5"
                >
                  {isEnhancing === exp.id ? <Sparkles size={10} className="animate-pulse" /> : <Sparkles size={10} />}
                  {isEnhancing === exp.id ? 'Enhancing...' : 'AI Enhance'}
                </button>
              </div>
              <textarea className="w-full h-40 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium leading-relaxed resize-none outline-none focus:bg-white transition-all shadow-inner custom-scrollbar" value={exp.description} onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)} placeholder="• Spearheaded product redesign..." />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="p-10 space-y-10 animate-fade-in">
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-[2rem] p-8 relative overflow-hidden group">
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl transition-transform group-hover:scale-150"></div>
        <h4 className="text-indigo-900 font-black text-sm mb-3 tracking-tight flex items-center gap-2"><Sparkles size={16} className="text-indigo-500" /> Pro Skill Mapping</h4>
        <p className="text-indigo-700/70 text-xs leading-relaxed font-medium">Group your skills by expertise level or category. Separate with commas to trigger our elite auto-formatting engine.</p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Skills & Proficiencies</label>
          <button 
            onClick={handleEnhanceSkills}
            disabled={isEnhancing === 'skills' || !data.skills.length}
            className="group relative px-5 py-2.5 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200/50 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
          >
            {isEnhancing === 'skills' ? <Sparkles size={12} className="animate-pulse" /> : <Sparkles size={12} />}
            {isEnhancing === 'skills' ? 'Enhancing...' : 'AI Enhance'}
          </button>
        </div>
        <textarea 
          className="w-full h-80 bg-slate-50 border-2 border-slate-100 rounded-[3rem] p-8 text-sm font-medium leading-relaxed focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none shadow-inner custom-scrollbar"
          value={data.skills.join(', ')}
          onChange={(e) => onUpdate({ ...data, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
          placeholder="e.g. Design Systems, React Architecture, Team Management, Stakeholder Engagement..."
        />
      </div>
    </div>
  );

  const sectionContent = () => {
    switch (activeSection) {
      case 'personal': return renderPersonal();
      case 'summary': return renderSummary();
      case 'experience': return renderExperience();
      case 'skills': return renderSkills();
      default: return <div className="p-16 text-center text-slate-300 font-black uppercase tracking-widest text-sm">More coming soon...</div>;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
      {sectionContent()}
    </div>
  );
};

export default ResumeForm;