
import React, { useState } from 'react';
import { Plus, Trash2, Edit2, GraduationCap, Award } from 'lucide-react';
import { ResumeData, Education, Certification } from '../types';

interface Props {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

function EducationCertifications({ data, onUpdate }: Props) {
  const { education = [], certifications = [] } = data;
  const [activeTab, setActiveTab] = useState<'education' | 'certifications'>('education');
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [eduForm, setEduForm] = useState<Education>({
    id: '', degree: '', institution: '', location: '', graduationYear: '', gpa: ''
  });
  
  const [certForm, setCertForm] = useState<Certification>({
    name: '', issuer: '', date: '', credentialId: '', url: ''
  });

  const resetForms = () => {
    setEduForm({ id: '', degree: '', institution: '', location: '', graduationYear: '', gpa: '' });
    setCertForm({ name: '', issuer: '', date: '', credentialId: '', url: '' });
    setIsAdding(false);
    setEditingIndex(null);
  };

  const handleSaveEducation = () => {
    if (!eduForm.degree || !eduForm.institution) return;
    let newEducation = [...education];
    if (editingIndex !== null) {
      newEducation[editingIndex] = eduForm;
    } else {
      newEducation.push({ ...eduForm, id: Math.random().toString(36).substr(2, 9) });
    }
    onUpdate({ ...data, education: newEducation });
    resetForms();
  };

  const handleSaveCertification = () => {
    if (!certForm.name || !certForm.issuer) return;
    let newCertifications = [...certifications];
    if (editingIndex !== null) {
      newCertifications[editingIndex] = certForm;
    } else {
      newCertifications.push(certForm);
    }
    onUpdate({ ...data, certifications: newCertifications });
    resetForms();
  };

  return (
    <div>
      <div className="section-header">
        <div className="section-title-group">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Education & Certifications</h2>
        </div>
      </div>

      <div className="section-tabs">
        <button 
          className={`section-tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => { setActiveTab('education'); resetForms(); }}
        >
          <GraduationCap size={16} /> Education
        </button>
        <button 
          className={`section-tab ${activeTab === 'certifications' ? 'active' : ''}`}
          onClick={() => { setActiveTab('certifications'); resetForms(); }}
        >
          <Award size={16} /> Certifications
        </button>
      </div>

      {activeTab === 'education' && (
        <div className="tab-content">
          {!isAdding && (
            <button className="btn px-4 py-2 border-2 border-slate-100 rounded-xl text-xs font-bold text-indigo-600 w-full mb-4" onClick={() => setIsAdding(true)}>
              <Plus size={16} className="inline mr-1" /> Add Education
            </button>
          )}

          {isAdding && (
            <div className="entry-form bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 mb-4">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Degree / Qualification *</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" placeholder="e.g. BS in Computer Science" value={eduForm.degree} onChange={(e) => setEduForm({...eduForm, degree: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Institution *</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={eduForm.institution} onChange={(e) => setEduForm({...eduForm, institution: e.target.value})} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Graduation Year</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={eduForm.graduationYear} onChange={(e) => setEduForm({...eduForm, graduationYear: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="text-[9px] font-black text-slate-400 uppercase">GPA (optional)</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={eduForm.gpa} onChange={(e) => setEduForm({...eduForm, gpa: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold" onClick={handleSaveEducation}>Save</button>
                  <button className="bg-slate-200 text-slate-600 px-6 py-2 rounded-xl text-xs font-bold" onClick={resetForms}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="bg-white border-2 border-slate-100 p-4 rounded-2xl mb-3 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-800 text-sm">{edu.degree}</div>
                <div className="text-xs text-slate-500">{edu.institution} • {edu.graduationYear}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-slate-400 hover:text-indigo-600" onClick={() => { setEduForm(edu); setEditingIndex(idx); setIsAdding(true); }}><Edit2 size={14} /></button>
                <button className="text-slate-400 hover:text-red-500" onClick={() => onUpdate({...data, education: education.filter((_, i) => i !== idx)})}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'certifications' && (
        <div className="tab-content">
          {!isAdding && (
            <button className="btn px-4 py-2 border-2 border-slate-100 rounded-xl text-xs font-bold text-indigo-600 w-full mb-4" onClick={() => setIsAdding(true)}>
              <Plus size={16} className="inline mr-1" /> Add Certification
            </button>
          )}

          {isAdding && (
            <div className="entry-form bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 mb-4">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Certification Name *</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={certForm.name} onChange={(e) => setCertForm({...certForm, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="text-[9px] font-black text-slate-400 uppercase">Issuer *</label>
                  <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={certForm.issuer} onChange={(e) => setCertForm({...certForm, issuer: e.target.value})} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Date</label>
                    <input type="month" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={certForm.date} onChange={(e) => setCertForm({...certForm, date: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="text-[9px] font-black text-slate-400 uppercase">Credential ID</label>
                    <input type="text" className="w-full p-3 rounded-xl border border-slate-200 text-xs" value={certForm.credentialId} onChange={(e) => setCertForm({...certForm, credentialId: e.target.value})} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold" onClick={handleSaveCertification}>Save</button>
                  <button className="bg-slate-200 text-slate-600 px-6 py-2 rounded-xl text-xs font-bold" onClick={resetForms}>Cancel</button>
                </div>
              </div>
            </div>
          )}

          {certifications.map((cert, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-100 p-4 rounded-2xl mb-3 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-800 text-sm">{cert.name}</div>
                <div className="text-xs text-slate-500">{cert.issuer} • {cert.date}</div>
              </div>
              <div className="flex gap-2">
                <button className="text-slate-400 hover:text-indigo-600" onClick={() => { setCertForm(cert); setEditingIndex(idx); setIsAdding(true); }}><Edit2 size={14} /></button>
                <button className="text-slate-400 hover:text-red-500" onClick={() => onUpdate({...data, certifications: certifications.filter((_, i) => i !== idx)})}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationCertifications;
