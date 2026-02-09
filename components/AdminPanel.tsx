import React, { useState, useEffect } from 'react';
import { Save, LogOut, BarChart3, Edit3, Layout, Settings as SettingsIcon, Palette } from 'lucide-react';
import { PortfolioData } from '../types';

// Core Sub-components
import AdminAuth from './admin/AdminAuth';
import AdminStats from './admin/AdminStats';
import AdminBranding from './admin/AdminBranding';
import AdminSectionManager from './admin/AdminSectionManager';
import AdminSystemSettings from './admin/AdminSystemSettings';

// Content Editors
import PersonalInfoEditor from './admin/editors/PersonalInfoEditor';
import SocialsEditor from './admin/editors/SocialsEditor';
import SkillsEditor from './admin/editors/SkillsEditor';
import ExperiencesEditor from './admin/editors/ExperiencesEditor';
import EducationEditor from './admin/editors/EducationEditor';
import ProjectsEditor from './admin/editors/ProjectsEditor';

interface AdminPanelProps {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ data, updateData, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'edit' | 'layout' | 'branding' | 'settings'>('stats');
  const [localData, setLocalData] = useState<PortfolioData>(data);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const isFirstTime = !data.settings.adminPassword;

  // Sync local data if external data changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleLogin = (password: string) => {
    if (password === data.settings.adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleRegister = (password: string, confirm: string) => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    const newData = {
      ...localData,
      settings: { ...localData.settings, adminPassword: password }
    };
    updateData(newData);
    setIsAuthenticated(true);
  };

  const handleSave = () => {
    updateData(localData);
    alert('Data saved successfully!');
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const sections = [...(localData.settings.sections || [])].sort((a, b) => a.order - b.order);
    if (direction === 'up' && index > 0) {
      [sections[index].order, sections[index - 1].order] = [sections[index - 1].order, sections[index].order];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index].order, sections[index + 1].order] = [sections[index + 1].order, sections[index].order];
    }
    setLocalData({ ...localData, settings: { ...localData.settings, sections } });
  };

  const toggleSection = (id: string) => {
    const sections = (localData.settings.sections || []).map(s => 
      s.id === id ? { ...s, visible: !s.visible } : s
    );
    setLocalData({ ...localData, settings: { ...localData.settings, sections } });
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This will empty your bio, skills, and projects.')) {
      setLocalData(prev => ({
        ...prev,
        bio: { name: '', role: '', description: '', avatarUrl: prev.bio.avatarUrl },
        programmingSkills: { languages: [], frameworks: [], tools: [] },
        education: [],
        professionalCourses: [],
        softSkills: [],
        workExperiences: [],
        projects: [],
        contactInfo: { facebook: '', linkedin: '', github: '', phoneNumber: '', email: '', website: '' }
      }));
      alert('Data cleared. Click "Save" to persist changes.');
    }
  };

  if (!isAuthenticated) {
    return (
      <AdminAuth 
        isFirstTime={isFirstTime} 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        error={error} 
      />
    );
  }

  const tabs = [
    { id: 'stats', label: 'Analytics', icon: <BarChart3 size={18} /> },
    { id: 'edit', label: 'Content', icon: <Edit3 size={18} /> },
    { id: 'layout', label: 'Layout', icon: <Layout size={18} /> },
    { id: 'branding', label: 'Branding', icon: <Palette size={18} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg gap-4">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)} 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : ''}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={handleSave} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors">
            <Save size={18} /> Save
          </button>
          <button onClick={onLogout} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-500 transition-colors">
            <LogOut size={18} /> Exit
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === 'stats' && <AdminStats visitCount={localData.settings.visitCount} />}
        
        {activeTab === 'branding' && (
          <AdminBranding 
            settings={localData.settings} 
            onUpdateSettings={(s) => setLocalData({ ...localData, settings: s })} 
          />
        )}

        {activeTab === 'layout' && (
          <AdminSectionManager 
            sections={localData.settings.sections || []} 
            onMoveSection={moveSection} 
            onToggleSection={toggleSection} 
          />
        )}

        {activeTab === 'settings' && (
          <AdminSystemSettings 
            settings={localData.settings} 
            onUpdateSettings={(s) => setLocalData({ ...localData, settings: s })} 
            onClearData={clearAllData}
          />
        )}

        {activeTab === 'edit' && (
          <div className="space-y-12 pb-20">
            {/* General Settings (Resume) */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
              <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">General Settings</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase text-zinc-500">Resume Status</label>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${localData.settings.resumeUrl ? 'bg-emerald-500' : 'bg-zinc-300'}`} />
                      <span className="text-sm font-medium">{localData.settings.resumeUrl ? 'Active Link Set' : 'No Link Provided'}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-zinc-500">PDF Resume Link (Optional)</label>
                  <input 
                    type="text" 
                    value={localData.settings.resumeUrl || ''} 
                    onChange={(e) => setLocalData({...localData, settings: {...localData.settings, resumeUrl: e.target.value}})}
                    placeholder="https://..." 
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none" 
                  />
                </div>
              </div>
            </div>

            <PersonalInfoEditor 
              bio={localData.bio} 
              onUpdate={(bio) => setLocalData({ ...localData, bio })} 
            />

            <SocialsEditor 
              contactInfo={localData.contactInfo} 
              onUpdate={(contactInfo) => setLocalData({ ...localData, contactInfo })} 
            />

            <SkillsEditor 
              programmingSkills={localData.programmingSkills} 
              softSkills={localData.softSkills} 
              onUpdateProgramming={(ps) => setLocalData({ ...localData, programmingSkills: ps })}
              onUpdateSoft={(ss) => setLocalData({ ...localData, softSkills: ss })}
            />

            <ExperiencesEditor 
              workExperiences={localData.workExperiences} 
              onUpdate={(we) => setLocalData({ ...localData, workExperiences: we })} 
            />

            <EducationEditor 
              education={localData.education} 
              professionalCourses={localData.professionalCourses}
              onUpdateEducation={(edu) => setLocalData({ ...localData, education: edu })}
              onUpdateCertifications={(certs) => setLocalData({ ...localData, professionalCourses: certs })}
            />

            <ProjectsEditor 
              projects={localData.projects} 
              onUpdate={(proj) => setLocalData({ ...localData, projects: proj })} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
