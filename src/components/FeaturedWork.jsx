import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { projectsData, projectCategories } from '../data/projects';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport,
  buttonTap
} from '../utils/motion';

export default function FeaturedWork({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.categoryKey === activeCategory);

  const featuredMaster = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((p) => p.id !== featuredMaster?.id);

  return (
    <section id="work" className="py-24 sm:py-32 bg-canvas-light dark:bg-canvas-dark border-b border-editorial-border dark:border-editorial-darkBorder transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: cinematicEase }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 mb-12 border-b border-editorial-border dark:border-editorial-darkBorder"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-cinema-accent" />
              <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold">
                Curated Portfolio &middot; 2022 &ndash; 2025
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-editorial-primary dark:text-editorial-darkText leading-tight">
              Selected Works &amp; <br />
              <span className="italic font-normal font-serif text-editorial-secondary dark:text-editorial-darkMuted">
                Visual Sequences.
              </span>
            </h2>
          </div>

          <div className="text-sm font-mono text-editorial-secondary dark:text-editorial-darkMuted max-w-sm">
            <p>
              Each project represents intentional pacing, rhythmic transitions, calibrated color science, and tailored storytelling.
            </p>
          </div>
        </motion.div>

        {/* Filter Navigation Bar with animated layout background */}
        <div className="mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 border border-editorial-border dark:border-editorial-darkBorder bg-white dark:bg-canvas-darkCard p-1.5 shadow-sm">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 text-xs font-mono tracking-wider uppercase transition-colors duration-200 whitespace-nowrap focus-visible:outline-none ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-editorial-secondary dark:text-editorial-darkMuted hover:text-editorial-primary dark:hover:text-editorial-darkText'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-editorial-primary dark:bg-cinema-accent shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Varied Editorial Layout with AnimatePresence */}
        <AnimatePresence mode="wait">
          {activeCategory === 'all' ? (
            <motion.div
              key="all-projects-layout"
              initial={shouldReduceMotion ? {} : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-16"
            >
              {/* MASTER PROJECT: Large Featured Cinematic Showcase (2.39:1 CinemaScope Frame) */}
              {featuredMaster && (
                <motion.div
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.75, ease: dramaticEase }}
                  className="bg-editorial-primary text-white border border-editorial-border dark:border-editorial-darkBorder overflow-hidden shadow-xl group"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 min-w-0">
                    {/* Left Visual Poster */}
                    <div
                      className="lg:col-span-7 xl:col-span-8 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full bg-black overflow-hidden cursor-pointer min-w-0"
                      onClick={() => onSelectProject(featuredMaster)}
                    >
                      <motion.img
                        src={featuredMaster.thumbnail}
                        alt={featuredMaster.title}
                        className="absolute inset-0 w-full h-full object-cover filter contrast-[1.04] brightness-[0.92]"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                        transition={{ duration: 0.7, ease: cinematicEase }}
                        loading="lazy"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Framing Marks */}
                      <div className="absolute top-4 left-4 text-xs font-mono text-cinema-accent font-semibold tracking-wider">
                        FEATURED MASTER &middot; {featuredMaster.aspectRatio || '2.39:1 CINEMASCOPE'}
                      </div>
                      <div className="absolute top-4 right-4 text-xs font-mono text-white/70">
                        {featuredMaster.timecode}
                      </div>

                      {/* Play Button Trigger with refined pulse & hover */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                          whileTap={buttonTap}
                          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover:bg-cinema-accent group-hover:border-cinema-accent transition-colors duration-300 shadow-2xl"
                        >
                          <Play className="w-6 h-6 text-white fill-current ml-1" />
                        </motion.div>
                      </div>

                      <div className="absolute bottom-4 left-4 text-xs font-mono text-white/80">
                        Click to screen project film &middot; {featuredMaster.duration}
                      </div>
                    </div>

                    {/* Right Editorial Details */}
                    <div className="lg:col-span-5 xl:col-span-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#19191C] border-t lg:border-t-0 lg:border-l border-white/10 min-w-0">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono text-cinema-accent uppercase tracking-wider mb-2">
                          <span>{featuredMaster.category}</span>
                          <span>&bull;</span>
                          <span>{featuredMaster.year}</span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 break-words">
                          {featuredMaster.title}
                        </h3>

                        <p className="text-xs font-mono mb-4 uppercase tracking-wider text-amber-200/90">
                          {featuredMaster.tagline}
                        </p>

                        <p className="text-sm text-editorial-darkMuted leading-relaxed mb-6">
                          {featuredMaster.description}
                        </p>

                        <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono text-white/80">
                          <div className="text-[11px] uppercase tracking-wider text-white/40">Key Highlights</div>
                          {featuredMaster.highlights && featuredMaster.highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent flex-shrink-0" />
                              <span className="truncate">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-8">
                        <motion.button
                          type="button"
                          onClick={() => onSelectProject(featuredMaster)}
                          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                          whileTap={buttonTap}
                          className="w-full py-3.5 px-6 bg-cinema-accent hover:bg-cinema-accentDark text-white text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Featured Project</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SECONDARY ROW: Equal 2-Column Pair */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {secondaryProjects.slice(0, 2).map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.7, delay: idx * 0.1, ease: dramaticEase }}
                    className="bg-white dark:bg-canvas-darkCard border border-editorial-border dark:border-editorial-darkBorder flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                  >
                      <div>
                        {/* Thumbnail Container */}
                        <div
                          className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                          onClick={() => onSelectProject(project)}
                        >
                          <motion.img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover filter brightness-[0.95]"
                            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                            transition={{ duration: 0.6, ease: cinematicEase }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                          <div className="absolute top-3 left-3 text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/70 text-white">
                            {project.aspectRatio}
                          </div>

                          <div className="absolute top-3 right-3 text-[11px] font-mono text-white/80">
                            {project.duration}
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-90 group-hover:opacity-100">
                            <motion.div
                              whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                              className="w-12 h-12 rounded-full bg-black/60 border border-white/40 flex items-center justify-center group-hover:bg-cinema-accent group-hover:border-cinema-accent transition-colors duration-300"
                            >
                              <Play className="w-5 h-5 text-white fill-current ml-0.5" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Content Block */}
                        <div className="p-6 sm:p-8">
                          <div className="flex items-center gap-2 text-xs font-mono text-cinema-accent uppercase tracking-wider mb-2">
                            <span>{project.category}</span>
                            <span>&bull;</span>
                            <span>{project.year}</span>
                          </div>

                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-editorial-primary dark:text-editorial-darkText mb-2 group-hover:text-cinema-accent transition-colors">
                            {project.title}
                          </h3>

                          <p className="text-sm text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed mb-4">
                            {project.description}
                          </p>

                          <div className="text-xs font-mono text-editorial-muted dark:text-editorial-darkMuted pt-3 border-t border-editorial-border dark:border-editorial-darkBorder flex flex-wrap gap-2">
                            <span className="font-medium text-editorial-primary dark:text-editorial-darkText">Tools:</span>
                            {project.tools.join(' · ')}
                          </div>
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 pt-0">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-editorial-primary dark:text-editorial-darkText group-hover:text-cinema-accent font-semibold transition-colors"
                        >
                          <span>Screen Project</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

              {/* TERTIARY ROW: 3-Column Editorial Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {secondaryProjects.slice(2).map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.65, delay: idx * 0.08, ease: dramaticEase }}
                    className="bg-white dark:bg-canvas-darkCard border border-editorial-border dark:border-editorial-darkBorder flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div
                        className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                        onClick={() => onSelectProject(project)}
                      >
                        <motion.img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover filter brightness-[0.95]"
                          whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                          transition={{ duration: 0.6, ease: cinematicEase }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/70 text-white">
                          {project.aspectRatio}
                        </div>

                        <div className="absolute top-3 right-3 text-[10px] font-mono text-white/80">
                          {project.duration}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-black/60 border border-white/40 flex items-center justify-center group-hover:bg-cinema-accent group-hover:border-cinema-accent transition-colors duration-300">
                            <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-[11px] font-mono text-cinema-accent uppercase tracking-wider mb-2">
                          {project.category} &middot; {project.year}
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-editorial-primary dark:text-editorial-darkText mb-2 group-hover:text-cinema-accent transition-colors">
                          {project.title}
                        </h3>

                        <p className="text-xs text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed mb-4">
                          {project.description}
                        </p>

                        <div className="text-[11px] font-mono text-editorial-muted dark:text-editorial-darkMuted pt-3 border-t border-editorial-border dark:border-editorial-darkBorder">
                          <span className="font-medium text-editorial-primary dark:text-editorial-darkText">Grade:</span> {project.colorGrade}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-editorial-primary dark:text-editorial-darkText group-hover:text-cinema-accent font-semibold transition-colors"
                      >
                        <span>Screen Video</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Filtered Category Grid */
            <motion.div
              key={`filtered-${activeCategory}`}
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: cinematicEase }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white dark:bg-canvas-darkCard border border-editorial-border dark:border-editorial-darkBorder flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
                >
                  <div>
                    <div
                      className="relative aspect-video bg-black overflow-hidden cursor-pointer"
                      onClick={() => onSelectProject(project)}
                    >
                      <motion.img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover filter brightness-[0.95]"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                        transition={{ duration: 0.6, ease: cinematicEase }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-black/70 text-white">
                        {project.aspectRatio}
                      </div>

                      <div className="absolute top-3 right-3 text-[10px] font-mono text-white/80">
                        {project.duration}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-black/60 border border-white/40 flex items-center justify-center group-hover:bg-cinema-accent group-hover:border-cinema-accent transition-colors duration-300">
                          <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-[11px] font-mono text-cinema-accent uppercase tracking-wider mb-2">
                        {project.category} &middot; {project.year}
                      </div>

                      <h3 className="font-serif text-xl font-bold text-editorial-primary dark:text-editorial-darkText mb-2 group-hover:text-cinema-accent transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-xs text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="text-[11px] font-mono text-editorial-muted dark:text-editorial-darkMuted pt-3 border-t border-editorial-border dark:border-editorial-darkBorder">
                        <span className="font-medium text-editorial-primary dark:text-editorial-darkText">Workflow:</span> {project.tools.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-editorial-primary dark:text-editorial-darkText group-hover:text-cinema-accent font-semibold transition-colors"
                    >
                      <span>Screen Video</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
