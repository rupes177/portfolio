import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe2, Award, BookOpen, MapPin } from 'lucide-react';
import { profileData } from '../data/profile';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport
} from '../utils/motion';

export default function Education() {
  const { education, languages, certifications, activities } = profileData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="py-24 sm:py-32 bg-canvas-light dark:bg-canvas-dark border-b border-editorial-border dark:border-editorial-darkBorder transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Education (7 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.75, ease: cinematicEase }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-cinema-accent" />
              <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold">
                Academic Background &middot; Education
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-editorial-primary dark:text-editorial-darkText mb-8">
              Education &amp; Engineering Foundation
            </h2>

            <div className="space-y-8 divide-y divide-editorial-border dark:divide-editorial-darkBorder">
              {education.map((item, idx) => (
                <div key={item.institution} className={idx !== 0 ? 'pt-8' : ''}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono text-cinema-accent font-bold tracking-wider">
                      [{item.period}]
                    </span>
                    <span className="text-xs font-mono text-editorial-muted dark:text-editorial-darkMuted flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-editorial-primary dark:text-editorial-darkText mb-1">
                    {item.institution}
                  </h3>

                  <div className="text-sm font-mono text-editorial-primary dark:text-editorial-darkText font-medium mb-2">
                    {item.degree}
                  </div>

                  <p className="text-xs sm:text-sm text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Additional Information (Languages, Certs, Mentorship) (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.75, delay: 0.15, ease: cinematicEase }}
            className="lg:col-span-5 space-y-10"
          >
            {/* Certifications */}
            <div className="bg-white dark:bg-canvas-darkCard p-6 sm:p-8 border border-editorial-border dark:border-editorial-darkBorder shadow-sm hover:border-editorial-primary dark:hover:border-cinema-accent transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinema-accent font-semibold mb-3">
                <Award className="w-4 h-4" />
                <span>Industry Recognition</span>
              </div>

              {certifications.map((cert) => (
                <div key={cert.title} className="space-y-1.5">
                  <h4 className="font-serif text-lg font-bold text-editorial-primary dark:text-editorial-darkText">
                    {cert.title}
                  </h4>
                  <div className="text-xs font-mono text-editorial-secondary dark:text-editorial-darkMuted">
                    Awarded by <span className="text-editorial-primary dark:text-editorial-darkText font-medium">{cert.organization}</span> ({cert.year})
                  </div>
                  <p className="text-xs text-editorial-muted dark:text-editorial-darkMuted leading-relaxed pt-1">
                    {cert.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="bg-white dark:bg-canvas-darkCard p-6 sm:p-8 border border-editorial-border dark:border-editorial-darkBorder shadow-sm hover:border-editorial-primary dark:hover:border-cinema-accent transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinema-accent font-semibold mb-4">
                <Globe2 className="w-4 h-4" />
                <span>Language Proficiencies</span>
              </div>

              <div className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between py-1.5 border-b border-editorial-border/40 dark:border-editorial-darkBorder/40 last:border-0 text-xs font-mono"
                  >
                    <span className="font-bold text-editorial-primary dark:text-editorial-darkText text-sm font-serif">
                      {lang.name}
                    </span>
                    <span className="text-editorial-secondary dark:text-editorial-darkMuted">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities & Mentorship */}
            <div className="bg-white dark:bg-canvas-darkCard p-6 sm:p-8 border border-editorial-border dark:border-editorial-darkBorder shadow-sm hover:border-editorial-primary dark:hover:border-cinema-accent transition-colors">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cinema-accent font-semibold mb-3">
                <BookOpen className="w-4 h-4" />
                <span>Activities &amp; Teaching</span>
              </div>

              {activities.map((act, i) => (
                <div key={i} className="space-y-1.5">
                  <h4 className="font-serif text-base font-bold text-editorial-primary dark:text-editorial-darkText">
                    {act.title}
                  </h4>
                  <p className="text-xs text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed">
                    {act.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
