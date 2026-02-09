
import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative flex flex-col md:flex-row items-center gap-12 py-12 md:py-24 overflow-visible">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-[var(--primary-glow)] opacity-20 blur-[120px] rounded-full animate-pulse" />
      </div>
      
      <div className="flex-1 space-y-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border border-zinc-200 dark:border-zinc-700">
            👋 Available for new projects
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] font-accent">
            I'm <span className="text-[var(--primary)] text-glow">
              {data.bio.name}
            </span>
          </h1>
          <p className="text-3xl md:text-4xl font-medium mt-6 text-zinc-500 dark:text-zinc-400 italic font-accent max-w-xl">
            {data.bio.role}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg md:text-2xl max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium opacity-80"
        >
          {data.bio.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap gap-6 pt-6"
        >
          <a href="#contact" className="px-10 py-5 rounded-2xl font-black transition-all hover:scale-110 active:scale-95 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_var(--primary-glow)]">
            Hire Me
          </a>
          <a href="#projects" className="px-10 py-5 rounded-2xl font-black border-2 border-[var(--border-color)] hover:bg-[var(--card-bg)] transition-all hover:scale-105">
            Portfolio
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-72 h-72 md:w-[450px] md:h-[450px]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)] to-transparent opacity-20 blur-2xl rounded-full -z-10 animate-spin-slow" />
        <div className="absolute -inset-4 border-2 border-[var(--primary)] rounded-[40px] opacity-20 -rotate-6" />
        <img 
          src={data.bio.avatarUrl} 
          alt={data.bio.name} 
          className="w-full h-full object-cover rounded-[40px] shadow-2xl border-8 border-white dark:border-zinc-900 grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02]"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
