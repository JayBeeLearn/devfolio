import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { AppSettings } from '../../types';

interface AdminBrandingProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
}

const AdminBranding: React.FC<AdminBrandingProps> = ({ settings, onUpdateSettings }) => {
  const handleTitleChange = (key: string, value: string) => {
    const newTitles = { ...settings.sectionTitles, [key]: value };
    onUpdateSettings({ ...settings, sectionTitles: newTitles });
  };

  const handleColorChange = (mode: 'light' | 'dark', key: string, value: string) => {
    const newColors = { 
      ...settings.customColors, 
      [mode]: { ...settings.customColors?.[mode], [key]: value } 
    };
    onUpdateSettings({ ...settings, customColors: newColors as any });
  };

  const titleFields = [
    { label: 'Skills Section', key: 'skills' },
    { label: 'Experience Section', key: 'experience' },
    { label: 'Education Sub-section', key: 'education' },
    { label: 'Certifications Sub-section', key: 'certifications' },
    { label: 'Projects Section', key: 'projects' },
    { label: 'Contact Section', key: 'contact' }
  ];

  const colorFields = [
    { label: 'Primary Accent', key: 'primary' },
    { label: 'Main Background', key: 'bgMain' },
    { label: 'Main Text', key: 'textMain' },
    { label: 'Card Background', key: 'cardBg' },
    { label: 'Border Color', key: 'border' }
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Portfolio Identity</h3>
        <p className="text-zinc-500 text-sm">Customize the headings for your portfolio sections.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {titleFields.map((field) => (
            <div key={field.key} className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-500">{field.label}</label>
              <input 
                type="text" 
                value={(settings.sectionTitles as any)?.[field.key] || ''}
                onChange={(e) => handleTitleChange(field.key, e.target.value)}
                placeholder={`Custom ${field.label}...`}
                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none" 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-8">
        <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Theme Color Palette</h3>
        <p className="text-zinc-500 text-sm">Fine-tune your portfolio's colors for both light and dark modes.</p>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Light Mode Colors */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Sun size={20} className="text-amber-500" />
              <h4 className="font-black uppercase tracking-widest text-sm">Light Mode</h4>
            </div>
            <div className="space-y-4">
              {colorFields.map((color) => (
                <div key={color.key} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{color.label}</span>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={(settings.customColors?.light as any)?.[color.key] || '#000000'}
                      onChange={(e) => handleColorChange('light', color.key, e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                    />
                    <input 
                      type="text"
                      value={(settings.customColors?.light as any)?.[color.key] || ''}
                      onChange={(e) => handleColorChange('light', color.key, e.target.value)}
                      placeholder="HEX"
                      className="w-24 px-2 py-1 text-xs font-mono uppercase rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dark Mode Colors */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <Moon size={20} className="text-blue-500" />
              <h4 className="font-black uppercase tracking-widest text-sm">Dark Mode</h4>
            </div>
            <div className="space-y-4">
              {colorFields.map((color) => (
                <div key={color.key} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{color.label}</span>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={(settings.customColors?.dark as any)?.[color.key] || '#ffffff'}
                      onChange={(e) => handleColorChange('dark', color.key, e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                    />
                    <input 
                      type="text"
                      value={(settings.customColors?.dark as any)?.[color.key] || ''}
                      onChange={(e) => handleColorChange('dark', color.key, e.target.value)}
                      placeholder="HEX"
                      className="w-24 px-2 py-1 text-xs font-mono uppercase rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-zinc-500 italic mt-4 text-center">Note: Colors are applied dynamically and will override default theme values. Transparent values or empty fields will use theme defaults.</p>
      </div>
    </div>
  );
};

export default AdminBranding;
