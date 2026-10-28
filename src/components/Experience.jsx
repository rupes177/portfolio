import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { experienceData } from '../data/experience';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport
} from '../utils/motion';

export default function Experience() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="experience" className="py-24 sm:py-32 bg-canvas-light dark:bg-canvas-dark border-b border-editorial-border dark:border-editorial-darkBorder transition-colors duration-300">
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
              Career Timeline &middot; Work History
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-editorial-primary dark:text-editorial-darkText leading-tight mb-6">
            Professional Experience &amp; <br />
            <span className="italic font-normal font-serif text-editorial-secondary dark:text-editorial-darkMuted">
              Production Studios.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed">
            A track record of high-standard post-production across commercial agencies, tech editorial teams, and boutique wedding studios in Nepal.
          </p>
        </motion.div>

        {/* Structured Editorial Timeline with animated entry */}
        <div className="space-y-12 relative">
          {experienceData.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={defaultViewport}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: dramaticEase }}
              className="relative border-t border-editorial-border dark:border-editorial-darkBorder pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 group"
            >
              {/* Left Column: Period & Studio Metadata (4 cols) */}
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cinema-accent font-bold tracking-widest uppercase">
                    [{exp.period}]
                  </span>
                  {exp.status === 'Current' && (
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-400 border dark:border-emerald-500/30 text-[10px] font-mono uppercase font-semibold">
                      Present Role
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-editorial-primary dark:text-editorial-darkText group-hover:text-cinema-accent transition-colors duration-200">
                  {exp.company}
                </h3>

                <div className="text-xs font-mono text-editorial-secondary dark:text-editorial-darkMuted flex items-center gap-2">
                  <MapPin className="w-3 h-3 text-cinema-accent" />
                  <span>{exp.location}</span>
                </div>

                <div className="text-sm font-mono text-editorial-primary dark:text-editorial-darkText font-medium pt-1">
                  {exp.role}
                </div>
              </div>

              {/* Right Column: Narrative Details & Responsibilities (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <p className="text-base text-editorial-secondary dark:text-editorial-darkMuted font-medium leading-relaxed">
                  {exp.summary}
                </p>

                <ul className="space-y-3">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent mt-2 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags Strip with subtle hover */}
                <div className="pt-4 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-white dark:bg-canvas-darkCard border border-editorial-border dark:border-editorial-darkBorder text-xs font-mono text-editorial-secondary dark:text-editorial-darkMuted hover:border-editorial-primary dark:hover:border-cinema-accent hover:text-editorial-primary dark:hover:text-editorial-darkText transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
