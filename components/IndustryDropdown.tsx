
import React, { useState } from 'react';
import { ChevronDown, Briefcase } from 'lucide-react';
import { ResumeData } from '../types';

const INDUSTRIES = [
  { id: '', label: 'Select Industry...' },
  { id: 'technology', label: 'Technology & Software' },
  { id: 'finance', label: 'Finance & Banking' },
  { id: 'healthcare', label: 'Healthcare & Medical' },
  { id: 'marketing', label: 'Marketing & Advertising' },
  { id: 'sales', label: 'Sales & Business Development' },
  { id: 'education', label: 'Education & Training' },
  { id: 'engineering', label: 'Engineering & Manufacturing' },
  { id: 'creative', label: 'Creative & Design' },
  { id: 'operations', label: 'Operations & Logistics' },
  { id: 'hr', label: 'Human Resources' },
];

interface Props {
  data: ResumeData;
  onUpdate: (data: ResumeData) => void;
}

function IndustryDropdown({ data, onUpdate }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedIndustry = data.targetIndustry || '';
  
  const selectedLabel = INDUSTRIES.find(i => i.id === selectedIndustry)?.label || 'Select Industry...';

  const handleSelect = (industryId: string) => {
    onUpdate({ ...data, targetIndustry: industryId });
    setIsOpen(false);
  };

  return (
    <div className="industry-dropdown">
      <button 
        className="industry-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Briefcase size={16} />
        <span>{selectedLabel}</span>
        <ChevronDown size={16} className={isOpen ? 'rotated' : ''} />
      </button>
      
      {isOpen && (
        <>
          <div className="dropdown-backdrop" onClick={() => setIsOpen(false)} />
          <div className="industry-dropdown-menu">
            {INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                className={`dropdown-item ${selectedIndustry === industry.id ? 'selected' : ''}`}
                onClick={() => handleSelect(industry.id)}
              >
                {industry.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default IndustryDropdown;
