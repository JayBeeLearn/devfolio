
import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../types';

interface HeroProps {
  data: PortfolioData;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--primary)] opacity-[0.07] blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-500 opacity-[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
        {/* Left Content Side */}
        <div className="flex-1 text-center lg:text-left space-y-10 lg:order-1 order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-8 bg-white/5 border border-[var(--border-color)] text-zinc-500 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for new projects
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.85] font-accent mb-6">
              CREATIVE <br />
              <span className="text-[var(--primary)] text-glow premium-gradient-text uppercase">
                {data.bio.name.split(' ')[0]}
              </span>
            </h1>
            
            <p className="text-2xl md:text-4xl font-black mt-8 text-zinc-400 dark:text-zinc-500 italic font-accent max-w-xl mx-auto lg:mx-0">
              {data.bio.role}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-lg md:text-2xl max-w-2xl leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium opacity-80 mx-auto lg:mx-0"
          >
             {data.bio.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-10"
          >
            <a href="#contact" className="group relative px-12 py-6 rounded-[32px] overflow-hidden bg-[var(--primary)] text-white font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-15px_var(--primary-glow)]">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative">HIRE ME</span>
            </a>
            <a href="#projects" className="px-12 py-6 rounded-[32px] font-black text-xl border-2 border-[var(--border-color)] hover:bg-[var(--card-bg)] transition-all hover:scale-105 backdrop-blur-sm">
              VIEW WORK
            </a>
          </motion.div>
        </div>

        {/* Right Media Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 relative lg:order-2 order-1"
        >
          <div className="relative w-72 h-72 md:w-[480px] md:h-[480px]">
            {/* Layered Decorative Elements */}
            <div className="absolute -inset-8 border-2 border-[var(--primary)] opacity-10 rounded-[60px] animate-spin-slow" />
            <div className="absolute -inset-4 border border-[var(--border-color)] opacity-40 rounded-[60px] rotate-12" />
            
            {/* The Main Frame */}
            <div className="absolute inset-0 bg-white dark:bg-zinc-900 rounded-[60px] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rotate-3 overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
               <img 
                src={data.bio.avatarUrl} 
                alt={data.bio.name} 
                className="w-full h-full object-cover rounded-[48px] grayscale-[40%] hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -right-8 -bottom-8 bg-white dark:bg-zinc-900 border border-[var(--border-color)] px-8 py-6 rounded-[32px] shadow-2xl backdrop-blur-xl md:block hidden"
            >
               <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Passionate about</p>
               <p className="font-accent text-lg font-black italic text-[var(--primary)]">Perfect UI/UX</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background Section Indicator Text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-5 select-none pointer-events-none whitespace-nowrap md:text-9xl text-6xl font-black font-accent">
        <span>DEVELOPER</span>
        <span className="text-outline">ARCHITECT</span>
        <span>DESIGNER</span>
      </div>
    </section>
  );
};

export default Hero;
