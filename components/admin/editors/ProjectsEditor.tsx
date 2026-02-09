import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { PortfolioData } from '../../../types';

interface ProjectsEditorProps {
  projects: PortfolioData['projects'];
  onUpdate: (projects: PortfolioData['projects']) => void;
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ projects, onUpdate }) => {
  const addProject = () => {
    onUpdate([
      ...projects,
      { 
        name: 'Project Name', 
        website: '', 
        techStack: [], 
        description: '', 
        duties: [], 
        roles: [], 
        startDate: '2024-01', 
        endDate: null 
      }
    ]);
  };

  const removeProject = (idx: number) => {
    onUpdate(projects.filter((_, i) => i !== idx));
  };

  const updateProject = (idx: number, field: string, value: any) => {
    const next = [...projects];
    (next[idx] as any)[field] = value;
    onUpdate(next);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-6">
      <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <h3 className="text-2xl font-black">Projects</h3>
        <button 
          onClick={addProject}
          className="flex items-center gap-2 text-sm bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>
      <div className="space-y-12">
        {projects.map((project, idx) => (
          <div key={idx} className="p-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl border border-zinc-200 dark:border-zinc-700 relative group space-y-4">
            <button 
              onClick={() => removeProject(idx)}
              className="absolute top-6 right-6 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={24} />
            </button>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase text-zinc-500">Project Name</label>
                 <input 
                  type="text" value={project.name}
                  onChange={(e) => updateProject(idx, 'name', e.target.value)}
                  className="w-full bg-transparent font-black text-xl outline-none border-b border-zinc-200 dark:border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase text-zinc-500">Website URL</label>
                 <input 
                  type="text" value={project.website}
                  onChange={(e) => updateProject(idx, 'website', e.target.value)}
                  className="w-full bg-transparent outline-none border-b border-zinc-200 dark:border-zinc-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500">Description</label>
              <textarea 
                value={project.description}
                onChange={(e) => updateProject(idx, 'description', e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 min-h-[100px]"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-zinc-500">Tech Stack (Comma separated)</label>
                <input 
                  type="text" value={project.techStack.join(', ')}
                  onChange={(e) => updateProject(idx, 'techStack', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full bg-transparent outline-none border-b border-zinc-200 dark:border-zinc-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-zinc-500">Roles (Comma separated)</label>
                <input 
                  type="text" value={project.roles.join(', ')}
                  onChange={(e) => updateProject(idx, 'roles', e.target.value.split(',').map(s => s.trim()))}
                  className="w-full bg-transparent outline-none border-b border-zinc-200 dark:border-zinc-700"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-zinc-500">Key Achievements (One per line)</label>
              <textarea 
                value={project.duties.join('\n')}
                onChange={(e) => updateProject(idx, 'duties', e.target.value.split('\n'))}
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 text-sm"
                placeholder="Added feature X..."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsEditor;
