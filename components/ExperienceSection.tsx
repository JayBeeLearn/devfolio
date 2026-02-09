
import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award } from 'lucide-react';
import { PortfolioData } from '../types';

interface ExperienceSectionProps {
  data: PortfolioData;
  title?: string;
  educationTitle?: string;
  certificationsTitle?: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, title, educationTitle, certificationsTitle }) => {
  return (
    <section id="experience" className="py-32 bg-[var(--card-bg)] -mx-6 px-6 border-y border-[var(--border-color)]">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-24">
          {/* Work Experience */}
          <div className="space-y-16">
            <div className="flex items-center gap-6 mb-12">
              <div className="p-6 bg-[var(--primary-glow)] text-[var(--primary)] rounded-[32px] shadow-glow">
                <Briefcase size={32} />
              </div>
              <h2 className="text-5xl md:text-6xl font-black font-accent">{title || 'Timeline'}</h2>
            </div>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-[var(--border-color)] before:to-transparent">
              {data.workExperiences.map((exp, idx) => (
                <motion.div 
                   key={idx}
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-[var(--bg-main)] bg-[var(--primary)] text-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-125 transition-transform duration-500">
                    <Briefcase size={18} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-[var(--bg-main)] p-8 rounded-[32px] shadow-2xl border border-[var(--border-color)] hover:border-[var(--primary)] transition-all duration-500 hover:scale-[1.02]">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black tracking-widest px-3 py-1 bg-[var(--primary-glow)] text-[var(--primary)] rounded-full uppercase">
                        {exp.startYear} — {exp.endYear}
                      </span>
                    </div>
                    <h4 className="text-2xl font-black mb-1 font-accent">{exp.position}</h4>
                    <p className="font-bold text-[var(--primary)] text-lg mb-6">{exp.place}</p>
                    <ul className="space-y-3">
                      {exp.duties.map((duty, dIdx) => (
                        <li key={dIdx} className="text-zinc-500 dark:text-zinc-400 leading-relaxed flex gap-3 text-sm font-medium">
                          <span className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
                          {duty}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Certs */}
          <div className="space-y-20">
            <div>
              <div className="flex items-center gap-6 mb-12">
                <div className="p-6 bg-emerald-500/10 text-emerald-500 rounded-[32px]">
                  <GraduationCap size={32} />
                </div>
                <h2 className="text-5xl md:text-6xl font-black font-accent text-emerald-500">{educationTitle || 'Knowledge'}</h2>
              </div>
              <div className="space-y-8">
                {data.education.map((edu, idx) => (
                  <div key={idx} className="bg-[var(--bg-main)] p-8 rounded-[32px] border border-[var(--border-color)] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 bg-emerald-500/10 text-emerald-500 font-black text-xs rounded-bl-2xl">
                        {edu.year}
                    </div>
                    <h4 className="text-2xl font-black mb-2 font-accent">{edu.course}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 font-bold mb-4">{edu.school}</p>
                    <div className="flex gap-4 text-xs font-black uppercase tracking-widest">
                       {edu.cgpa && <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full">CGPA: {edu.cgpa}</span>}
                       {edu.class && <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full">{edu.class}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-12">
              <div className="flex items-center gap-6 mb-12">
                <div className="p-6 bg-amber-500/10 text-amber-500 rounded-[32px]">
                  <Award size={32} />
                </div>
                <h2 className="text-5xl md:text-6xl font-black font-accent text-amber-500">{certificationsTitle || 'Verified'}</h2>
              </div>
              <div className="grid md:grid-cols-1 gap-6">
                {data.professionalCourses.map((cert, idx) => (
                  <div key={idx} className="bg-[var(--bg-main)] p-8 rounded-[32px] border border-[var(--border-color)] shadow-xl group hover:border-amber-500 transition-colors">
                    <h4 className="text-2xl font-black mb-2 font-accent">{cert.certification}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400 font-bold mb-6">{cert.institution} • {cert.year}</p>
                    <div className="flex flex-wrap gap-2">
                       {cert.skills.map((s, si) => (
                         <span key={si} className="px-4 py-2 text-[10px] uppercase font-black tracking-tighter bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-[var(--border-color)] text-zinc-500">
                           {s}
                         </span>
                       ))}
                    </div>
                  </div>
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
