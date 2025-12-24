
import React from 'react';
import { Briefcase, Check } from 'lucide-react';
import { ResumeData } from '../types';

const INDUSTRIES = [
  { id: 'technology', label: 'Technology & Software', keywords: ['agile', 'scrum', 'cloud', 'API', 'development'] },
  { id: 'finance', label: 'Finance & Banking', keywords: ['analysis', 'compliance', 'reporting', 'risk', 'portfolio'] },
  { id: 'healthcare', label: 'Healthcare & Medical', keywords: ['patient care', 'HIPAA', 'clinical', 'EMR', 'diagnosis'] },
  { id: 'marketing', label: 'Marketing & Advertising', keywords: ['campaigns', 'SEO', 'analytics', 'brand', 'ROI'] },
  { id: 'sales', label: 'Sales & Business Development', keywords: ['revenue', 'pipeline', 'quota', 'negotiation', 'CRM'] },
  { id: 'education', label: 'Education & Training', keywords: ['curriculum', 'instruction', 'assessment', 'learning', 'students'] },
  { id: 'engineering', label: 'Engineering & Manufacturing', keywords: ['design', 'production', 'quality', 'CAD', 'optimization'] },
  { id: 'creative', label: 'Creative & Design', keywords: ['portfolio', 'visual', 'branding', 'UX', 'creative direction'] },
  { id: 'operations', label: 'Operations & Logistics', keywords: ['efficiency', 'supply chain', 'process', 'inventory', 'logistics'] },
  { id: 'hr', label: 'Human Resources', keywords: ['recruitment', 'talent', 'onboarding', 'benefits', 'employee relations'] },
];

interface Props {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

function IndustrySelector({ data, onUpdate }: Props) {
  const selectedIndustry = data.targetIndustry || '';

  const handleSelect = (industryId: string) => {
    onUpdate({ 
      ...data,
      targetIndustry: industryId === selectedIndustry ? '' : industryId 
    });
  };

  const selectedIndustryData = INDUSTRIES.find(i => i.id === selectedIndustry);

  return (
    <div className="industry-selector">
      <div className="industry-header">
        <Briefcase size={20} />
        <div>
          <h3>Target Industry</h3>
          <p>Select your target industry for optimized keywords</p>
        </div>
      </div>

      <div className="industry-grid">
        {INDUSTRIES.map((industry) => (
          <button
            key={industry.id}
            className={`industry-option ${selectedIndustry === industry.id ? 'selected' : ''}`}
            onClick={() => handleSelect(industry.id)}
          >
            <span className="industry-label">{industry.label}</span>
            {selectedIndustry === industry.id && <Check size={16} />}
          </button>
        ))}
      </div>

      {selectedIndustryData && (
        <div className="industry-keywords">
          <span className="keywords-label">Suggested Keywords:</span>
          <div className="keywords-list">
            {selectedIndustryData.keywords.map((keyword, idx) => (
              <span key={idx} className="keyword-tag">{keyword}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IndustrySelector;
