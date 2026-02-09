
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
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-20 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] select-none pointer-events-none md:text-[15rem] text-8xl font-black font-accent">
        <motion.div 
           animate={{ x: [0, -1000] }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          CONTACT CONTACT CONTACT CONTACT CONTACT CONTACT CONTACT CONTACT 
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Header & Socials Side */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] font-accent tracking-tighter mb-10 italic">
                {title || "LET'S BUILD THE FUTURE"}
              </h2>
              <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-xl">
                Ready to transform your vision into a digital masterpiece? Reach out, and let's start the conversation.
              </p>
            </motion.div>

            <div className="space-y-6">
              <a href={`mailto:${data.contactInfo.email}`} className="group block relative p-1 px-8 py-8 rounded-[40px] bg-white/5 border border-[var(--border-color)] overflow-hidden transition-all hover:border-[var(--primary)] hover:scale-[1.02]">
                 <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-gradient-to-t from-[var(--primary)]/10 to-transparent transition-all duration-700" />
                 <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Direct Email</p>
                      <p className="text-xl md:text-2xl font-black font-accent truncate">{data.contactInfo.email}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center shadow-glow group-hover:rotate-12 transition-transform">
                      <Mail size={24} />
                    </div>
                 </div>
              </a>

              <a href={`tel:${data.contactInfo.phoneNumber}`} className="group block relative p-1 px-8 py-8 rounded-[40px] bg-white/5 border border-[var(--border-color)] overflow-hidden transition-all hover:border-emerald-500 hover:scale-[1.02]">
                 <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-gradient-to-t from-emerald-500/10 to-transparent transition-all duration-700" />
                 <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-2">Voice Call</p>
                      <p className="text-xl md:text-2xl font-black font-accent">{data.contactInfo.phoneNumber}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:-rotate-12 transition-transform">
                      <Phone size={24} />
                    </div>
                 </div>
              </a>
            </div>

            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Github size={24} />, url: data.contactInfo.github, label: 'GitHub' },
                { icon: <Linkedin size={24} />, url: data.contactInfo.linkedin, label: 'LinkedIn' },
                { icon: <Facebook size={24} />, url: data.contactInfo.facebook, label: 'Facebook' },
                { icon: <Globe size={24} />, url: `https://${data.contactInfo.website}`, label: 'Web' }
              ].filter(s => s.url).map((social, idx) => (
                <motion.a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-[var(--border-color)] hover:bg-[var(--primary)] hover:text-white transition-all shadow-xl"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Form Side */}
          <div className="lg:col-span-12 xl:col-span-7">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative p-8 md:p-16 rounded-[4rem] bg-white/5 dark:bg-black/20 backdrop-blur-2xl border border-[var(--border-color)] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--primary)] opacity-[0.05] blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full" />
              
              <form className="relative z-10 space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Full Identity</label>
                    <input type="text" placeholder="Who are you?" className="w-full px-8 py-5 rounded-[24px] bg-zinc-50 dark:bg-black/40 border border-[var(--border-color)] focus:border-[var(--primary)] outline-none transition-all font-bold placeholder:text-zinc-600" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">Digital Signature (Email)</label>
                    <input type="email" placeholder="example@vision.com" className="w-full px-8 py-5 rounded-[24px] bg-zinc-50 dark:bg-black/40 border border-[var(--border-color)] focus:border-[var(--primary)] outline-none transition-all font-bold placeholder:text-zinc-600" />
                  </div>
                </div>
                
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2">The Mission (Message)</label>
                    <textarea rows={5} placeholder="Describe the masterpiece we're building..." className="w-full px-8 py-6 rounded-[32px] bg-zinc-50 dark:bg-black/40 border border-[var(--border-color)] focus:border-[var(--primary)] outline-none transition-all font-bold placeholder:text-zinc-600 resize-none leading-relaxed" />
                </div>

                <button className="group relative w-full py-7 rounded-[32px] overflow-hidden bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-black text-2xl transition-all hover:scale-[1.02] shadow-2xl active:scale-95">
                  <div className="absolute inset-0 bg-[var(--primary)] -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
                  <span className="relative z-10">IGNITE CONVERSATION</span>
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
