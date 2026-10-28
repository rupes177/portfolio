import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillsData } from '../data/skills';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport
} from '../utils/motion';

export default function Skills() {
  const { software, creativeCapabilities } = skillsData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="skills" className="py-24 sm:py-32 bg-canvas-light dark:bg-canvas-dark border-b border-editorial-border dark:border-editorial-darkBorder transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: cinematicEase }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-cinema-accent" />
            <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold">
              Technical Stack &middot; Toolset &amp; Discipline
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-editorial-primary dark:text-editorial-darkText leading-tight mb-6">
            Software &amp; <br />
            <span className="italic font-normal font-serif text-editorial-secondary dark:text-editorial-darkMuted">
              Editorial Discipline.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed">
            The software suites and core creative methodologies deployed across ingest, offline cutting, color finishing, and delivery.
          </p>
        </motion.div>

        {/* Software Grid: Refined Editorial Grid with subtle stagger and hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {software.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.55, delay: idx * 0.06, ease: cinematicEase }}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              className="p-6 bg-white dark:bg-canvas-darkCard border border-editorial-border dark:border-editorial-darkBorder shadow-sm flex flex-col justify-between hover:border-editorial-primary dark:hover:border-cinema-accent transition-all duration-200 group"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cinema-accent block mb-2 font-semibold">
                  {item.category}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-editorial-primary dark:text-editorial-darkText mb-3 group-hover:text-cinema-accent transition-colors duration-200">
                  {item.name}
                </h3>

                <p className="text-xs sm:text-sm text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-editorial-border/60 dark:border-editorial-darkBorder/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-editorial-muted dark:text-editorial-darkMuted block mb-2">
                  Specialized Scope
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.focus.map((f) => (
                    <span
                      key={f}
                      className="px-2 py-0.5 bg-canvas-subtle dark:bg-canvas-darkSurface text-[11px] font-mono text-editorial-primary dark:text-editorial-darkText group-hover:bg-cinema-accentLight/60 dark:group-hover:bg-cinema-accent/30 transition-colors"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Creative Capabilities Strip */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.75, ease: dramaticEase }}
          className="bg-[#1A1A1D] text-white p-8 sm:p-12 border border-editorial-darkBorder"
        >
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold block mb-2">
              Beyond Software
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Core Storytelling Capabilities
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creativeCapabilities.map((cap, i) => (
              <div key={i} className="border-t border-white/10 pt-4 space-y-2">
                <div className="text-xs font-mono text-cinema-accent uppercase tracking-wider font-semibold">
                  0{i + 1} &middot; {cap.title}
                </div>
                <p className="text-xs font-mono text-white/70 leading-relaxed">
                  {cap.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
