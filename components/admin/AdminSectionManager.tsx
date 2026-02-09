import React from 'react';
import { SectionConfig } from '../../types';

interface AdminSectionManagerProps {
  sections: SectionConfig[];
  onMoveSection: (index: number, direction: 'up' | 'down') => void;
  onToggleSection: (id: string) => void;
}

const AdminSectionManager: React.FC<AdminSectionManagerProps> = ({ sections, onMoveSection, onToggleSection }) => {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
      <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Section Management</h3>
      <p className="text-zinc-500 text-sm">Toggle visibility and reorder sections to customize your portfolio.</p>
      <div className="space-y-3">
        {sortedSections.map((section, idx, arr) => (
          <div key={section.id} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-black/20 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <input 
                type="checkbox" 
                checked={section.visible} 
                onChange={() => onToggleSection(section.id)}
                className="w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
              />
              <span className={`font-bold ${!section.visible ? 'opacity-50 line-through' : ''}`}>{section.name}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => onMoveSection(idx, 'up')} 
                disabled={idx === 0}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg disabled:opacity-30"
              >
                ▲
              </button>
              <button 
                onClick={() => onMoveSection(idx, 'down')} 
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
  );
};

export default AdminSectionManager;
