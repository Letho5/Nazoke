import React, { useState } from 'react';
import { X, Download, FileText, Code, FileSpreadsheet, Check, Loader } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { ResumeData } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

function ExportModal({ isOpen, onClose, resumeData }: Props) {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const formats = [
    {
      id: 'pdf',
      name: 'PDF',
      description: 'Best for sharing & printing',
      icon: FileText,
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    },
    {
      id: 'docx',
      name: 'DOCX',
      description: 'Editable in Microsoft Word',
      icon: FileSpreadsheet,
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    {
      id: 'html',
      name: 'HTML',
      description: 'Web-ready format',
      icon: Code,
      color: '#f97316',
      gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
    }
  ];

  const handleExport = async () => {
    if (!selectedFormat) return;
    
    setExporting(true);
    
    try {
      const element = document.getElementById('resume-preview-container');
      
      if (selectedFormat === 'pdf') {
        const options = { 
          margin: 0, 
          filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`, 
          image: { type: 'jpeg', quality: 0.98 }, 
          html2canvas: { scale: 2, useCORS: true }, 
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' } 
        };
        await html2pdf().set(options).from(element).save();
      } else if (selectedFormat === 'html') {
        const content = element?.innerHTML || '';
        const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Resume</title><script src="https://cdn.tailwindcss.com"></script></head><body>${content}</body></html>`;
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.personalInfo.fullName || 'resume'}.html`;
        link.click();
        URL.revokeObjectURL(url);
      } else if (selectedFormat === 'docx') {
        // Fallback simple download for demonstration
        const text = element?.innerText || '';
        const blob = new Blob([text], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${resumeData.personalInfo.fullName || 'resume'}.docx`;
        link.click();
        URL.revokeObjectURL(url);
      }
      
      setExported(true);
      setTimeout(() => {
        onClose();
        setExported(false);
        setSelectedFormat(null);
      }, 1500);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="export-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="export-header">
          <div className="export-icon-wrapper">
            <Download size={24} />
          </div>
          <h2>Download Your Resume</h2>
          <p>Choose your preferred format</p>
        </div>

        <div className="export-formats">
          {formats.map((format) => {
            const Icon = format.icon;
            const isSelected = selectedFormat === format.id;
            
            return (
              <button
                key={format.id}
                className={`export-format-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedFormat(format.id)}
                style={{ '--format-color': format.color, '--format-gradient': format.gradient } as any}
              >
                <div className="format-icon-box" style={{ background: format.gradient }}>
                  <Icon size={24} />
                </div>
                <div className="format-info">
                  <span className="format-name">{format.name}</span>
                  <span className="format-desc">{format.description}</span>
                </div>
                <div className="format-check" style={{ opacity: isSelected ? 1 : 0, transform: isSelected ? 'scale(1)' : 'scale(0.5)' }}>
                  <Check size={20} />
                </div>
              </button>
            );
          })}
        </div>

        <button 
          className={`export-btn ${exported ? 'success' : ''}`}
          onClick={handleExport}
          disabled={!selectedFormat || exporting}
        >
          {exporting ? (
            <>
              <Loader size={20} className="animate-spin" />
              Preparing download...
            </>
          ) : exported ? (
            <>
              <Check size={20} />
              Downloaded!
            </>
          ) : (
            <>
              <Download size={20} />
              Download {selectedFormat ? selectedFormat.toUpperCase() : 'Resume'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ExportModal;