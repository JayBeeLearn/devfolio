
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, 
  Sun, 
  Download, 
  Settings as SettingsIcon, 
  User, 
  LogOut,
  ChevronRight,
  Monitor,
  Layout,
  FileText
} from 'lucide-react';
import { PortfolioData, ThemeType } from './types';
import { INITIAL_DATA } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';
import { PortfolioService } from './services/types';
import { ServiceFactory, BackendType } from './services/factory';
import SetupWizard from './components/SetupWizard';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    const newData = {
      ...data,
      settings: { ...data.settings, darkMode: !data.settings.darkMode }
    };
    updateData(newData);
  };

  const setTheme = (theme: ThemeType) => {
    if (!data) return;
    const newData = {
      ...data,
      settings: { ...data.settings, theme }
    };
    updateData(newData);
  };

  const themeClasses = useMemo(() => {
    if (!data?.settings) return '';
    return `theme-${data.settings.theme} ${data.settings.darkMode ? 'dark' : ''}`;
  }, [data?.settings?.theme, data?.settings?.darkMode]);

  const themeData = useMemo(() => ({
    'data-theme': data?.settings?.theme || 'minimal',
    'data-dark': data?.settings?.darkMode ? 'true' : 'false'
  }), [data?.settings?.theme, data?.settings?.darkMode]);

  const handleDownloadResume = () => {
    if (data?.settings.resumeUrl) {
      window.open(data.settings.resumeUrl, '_blank');
    } else {
      window.print();
    }
  };

  if (!service) {
    return <SetupWizard />;
  }

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
    <ThemeProvider settings={data.settings}>
      <div className={`min-h-screen transition-all duration-500 ${themeClasses}`} {...themeData}>
        <Navbar 
          data={data} 
          toggleDarkMode={toggleDarkMode} 
          setTheme={setTheme}
          onDownloadResume={handleDownloadResume}
        />
        
        <main className="container mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-32"
                >
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
                </motion.div>
              } />
              <Route path="/admin" element={
                <AdminPanel 
                  data={data} 
                  updateData={updateData} 
                  onLogout={() => { setIsAdmin(false); navigate('/'); }}
                />
              } />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="fixed bottom-6 right-6 no-print z-50">
          <button
            onClick={() => navigate('/admin')}
            className="p-3 rounded-full bg-zinc-800 text-white hover:bg-zinc-700 shadow-lg flex items-center justify-center transition-all hover:scale-110"
            title="Admin Panel"
          >
            <SettingsIcon size={20} />
          </button>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;
