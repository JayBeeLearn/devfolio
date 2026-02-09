import React from 'react';
import { Monitor, Sparkles, Layout } from 'lucide-react';
import { AppSettings, ThemeType } from '../../types';

interface AdminSystemSettingsProps {
  settings: AppSettings;
  onUpdateSettings: (settings: AppSettings) => void;
  onClearData: () => void;
}

const AdminSystemSettings: React.FC<AdminSystemSettingsProps> = ({ settings, onUpdateSettings, onClearData }) => {
  const themes: { id: ThemeType; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
    { 
      id: 'minimal', 
      label: 'Minimal', 
      desc: 'High-performance professional aesthetic with clean lines.', 
      icon: <Monitor size={24} />,
      color: 'bg-zinc-900'
    },
    { 
      id: 'cyberpunk', 
      label: 'Cyberpunk', 
      desc: 'Vibrant neon accents with monospace technical accents.', 
      icon: <Sparkles size={24} />,
      color: 'bg-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.4)]'
    },
    { 
      id: 'elegant', 
      label: 'Elegant', 
      desc: 'Sophisticated serif typography and spacious layouts.', 
      icon: <Layout size={24} />,
      color: 'bg-amber-900'
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
      <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">System Settings</h3>
      
      <div className="grid gap-6">
        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800">
          <h4 className="font-black text-zinc-500 mb-6 uppercase text-xs tracking-[0.3em]">Master Identity Selection</h4>
          <div className="grid md:grid-cols-3 gap-6">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdateSettings({ ...settings, theme: t.id })}
                className={`group relative p-6 rounded-3xl border-2 transition-all duration-500 flex flex-col items-start gap-4 text-left overflow-hidden ${
                  settings.theme === t.id 
                  ? 'border-blue-500 bg-blue-500/5 scale-[1.02] shadow-2xl' 
                  : 'border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-400 dark:hover:border-zinc-600'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:rotate-12 ${t.color}`}>
                  {t.icon}
                </div>
                <div>
                  <span className="font-black text-xl block mb-1 uppercase tracking-tighter">{t.label}</span>
                  <span className="text-xs text-zinc-500 font-medium leading-relaxed">
                    {t.desc}
                  </span>
                </div>
                {settings.theme === t.id && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-blue-500 animate-ping" />
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
            onClick={onClearData}
            className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-bold hover:bg-rose-700 transition-colors"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemSettings;
