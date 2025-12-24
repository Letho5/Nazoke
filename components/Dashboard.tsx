import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, Clock, MoreVertical } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

function Dashboard({ user, onLogout }: { user: any, onLogout: () => void }) {
  const navigate = useNavigate();
  const { dispatch } = useResume();
  const [resumes, setResumes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Load user's resumes on mount
  useEffect(() => {
    loadUserResumes();
  }, [user]);

  const loadUserResumes = () => {
    const allUsers = JSON.parse(localStorage.getItem('resumeai_users') || '[]');
    const currentUser = allUsers.find((u: any) => u.id === user.id);
    if (currentUser && currentUser.resumes) {
      setResumes(currentUser.resumes);
    }
  };

  const saveUserResumes = (updatedResumes: any[]) => {
    const allUsers = JSON.parse(localStorage.getItem('resumeai_users') || '[]');
    const userIndex = allUsers.findIndex((u: any) => u.id === user.id);
    if (userIndex !== -1) {
      allUsers[userIndex].resumes = updatedResumes;
      localStorage.setItem('resumeai_users', JSON.stringify(allUsers));
      setResumes(updatedResumes);
    }
  };

  const handleCreateResume = () => {
    if (!resumeTitle.trim()) return;
    
    const newResume = {
      id: Date.now().toString(),
      title: resumeTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data: {
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
        accentColor: '#3b82f6',
        targetIndustry: '',
        projects: []
      }
    };

    const updatedResumes = [...resumes, newResume];
    saveUserResumes(updatedResumes);
    
    // Load resume into context and navigate
    dispatch({ type: 'LOAD_RESUME', payload: newResume.data });
    dispatch({ type: 'SET_RESUME_ID', payload: newResume.id });
    
    setShowModal(false);
    setResumeTitle('');
    navigate(`/builder/${newResume.id}`);
  };

  const handleOpenResume = (resume: any) => {
    dispatch({ type: 'LOAD_RESUME', payload: resume.data });
    dispatch({ type: 'SET_RESUME_ID', payload: resume.id });
    navigate(`/builder/${resume.id}`);
  };

  const handleDeleteResume = (resumeId: string) => {
    const updatedResumes = resumes.filter(r => r.id !== resumeId);
    saveUserResumes(updatedResumes);
    setActiveMenu(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <Link to="/" className="dashboard-logo">
          <span className="logo-icon">R</span>
          resume<span className="logo-dot">.</span>
        </Link>
        
        <div className="dashboard-user">
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-email">{user.email}</span>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <h1>Welcome back, {user.name.split(' ')[0]}!</h1>
          <p>Create a new resume or continue working on an existing one.</p>
        </div>

        <div className="resumes-grid">
          {/* Create New Card */}
          <button className="create-resume-card" onClick={() => setShowModal(true)}>
            <div className="create-icon">
              <Plus size={28} />
            </div>
            <span className="create-text">Create New Resume</span>
          </button>

          {/* Existing Resumes */}
          {resumes.map((resume) => (
            <div key={resume.id} className="resume-card" onClick={() => handleOpenResume(resume)}>
              <div className="resume-preview-mini">
                <FileText size={32} />
              </div>
              <div className="resume-info">
                <h3 className="resume-title">{resume.title}</h3>
                <span className="resume-date">
                  <Clock size={12} />
                  {formatDate(resume.updatedAt)}
                </span>
              </div>
              <button 
                className="resume-menu-btn"
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === resume.id ? null : resume.id); }}
              >
                <MoreVertical size={18} />
              </button>
              
              {activeMenu === resume.id && (
                <div className="resume-menu">
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteResume(resume.id); }}>
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Resume</h2>
            <p>Give your resume a name to get started</p>
            
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Software Engineer Resume"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreateResume()}
              autoFocus
            />
            
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleCreateResume} disabled={!resumeTitle.trim()}>
                Create Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;