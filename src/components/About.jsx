import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/profile';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport
} from '../utils/motion';

export default function About() {
  const { about } = profileData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 sm:py-32 bg-canvas-light dark:bg-canvas-dark border-b border-editorial-border dark:border-editorial-darkBorder transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Visual Portrait Badge & Editorial Metadata (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.75, ease: dramaticEase }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <div className="relative w-full max-w-sm group">
              {/* Photo Box */}
              <div className="relative bg-editorial-primary p-2 border border-editorial-border dark:border-editorial-darkBorder shadow-lg">
                <div className="relative aspect-[4/4.2] overflow-hidden bg-neutral-900">
                  <motion.img
                    src={profileData.portrait}
                    alt="Rupesh Poudyal portrait - Video Editor & Visual Storyteller"
                    className="w-full h-full object-cover filter contrast-[1.04]"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                    transition={{ duration: 0.6, ease: cinematicEase }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Marks */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/60" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/60" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/60" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/60" />

                  <div className="absolute bottom-3 inset-x-3 text-white text-[11px] font-mono flex justify-between items-end">
                    <span>RUPESH POUDYAL</span>
                    <span className="text-cinema-accent font-semibold">POST-DIRECTOR</span>
                  </div>
                </div>

                {/* Sub-label tape */}
                <div className="pt-2 px-1 text-[10px] font-mono text-white/70 flex justify-between">
                  <span>{profileData.location.toUpperCase()}</span>
                  <span>TC 00:00:24:00</span>
                </div>
              </div>

              {/* Editorial Stat Strip Below Portrait */}
              <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                {about.stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: cinematicEase }}
                    className="p-3.5 bg-white dark:bg-canvas-darkCard border border-editorial-border dark:border-editorial-darkBorder shadow-sm"
                  >
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-editorial-muted dark:text-editorial-darkMuted">
                      {stat.label}
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-editorial-primary dark:text-editorial-darkText">
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Bio Narrative (7 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.75, ease: cinematicEase }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-[1px] bg-cinema-accent" />
              <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold">
                Philosophy &middot; Creative Direction
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-editorial-primary dark:text-editorial-darkText mb-8 leading-tight">
              {about.heading}
            </h2>

            <div className="space-y-6 text-base sm:text-lg text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed font-normal">
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
              <p>{about.paragraph3}</p>
            </div>

            {/* Editorial Focus Principles */}
            <div className="mt-10 pt-8 border-t border-editorial-border dark:border-editorial-darkBorder grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: 0.2, ease: cinematicEase }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-editorial-primary dark:text-editorial-darkText font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cinema-accent" />
                  <span>Rhythmic Pacing</span>
                </div>
                <p className="text-xs font-mono text-editorial-muted dark:text-editorial-darkMuted leading-relaxed">
                  Building visual momentum where pauses carry as much weight as rapid cuts.
                </p>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={defaultViewport}
                transition={{ duration: 0.5, delay: 0.3, ease: cinematicEase }}
                className="space-y-2"
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-editorial-primary dark:text-editorial-darkText font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cinema-accent" />
                  <span>Color Fidelity</span>
                </div>
                <p className="text-xs font-mono text-editorial-muted dark:text-editorial-darkMuted leading-relaxed">
                  Protecting skin tone fidelity and developing cohesive filmic contrast curves.
                </p>
              </motion.div>
            </div>

            {/* Action Row */}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-editorial-primary dark:text-editorial-darkText hover:text-cinema-accent font-semibold transition-colors"
              >
                <span>Read Professional Experience</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-editorial-border dark:text-editorial-darkBorder">&vert;</span>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinema-accent hover:text-cinema-accentDark font-semibold transition-colors"
              >
                <span>Inquire About Collaboration</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
