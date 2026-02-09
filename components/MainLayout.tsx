import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings as SettingsIcon } from 'lucide-react';
import { PortfolioData, ThemeType } from '../types';
import Navbar from './Navbar';
import { ThemeProvider } from '../contexts/ThemeContext';

interface MainLayoutProps {
  data: PortfolioData;
  toggleDarkMode: () => void;
  setTheme: (theme: ThemeType) => void;
  onDownloadResume: () => void;
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  data, 
  toggleDarkMode, 
  setTheme, 
  onDownloadResume, 
  children 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const themeClasses = useMemo(() => {
    if (!data?.settings) return '';
    return `theme-${data.settings.theme} ${data.settings.darkMode ? 'dark' : ''}`;
  }, [data?.settings?.theme, data?.settings?.darkMode]);

  const themeData = useMemo(() => ({
    'data-theme': data?.settings?.theme || 'minimal',
    'data-dark': data?.settings?.darkMode ? 'true' : 'false'
  }), [data?.settings?.theme, data?.settings?.darkMode]);

  return (
    <ThemeProvider settings={data.settings}>
      <div className={`min-h-screen transition-all duration-500 ${themeClasses}`} {...themeData}>
        <Navbar 
          data={data} 
          toggleDarkMode={toggleDarkMode} 
          setTheme={setTheme}
          onDownloadResume={onDownloadResume}
        />
        
        <main className="container mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
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

export default MainLayout;
