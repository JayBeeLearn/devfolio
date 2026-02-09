import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface ExperiencesEditorProps {
  workExperiences: PortfolioData['workExperiences'];
  onUpdate: (experiences: PortfolioData['workExperiences']) => void;
}

const ExperiencesEditor: React.FC<ExperiencesEditorProps> = ({ workExperiences, onUpdate }) => {
  const addExperience = () => {
    onUpdate([
      ...workExperiences,
      { place: 'Company Name', position: 'Role', startYear: '2024', endYear: 'present', duties: [] }
    ]);
  };

  const removeExperience = (idx: number) => {
    onUpdate(workExperiences.filter((_, i) => i !== idx));
  };

  const updateExperience = (idx: number, field: string, value: any) => {
    const next = [...workExperiences];
    (next[idx] as any)[field] = value;
    onUpdate(next);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <h3 className="text-2xl font-black">Work Experience</h3>
        <button 
          onClick={addExperience}
          className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>
      <div className="space-y-8">
        {workExperiences.map((exp, idx) => (
          <div key={idx} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700 relative group">
            <button 
              onClick={() => removeExperience(idx)}
              className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={20} />
            </button>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" value={exp.place} placeholder="Company"
                onChange={(e) => updateExperience(idx, 'place', e.target.value)}
                className="bg-transparent font-bold text-lg outline-none"
              />
              <input 
                type="text" value={exp.position} placeholder="Position"
                onChange={(e) => updateExperience(idx, 'position', e.target.value)}
                className="bg-transparent text-zinc-500 outline-none"
              />
              <div className="flex gap-2 items-center text-sm">
                <input 
                  type="text" value={exp.startYear} placeholder="Start"
                  onChange={(e) => updateExperience(idx, 'startYear', e.target.value)}
                  className="w-24 bg-transparent outline-none border-b border-zinc-200 dark:border-zinc-700"
                />
                <span>-</span>
                <input 
                  type="text" value={exp.endYear} placeholder="End"
                  onChange={(e) => updateExperience(idx, 'endYear', e.target.value)}
                  className="w-24 bg-transparent outline-none border-b border-zinc-200 dark:border-zinc-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500">Key Duties (One per line)</label>
              <textarea 
                value={exp.duties.join('\n')}
                onChange={(e) => updateExperience(idx, 'duties', e.target.value.split('\n'))}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 text-sm min-h-[100px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencesEditor;
