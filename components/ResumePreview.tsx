
import React from 'react';
import { ResumeData, TemplateType } from '../types';

interface Props {
  data: ResumeData;
  template: TemplateType;
  accentColor: string;
}

const ResumePreview: React.FC<Props> = ({ data, template, accentColor }) => {
  const { personalInfo, summary, experience, education, certifications = [], languages = [], interests = [], references = [], referencesAvailable = false, skills } = data;

  const renderContent = () => (
    <div className="preview-content" style={{ '--accent-color': accentColor } as any}>
      <header className="preview-header">
        <h1 className="preview-name text-4xl font-black mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <p className="text-sm font-bold tracking-widest opacity-70 uppercase mb-4">{personalInfo.profession || 'YOUR PROFESSION'}</p>
        <div className="preview-contact text-xs flex flex-wrap gap-4 opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className="preview-section-title text-[10px] font-black uppercase tracking-[0.2em] mb-4">Professional Profile</h2>
          <p className="text-sm leading-relaxed opacity-80">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="preview-section-title text-[10px] font-black uppercase tracking-[0.2em] mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-black tracking-tight">{exp.title}</h3>
                  <span className="text-[10px] font-bold opacity-50 uppercase">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="text-[11px] font-bold italic opacity-60 mb-2">{exp.company} • {exp.location}</div>
                <div className="text-[11px] leading-relaxed opacity-70 whitespace-pre-wrap">{exp.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-10">
        <section>
          {(education.length > 0 || certifications.length > 0) && (
            <>
              <h2 className="preview-section-title text-[10px] font-black uppercase tracking-[0.2em] mb-4">Education & Certs</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="text-xs font-black">{edu.degree}</div>
                    <div className="text-[10px] font-bold opacity-60">{edu.institution} • {edu.graduationYear}</div>
                  </div>
                ))}
                {certifications.map((cert, idx) => (
                  <div key={idx}>
                    <div className="text-xs font-black">{cert.name}</div>
                    <div className="text-[10px] font-bold opacity-60">{cert.issuer} • {cert.date}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        <section>
          {skills.length > 0 && (
            <div className="mb-6">
              <h2 className="preview-section-title text-[10px] font-black uppercase tracking-[0.2em] mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {languages.length > 0 && (
            <div className="mb-6">
              <h2 className="preview-section-title text-[10px] font-black uppercase tracking-[0.2em] mb-2">Languages</h2>
              <div className="text-[10px] font-bold opacity-80">
                {languages.map((l, i) => (
                  <span key={i}>{l.language} ({l.proficiency}){i < languages.length - 1 ? ', ' : ''}</span>
                ))}
              </div>
            </div>
          )}

          {(references.length > 0 || referencesAvailable) && (
            <div>
              <h2 className="preview-section-title text-[10px] font-black uppercase tracking-[0.2em] mb-2">References</h2>
              {referencesAvailable ? (
                <p className="text-[10px] font-bold opacity-60 italic">Available upon request</p>
              ) : (
                <div className="space-y-2">
                  {references.map((ref, i) => (
                    <div key={i} className="text-[10px]">
                      <div className="font-bold">{ref.name}</div>
                      <div className="opacity-60">{ref.title} at {ref.company}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );

  return (
    <div className={`resume-preview template-${template} bg-white text-slate-800 p-10 min-h-[842px] shadow-2xl relative overflow-hidden animate-fade-in`} id="resume-preview">
      {renderContent()}
    </div>
  );
};

export default ResumePreview;
