/**
 * Rupesh Poudyal — Cinematic Motion System
 * Reusable motion variants, easings, timings, and viewport configurations.
 * Designed for 60fps GPU acceleration (transforms & opacity only).
 */

// Cinematic cubic-bezier easing: quick confident start, silky smooth deceleration
export const cinematicEase = [0.22, 1, 0.36, 1];
export const dramaticEase = [0.16, 1, 0.3, 1];
export const gentleEase = [0.25, 0.1, 0.25, 1];

// Viewport trigger settings for scroll-driven reveals
export const defaultViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -60px 0px"
};

export const earlyViewport = {
  once: true,
  amount: 0.1,
  margin: "0px 0px -40px 0px"
};

// Fade up reveal for cards and editorial blocks
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: cinematicEase
    }
  }
};

// Subtle fade in
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: cinematicEase
    }
  }
};

// Fade down for navigation or top headers
export const fadeDown = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cinematicEase
    }
  }
};

// Stagger container for lists, grids, and filters
export const staggerContainer = (staggerDelay = 0.08, initialDelay = 0.05) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay
    }
  }
});

// Cinematic mask reveal for typography (words/lines sliding up from masked overflow)
export const maskContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.15
    }
  }
};

export const maskWord = {
  hidden: { y: "115%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: cinematicEase
    }
  }
};

// Scale & fade reveal for posters, slates, and modals
export const scaleReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: dramaticEase
    }
  }
};

// Horizontal line reveal (accent lines, slate dividers)
export const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    originX: 0,
    transition: {
      duration: 0.8,
      ease: cinematicEase
    }
  }
};

// Interactive button/card tap & hover micro-interactions
export const buttonTap = {
  scale: 0.98,
  transition: { duration: 0.1 }
};

export const cardHover = {
  y: -4,
  transition: { duration: 0.35, ease: cinematicEase }
};

export const modalOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: cinematicEase }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  }
};

export const modalContentVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: dramaticEase }
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

