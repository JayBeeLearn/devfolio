
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, Globe } from 'lucide-react';
import { PortfolioData } from '../types';

interface ContactSectionProps {
  data: PortfolioData;
  title?: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ data, title }) => {
  return (
    <section id="contact" className="py-32 mb-20">
      <div className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 rounded-[4rem] p-10 md:p-24 overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--primary)] blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2 rounded-full animate-pulse" />
        
        <div className="grid lg:grid-cols-2 gap-24 relative z-10">
          <div>
            <h2 className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] font-accent">
              {title || "Let's Create Magic"}
            </h2>
            <p className="text-zinc-400 dark:text-zinc-500 text-xl mb-16 leading-relaxed font-medium">I'm currently scouting for new challenges. If you have a vision, I have the execution. Let's talk.</p>
            
            <div className="space-y-8">
              <a href={`mailto:${data.contactInfo.email}`} className="group flex items-center gap-8 p-6 rounded-[32px] bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10 transition-all hover:scale-[1.02] border border-white/10 dark:border-black/10">
                <div className="p-5 bg-[var(--primary)] text-white rounded-2xl shadow-glow transition-transform group-hover:rotate-12">
                  <Mail size={28} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-black uppercase tracking-[0.3em] mb-1">Direct Line</p>
                  <p className="text-xl font-black font-accent">{data.contactInfo.email}</p>
                </div>
              </a>

              <a href={`tel:${data.contactInfo.phoneNumber}`} className="group flex items-center gap-8 p-6 rounded-[32px] bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10 transition-all hover:scale-[1.02] border border-white/10 dark:border-black/10">
                <div className="p-5 bg-emerald-500 text-white rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-transform group-hover:-rotate-12">
                  <Phone size={28} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-black uppercase tracking-[0.3em] mb-1">Voice</p>
                  <p className="text-xl font-black font-accent">{data.contactInfo.phoneNumber}</p>
                </div>
              </a>

              <div className="flex gap-6 pt-10">
                {[
                  { icon: <Github size={24} />, url: data.contactInfo.github },
                  { icon: <Linkedin size={24} />, url: data.contactInfo.linkedin },
                  { icon: <Facebook size={24} />, url: data.contactInfo.facebook },
                  { icon: <Globe size={24} />, url: `https://${data.contactInfo.website}` }
                ].map((social, idx) => (
                  <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 dark:bg-black/5 hover:bg-[var(--primary)] hover:text-white transition-all hover:-translate-y-2 border border-white/10 dark:border-black/10">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white/5 dark:bg-black/5 p-10 rounded-[40px] border border-white/10 dark:border-black/10 backdrop-blur-sm">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Full Name</label>
                  <input type="text" placeholder="Your Name" className="w-full px-8 py-5 rounded-2xl bg-white/5 dark:bg-black/5 border-2 border-transparent focus:border-[var(--primary)] outline-none transition-all font-bold placeholder:text-zinc-600" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Email Address</label>
                  <input type="email" placeholder="email@address.com" className="w-full px-8 py-5 rounded-2xl bg-white/5 dark:bg-black/5 border-2 border-transparent focus:border-[var(--primary)] outline-none transition-all font-bold placeholder:text-zinc-600" />
                </div>
              </div>
              <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Subject</label>
                  <input type="text" placeholder="Project collaboration" className="w-full px-8 py-5 rounded-2xl bg-white/5 dark:bg-black/5 border-2 border-transparent focus:border-[var(--primary)] outline-none transition-all font-bold placeholder:text-zinc-600" />
              </div>
              <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Message</label>
                  <textarea rows={5} placeholder="Tell me about your vision..." className="w-full px-8 py-5 rounded-2xl bg-white/5 dark:bg-black/5 border-2 border-transparent focus:border-[var(--primary)] outline-none transition-all font-bold placeholder:text-zinc-600 resize-none" />
              </div>
              <button className="w-full py-6 rounded-[24px] font-black text-xl transition-all hover:scale-[1.02] bg-[var(--primary)] text-white shadow-glow hover:shadow-[0_20px_60px_-10px_var(--primary-glow)]">
                Ignite Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
