
import React, { useState } from 'react';
import { Plus, Trash2, Languages, Heart, Users, Check } from 'lucide-react';
import { ResumeData, Reference } from '../types';

interface Props {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

function AdditionalInfo({ data, onUpdate }: Props) {
  const { languages = [], interests = [], references = [], referencesAvailable = false } = data;
  const [activeTab, setActiveTab] = useState<'languages' | 'interests' | 'references'>('languages');
  const [isAdding, setIsAdding] = useState(false);
  const [langForm, setLangForm] = useState({ language: '', proficiency: 'Intermediate' });
  const [interestInput, setInterestInput] = useState('');
  const [refForm, setRefForm] = useState<Reference>({ name: '', title: '', company: '', email: '', phone: '' });

  const proficiencyLevels = ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'];

  const handleAddLanguage = () => {
    if (!langForm.language) return;
    onUpdate({ ...data, languages: [...languages, langForm] });
    setLangForm({ language: '', proficiency: 'Intermediate' });
  };

  const handleAddInterest = () => {
    if (!interestInput.trim()) return;
    onUpdate({ ...data, interests: [...interests, interestInput.trim()] });
    setInterestInput('');
  };

  const handleAddReference = () => {
    if (!refForm.name) return;
    onUpdate({ ...data, references: [...references, refForm] });
    setRefForm({ name: '', title: '', company: '', email: '', phone: '' });
    setIsAdding(false);
  };

  return (
    <div>
      <div className="section-header">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Additional Info</h2>
      </div>

      <div className="section-tabs">
        <button className={`section-tab ${activeTab === 'languages' ? 'active' : ''}`} onClick={() => setActiveTab('languages')}><Languages size={16} /> Langs</button>
        <button className={`section-tab ${activeTab === 'interests' ? 'active' : ''}`} onClick={() => setActiveTab('interests')}><Heart size={16} /> Interests</button>
        <button className={`section-tab ${activeTab === 'references' ? 'active' : ''}`} onClick={() => setActiveTab('references')}><Users size={16} /> Refs</button>
      </div>

      {activeTab === 'languages' && (
        <div className="tab-content">
          <div className="inline-form bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 mb-4">
            <div className="flex gap-2">
              <input type="text" className="flex-1 p-3 rounded-xl border border-slate-200 text-xs" placeholder="Language" value={langForm.language} onChange={(e) => setLangForm({...langForm, language: e.target.value})} />
              <select className="p-3 rounded-xl border border-slate-200 text-xs" value={langForm.proficiency} onChange={(e) => setLangForm({...langForm, proficiency: e.target.value})}>
                {proficiencyLevels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <button className="bg-indigo-600 text-white p-3 rounded-xl" onClick={handleAddLanguage}><Plus size={16} /></button>
            </div>
          </div>
          <div className="tags-list">
            {languages.map((l, i) => (
              <div key={i} className="tag-item flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl text-xs font-bold text-slate-700">
                {l.language} <span className="tag-badge">{l.proficiency}</span>
                <button onClick={() => onUpdate({...data, languages: languages.filter((_, idx) => idx !== i)})}><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'interests' && (
        <div className="tab-content">
          <div className="inline-form bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 mb-4">
            <div className="flex gap-2">
              <input type="text" className="flex-1 p-3 rounded-xl border border-slate-200 text-xs" placeholder="Photography, Chess..." value={interestInput} onChange={(e) => setInterestInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()} />
              <button className="bg-indigo-600 text-white p-3 rounded-xl" onClick={handleAddInterest}><Plus size={16} /></button>
            </div>
          </div>
          <div className="tags-list">
            {interests.map((interest, i) => (
              <div key={i} className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-full text-xs font-bold text-blue-700 flex items-center gap-2">
                {interest}
                <button onClick={() => onUpdate({...data, interests: interests.filter((_, idx) => idx !== i)})}><Trash2 size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'references' && (
        <div className="tab-content">
          <label className="checkbox-label mb-6">
            <input type="checkbox" checked={referencesAvailable} onChange={() => onUpdate({...data, referencesAvailable: !referencesAvailable})} />
            <span className="checkbox-custom">{referencesAvailable && <Check size={14} />}</span>
            <span className="font-bold text-slate-700">Available upon request</span>
          </label>

          {!referencesAvailable && (
            <>
              {!isAdding && (
                <button className="btn px-4 py-2 border-2 border-slate-100 rounded-xl text-xs font-bold text-indigo-600 w-full mb-4" onClick={() => setIsAdding(true)}>
                  <Plus size={16} className="inline mr-1" /> Add Reference
                </button>
              )}
              {isAdding && (
                <div className="entry-form bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 mb-4 space-y-4">
                  <div className="form-group">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Full Name *</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={refForm.name} onChange={(e) => setRefForm({...refForm, name: e.target.value})} />
                  </div>
                  <div className="form-row">
                    <div className="form-group"><label className="text-[9px] font-black text-slate-400 uppercase">Title</label><input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={refForm.title} onChange={(e) => setRefForm({...refForm, title: e.target.value})} /></div>
                    <div className="form-group"><label className="text-[9px] font-black text-slate-400 uppercase">Company</label><input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={refForm.company} onChange={(e) => setRefForm({...refForm, company: e.target.value})} /></div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold" onClick={handleAddReference}>Save</button>
                    <button className="bg-slate-200 text-slate-600 px-6 py-2 rounded-xl text-xs font-bold" onClick={() => setIsAdding(false)}>Cancel</button>
                  </div>
                </div>
              )}
              {references.map((ref, i) => (
                <div key={i} className="bg-white border-2 border-slate-100 p-4 rounded-2xl mb-3 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{ref.name}</div>
                    <div className="text-xs text-slate-500">{ref.title} at {ref.company}</div>
                  </div>
                  <button className="text-slate-400 hover:text-red-500" onClick={() => onUpdate({...data, references: references.filter((_, idx) => idx !== i)})}><Trash2 size={14} /></button>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default AdditionalInfo;
