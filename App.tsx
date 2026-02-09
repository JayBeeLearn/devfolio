import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { PortfolioData, ThemeType } from './types';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import MainLayout from './components/MainLayout';
import { ServiceFactory, BackendType } from './services/factory';
import SetupWizard from './components/SetupWizard';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const service = useMemo(() => {
    const type = import.meta.env.VITE_BACKEND_TYPE as BackendType;
    if (!type) return null;
    return ServiceFactory.createService(type);
  }, []);

  useEffect(() => {
    if (!service) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const profile = await service.getProfile();
        
        const today = new Date().toISOString().split('T')[0];
        const sessionKey = `visited_${today}`;
        
        if (!sessionStorage.getItem(sessionKey)) {
          const newVisitCount = {
            ...profile.settings.visitCount,
            [today]: (profile.settings.visitCount[today] || 0) + 1
          };
          
          const newProfile = {
            ...profile,
            settings: { ...profile.settings, visitCount: newVisitCount }
          };
          
          await service.updateProfile(newProfile);
          setData(newProfile);
          sessionStorage.setItem(sessionKey, 'true');
        } else {
          setData(profile);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [service]);

  const updateData = useCallback(async (newData: PortfolioData) => {
    if (!service) return;
    setData(newData);
    await service.updateProfile(newData);
  }, [service]);

  const toggleDarkMode = () => {
    if (!data) return;
    updateData({
      ...data,
      settings: { ...data.settings, darkMode: !data.settings.darkMode }
    });
  };

  const setTheme = (theme: ThemeType) => {
    if (!data) return;
    updateData({
      ...data,
      settings: { ...data.settings, theme }
    });
  };

  const handleDownloadResume = () => {
    if (data?.settings.resumeUrl) {
      window.open(data.settings.resumeUrl, '_blank');
    } else {
      window.print();
    }
  };

  if (!service) return <SetupWizard />;

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const sortedSections = (data.settings.sections || [])
    .filter(s => s.visible)
    .sort((a, b) => a.order - b.order);

  const titles = data.settings.sectionTitles || {};

  return (
    <MainLayout 
      data={data}
      toggleDarkMode={toggleDarkMode}
      setTheme={setTheme}
      onDownloadResume={handleDownloadResume}
    >
      <Routes>
        <Route path="/" element={
          <div className="space-y-32">
            {sortedSections.map(section => {
              switch(section.id) {
                case 'hero': return <Hero key="hero" data={data} />;
                case 'skills': return <SkillsSection key="skills" data={data} title={titles.skills} />;
                case 'experience': return <ExperienceSection key="experience" data={data} title={titles.experience} educationTitle={titles.education} certificationsTitle={titles.certifications} />;
                case 'projects': return <ProjectsSection key="projects" data={data} title={titles.projects} />;
                case 'contact': return <ContactSection key="contact" data={data} title={titles.contact} />;
                default: return null;
              }
            })}
          </div>
        } />
        <Route path="/admin" element={
          <AdminPanel 
            data={data} 
            updateData={updateData} 
            onLogout={() => { setIsAdmin(false); navigate('/'); }}
          />
        } />
      </Routes>
    </MainLayout>
  );
};

export default App;
