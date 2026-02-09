
import React, { useState } from 'react';
import { Sun, Moon, Download, Palette, Menu, X } from 'lucide-react';
import { PortfolioData, ThemeType } from '../types';

interface NavbarProps {
  data: PortfolioData;
  toggleDarkMode: () => void;
  setTheme: (theme: ThemeType) => void;
  onDownloadResume: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ data, toggleDarkMode, onDownloadResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 no-print">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-bold text-xl">
            {data.bio.name.charAt(0)}
          </div>
          <span className="font-bold text-xl hidden sm:inline">{data.bio.name}</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={onDownloadResume} className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
            <Download size={18} />
            <span>Resume</span>
          </button>

          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {data.settings.darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden p-6 bg-white dark:bg-zinc-900 flex flex-col gap-4 border-t border-zinc-200 dark:border-zinc-800">
          <button onClick={onDownloadResume} className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
            <Download size={18} />
            <span>Download Resume</span>
          </button>
          
          <button onClick={toggleDarkMode} className="flex items-center justify-center gap-2 p-3 border border-zinc-200 dark:border-zinc-700 rounded-xl">
             {data.settings.darkMode ? <Sun size={20} /> : <Moon size={20} />}
             <span>Toggle Theme</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
