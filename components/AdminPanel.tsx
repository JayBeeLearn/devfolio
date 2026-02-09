
import React, { useState } from 'react';
import { Save, LogOut, ChevronLeft, BarChart3, Edit3, Trash2, Plus, Upload, Layout, Settings as SettingsIcon, Monitor, Sparkles, Palette, Sun, Moon } from 'lucide-react';
import { PortfolioData } from '../types';

interface AdminPanelProps {
  data: PortfolioData;
  updateData: (newData: PortfolioData) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ data, updateData, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'edit' | 'layout' | 'branding' | 'settings'>('stats');
  const [localData, setLocalData] = useState<PortfolioData>(data);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Determine if it's the first time setup (no password set)
  const isFirstTime = !data.settings.adminPassword;

  // Ensure sections and branding exists in local state
  React.useEffect(() => {
    let updated = false;
    const nextSettings = { ...localData.settings };

    if (!nextSettings.sections) {
        nextSettings.sections = [
            { id: 'hero', name: 'Hero Section', visible: true, order: 1 },
            { id: 'skills', name: 'Skills & Tech', visible: true, order: 2 },
            { id: 'experience', name: 'Work Experience', visible: true, order: 3 },
            { id: 'projects', name: 'Projects', visible: true, order: 4 },
            { id: 'contact', name: 'Contact Info', visible: true, order: 5 },
        ];
        updated = true;
    }

    if (!nextSettings.sectionTitles) {
        nextSettings.sectionTitles = {
            skills: 'Explored Tech',
            experience: 'Timeline',
            education: 'Knowledge',
            certifications: 'Verified',
            projects: 'Showcase',
            contact: "Let's Talk"
        };
        updated = true;
    }

    if (!nextSettings.customColors) {
        nextSettings.customColors = {
            light: { primary: '', bgMain: '', textMain: '', cardBg: '', border: '' },
            dark: { primary: '', bgMain: '', textMain: '', cardBg: '', border: '' }
        };
        updated = true;
    }

    if (updated) {
        setLocalData(prev => ({
            ...prev,
            settings: nextSettings
        }));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === data.settings.adminPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
    }
    if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
    }
    
    // Save the new password
    const newData = {
        ...localData,
        settings: { ...localData.settings, adminPassword: password }
    };
    updateData(newData);
    // Directly authenticate after setting
    setIsAuthenticated(true);
  };

  const handleSave = () => {
    updateData(localData);
    alert('Data saved successfully!');
  };

