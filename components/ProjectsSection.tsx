
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code } from 'lucide-react';
import { PortfolioData } from '../types';

interface ProjectsSectionProps {
  data: PortfolioData;
  title?: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ data, title }) => {
  return (
    <section id="projects" className="py-32">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black mb-6 font-accent">{title || 'Showcase'}</h2>
        <div className="h-2 w-32 mx-auto rounded-full bg-[var(--primary)] shadow-[0_0_20px_var(--primary-glow)]" />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="flex flex-col h-full bg-[var(--card-bg)] rounded-[40px] overflow-hidden border border-[var(--border-color)] shadow-2xl group transition-all duration-500 hover:border-[var(--primary)]"
          >
            <div className="relative h-64 overflow-hidden">
               <img 
                 src={`https://picsum.photos/seed/${project.name}/800/600`} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale-[30%] group-hover:grayscale-0" 
                 alt={project.name} 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <a href={`https://${project.website}`} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--primary)] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                    <ExternalLink size={18} /> Live Proxy
                  </a>
                  <a href={data.contactInfo.github} target="_blank" rel="noreferrer" className="p-3 bg-white/20 backdrop-blur-md text-white rounded-2xl border border-white/30 hover:bg-white/40 transition-all">
                    <Github size={20} />
                  </a>
               </div>
            </div>
            
            <div className="p-10 flex-1 flex flex-col">
              <div className="flex flex-wrap gap-3 mb-6">
                {project.techStack.map((tech, ti) => (
                  <span key={ti} className="px-3 py-1 bg-[var(--primary-glow)] text-[var(--primary)] text-[10px] font-black uppercase tracking-widest rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-black mb-4 font-accent">{project.name}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed mb-8 flex-1 font-medium">{project.description}</p>
              
              <div className="pt-8 border-t border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-widest text-zinc-400 uppercase">{project.startDate}</span>
                  <div className="flex items-center gap-2">
                    {project.roles.map((role, ri) => (
                      <span key={ri} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black text-zinc-500 rounded-lg uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">{role}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
