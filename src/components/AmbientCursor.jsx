import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function AmbientCursor() {
  const reducedMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const mediaQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (!mediaQuery.matches || reducedMotion) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, textarea, select, [role="button"]');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover, { passive: true });

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [isVisible, reducedMotion]);

  if (!isDesktop || reducedMotion || !isVisible) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-cinema-accent/60 mix-blend-difference hidden lg:block"
      animate={{
        x: mousePosition.x - (isHovered ? 20 : 12),
        y: mousePosition.y - (isHovered ? 20 : 12),
        width: isHovered ? 40 : 24,
        height: isHovered ? 40 : 24,
        opacity: isHovered ? 0.8 : 0.4,
        scale: isHovered ? 1.15 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 32,
        mass: 0.15
      }}
    >
      {/* Center micro crosshair dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-cinema-accent/80" />
      </div>
    </motion.div>
  );
}

