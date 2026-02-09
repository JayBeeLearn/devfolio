import React from 'react';
import { PortfolioData } from '../../../types';

interface SocialsEditorProps {
  contactInfo: PortfolioData['contactInfo'];
  onUpdate: (contactInfo: PortfolioData['contactInfo']) => void;
}

const SocialsEditor: React.FC<SocialsEditorProps> = ({ contactInfo, onUpdate }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-[32px] border border-zinc-200 dark:border-zinc-800 space-y-8">
      <div>
        <h3 className="text-2xl font-black mb-1">Social Connectivity</h3>
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Digital presence & Reach</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Work Email</label>
          <input 
            type="email" 
            value={contactInfo.email}
            onChange={(e) => onUpdate({ ...contactInfo, email: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-bold" 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Phone Number</label>
          <input 
            type="text" 
            value={contactInfo.phoneNumber}
            onChange={(e) => onUpdate({ ...contactInfo, phoneNumber: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-bold" 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">GitHub Profile</label>
          <input 
            type="text" 
            value={contactInfo.github}
            onChange={(e) => onUpdate({ ...contactInfo, github: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-mono text-sm" 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">LinkedIn Profile</label>
          <input 
            type="text" 
            value={contactInfo.linkedin}
            onChange={(e) => onUpdate({ ...contactInfo, linkedin: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-mono text-sm" 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Website link</label>
          <input 
            type="text" 
            value={contactInfo.website}
            onChange={(e) => onUpdate({ ...contactInfo, website: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-mono text-sm" 
          />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em] ml-1">Facebook Profile (Optional)</label>
          <input 
            type="text" 
            value={contactInfo.facebook}
            onChange={(e) => onUpdate({ ...contactInfo, facebook: e.target.value })}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-black/20 border border-zinc-200 dark:border-zinc-800 focus:border-blue-500 transition-all outline-none font-mono text-sm" 
          />
        </div>
      </div>
    </div>
  );
};

export default SocialsEditor;
