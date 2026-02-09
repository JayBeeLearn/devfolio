
import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Server, Wrench, Sparkles } from 'lucide-react';
import { PortfolioData, Skill } from '../types';

interface SkillsSectionProps {
  data: PortfolioData;
  title?: string;
}

// Added: Proper props interface for SkillCard
interface SkillCardProps {
  skill: Skill;
  index: number;
  color: string;
}

// Fixed: Redefined SkillCard using React.FC to correctly handle standard props like 'key'
const SkillCard: React.FC<SkillCardProps> = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ 
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: index * 0.05 
    }}
    viewport={{ once: true }}
    className="group relative bg-[var(--bg-main)] p-6 rounded-3xl border border-[var(--border-color)] hover:border-[var(--primary)] transition-all duration-500 shadow-xl overflow-hidden"
  >
    {/* Background Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/0 to-[var(--primary)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-black text-xl font-accent group-hover:text-[var(--primary)] transition-colors tracking-tight uppercase">{skill.name}</h4>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{skill.years} years of exp</span>
        </div>
        <div className="text-2xl font-black text-[var(--primary)] opacity-20 group-hover:opacity-100 transition-all font-mono">
          {skill.proficiency}%
        </div>
      </div>
      
      <div className="relative h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-glow)] rounded-full relative"
        >
          {/* Animated Sheen */}
          <motion.div 
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-white/30 skew-x-12"
          />
        </motion.div>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                i < Math.round(skill.proficiency / 20) 
                ? 'bg-[var(--primary)] scale-110 shadow-[0_0_8px_var(--primary)]' 
                : 'bg-zinc-200 dark:bg-zinc-700'
              }`} 
            />
          ))}
        </div>
        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-[var(--primary)] transition-colors">
          Mastery Level
        </span>
      </div>
    </div>
  </motion.div>
);

const SkillsSection: React.FC<SkillsSectionProps> = ({ data, title }) => {
  const sections = [
    { title: 'Languages', icon: <Code2 size={24} />, skills: data.programmingSkills.languages },
    { title: 'Frameworks', icon: <Server size={24} />, skills: data.programmingSkills.frameworks },
    { title: 'Tools', icon: <Wrench size={24} />, skills: data.programmingSkills.tools },
  ];

  return (
    <section id="skills" className="py-32">
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black mb-6 font-accent">{title || 'Explored Tech'}</h2>
        <div className="h-2 w-32 mx-auto rounded-full bg-[var(--primary)] shadow-[0_0_20px_var(--primary-glow)]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-4 mb-8 group">
              <div className="p-4 bg-[var(--primary-glow)] text-[var(--primary)] rounded-2xl transition-transform group-hover:scale-110">
                {sec.icon}
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter font-accent">{sec.title}</h3>
            </div>
            <div className="grid gap-6">
              {sec.skills.map((skill, sIdx) => (
                <SkillCard key={sIdx} skill={skill} index={sIdx} color="" />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-40">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-500/5 border border-amber-500/20 mb-6">
            <Sparkles className="text-amber-500 w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Core DNA</span>
          </div>
          <h3 className="text-5xl md:text-6xl font-black font-accent tracking-tighter italic">Soft Capabilities</h3>
          <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-4 rounded-full opacity-30" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {data.softSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: [0, -1, 1, 0] }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[32px] border border-[var(--border-color)] bg-[var(--bg-main)] text-center shadow-xl hover:border-amber-500 transition-all duration-500 overflow-hidden"
            >
              {/* Decorative Background Icon */}
              <div className="absolute -right-4 -bottom-4 text-zinc-100 dark:text-zinc-800/30 group-hover:text-amber-500/10 transition-colors">
                <Sparkles size={80} strokeWidth={1} />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <Sparkles size={24} />
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-main)] group-hover:text-amber-500 transition-colors leading-tight">
                  {skill}
                </h4>
                <div className="mt-4 h-1 w-0 group-hover:w-8 bg-amber-500 mx-auto rounded-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
