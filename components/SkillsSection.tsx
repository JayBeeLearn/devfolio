
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
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    viewport={{ once: true }}
    className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--border-color)] theme-card-transition"
  >
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-black text-xl font-accent">{skill.name}</h4>
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">{skill.years}y EXP</span>
    </div>
    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.proficiency}%` }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="h-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary-glow)]"
      />
    </div>
    <span className="text-[10px] mt-3 block text-zinc-500 font-black uppercase tracking-widest text-right">{skill.proficiency}% mastered</span>
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

      <div className="mt-32">
        <div className="flex items-center gap-4 mb-12 justify-center">
          <Sparkles className="text-amber-500 animate-pulse" />
          <h3 className="text-3xl font-black font-accent">Soft Capabilities</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {data.softSkills.map((skill, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-8 py-4 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] text-sm font-black uppercase tracking-widest hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all shadow-sm"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
