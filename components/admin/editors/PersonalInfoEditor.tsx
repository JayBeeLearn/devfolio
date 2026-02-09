import React from 'react';
import { PortfolioData } from '../../../types';

interface PersonalInfoEditorProps {
  bio: PortfolioData['bio'];
  onUpdate: (bio: PortfolioData['bio']) => void;
}

const PersonalInfoEditor: React.FC<PersonalInfoEditorProps> = ({ bio, onUpdate }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-zinc-200 dark:border-zinc-800 space-y-8">
      <div>
        <h3 className="text-2xl font-black mb-1">Personal Identity</h3>
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Base bio information</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Full Name</label>
          <input 
            type="text" 
            value={bio.name}
            onChange={(e) => onUpdate({ ...bio, name: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-bold" 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Professional Role</label>
          <input 
            type="text" 
            value={bio.role}
            onChange={(e) => onUpdate({ ...bio, role: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-bold" 
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Elevator Pitch (Bio)</label>
        <textarea 
          rows={4} 
          value={bio.description}
          onChange={(e) => onUpdate({ ...bio, description: e.target.value })}
          className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none resize-none leading-relaxed" 
        />
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Avatar Image URL</label>
        <input 
          type="text" 
          value={bio.avatarUrl}
          onChange={(e) => onUpdate({ ...bio, avatarUrl: e.target.value })}
          className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-mono text-sm" 
        />
      </div>
    </div>
  );
};

export default PersonalInfoEditor;
