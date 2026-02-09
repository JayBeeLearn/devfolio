
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { PortfolioData } from '../types';

interface ExperienceSectionProps {
  data: PortfolioData;
  title?: string;
  educationTitle?: string;
  certificationsTitle?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, title, educationTitle, certificationsTitle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="py-32 bg-[var(--card-bg)] -mx-6 px-6 border-y border-[var(--border-color)]">
      <div className="container mx-auto" ref={containerRef}>
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Work Experience */}
          <div className="space-y-16">
            <div className="flex items-center gap-6 mb-16">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--primary)] blur-2xl opacity-20 animate-pulse" />
                <div className="relative p-6 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-glow)] text-white rounded-[32px] shadow-2xl">
                  <Briefcase size={32} />
                </div>
              </div>
              <div>
                <h2 className="text-5xl md:text-6xl font-black font-accent tracking-tighter">{title || 'Timeline'}</h2>
                <div className="h-1.5 w-24 bg-gradient-to-r from-[var(--primary)] to-transparent rounded-full mt-2" />
              </div>
            </div>
            
            <div className="space-y-12 relative">
              {/* Central Timeline Line */}
              <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-[var(--border-color)] md:-translate-x-1/2 opacity-20" />
              <motion.div 
                style={{ scaleY, originY: 0 }}
                className="absolute left-6 md:left-1/2 top-4 bottom-4 w-px bg-[var(--primary)] md:-translate-x-1/2 z-10 shadow-[0_0_10px_var(--primary)]" 
              />
              
              {data.workExperiences.map((exp, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: idx * 0.1 }}
                   viewport={{ once: true, margin: "-100px" }}
                   className={`relative flex items-center gap-8 md:gap-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 w-12 h-12 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)] border-4 border-[var(--bg-main)]" />
                  </div>

                  {/* Spacer for MD */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Experience Card */}
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] group`}>
                    <div className={`relative p-8 rounded-[40px] bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-[var(--border-color)] hover:border-[var(--primary)] transition-all duration-700 shadow-2xl group-hover:scale-[1.03] group-hover:-translate-y-2 overflow-hidden ${idx % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                      {/* Decorative Background Blob */}
                      <div className="absolute -right-20 -top-20 w-40 h-40 bg-[var(--primary)] opacity-[0.03] blur-3xl rounded-full group-hover:opacity-[0.08] transition-opacity" />
                      
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <span className="text-[10px] font-black tracking-widest px-4 py-1.5 bg-[var(--primary-glow)] text-[var(--primary)] rounded-full uppercase border border-[var(--primary)]/20">
                          {exp.startYear} — {exp.endYear}
                        </span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[var(--border-color)] to-transparent" />
                      </div>

                      <h4 className="text-3xl font-black mb-2 font-accent leading-tight group-hover:text-[var(--primary)] transition-colors">{exp.position}</h4>
                      <p className="font-bold text-zinc-500 dark:text-zinc-400 text-lg mb-8 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                        {exp.place}
                      </p>

                      <ul className="space-y-4">
                        {exp.duties.map((duty, dIdx) => (
                          <li key={dIdx} className="text-zinc-600 dark:text-zinc-400 leading-relaxed flex gap-4 text-sm font-medium group/item hover:text-[var(--text-main)] transition-colors">
                            <span className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--border-color)] group-hover/item:bg-[var(--primary)] group-hover/item:scale-150 transition-all" />
                            {duty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="space-y-20">
            <div>
              <div className="flex items-center gap-6 mb-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                  <div className="relative p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-[32px] shadow-2xl">
                    <GraduationCap size={32} />
                  </div>
                </div>
                <div>
                  <h2 className="text-5xl md:text-6xl font-black font-accent tracking-tighter text-emerald-500">{educationTitle || 'Knowledge'}</h2>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-emerald-500 to-transparent rounded-full mt-2" />
                </div>
              </div>
              
              <div className="grid gap-6">
                {data.education.map((edu, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-[var(--bg-main)] p-8 rounded-[40px] border border-[var(--border-color)] shadow-xl overflow-hidden hover:border-emerald-500 transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 p-6 bg-emerald-500/10 text-emerald-500 font-black text-xs rounded-bl-3xl border-l border-b border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        {edu.year}
                    </div>
                    <div className="flex items-start gap-6">
                      <div className="w-2 h-12 bg-emerald-500 rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <h4 className="text-2xl font-black mb-2 font-accent leading-tight group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{edu.course}</h4>
                        <p className="text-zinc-500 dark:text-zinc-400 font-bold mb-6 text-lg tracking-tight">{edu.school}</p>
                        <div className="flex gap-4">
                           {edu.cgpa && (
                             <span className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                               CGPA: {edu.cgpa}
                             </span>
                           )}
                           {edu.class && (
                             <span className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                               <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                               {edu.class}
                             </span>
                           )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-12">
              <div className="flex items-center gap-6 mb-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 animate-pulse" />
                  <div className="relative p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-[32px] shadow-2xl">
                    <Award size={32} />
                  </div>
                </div>
                <div>
                  <h2 className="text-5xl md:text-6xl font-black font-accent tracking-tighter text-amber-500">{certificationsTitle || 'Verified'}</h2>
                  <div className="h-1.5 w-24 bg-gradient-to-r from-amber-500 to-transparent rounded-full mt-2" />
                </div>
              </div>

              <div className="grid gap-6">
                {data.professionalCourses.map((cert, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 bg-[var(--bg-main)] rounded-[40px] border border-[var(--border-color)] shadow-xl group hover:border-amber-500 transition-all duration-500 hover:shadow-amber-500/5 relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-6 text-zinc-200 dark:text-zinc-800 group-hover:text-amber-500/20 transition-colors">
                      <Award size={80} strokeWidth={1} />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-black mb-2 font-accent leading-tight group-hover:text-amber-500 transition-colors uppercase tracking-tight">{cert.certification}</h4>
                      <p className="text-zinc-500 dark:text-zinc-400 font-bold mb-8 flex items-center gap-3">
                        {cert.institution} 
                        <span className="w-1 h-1 rounded-full bg-zinc-400" />
                        <span className="text-zinc-400 font-mono italic">{cert.year}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                         {cert.skills.map((s, si) => (
                           <span key={si} className="px-4 py-2 text-[10px] uppercase font-black tracking-widest bg-zinc-100 dark:bg-zinc-800/80 text-zinc-500 rounded-xl border border-[var(--border-color)] group-hover:bg-amber-500/5 group-hover:border-amber-500/20 transition-all">
                             {s}
                           </span>
                         ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
