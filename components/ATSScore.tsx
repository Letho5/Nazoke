
import React, { useState, useEffect } from 'react';
import { Target, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { ResumeData } from '../types';

interface Props {
  data: ResumeData;
}

function ATSScore({ data }: Props) {
  const [score, setScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [checks, setChecks] = useState<any[]>([]);

  const analyzeResume = () => {
    setAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const results: any[] = [];
      let totalScore = 0;
      
      // Check 1: Contact Information
      const hasContact = data.personalInfo.email && data.personalInfo.phone;
      results.push({
        label: 'Contact Information',
        passed: hasContact,
        message: hasContact ? 'Email and phone present' : 'Missing email or phone'
      });
      if (hasContact) totalScore += 15;

      // Check 2: Professional Summary
      const hasSummary = data.summary && data.summary.length > 50;
      results.push({
        label: 'Professional Summary',
        passed: hasSummary,
        message: hasSummary ? 'Summary is well-written' : 'Add a professional summary (50+ chars)'
      });
      if (hasSummary) totalScore += 20;

      // Check 3: Work Experience
      const hasExperience = data.experience && data.experience.length > 0;
      results.push({
        label: 'Work Experience',
        passed: hasExperience,
        message: hasExperience ? `${data.experience.length} position(s) listed` : 'Add work experience'
      });
      if (hasExperience) totalScore += 25;

      // Check 4: Education
      const hasEducation = data.education && data.education.length > 0;
      results.push({
        label: 'Education',
        passed: hasEducation,
        message: hasEducation ? 'Education section complete' : 'Add education details'
      });
      if (hasEducation) totalScore += 15;

      // Check 5: Skills
      const hasSkills = data.skills && data.skills.length >= 5;
      results.push({
        label: 'Skills (5+ recommended)',
        passed: hasSkills,
        message: hasSkills ? `${data.skills.length} skills listed` : 'Add more skills (minimum 5)'
      });
      if (hasSkills) totalScore += 15;

      // Check 6: Keywords
      const hasKeywords = data.targetIndustry && data.targetIndustry.length > 0;
      results.push({
        label: 'Industry Keywords',
        passed: !!hasKeywords,
        message: hasKeywords ? 'Industry targeting set' : 'Select target industry for optimization'
      });
      if (hasKeywords) totalScore += 10;

      setChecks(results);
      setScore(totalScore);
      setAnalyzing(false);
    }, 1500);
  };

  useEffect(() => {
    analyzeResume();
  }, [data]);

  const getScoreColor = () => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="ats-score-section">
      <div className="ats-header">
        <div className="ats-title">
          <Target size={20} />
          <h3>ATS Compatibility Score</h3>
        </div>
        <button className="btn-refresh" onClick={analyzeResume} disabled={analyzing}>
          <RefreshCw size={16} className={analyzing ? 'spinning' : ''} />
        </button>
      </div>

      <div className="ats-score-display">
        <div className="score-circle" style={{ borderColor: getScoreColor() }}>
          <span className="score-number" style={{ color: getScoreColor() }}>
            {analyzing ? '...' : score}
          </span>
          <span className="score-label">{getScoreLabel()}</span>
        </div>
      </div>

      <div className="ats-checks">
        {checks.map((check, idx) => (
          <div key={idx} className={`ats-check ${check.passed ? 'passed' : 'failed'}`}>
            {check.passed ? (
              <CheckCircle size={16} className="check-icon passed" />
            ) : (
              <AlertCircle size={16} className="check-icon failed" />
            )}
            <div className="check-content">
              <span className="check-label">{check.label}</span>
              <span className="check-message">{check.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ATSScore;
