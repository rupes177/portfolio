import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Check, 
  Sliders, 
  Film, 
  Layers, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  Tv, 
  Camera, 
  Scissors, 
  Eye, 
  MonitorPlay 
} from 'lucide-react';
import { servicesData } from '../data/services';
import { profileData } from '../data/profile';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport,
  buttonTap
} from '../utils/motion';

export default function Services() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(true);
  const [colorSliderPos, setColorSliderPos] = useState(55); // 0 to 100%
  const [activeAspect, setActiveAspect] = useState('2.39'); // '2.39' or '16:9'
  const shouldReduceMotion = useReducedMotion();

  const activeService = servicesData[activeServiceIdx] || servicesData[0];

  const handleSelectServiceQuote = (serviceTitle) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Map to contact form select value
      const selectEl = document.getElementById('form-service');
      if (selectEl) {
        if (serviceTitle.includes('Wedding')) selectEl.value = 'Wedding Film';
        else if (serviceTitle.includes('Color')) selectEl.value = 'Color Grading';
        else if (serviceTitle.includes('Commercial')) selectEl.value = 'Commercial TVC';
        else if (serviceTitle.includes('Cinematography')) selectEl.value = 'Cinematography & Post';
        else selectEl.value = 'Other Project';
        // Trigger React change event
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-canvas-light dark:bg-canvas-dark border-b border-editorial-border dark:border-editorial-darkBorder relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: cinematicEase }}
          className="max-w-3xl mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-cinema-accent" />
            <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold">
              Post-Production Suite &middot; Capabilities
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-editorial-primary dark:text-editorial-darkText leading-tight mb-6">
            Services Shaped for <br />
            <span className="italic font-normal font-serif text-editorial-secondary dark:text-editorial-darkMuted">
              Precision &amp; Emotion.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-editorial-secondary dark:text-editorial-darkMuted leading-relaxed">
            Explore dedicated post-production solutions with interactive workflow telemetry, from raw camera ingest to calibrated cinema mastering.
          </p>
        </motion.div>

        {/* Interactive Studio Console (Tab Selector + Live Studio Display) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Service Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-editorial-muted dark:text-editorial-darkMuted pb-2 border-b border-editorial-border/60 dark:border-editorial-darkBorder/60 flex items-center justify-between">
              <span>Select Capability</span>
              <span>[01 &ndash; 06]</span>
            </div>

            <div className="space-y-2">
              {servicesData.map((service, idx) => {
                const isActive = activeServiceIdx === idx;
                return (
                  <button
                    key={service.number}
                    type="button"
                    onClick={() => setActiveServiceIdx(idx)}
                    className={`relative w-full p-4 sm:p-5 text-left border transition-all duration-200 focus-visible:outline-none ${
                      isActive
                        ? 'bg-white dark:bg-canvas-darkCard border-editorial-primary dark:border-cinema-accent shadow-md'
                        : 'bg-white/60 dark:bg-canvas-darkCard/50 border-editorial-border dark:border-editorial-darkBorder hover:bg-white dark:hover:bg-canvas-darkCard hover:border-editorial-secondary/60 dark:hover:border-editorial-darkBorder'
                    }`}
                  >
                    {/* Active Indicator Line */}
                    {isActive && (
                      <motion.div
                        layoutId="activeServiceIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1.5 bg-cinema-accent"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}

                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="font-mono text-xs font-bold text-cinema-accent tracking-wider">
                        [{service.number}]
                      </span>
                      <span className="text-[10px] font-mono text-editorial-muted dark:text-editorial-darkMuted uppercase tracking-wider">
                        {service.tools[0]}
                      </span>
                    </div>

                    <h3 className={`font-serif text-lg sm:text-xl font-bold transition-colors ${
                      isActive ? 'text-editorial-primary dark:text-editorial-darkText' : 'text-editorial-secondary dark:text-editorial-darkMuted'
                    }`}>
                      {service.title}
                    </h3>

                    <p className="text-xs text-editorial-secondary dark:text-editorial-darkMuted line-clamp-1 mt-1 font-sans">
                      {service.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Live Interactive Studio Stage (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`studio-${activeService.number}`}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: cinematicEase }}
                className="bg-[#151518] text-white border border-editorial-darkBorder shadow-2xl p-6 sm:p-8 relative overflow-hidden"
              >
                {/* Top Studio Telemetry Bar */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10 text-xs font-mono text-white/60">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cinema-accent animate-pulse" />
                    <span className="text-white font-semibold uppercase tracking-wider">
                      STUDIO CONSOLE &middot; {activeService.number}
                    </span>
                  </div>
                  <span className="text-cinema-accent uppercase font-bold text-[11px]">
                    {activeService.title}
                  </span>
                </div>

                {/* Service Headline & Detailed Craft Philosophy */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                    {activeService.title}
                  </h3>
                  <p className="text-sm text-editorial-darkMuted leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* DYNAMIC INTERACTIVE VISUALIZER FOR EACH SERVICE */}
                <div className="mb-8 p-4 bg-black/60 border border-white/10 rounded-sm">
                  {/* Service 01: Video Editing — Interactive NLE Multi-Track Timeline */}
                  {activeServiceIdx === 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <div className="flex items-center gap-2">
                          <Scissors className="w-3.5 h-3.5 text-cinema-accent" />
                          <span>NLE TIMELINE ARCHITECTURE</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
                          className="flex items-center gap-1 text-[10px] text-cinema-accent hover:text-white transition-colors"
                        >
                          {isTimelinePlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isTimelinePlaying ? 'PAUSE PLAYHEAD' : 'PLAY TIMELINE'}</span>
                        </button>
                      </div>

                      {/* Timeline Tracks */}
                      <div className="relative bg-[#0E0E10] p-3 border border-white/10 space-y-2 overflow-hidden">
                        {/* Playhead bar */}
                        {isTimelinePlaying && !shouldReduceMotion && (
                          <motion.div
                            animate={{ x: [0, 360, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                            className="absolute top-0 bottom-0 w-[2px] bg-red-500 z-20 pointer-events-none shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                          >
                            <div className="w-2.5 h-2 -ml-1 bg-red-500 clip-playhead" />
                          </motion.div>
                        )}

                        {/* Track V2 */}
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="w-8 text-white/40">V2</span>
                          <div className="flex-1 flex gap-1.5 h-6 bg-black/40 p-0.5 rounded">
                            <div className="w-1/4 bg-sky-900/60 border border-sky-500/40 rounded text-[9px] px-1.5 flex items-center text-sky-200 truncate">
                              B-Roll Insert
                            </div>
                            <div className="w-1/3 bg-sky-900/60 border border-sky-500/40 rounded text-[9px] px-1.5 flex items-center text-sky-200 truncate">
                              Close-up Macro Cut
                            </div>
                          </div>
                        </div>

                        {/* Track V1 */}
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="w-8 text-white/40">V1</span>
                          <div className="flex-1 flex gap-1 h-6 bg-black/40 p-0.5 rounded">
                            <div className="w-1/2 bg-emerald-950/70 border border-emerald-500/40 rounded text-[9px] px-1.5 flex items-center text-emerald-200 truncate">
                              A-Roll Master Interview [4K DCI]
                            </div>
                            <div className="w-1/2 bg-emerald-950/70 border border-emerald-500/40 rounded text-[9px] px-1.5 flex items-center text-emerald-200 truncate">
                              Ceremony Wide Angle
                            </div>
                          </div>
                        </div>

                        {/* Track A1 */}
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="w-8 text-white/40">A1</span>
                          <div className="flex-1 h-5 bg-black/40 p-0.5 rounded flex items-center px-2 bg-amber-950/40 border border-amber-500/30 text-amber-200/80 text-[9px]">
                            Dialogue Master &bull; Denoise &bull; EQ Master
                          </div>
                        </div>

                        {/* Track A2 */}
                        <div className="flex items-center gap-2 text-[10px] font-mono">
                          <span className="w-8 text-white/40">A2</span>
                          <div className="flex-1 h-5 bg-black/40 p-0.5 rounded flex items-center px-2 bg-purple-950/40 border border-purple-500/30 text-purple-200/80 text-[9px]">
                            Cinematic Ambient Score &bull; Sound Design SFX
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service 02: Color Grading — Interactive Before/After Split Comparison */}
                  {activeServiceIdx === 1 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <div className="flex items-center gap-2">
                          <Sliders className="w-3.5 h-3.5 text-cinema-accent" />
                          <span>INTERACTIVE GRADE SPLIT-SCREEN</span>
                        </div>
                        <span className="text-cinema-accent text-[10px]">
                          DRAG SLIDER ({colorSliderPos}%)
                        </span>
                      </div>

                      {/* Visual Split Box */}
                      <div className="relative aspect-[16/8] bg-neutral-900 overflow-hidden border border-white/20 select-none">
                        {/* Background Graded Image (Right) */}
                        <img
                          src="/images/wedding-film.jpg"
                          alt="Graded Footage Preview"
                          className="absolute inset-0 w-full h-full object-cover filter contrast-[1.18] saturate-[1.25] sepia-[0.1]"
                        />

                        {/* Foreground Flat Log Image (Left - Clipped) */}
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ clipPath: `inset(0 ${100 - colorSliderPos}% 0 0)` }}
                        >
                          <img
                            src="/images/wedding-film.jpg"
                            alt="Raw Flat Log Footage"
                            className="absolute inset-0 w-full h-full object-cover filter contrast-[0.6] saturate-[0.3] brightness-[1.25]"
                          />
                          <div className="absolute top-2 left-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 text-white/90">
                            RAW LOG-C
                          </div>
                        </div>

                        {/* Graded Tag on Right */}
                        <div className="absolute top-2 right-2 text-[10px] font-mono bg-cinema-accent px-2 py-0.5 text-white font-semibold">
                          KODAK 2383 REC.709
                        </div>

                        {/* Divider Line */}
                        <div
                          className="absolute top-0 bottom-0 w-[2px] bg-white z-10 pointer-events-none"
                          style={{ left: `${colorSliderPos}%` }}
                        >
                          <div className="absolute top-1/2 -mt-3 -ml-3 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold shadow-lg">
                            &harr;
                          </div>
                        </div>

                        {/* Native Range Input for Smooth Dragging */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={colorSliderPos}
                          onChange={(e) => setColorSliderPos(Number(e.target.value))}
                          className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-full h-full"
                          aria-label="Color grade comparison slider"
                        />
                      </div>
                    </div>
                  )}

                  {/* Service 03: Wedding Films — Aspect Ratio & Narrative Arc */}
                  {activeServiceIdx === 2 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <div className="flex items-center gap-2">
                          <Film className="w-3.5 h-3.5 text-cinema-accent" />
                          <span>CINEMATIC FRAMING &amp; PACING ARC</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveAspect('2.39')}
                            className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                              activeAspect === '2.39' ? 'bg-cinema-accent text-white' : 'bg-white/10 text-white/60'
                            }`}
                          >
                            2.39:1 SCOPE
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveAspect('16:9')}
                            className={`px-2 py-0.5 text-[9px] font-mono rounded ${
                              activeAspect === '16:9' ? 'bg-cinema-accent text-white' : 'bg-white/10 text-white/60'
                            }`}
                          >
                            16:9 BROADCAST
                          </button>
                        </div>
                      </div>

                      {/* Mock Frame */}
                      <div className="relative aspect-[16/8] bg-neutral-900 border border-white/20 overflow-hidden flex items-center justify-center">
                        <img
                          src="/images/preeti_and_siddhartha.png"
                          alt="Wedding Highlights"
                          className="w-full h-full object-cover"
                        />
                        {/* 2.39 Letterbox Bars */}
                        {activeAspect === '2.39' && (
                          <>
                            <div className="absolute top-0 inset-x-0 h-4 bg-black pointer-events-none" />
                            <div className="absolute bottom-0 inset-x-0 h-4 bg-black pointer-events-none" />
                          </>
                        )}
                        <div className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/70 px-2 py-0.5 text-white/90">
                          {activeAspect === '2.39' ? '2.39:1 CinemaScope Frame' : '16:9 Standard Frame'}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service 04: Commercial — High-Retention Pacing Graph */}
                  {activeServiceIdx === 3 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <div className="flex items-center gap-2">
                          <Tv className="w-3.5 h-3.5 text-cinema-accent" />
                          <span>30-SEC RETENTION PACING STRATEGY</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">-23 LUFS BROADCAST</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded">
                          <span className="text-cinema-accent font-bold block mb-1">00:00 &ndash; 00:03</span>
                          <span className="text-white font-medium block">THE HOOK</span>
                          <span className="text-[9px] text-white/50">Stop-the-scroll match cuts</span>
                        </div>
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded">
                          <span className="text-cinema-accent font-bold block mb-1">00:03 &ndash; 00:15</span>
                          <span className="text-white font-medium block">THE NARRATIVE</span>
                          <span className="text-[9px] text-white/50">Product in lifestyle context</span>
                        </div>
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded">
                          <span className="text-cinema-accent font-bold block mb-1">00:15 &ndash; 00:25</span>
                          <span className="text-white font-medium block">ACCELERATION</span>
                          <span className="text-[9px] text-white/50">Dynamic speed ramps &amp; SFX</span>
                        </div>
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded">
                          <span className="text-cinema-accent font-bold block mb-1">00:25 &ndash; 00:30</span>
                          <span className="text-white font-medium block">THE CTA</span>
                          <span className="text-[9px] text-white/50">Brand lock &amp; memorable finish</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service 05: Motion Graphics — Kinetic UI & Typography */}
                  {activeServiceIdx === 4 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <div className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-cinema-accent" />
                          <span>EDITORIAL LOWER THIRDS &amp; PLANAR TRACKING</span>
                        </div>
                        <span className="text-[10px] text-cinema-accent font-mono">AFTER EFFECTS</span>
                      </div>

                      <div className="relative aspect-[16/8] bg-neutral-900 border border-white/20 p-4 flex flex-col justify-end">
                        <img
                          src="/images/samsung-galaxy-buds-2.png"
                          alt="Motion Graphics Context"
                          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7]"
                        />
                        {/* Sample Tracked Lower Third */}
                        <div className="relative z-10 bg-black/80 backdrop-blur-md p-3 border-l-2 border-cinema-accent max-w-xs">
                          <div className="text-[9px] font-mono text-cinema-accent uppercase tracking-wider">
                            DIRECTOR OF PHOTOGRAPHY
                          </div>
                          <div className="font-serif text-sm font-bold text-white">
                            RUPESH POUDYAL
                          </div>
                          <div className="text-[9px] font-mono text-white/50">
                            4K DCI &bull; {profileData.location.split(',')[0].toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service 06: Cinematography & Post — DIT Pipeline */}
                  {activeServiceIdx === 5 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
                        <div className="flex items-center gap-2">
                          <Camera className="w-3.5 h-3.5 text-cinema-accent" />
                          <span>DIT &amp; SENSOR PIPELINE</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-mono">DUAL CHECKSUM MD5</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded">
                          <span className="text-cinema-accent font-bold block mb-1">ON SET</span>
                          <span className="text-white font-medium block">4K RAW / LogC</span>
                          <span className="text-[9px] text-white/50">Calibrated field monitor</span>
                        </div>
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded">
                          <span className="text-cinema-accent font-bold block mb-1">DAILIES</span>
                          <span className="text-white font-medium block">ProRes Proxy</span>
                          <span className="text-[9px] text-white/50">Zero-latency offline cut</span>
                        </div>
                        <div className="p-2.5 bg-white/5 border border-white/10 rounded">
                          <span className="text-cinema-accent font-bold block mb-1">FINISHING</span>
                          <span className="text-white font-medium block">ACEScc Master</span>
                          <span className="text-[9px] text-white/50">Full dynamic range export</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Key Deliverables Checkpoints */}
                <div className="mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-white/60 font-semibold block mb-3">
                    Deliverables &amp; Milestones Included
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeService.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-mono text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Software Stack & Action Button */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-white/40 uppercase">Tools:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeService.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-white/10 border border-white/10 text-[10px] font-mono text-white/90 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => handleSelectServiceQuote(activeService.title)}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={buttonTap}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-cinema-accent hover:bg-cinema-accentDark text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors shadow-lg"
                  >
                    <span>Request {activeService.title} Quote</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
