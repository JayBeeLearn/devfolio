
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
    <section id="projects" className="py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 px-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[var(--primary-glow)] text-[var(--primary)] text-[10px] font-black uppercase tracking-[0.2em]">
            Selected Works
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black font-accent tracking-tighter leading-none">{title || 'Showcase'}</h2>
        </div>
        <div className="max-w-xs text-zinc-500 dark:text-zinc-400 font-medium md:text-right">
          A collection of digital experiences crafted with precision and passion.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {data.projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`group relative flex flex-col h-full rounded-[48px] overflow-hidden bg-white/5 dark:bg-black/20 border border-[var(--border-color)] transition-all duration-700 hover:border-[var(--primary)] hover:shadow-2xl ${idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square md:aspect-auto md:h-full'}`}
          >
            {/* Visual Media Wrapper */}
            <div className="absolute inset-0 z-0">
               <img 
                 src={`https://picsum.photos/seed/${project.name}/1200/800`} 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[100%] group-hover:grayscale-0 opacity-20 group-hover:opacity-40" 
                 alt={project.name} 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>

            {/* Content Overlays */}
            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                 <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map((tech, ti) => (
                      <span key={ti} className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                        {tech}
                      </span>
                    ))}
                 </div>
                 <div className="flex gap-3">
                    <a href={data.contactInfo.github} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all">
                      <Github size={20} />
                    </a>
                    <a href={`https://${project.website}`} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all">
                      <ExternalLink size={20} />
                    </a>
                 </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--primary)]">Project {idx + 1}</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--primary)]/50 to-transparent" />
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black font-accent text-white mb-6 uppercase tracking-tighter leading-none group-hover:translate-x-4 transition-transform duration-500">
                  {project.name}
                </h3>
                <p className="text-zinc-400 text-lg md:text-xl font-medium line-clamp-2 transition-all group-hover:text-zinc-200">
                  {project.description}
                </p>
                
                <div className="mt-8 flex items-center gap-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                   <div className="flex gap-2">
                     {project.roles.map((role, ri) => (
                       <span key={ri} className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{role}</span>
                     ))}
                   </div>
                   <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">{project.startDate}</div>
                </div>
              </div>
            </div>

            {/* Premium Sheen Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
