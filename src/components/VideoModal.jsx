import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ExternalLink, Film } from 'lucide-react';
import {
  modalOverlayVariants,
  modalContentVariants,
  buttonTap
} from '../utils/motion';

export default function VideoModal({ project, isOpen, onClose }) {
  const closeButtonRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Keyboard navigation (Escape key dismissal) & scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const isYouTube = project?.videoProvider === 'youtube';
  const isVimeo = project?.videoProvider === 'vimeo';

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          key="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : modalOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Modal Dialog Content Container */}
          <motion.div
            key="modal-content"
            variants={shouldReduceMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 }, exit: { opacity: 0 } } : modalContentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-5xl bg-[#141416] border border-editorial-darkBorder shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="bg-[#1C1C20] border-b border-editorial-darkBorder px-6 py-4 flex items-center justify-between text-xs font-mono text-editorial-darkMuted">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cinema-accent animate-pulse" />
                <span className="text-white font-semibold uppercase tracking-wider">
                  SCREENING ROOM &middot; {project.category}
                </span>
                <span className="hidden sm:inline">&vert;</span>
                <span className="hidden sm:inline">{project.timecode || 'TC 01:00:00:00'}</span>
              </div>

              <motion.button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                whileTap={buttonTap}
                className="p-1.5 text-editorial-darkMuted hover:text-white hover:bg-white/10 rounded transition-colors focus-visible:outline-none"
                aria-label="Close screening room"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full bg-black aspect-video flex-shrink-0">
              {isYouTube ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${project.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : isVimeo ? (
                <iframe
                  src={`https://player.vimeo.com/video/${project.videoId}?autoplay=1&title=0&byline=0&portrait=0`}
                  title={project.title}
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-black/95">
                  <Film className="w-12 h-12 text-cinema-accent mb-4" />
                  <p className="text-base font-serif text-white mb-2">Video Asset Preview</p>
                  <p className="text-xs font-mono text-editorial-darkMuted max-w-md mb-6">
                    External player ready for connection. Configure with your actual YouTube or Vimeo video ID in <code className="text-white">projects.js</code>.
                  </p>
                  {project.externalUrl && (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-cinema-accent text-white text-xs font-mono uppercase tracking-wider hover:bg-cinema-accentDark transition-colors"
                    >
                      <span>Open Video in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Modal Info Footer */}
            <div className="p-6 sm:p-8 bg-[#161619] border-t border-editorial-darkBorder overflow-y-auto text-editorial-darkText">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 text-xs font-mono text-cinema-accent uppercase tracking-wider mb-2">
                    <span>{project.category}</span>
                    <span>&bull;</span>
                    <span>{project.year || '2024'}</span>
                    {project.client && (
                      <>
                        <span>&bull;</span>
                        <span className="text-editorial-darkMuted">{project.client}</span>
                      </>
                    )}
                  </div>

                  <h3
                    id="modal-project-title"
                    className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3"
                  >
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-editorial-darkMuted leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-white/50 block mb-1">
                        Editorial Highlights
                      </span>
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-mono text-white/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-cinema-accent" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Technical Specifications Column */}
                <div className="lg:w-72 bg-[#1C1C20] p-4 border border-editorial-darkBorder/60 flex-shrink-0 space-y-3 text-xs font-mono">
                  <div className="text-[11px] uppercase tracking-wider text-white/40 pb-2 border-b border-white/10">
                    Technical Metadata
                  </div>

                  {project.aspectRatio && (
                    <div className="flex justify-between">
                      <span className="text-editorial-darkMuted">Framing:</span>
                      <span className="text-white font-medium">{project.aspectRatio}</span>
                    </div>
                  )}

                  {project.duration && (
                    <div className="flex justify-between">
                      <span className="text-editorial-darkMuted">Duration:</span>
                      <span className="text-white font-medium">{project.duration}</span>
                    </div>
                  )}

                  {project.colorGrade && (
                    <div className="flex flex-col gap-0.5">
                      <span className="text-editorial-darkMuted">Color Pipeline:</span>
                      <span className="text-white font-medium text-[11px]">{project.colorGrade}</span>
                    </div>
                  )}

                  {project.tools && (
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-editorial-darkMuted block mb-1">Software:</span>
                      <div className="flex flex-wrap gap-1">
                        {project.tools.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 bg-black/50 border border-white/10 text-[10px] text-white/80 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.externalUrl && (
                    <div className="pt-3 border-t border-white/10">
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between text-cinema-accent hover:text-white transition-colors"
                      >
                        <span>External Source</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