  // ... (keep moveSection and toggleSection logic)
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const sections = [...(localData.settings.sections || [])].sort((a, b) => a.order - b.order);
    if (direction === 'up' && index > 0) {
        const temp = sections[index].order;
        sections[index].order = sections[index - 1].order;
        sections[index - 1].order = temp;
    } else if (direction === 'down' && index < sections.length - 1) {
        const temp = sections[index].order;
        sections[index].order = sections[index + 1].order;
        sections[index + 1].order = temp;
    }
    setLocalData({
        ...localData,
        settings: { ...localData.settings, sections }
    });
  };

  const toggleSection = (id: string) => {
      const sections = (localData.settings.sections || []).map(s => 
          s.id === id ? { ...s, visible: !s.visible } : s
      );
      setLocalData({
          ...localData,
          settings: { ...localData.settings, sections }
      });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl">
          <h2 className="text-3xl font-black mb-2 text-center">
              {isFirstTime ? 'Admin Setup' : 'Admin Access'}
          </h2>
          <p className="text-center text-zinc-500 mb-6">
              {isFirstTime ? 'Create a password to secure your portfolio.' : 'Enter your password to continue.'}
          </p>
          
          <form onSubmit={isFirstTime ? handleRegister : handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isFirstTime ? "Create password..." : "Enter password..."}
              className="w-full px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 outline-none border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
            />
            
            {isFirstTime && (
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password..."
                  className="w-full px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 outline-none border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500"
                />
            )}

            {error && <p className="text-rose-500 text-sm font-medium text-center">{error}</p>}
            
            <button className="w-full py-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-xl font-bold transition-transform active:scale-95">
              {isFirstTime ? 'Set Password & Login' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg gap-4">
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button 
            onClick={() => setActiveTab('stats')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'stats' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : ''}`}
          >
            <BarChart3 size={18} /> Analytics
          </button>
          <button 
            onClick={() => setActiveTab('edit')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'edit' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : ''}`}
          >
            <Edit3 size={18} /> Content
          </button>
          <button 
            onClick={() => setActiveTab('layout')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'layout' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : ''}`}
          >
            <Layout size={18} /> Layout
          </button>
          <button 
            onClick={() => setActiveTab('branding')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'branding' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : ''}`}
          >
            <Palette size={18} /> Branding
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${activeTab === 'settings' ? 'bg-zinc-100 dark:bg-zinc-800 font-bold' : ''}`}
          >
            <SettingsIcon size={18} /> Settings
          </button>
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

      {activeTab === 'stats' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg text-center">
            <h4 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-2">Total Visits</h4>
            <p className="text-5xl font-black">{(Object.values(localData.settings.visitCount) as number[]).reduce((a: number, b: number) => a + b, 0)}</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg lg:col-span-3">
             <h4 className="text-zinc-500 uppercase text-xs font-bold tracking-widest mb-6">Daily Visitors (Last 7 Days)</h4>
             <div className="flex items-end justify-between h-40 gap-2">
                {Object.entries(localData.settings.visitCount).slice(-7).map(([date, count]) => (
                  <div key={date} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-blue-500 rounded-t-lg transition-all" style={{ height: `${Math.min(100, ((count as number) / 20) * 100)}%` }} />
                    <span className="text-[10px] font-mono text-zinc-500 rotate-45 mt-4">{date.split('-').slice(1).join('/')}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'branding' && (
        <div className="space-y-12 pb-20">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Portfolio Identity</h3>
            <p className="text-zinc-500">Customize the headings for your portfolio sections.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: 'Skills Section', key: 'skills' as const },
                { label: 'Experience Section', key: 'experience' as const },
                { label: 'Education Sub-section', key: 'education' as const },
                { label: 'Certifications Sub-section', key: 'certifications' as const },
                { label: 'Projects Section', key: 'projects' as const },
                { label: 'Contact Section', key: 'contact' as const }
              ].map((title) => (
                <div key={title.key} className="space-y-2">
                  <label className="text-xs font-bold uppercase text-zinc-500">{title.label}</label>
                  <input 
                    type="text" 
                    value={localData.settings.sectionTitles?.[title.key] || ''}
                    onChange={(e) => {
                      const newTitles = { ...localData.settings.sectionTitles, [title.key]: e.target.value };
                      setLocalData({ ...localData, settings: { ...localData.settings, sectionTitles: newTitles } });
                    }}
                    placeholder={`Custom ${title.label}...`}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none" 
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-8">
            <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Theme Color Palette</h3>
            <p className="text-zinc-500">Fine-tune your portfolio's colors for both light and dark modes.</p>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Light Mode Colors */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sun size={20} className="text-amber-500" />
                  <h4 className="font-black uppercase tracking-widest text-sm">Light Mode</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Primary Accent', key: 'primary' as const },
                    { label: 'Main Background', key: 'bgMain' as const },
                    { label: 'Main Text', key: 'textMain' as const },
                    { label: 'Card Background', key: 'cardBg' as const },
                    { label: 'Border Color', key: 'border' as const }
                  ].map((color) => (
                    <div key={color.key} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{color.label}</span>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          value={localData.settings.customColors?.light?.[color.key] || '#000000'}
                          onChange={(e) => {
                            const newColors = { ...localData.settings.customColors?.light, [color.key]: e.target.value };
                            setLocalData({ ...localData, settings: { ...localData.settings, customColors: { ...localData.settings.customColors!, light: newColors } } });
                          }}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                        />
                        <input 
                          type="text"
                          value={localData.settings.customColors?.light?.[color.key] || ''}
                          onChange={(e) => {
                            const newColors = { ...localData.settings.customColors?.light, [color.key]: e.target.value };
                            setLocalData({ ...localData, settings: { ...localData.settings, customColors: { ...localData.settings.customColors!, light: newColors } } });
                          }}
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
                  {[
                    { label: 'Primary Accent', key: 'primary' as const },
                    { label: 'Main Background', key: 'bgMain' as const },
                    { label: 'Main Text', key: 'textMain' as const },
                    { label: 'Card Background', key: 'cardBg' as const },
                    { label: 'Border Color', key: 'border' as const }
                  ].map((color) => (
                    <div key={color.key} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-sm font-bold text-zinc-600 dark:text-zinc-400">{color.label}</span>
                      <div className="flex items-center gap-3">
                        <input 
                          type="color" 
                          value={localData.settings.customColors?.dark?.[color.key] || '#ffffff'}
                          onChange={(e) => {
                            const newColors = { ...localData.settings.customColors?.dark, [color.key]: e.target.value };
                            setLocalData({ ...localData, settings: { ...localData.settings, customColors: { ...localData.settings.customColors!, dark: newColors } } });
                          }}
                          className="w-10 h-10 rounded-lg cursor-pointer bg-transparent"
                        />
                        <input 
                          type="text"
                          value={localData.settings.customColors?.dark?.[color.key] || ''}
                          onChange={(e) => {
                            const newColors = { ...localData.settings.customColors?.dark, [color.key]: e.target.value };
                            setLocalData({ ...localData, settings: { ...localData.settings, customColors: { ...localData.settings.customColors!, dark: newColors } } });
                          }}
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
      )}

      {activeTab === 'layout' && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Section Management</h3>
            <p className="text-zinc-500">Toggle visibility and reorder sections to customize your portfolio.</p>
            <div className="space-y-3">
                {[...(localData.settings.sections || [])].sort((a, b) => a.order - b.order).map((section, idx, arr) => (
                    <div key={section.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-4">
                            <input 
                                type="checkbox" 
                                checked={section.visible} 
                                onChange={() => toggleSection(section.id)}
                                className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className={`font-bold ${!section.visible ? 'opacity-50 line-through' : ''}`}>{section.name}</span>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => moveSection(idx, 'up')} 
                                disabled={idx === 0}
                                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-30"
                            >
                                ▲
                            </button>
                            <button 
                                onClick={() => moveSection(idx, 'down')} 
                                disabled={idx === arr.length - 1}
                                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-30"
                            >
                                ▼
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

      {activeTab === 'settings' && (
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">System Settings</h3>
            
            <div className="grid gap-6">
                <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-black/20 border border-[var(--border-color)]">
                    <h4 className="font-black text-zinc-500 mb-6 uppercase text-xs tracking-[0.3em]">Master Identity Selection</h4>
                    <div className="grid md:grid-cols-3 gap-6">
                        {(['minimal', 'cyberpunk', 'elegant'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setLocalData({ ...localData, settings: { ...localData.settings, theme: t } })}
                                className={`group relative p-6 rounded-3xl border-2 transition-all duration-500 flex flex-col items-start gap-4 text-left overflow-hidden ${
                                    localData.settings.theme === t 
                                    ? 'border-[var(--primary)] bg-[var(--primary-glow)] scale-[1.02] shadow-2xl' 
                                    : 'border-[var(--border-color)] bg-transparent hover:border-zinc-400 dark:hover:border-zinc-600'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12 ${
                                    t === 'minimal' ? 'bg-zinc-900 text-white' : 
                                    t === 'cyberpunk' ? 'bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]' : 
                                    'bg-amber-900 text-white'
                                }`}>
                                    {t === 'minimal' && <Monitor size={24} />}
                                    {t === 'cyberpunk' && <Sparkles size={24} />}
                                    {t === 'elegant' && <Layout size={24} />}
                                </div>
                                <div>
                                    <span className="font-black text-xl block mb-1 uppercase tracking-tighter">{t}</span>
                                    <span className="text-xs text-zinc-500 font-medium leading-relaxed">
                                        {t === 'minimal' && 'High-performance professional aesthetic with clean lines.'}
                                        {t === 'cyberpunk' && 'Vibrant neon accents with monospace technical accents.'}
                                        {t === 'elegant' && 'Sophisticated serif typography and spacious layouts.'}
                                    </span>
                                </div>
                                {localData.settings.theme === t && (
                                    <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[var(--primary)] animate-ping" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-bold text-blue-500 mb-2 uppercase text-xs tracking-widest">Backend Configuration</h4>
                    <p className="text-sm text-zinc-500 mb-2">Current Context:</p>
                    <code className="block bg-black/20 p-2 rounded text-xs font-mono mb-4">
                        BACKEND_TYPE: {import.meta.env.VITE_BACKEND_TYPE || 'Not Configured'}
                    </code>
                    <p className="text-xs text-zinc-400">
                        To change the backend, you must update the <code className="bg-zinc-800 px-1 rounded">.env</code> file in your project root and restart the server.
                    </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <h4 className="font-bold text-rose-500 mb-2">Danger Zone</h4>
                    <p className="text-sm text-zinc-500 mb-4">Irreversible actions.</p>
                    <button 
                        onClick={() => {
                            if (confirm('Are you sure you want to clear all data? This will empty your bio, skills, and projects.')) {
                                setLocalData(prev => ({
                                    ...prev,
                                    bio: {
                                        name: '',
                                        role: '',
                                        description: '',
                                        avatarUrl: prev.bio.avatarUrl // Keep avatar or clear? Let's keep for now or they lose the placeholder
                                    },
                                    programmingSkills: {
                                        languages: [],
                                        frameworks: [],
                                        tools: []
                                    },
                                    education: [],
                                    professionalCourses: [],
                                    softSkills: [],
                                    workExperiences: [],
                                    projects: [],
                                    contactInfo: {
                                        facebook: '',
                                        linkedin: '',
                                        github: '',
                                        phoneNumber: '',
                                        email: '',
                                        website: ''
                                    }
                                }));
                                alert('Data cleared. Click "Save" to persist changes.');
                            }
                        }}
                        className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700"
                    >
                        Clear All Data
                    </button>
                </div>
            </div>
          </div>
      )}

      {activeTab === 'edit' && (
        <div className="space-y-12 pb-20">
          {/* Settings Section */}
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
                <div className="flex gap-2">
                   <input 
                    type="text" 
                    value={localData.settings.resumeUrl || ''} 
                    onChange={(e) => setLocalData({...localData, settings: {...localData.settings, resumeUrl: e.target.value}})}
                    placeholder="https://..." 
                    className="flex-1 px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 outline-none" 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Personal Info</h3>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500">Full Name</label>
                <input 
                  type="text" 
                  value={localData.bio.name}
                  onChange={(e) => setLocalData({...localData, bio: {...localData.bio, name: e.target.value}})}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500">Role</label>
                <input 
                  type="text" 
                  value={localData.bio.role}
                  onChange={(e) => setLocalData({...localData, bio: {...localData.bio, role: e.target.value}})}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-500">Short Bio</label>
              <textarea 
                rows={4} 
                value={localData.bio.description}
                onChange={(e) => setLocalData({...localData, bio: {...localData.bio, description: e.target.value}})}
                className="w-full px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 resize-none" 
              />
            </div>
          </div>

          {/* Programming Skills Section */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Programming Skills</h3>
            {['languages', 'frameworks', 'tools'].map((cat) => (
              <div key={cat} className="space-y-4">
                <h4 className="font-bold capitalize text-lg text-zinc-500">{cat}</h4>
                <div className="grid gap-4">
                  {(localData.programmingSkills as any)[cat].map((skill: any, idx: number) => (
                    <div key={idx} className="flex gap-4 items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                       <input 
                        type="text" 
                        value={skill.name} 
                        onChange={(e) => {
                          const newList = [...(localData.programmingSkills as any)[cat]];
                          newList[idx].name = e.target.value;
                          setLocalData({...localData, programmingSkills: {...localData.programmingSkills, [cat]: newList}});
                        }}
                        className="flex-1 bg-transparent font-bold outline-none"
                        placeholder="Skill name"
                      />
                       <div className="flex items-center gap-2">
                         <span className="text-[10px] text-zinc-500">Proficiency</span>
                         <input 
                          type="number" 
                          value={skill.proficiency} 
                          onChange={(e) => {
                            const newList = [...(localData.programmingSkills as any)[cat]];
                            newList[idx].proficiency = parseInt(e.target.value);
                            setLocalData({...localData, programmingSkills: {...localData.programmingSkills, [cat]: newList}});
                          }}
                          className="w-16 bg-transparent text-right outline-none border-b border-zinc-300"
                        />
                        <span className="text-[10px] text-zinc-500">%</span>
                       </div>
                      <button 
                        onClick={() => {
                          const newList = [...(localData.programmingSkills as any)[cat]].filter((_, i) => i !== idx);
                          setLocalData({...localData, programmingSkills: {...localData.programmingSkills, [cat]: newList}});
                        }}
                        className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newList = [...(localData.programmingSkills as any)[cat], { name: 'New Skill', years: 1, proficiency: 50 }];
                      setLocalData({...localData, programmingSkills: {...localData.programmingSkills, [cat]: newList}});
                    }}
                    className="flex items-center gap-2 text-blue-500 font-bold text-sm hover:underline"
                  >
                    <Plus size={16} /> Add {cat}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Work Experience Section */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-2xl font-black">Work Experience</h3>
              <button 
                onClick={() => setLocalData({
                  ...localData, 
                  workExperiences: [...localData.workExperiences, { place: 'Company Name', position: 'Role', startYear: 2024, endYear: 'present', duties: [] }]
                })}
                className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
              >
                <Plus size={16} /> Add Experience
              </button>
            </div>
            <div className="space-y-8">
              {localData.workExperiences.map((exp, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 relative group">
                  <button 
                    onClick={() => setLocalData({ ...localData, workExperiences: localData.workExperiences.filter((_, i) => i !== idx) })}
                    className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" value={exp.place} placeholder="Company"
                      onChange={(e) => {
                        const next = [...localData.workExperiences];
                        next[idx].place = e.target.value;
                        setLocalData({...localData, workExperiences: next});
                      }}
                      className="bg-transparent font-bold text-lg outline-none"
                    />
                    <input 
                      type="text" value={exp.position} placeholder="Position"
                      onChange={(e) => {
                        const next = [...localData.workExperiences];
                        next[idx].position = e.target.value;
                        setLocalData({...localData, workExperiences: next});
                      }}
                      className="bg-transparent text-zinc-500 outline-none"
                    />
                    <div className="flex gap-2 items-center">
                      <input 
                        type="text" value={exp.startYear} placeholder="Start"
                        onChange={(e) => {
                          const next = [...localData.workExperiences];
                          next[idx].startYear = e.target.value;
                          setLocalData({...localData, workExperiences: next});
                        }}
                        className="w-24 bg-transparent outline-none border-b border-zinc-300 dark:border-zinc-700"
                      />
                      <span>-</span>
                      <input 
                        type="text" value={exp.endYear} placeholder="End"
                        onChange={(e) => {
                          const next = [...localData.workExperiences];
                          next[idx].endYear = e.target.value;
                          setLocalData({...localData, workExperiences: next});
                        }}
                        className="w-24 bg-transparent outline-none border-b border-zinc-300 dark:border-zinc-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-500">Key Duties (One per line)</label>
                    <textarea 
                      value={exp.duties.join('\n')}
                      onChange={(e) => {
                        const next = [...localData.workExperiences];
                        next[idx].duties = e.target.value.split('\n');
                        setLocalData({...localData, workExperiences: next});
                      }}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 text-sm min-h-[100px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-2xl font-black">Education</h3>
              <button 
                onClick={() => setLocalData({
                  ...localData, 
                  education: [...localData.education, { school: 'University Name', course: 'Course Name', year: '2020-2024', cgpa: 4.0, class: 'First Class' }]
                })}
                className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
              >
                <Plus size={16} /> Add Education
              </button>
            </div>
            <div className="space-y-6">
              {localData.education.map((edu, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 relative group">
                  <button 
                    onClick={() => setLocalData({ ...localData, education: localData.education.filter((_, i) => i !== idx) })}
                    className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input 
                      type="text" value={edu.school} placeholder="School"
                      onChange={(e) => {
                        const next = [...localData.education];
                        next[idx].school = e.target.value;
                        setLocalData({...localData, education: next});
                      }}
                      className="bg-transparent font-bold outline-none"
                    />
                    <input 
                      type="text" value={edu.course} placeholder="Course"
                      onChange={(e) => {
                        const next = [...localData.education];
                        next[idx].course = e.target.value;
                        setLocalData({...localData, education: next});
                      }}
                      className="bg-transparent outline-none"
                    />
                    <input 
                      type="text" value={edu.year} placeholder="Year Range"
                      onChange={(e) => {
                        const next = [...localData.education];
                        next[idx].year = e.target.value;
                        setLocalData({...localData, education: next});
                      }}
                      className="bg-transparent text-sm text-zinc-500 outline-none"
                    />
                    <div className="flex gap-4">
                      <input 
                        type="number" value={edu.cgpa || ''} placeholder="CGPA"
                        onChange={(e) => {
                          const next = [...localData.education];
                          next[idx].cgpa = parseFloat(e.target.value);
                          setLocalData({...localData, education: next});
                        }}
                        className="w-20 bg-transparent text-sm outline-none border-b border-zinc-300"
                      />
                      <input 
                        type="text" value={edu.class || ''} placeholder="Class"
                        onChange={(e) => {
                          const next = [...localData.education];
                          next[idx].class = e.target.value;
                          setLocalData({...localData, education: next});
                        }}
                        className="bg-transparent text-sm outline-none border-b border-zinc-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Courses Section */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-2xl font-black">Certifications</h3>
              <button 
                onClick={() => setLocalData({
                  ...localData, 
                  professionalCourses: [...localData.professionalCourses, { certification: 'Course Name', institution: 'Organization', year: '2024', skills: [] }]
                })}
                className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
              >
                <Plus size={16} /> Add Certification
              </button>
            </div>
            <div className="space-y-6">
              {localData.professionalCourses.map((cert, idx) => (
                <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 relative group">
                  <button 
                    onClick={() => setLocalData({ ...localData, professionalCourses: localData.professionalCourses.filter((_, i) => i !== idx) })}
                    className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={20} />
                  </button>
                  <div className="grid md:grid-cols-3 gap-4">
                    <input 
                      type="text" value={cert.certification} placeholder="Certification"
                      onChange={(e) => {
                        const next = [...localData.professionalCourses];
                        next[idx].certification = e.target.value;
                        setLocalData({...localData, professionalCourses: next});
                      }}
                      className="bg-transparent font-bold outline-none md:col-span-1"
                    />
                    <input 
                      type="text" value={cert.institution} placeholder="Institution"
                      onChange={(e) => {
                        const next = [...localData.professionalCourses];
                        next[idx].institution = e.target.value;
                        setLocalData({...localData, professionalCourses: next});
                      }}
                      className="bg-transparent outline-none"
                    />
                    <input 
                      type="text" value={cert.year} placeholder="Year"
                      onChange={(e) => {
                        const next = [...localData.professionalCourses];
                        next[idx].year = e.target.value;
                        setLocalData({...localData, professionalCourses: next});
                      }}
                      className="bg-transparent outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <h3 className="text-2xl font-black">Projects</h3>
              <button 
                onClick={() => setLocalData({
                  ...localData, 
                  projects: [...localData.projects, { name: 'Project Name', website: '', techStack: [], description: '', duties: [], roles: [], startDate: '2024-01', endDate: null }]
                })}
                className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
              >
                <Plus size={16} /> Add Project
              </button>
            </div>
            <div className="space-y-12">
              {localData.projects.map((project, idx) => (
                <div key={idx} className="p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-200 dark:border-zinc-700 relative group space-y-4">
                  <button 
                    onClick={() => setLocalData({ ...localData, projects: localData.projects.filter((_, i) => i !== idx) })}
                    className="absolute top-6 right-6 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={24} />
                  </button>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-zinc-500">Project Name</label>
                       <input 
                        type="text" value={project.name}
                        onChange={(e) => {
                          const next = [...localData.projects];
                          next[idx].name = e.target.value;
                          setLocalData({...localData, projects: next});
                        }}
                        className="w-full bg-transparent font-black text-xl outline-none border-b border-zinc-200"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase text-zinc-500">Website URL</label>
                       <input 
                        type="text" value={project.website}
                        onChange={(e) => {
                          const next = [...localData.projects];
                          next[idx].website = e.target.value;
                          setLocalData({...localData, projects: next});
                        }}
                        className="w-full bg-transparent outline-none border-b border-zinc-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-500">Description</label>
                    <textarea 
                      value={project.description}
                      onChange={(e) => {
                        const next = [...localData.projects];
                        next[idx].description = e.target.value;
                        setLocalData({...localData, projects: next});
                      }}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 min-h-[100px]"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Tech Stack (Comma separated)</label>
                      <input 
                        type="text" value={project.techStack.join(', ')}
                        onChange={(e) => {
                          const next = [...localData.projects];
                          next[idx].techStack = e.target.value.split(',').map(s => s.trim());
                          setLocalData({...localData, projects: next});
                        }}
                        className="w-full bg-transparent outline-none border-b border-zinc-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-zinc-500">Roles (Comma separated)</label>
                      <input 
                        type="text" value={project.roles.join(', ')}
                        onChange={(e) => {
                          const next = [...localData.projects];
                          next[idx].roles = e.target.value.split(',').map(s => s.trim());
                          setLocalData({...localData, projects: next});
                        }}
                        className="w-full bg-transparent outline-none border-b border-zinc-200"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-zinc-500">Key Achievements (One per line)</label>
                    <textarea 
                      value={project.duties.join('\n')}
                      onChange={(e) => {
                        const next = [...localData.projects];
                        next[idx].duties = e.target.value.split('\n');
                        setLocalData({...localData, projects: next});
                      }}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 text-sm"
                      placeholder="Added feature X..."
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-20" />
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
