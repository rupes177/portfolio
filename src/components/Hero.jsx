import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Play, ArrowDown, ArrowUpRight, Film, MapPin, Clock, Sliders, Grid3X3, Clapperboard, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';
import {
  cinematicEase,
  dramaticEase,
  buttonTap
} from '../utils/motion';

const COLOR_MODES = [
  { id: 'rec709', label: 'REC.709', badge: 'HERO GRADE', filter: 'contrast(1.05) saturate(1.05) brightness(1)' },
  { id: 'log', label: 'LOG C', badge: 'RAW FLAT', filter: 'contrast(0.68) saturate(0.35) brightness(1.18)' },
  { id: 'film', label: 'KODAK 2383', badge: 'WARM 35MM', filter: 'contrast(1.2) saturate(1.18) sepia(0.14) brightness(0.98)' },
  { id: 'bw', label: 'MONOCHROME', badge: 'DIRECTOR CUT', filter: 'grayscale(1) contrast(1.3) brightness(0.95)' }
];

export default function Hero({ onOpenShowreel }) {
  const [timeStr, setTimeStr] = useState('');
  const [activeColorMode, setActiveColorMode] = useState('rec709');
  const [showGrid, setShowGrid] = useState(false);
  const [takeCount, setTakeCount] = useState(1);
  const [isClapping, setIsClapping] = useState(false);
  const [clapperFeedback, setClapperFeedback] = useState('');
  const [timecodeStr, setTimecodeStr] = useState('TC 01:24:18:04');

  const shouldReduceMotion = useReducedMotion();
  const slateCardRef = useRef(null);

  // 3D Perspective Tilt on Mouse Movement over Slate Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 250, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 250, damping: 25 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);

  const handleCardMouseMove = (e) => {
    if (shouldReduceMotion) return;
    const rect = slateCardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Interactive Clapper Click
  const handleSlateClap = () => {
    setIsClapping(true);
    const nextTake = takeCount + 1;
    setTakeCount(nextTake);

    const feedbackOptions = ['ACTION!', 'ROLL SOUND', 'SPEED', 'PRINT IT', 'MARKER!'];
    const randomFeedback = feedbackOptions[(nextTake - 1) % feedbackOptions.length];
    setClapperFeedback(randomFeedback);

    setTimeout(() => {
      setIsClapping(false);
    }, 400);

    setTimeout(() => {
      setClapperFeedback('');
    }, 1800);
  };

  // Live local time display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const localTime = new Intl.DateTimeFormat('en-US', {
        timeZone: profileData.timeZone || 'Asia/Kathmandu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setTimeStr(localTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live Running 24 FPS Timecode Generator
  useEffect(() => {
    if (shouldReduceMotion) return;
    let frames = 4;
    let seconds = 18;
    let minutes = 24;
    let hours = 1;

    const interval = setInterval(() => {
      frames++;
      if (frames >= 24) {
        frames = 0;
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
          if (minutes >= 60) {
            minutes = 0;
            hours++;
          }
        }
      }
      const pad = (n) => String(n).padStart(2, '0');
      setTimecodeStr(`TC ${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    }, 1000 / 24);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const scrollToWork = (e) => {
    e.preventDefault();
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const activeModeObj = COLOR_MODES.find((m) => m.id === activeColorMode) || COLOR_MODES[0];

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-44 lg:pb-32 overflow-hidden border-b border-editorial-border dark:border-editorial-darkBorder"
    >
      {/* Background subtle editorial lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full border-x border-editorial-border/60 dark:border-editorial-darkBorder/60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Top Editorial Telemetry Tape */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cinematicEase }}
          className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-editorial-border/60 dark:border-editorial-darkBorder/60 text-xs font-mono text-editorial-secondary dark:text-editorial-darkMuted uppercase tracking-wider"
        >
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-cinema-accent font-semibold">
              <span className="w-2 h-2 rounded-full bg-cinema-accent animate-ping" />
              REC [24 FPS]
            </span>
            <span className="hidden sm:inline text-editorial-muted dark:text-editorial-darkMuted">&bull;</span>
            <span className="hidden sm:inline font-mono font-medium text-editorial-primary dark:text-editorial-darkText bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded border border-editorial-border/50 dark:border-editorial-darkBorder/50">
              {timecodeStr}
            </span>
            <span className="hidden md:inline text-editorial-muted dark:text-editorial-darkMuted">&bull;</span>
            <span className="hidden md:inline">
              COLOR: <span className="text-cinema-accent font-semibold">{activeModeObj.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cinema-accent" />
              <span>{profileData.location}</span>
            </div>
            {timeStr && (
              <div className="hidden sm:flex items-center gap-1.5 text-editorial-muted dark:text-editorial-darkMuted">
                <Clock className="w-3 h-3" />
                <span>{profileData.timeZoneLabel || 'NPT'} {timeStr}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Editorial Content (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow with animated line */}
            <div className="inline-flex items-center gap-2 mb-6">
              <motion.span
                initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: cinematicEase, delay: 0.1 }}
                className="w-6 h-[1px] bg-cinema-accent origin-left"
              />
              <motion.span
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: cinematicEase, delay: 0.15 }}
                className="text-xs sm:text-sm font-mono tracking-cinema-wider uppercase text-cinema-accent font-semibold"
              >
                {profileData.eyebrow}
              </motion.span>
            </div>

            {/* Main Heading with Cinematic Text Mask Reveal */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-editorial-primary dark:text-editorial-darkText leading-[1.08] mb-6">
              <span className="block overflow-hidden py-1">
                {['Every', 'frame'].map((word, idx) => (
                  <motion.span
                    key={word}
                    initial={shouldReduceMotion ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      ease: cinematicEase,
                      delay: 0.2 + idx * 0.1
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>

              <span className="block overflow-hidden py-1 italic font-normal font-serif text-editorial-primary/90 dark:text-editorial-darkText/90">
                {['has', 'a', 'story.'].map((word, idx) => (
                  <motion.span
                    key={word}
                    initial={shouldReduceMotion ? { y: '0%', opacity: 1 } : { y: '115%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      ease: cinematicEase,
                      delay: 0.4 + idx * 0.08
                    }}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* Supporting Text */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: cinematicEase, delay: 0.55 }}
              className="text-lg sm:text-xl text-editorial-secondary dark:text-editorial-darkMuted font-normal leading-relaxed max-w-2xl mb-8"
            >
              {profileData.heroSubtext}
            </motion.p>

            {/* CTA Group with micro-interactions */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: cinematicEase, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 pt-2 mb-10"
            >
              <motion.a
                href="#work"
                onClick={scrollToWork}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={buttonTap}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-editorial-primary text-white text-xs font-mono uppercase tracking-wider hover:bg-cinema-accent dark:bg-cinema-accent dark:hover:bg-cinema-accentDark transition-colors duration-200 shadow-sm"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4" />
              </motion.a>

              <motion.button
                type="button"
                onClick={onOpenShowreel}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={buttonTap}
                className="inline-flex items-center justify-center gap-3 px-6 py-4 border border-editorial-border dark:border-editorial-darkBorder bg-white dark:bg-canvas-darkCard text-editorial-primary dark:text-editorial-darkText text-xs font-mono uppercase tracking-wider hover:border-cinema-accent hover:text-cinema-accent transition-colors duration-200 shadow-sm group"
              >
                <div className="w-5 h-5 rounded-full bg-cinema-accentLight dark:bg-cinema-accent/20 text-cinema-accent flex items-center justify-center group-hover:bg-cinema-accent group-hover:text-white transition-colors">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Watch 2025 Showreel</span>
                <span className="text-[10px] text-editorial-secondary dark:text-editorial-darkMuted font-mono">
                  [01:14]
                </span>
              </motion.button>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-editorial-secondary dark:text-editorial-darkMuted hover:text-editorial-primary dark:hover:text-editorial-darkText transition-colors py-2 px-1"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Metadata Footer */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: cinematicEase, delay: 0.85 }}
              className="pt-6 border-t border-editorial-border/60 dark:border-editorial-darkBorder/60 flex flex-wrap items-center gap-6 text-xs font-mono text-editorial-secondary dark:text-editorial-darkMuted"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
                <span className="text-editorial-primary dark:text-editorial-darkText font-medium">{profileData.availability}</span>
              </div>
              <span className="text-editorial-border dark:text-editorial-darkBorder">&bull;</span>
              <span>Weddings &middot; TVC &middot; Commercials &middot; Color Grading</span>
            </motion.div>
          </div>

          {/* Right Visual Composition (5 cols): Interactive 3D Slate & Live Color Monitor */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, ease: dramaticEase, delay: 0.3 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
            style={{ perspective: 1200 }}
          >
            <motion.div
              ref={slateCardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-md group cursor-default transition-shadow"
            >
              {/* Interactive Film Slate Header with Clapper Stick */}
              <div
                onClick={handleSlateClap}
                className="bg-editorial-primary text-white px-4 py-2.5 flex items-center justify-between text-[11px] font-mono tracking-wider uppercase cursor-pointer select-none border border-b-0 border-white/20 hover:bg-black transition-colors"
                title="Click clapper to take next shot!"
              >
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={isClapping ? { rotate: -18, y: -2 } : { rotate: 0, y: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="origin-bottom-left"
                  >
                    <Clapperboard className="w-4 h-4 text-cinema-accent" />
                  </motion.div>
                  <span className="font-bold text-white tracking-widest">
                    SLATE 01 &middot; TAKE {String(takeCount).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] bg-cinema-accent/30 text-cinema-accent px-1.5 py-0.2 rounded font-mono">
                    CLICK CLAPPER
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {clapperFeedback && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30"
                      >
                        {clapperFeedback}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="text-white/60">POST-PROD</span>
                </div>
              </div>

              {/* Main Portrait Frame with Live Color Profiles */}
              <div className="relative bg-editorial-primary p-3 pb-3 shadow-2xl border-x border-b border-editorial-border dark:border-editorial-darkBorder">
                {/* 4 Corner Framing Marks */}
                <div className="absolute top-5 left-5 w-4 h-4 border-t-2 border-l-2 border-white/70 pointer-events-none z-20" />
                <div className="absolute top-5 right-5 w-4 h-4 border-t-2 border-r-2 border-white/70 pointer-events-none z-20" />
                <div className="absolute bottom-16 left-5 w-4 h-4 border-b-2 border-l-2 border-white/70 pointer-events-none z-20" />
                <div className="absolute bottom-16 right-5 w-4 h-4 border-b-2 border-r-2 border-white/70 pointer-events-none z-20" />

                {/* Portrait Image Container */}
                <div className="relative overflow-hidden bg-neutral-950 aspect-[4/4.6]">
                  {/* The Image with Live Filter Applied */}
                  <motion.img
                    src={profileData.portrait}
                    alt="Rupesh Poudyal, Video Editor & Visual Storyteller"
                    style={{ filter: activeModeObj.filter }}
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-out"
                    loading="eager"
                  />

                  {/* Optional Rule-of-Thirds Grid Overlay */}
                  {showGrid && (
                    <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3 border border-white/20">
                      <div className="border-r border-b border-white/20" />
                      <div className="border-r border-b border-white/20" />
                      <div className="border-b border-white/20" />
                      <div className="border-r border-b border-white/20" />
                      <div className="border-r border-b border-white/20" />
                      <div className="border-b border-white/20" />
                      <div className="border-r border-white/20" />
                      <div className="border-r border-white/20" />
                      <div />
                    </div>
                  )}

                  {/* Gradient vignetting */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Top HUD Overlay: Active Look badge & Grid toggle */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[10px] font-mono text-white/80 z-20">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md rounded border border-white/20 uppercase tracking-wider text-cinema-accent font-semibold">
                      {activeModeObj.badge}
                    </span>

                    <button
                      type="button"
                      onClick={() => setShowGrid(!showGrid)}
                      className={`p-1.5 rounded border transition-colors flex items-center gap-1 ${
                        showGrid
                          ? 'bg-cinema-accent border-cinema-accent text-white'
                          : 'bg-black/60 border-white/20 text-white/70 hover:text-white'
                      }`}
                      title="Toggle Rule-of-Thirds Composition Grid"
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                      <span className="text-[9px]">GRID</span>
                    </button>
                  </div>

                  {/* Bottom Slate Overlay on Image */}
                  <div className="absolute bottom-3 inset-x-3 text-white text-xs font-mono flex items-end justify-between pointer-events-none z-20">
                    <div>
                      <div className="font-serif font-bold text-sm tracking-wide text-white">
                        RUPESH POUDYAL
                      </div>
                      <div className="text-[10px] text-white/70 tracking-wider uppercase">
                        LEAD EDITOR &middot; {profileData.location.split(',')[0]}
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 bg-cinema-accent text-white font-mono uppercase shadow-sm">
                      5+ YRS EXP
                    </span>
                  </div>
                </div>

                {/* INTERACTIVE COLOR SCIENCE MONITOR BAR */}
                <div className="mt-3 pt-2.5 pb-1 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                      <Sliders className="w-3 h-3 text-cinema-accent" />
                      Interactive Color Science
                    </span>
                    <span className="text-[9px] font-mono text-white/40">
                      CLICK TO PREVIEW GRADE
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5">
                    {COLOR_MODES.map((mode) => {
                      const isActive = activeColorMode === mode.id;
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setActiveColorMode(mode.id)}
                          className={`py-1.5 px-1 text-center font-mono text-[10px] uppercase tracking-wider rounded transition-all duration-200 border ${
                            isActive
                              ? 'bg-cinema-accent text-white border-cinema-accent font-bold shadow-md'
                              : 'bg-black/40 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {mode.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Film Technical Strip Beneath Image */}
                <div className="mt-2 pt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-[10px] font-mono text-white/60 text-center">
                  <div className="border-r border-white/10 pr-1">
                    <span className="block text-white/40">TOOLSET</span>
                    <span className="text-white/80 font-medium">RESOLVE / PREMIERE</span>
                  </div>
                  <div className="border-r border-white/10 px-1">
                    <span className="block text-white/40">SPECIALTY</span>
                    <span className="text-white/80 font-medium">COLOR & WEDDINGS</span>
                  </div>
                  <div className="pl-1">
                    <span className="block text-white/40">WORKFLOW</span>
                    <span className="text-white/80 font-medium">4K DCI &middot; 24P</span>
                  </div>
                </div>
              </div>

              {/* Behind-the-frame offset shadow box */}
              <div className="absolute -bottom-3 -right-3 inset-0 border border-cinema-accent/30 -z-10 pointer-events-none transition-transform duration-500 group-hover:translate-x-1.5 group-hover:translate-y-1.5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
