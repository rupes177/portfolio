import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Maximize2, Film, RotateCcw } from 'lucide-react';
import { profileData } from '../data/profile';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport,
  fadeUp,
  buttonTap
} from '../utils/motion';

export default function Showreel({ onOpenModal }) {
  const [isPlayingInline, setIsPlayingInline] = useState(false);
  const [hasError, setHasError] = useState(false);
  const showreel = profileData.showreel;
  const shouldReduceMotion = useReducedMotion();

  const handlePlayClick = () => {
    setIsPlayingInline(true);
  };

  const handleResetInline = () => {
    setIsPlayingInline(false);
    setHasError(false);
  };

  return (
    <section
      id="showreel"
      className="relative bg-canvas-dark text-editorial-darkText py-24 sm:py-32 overflow-hidden border-b border-editorial-darkBorder"
    >
      {/* Background cinematic atmospheric grain */}
      <div className="absolute inset-0 bg-radial-gradient from-neutral-800/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Section Header with scroll reveal */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: cinematicEase }}
          className="max-w-3xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-cinema-accent animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold">
              The Primary Visual Feature &middot; Showreel
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            {showreel.heading}
          </h2>

          <p className="text-base sm:text-lg text-editorial-darkMuted leading-relaxed">
            {showreel.subtext}
          </p>
        </motion.div>

        {/* Cinematic Screening Frame with smooth scale entrance */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.8, ease: dramaticEase, delay: 0.1 }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Top Telemetry Bar */}
          <div className="bg-[#1A1A1E] border border-editorial-darkBorder border-b-0 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono text-editorial-darkMuted">
            <div className="flex items-center gap-3">
              <span className="text-cinema-accent font-bold">REEL 2025</span>
              <span>&vert;</span>
              <span>{showreel.timecode}</span>
              <span className="hidden sm:inline">&vert;</span>
              <span className="hidden sm:inline">{showreel.specs}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenModal({
                  title: "A Selection of Moving Images — 2025 Showreel",
                  category: "Showreel & Montage",
                  videoProvider: showreel.provider,
                  videoId: showreel.videoId,
                  description: showreel.subtext,
                  aspectRatio: "16:9",
                  year: "2025",
                  tools: ["DaVinci Resolve Studio", "Adobe Premiere Pro"],
                  colorGrade: "Rec.709 Cinema Emulation"
                })}
                className="hover:text-white transition-colors flex items-center gap-1 focus-visible:outline-none py-0.5 px-1.5"
                title="Open in Expanded Theater Mode"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Screening Room</span>
              </button>
            </div>
          </div>

          {/* Main Video / Poster Container (16:9) */}
          <div className="relative aspect-video w-full bg-black border border-editorial-darkBorder overflow-hidden shadow-2xl group">
            {isPlayingInline ? (
              <div className="relative w-full h-full bg-black">
                {showreel.provider === 'youtube' ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${showreel.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                    title="Rupesh Poudyal Showreel"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setHasError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-black/90">
                    <p className="text-sm font-mono text-editorial-darkMuted mb-4">
                      Video streaming connection active.
                    </p>
                    <a
                      href={`https://www.youtube.com/watch?v=EngW7tLk6R8`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-cinema-accent text-white font-mono text-xs uppercase tracking-wider"
                    >
                      Watch Directly on Platform &rarr;
                    </a>
                  </div>
                )}

                {/* Inline Close / Return Button */}
                <button
                  type="button"
                  onClick={handleResetInline}
                  className="absolute top-4 right-4 z-20 bg-black/80 hover:bg-cinema-accent text-white px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return to Poster</span>
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full overflow-hidden">
                {/* Poster Image with subtle scale on hover */}
                <motion.img
                  src={showreel.poster}
                  alt="Showreel Poster Frame — Rupesh Poudyal Video Editor"
                  className="w-full h-full object-cover filter brightness-[0.88]"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  transition={{ duration: 0.8, ease: cinematicEase }}
                  loading="lazy"
                />

                {/* Dark cinematic gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Scope Guide Lines overlay */}
                <div className="absolute inset-0 pointer-events-none border-t-[20px] sm:border-t-[32px] border-b-[20px] sm:border-b-[32px] border-black/40 flex items-center justify-center">
                  {/* Center Play Button Overlay with refined micro-interactions */}
                  <motion.button
                    type="button"
                    onClick={handlePlayClick}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                    whileTap={buttonTap}
                    className="pointer-events-auto flex flex-col items-center justify-center focus-visible:outline-none group/btn"
                    aria-label="Play 2025 Showreel"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center group-hover/btn:bg-cinema-accent group-hover/btn:border-cinema-accent transition-all duration-300 shadow-2xl">
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-current ml-1" />
                    </div>
                    <span className="mt-4 text-xs font-mono uppercase tracking-widest text-white/90 group-hover/btn:text-white transition-colors bg-black/60 px-3 py-1 rounded">
                      Play Showreel &middot; {showreel.duration}
                    </span>
                  </motion.button>
                </div>

                {/* Bottom Left Reel Information */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 pointer-events-none">
                  <div className="text-[11px] font-mono tracking-wider text-cinema-accent uppercase mb-1">
                    Master Showreel &middot; 2024-2025
                  </div>
                  <div className="font-serif text-lg sm:text-2xl text-white font-semibold">
                    Rupesh Poudyal &mdash; Selected Motion Works
                  </div>
                </div>

                {/* Bottom Right Duration & Trigger */}
                <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 flex items-center gap-3">
                  <motion.button
                    type="button"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                    whileTap={buttonTap}
                    onClick={() => onOpenModal({
                      title: "A Selection of Moving Images — 2025 Showreel",
                      category: "Showreel & Montage",
                      videoProvider: showreel.provider,
                      videoId: showreel.videoId,
                      description: showreel.subtext,
                      aspectRatio: "16:9",
                      year: "2025",
                      tools: ["DaVinci Resolve Studio", "Adobe Premiere Pro"],
                      colorGrade: "Rec.709 Cinema Emulation"
                    })}
                    className="px-3 py-1.5 bg-black/70 hover:bg-white hover:text-black text-white text-[11px] font-mono uppercase tracking-wider transition-colors border border-white/20"
                  >
                    Theater View
                  </motion.button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Reel Director Note / Replaceable Notice */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-editorial-darkMuted px-2">
            <div className="flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-cinema-accent" />
              <span>External hosting: YouTube / Vimeo player embedded on interaction without unrequested background transfer.</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/60">
              <span>Ready for client video ID swap in</span>
              <code className="text-[11px] bg-white/10 px-1.5 py-0.5 rounded text-white">src/data/profile.js</code>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
