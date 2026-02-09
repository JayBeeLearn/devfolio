import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { PortfolioData, ProgrammingSkills } from '../../../types';

interface SkillsEditorProps {
  programmingSkills: ProgrammingSkills;
  softSkills: string[];
  onUpdateProgramming: (skills: ProgrammingSkills) => void;
  onUpdateSoft: (skills: string[]) => void;
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ 
  programmingSkills, 
  softSkills, 
  onUpdateProgramming, 
  onUpdateSoft 
}) => {
  const updateProgrammingSkill = (cat: keyof ProgrammingSkills, idx: number, field: string, value: any) => {
    const newList = [...programmingSkills[cat]];
    (newList[idx] as any)[field] = value;
    onUpdateProgramming({ ...programmingSkills, [cat]: newList });
  };

  const removeProgrammingSkill = (cat: keyof ProgrammingSkills, idx: number) => {
    const newList = [...programmingSkills[cat]].filter((_, i) => i !== idx);
    onUpdateProgramming({ ...programmingSkills, [cat]: newList });
  };

  const addProgrammingSkill = (cat: keyof ProgrammingSkills) => {
    const newList = [...programmingSkills[cat], { name: 'New Skill', years: 1, proficiency: 50 }];
    onUpdateProgramming({ ...programmingSkills, [cat]: newList });
  };

  return (
    <div className="space-y-12">
      {/* Programming Skills Section */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Programming Skills</h3>
        {(['languages', 'frameworks', 'tools'] as const).map((cat) => (
          <div key={cat} className="space-y-4">
            <h4 className="font-bold capitalize text-lg text-zinc-500">{cat}</h4>
            <div className="grid gap-4">
              {programmingSkills[cat].map((skill, idx) => (
                <div key={idx} className="flex gap-4 items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                  <input 
                    type="text" 
                    value={skill.name} 
                    onChange={(e) => updateProgrammingSkill(cat, idx, 'name', e.target.value)}
                    className="flex-1 bg-transparent font-bold outline-none"
                    placeholder="Skill name"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-500">Proficiency</span>
                    <input 
                      type="number" 
                      value={skill.proficiency} 
                      onChange={(e) => updateProgrammingSkill(cat, idx, 'proficiency', parseInt(e.target.value))}
                      className="w-16 bg-transparent text-right outline-none border-b border-zinc-300"
                    />
                    <span className="text-[10px] text-zinc-500">%</span>
                  </div>
                  <button 
                    onClick={() => removeProgrammingSkill(cat, idx)}
                    className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => addProgrammingSkill(cat)}
                className="flex items-center gap-2 text-blue-500 font-bold text-sm hover:underline"
              >
                <Plus size={16} /> Add {cat}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills Section */}
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
        <h3 className="text-2xl font-black border-b border-zinc-100 dark:border-zinc-800 pb-4">Soft Capabilities</h3>
        <div className="grid gap-4">
          {softSkills.map((skill, idx) => (
            <div key={idx} className="flex gap-4 items-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl">
              <input 
                type="text" 
                value={skill} 
                onChange={(e) => {
                  const newList = [...softSkills];
                  newList[idx] = e.target.value;
                  onUpdateSoft(newList);
                }}
                className="flex-1 bg-transparent font-bold outline-none"
                placeholder="Skill name"
              />
              <button 
                onClick={() => {
                  const newList = softSkills.filter((_, i) => i !== idx);
                  onUpdateSoft(newList);
                }}
                className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          <button 
            onClick={() => onUpdateSoft([...softSkills, 'New Soft Skill'])}
            className="flex items-center gap-2 text-blue-500 font-bold text-sm hover:underline"
          >
            <Plus size={16} /> Add Soft Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsEditor;
