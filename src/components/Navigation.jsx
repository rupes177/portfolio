import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { profileData } from '../data/profile';
import { useTheme } from '../context/ThemeContext';
import { cinematicEase, buttonTap } from '../utils/motion';

export default function Navigation() {
  const { isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredNav, setHoveredNav] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['work', 'showreel', 'about', 'services', 'experience', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Showreel', href: '#showreel' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={shouldReduceMotion ? {} : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: cinematicEase }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-canvas-light/95 dark:bg-canvas-dark/95 backdrop-blur-md border-b border-editorial-border dark:border-editorial-darkBorder py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          className="group flex flex-col focus-visible:outline-none"
          aria-label="Rupesh Poudyal - Back to top"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cinema-accent inline-block animate-pulse" />
            <span className="font-serif font-bold text-xl sm:text-2xl tracking-tight text-editorial-primary dark:text-editorial-darkText group-hover:text-cinema-accent transition-colors duration-200">
              RUPESH POUDYAL
            </span>
          </div>
          <span className="text-[11px] font-mono tracking-cinema-wide uppercase text-editorial-secondary dark:text-editorial-darkMuted mt-0.5">
            Video Editor &middot; Visual Storyteller
          </span>
        </a>

        {/* Desktop Navigation Links with animated active indicator */}
        <nav
          className="hidden md:flex items-center gap-7"
          aria-label="Main Navigation"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            const isHovered = hoveredNav === link.name;

            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onMouseEnter={() => setHoveredNav(link.name)}
                className={`text-sm font-medium relative py-1.5 transition-colors duration-200 ${
                  isActive
                    ? 'text-cinema-accent font-semibold'
                    : 'text-editorial-secondary dark:text-editorial-darkMuted hover:text-editorial-primary dark:hover:text-editorial-darkText'
                }`}
              >
                <span>{link.name}</span>

                {/* Animated active/hover indicator */}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-cinema-accent rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}

                {/* Subtle hover line if not active */}
                {!isActive && isHovered && !shouldReduceMotion && (
                  <motion.span
                    layoutId="hoverNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-editorial-secondary/40 dark:bg-editorial-darkMuted/40 rounded-full"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 35
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Cinema Theme Mode Switch */}
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={buttonTap}
            className="p-2 px-2.5 rounded border border-editorial-border dark:border-editorial-darkBorder bg-white/80 dark:bg-canvas-darkCard/80 text-editorial-secondary dark:text-editorial-darkMuted hover:text-editorial-primary dark:hover:text-white hover:border-cinema-accent dark:hover:border-cinema-accent transition-colors flex items-center gap-2 text-xs font-mono shadow-sm"
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-cinema-gold animate-spin-slow" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-editorial-darkMuted">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-cinema-accent" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-editorial-secondary">DARK</span>
              </>
            )}
          </motion.button>

          <motion.a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={buttonTap}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase border border-editorial-primary dark:border-editorial-darkBorder text-editorial-primary dark:text-editorial-darkText hover:bg-editorial-primary dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200"
          >
            <span>Hire For Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Quick Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 text-editorial-primary dark:text-editorial-darkText hover:text-cinema-accent transition-colors rounded border border-editorial-border dark:border-editorial-darkBorder"
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4 text-cinema-gold" /> : <Moon className="w-4 h-4 text-cinema-accent" />}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-editorial-primary dark:text-editorial-darkText hover:text-cinema-accent transition-colors focus-visible:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: cinematicEase }}
            className="md:hidden fixed inset-x-0 top-[73px] bg-canvas-light dark:bg-canvas-darkCard border-b border-editorial-border dark:border-editorial-darkBorder shadow-2xl px-6 py-8 overflow-hidden z-40"
          >
            <div className="flex flex-col gap-5">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-lg font-serif text-editorial-primary dark:text-editorial-darkText hover:text-cinema-accent transition-colors py-1 flex items-center justify-between border-b border-editorial-border/40 dark:border-editorial-darkBorder/40"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-editorial-secondary dark:text-editorial-darkMuted">
                    &rarr;
                  </span>
                </motion.a>
              ))}

              {/* Theme toggle row in drawer */}
              <div className="pt-2 pb-1 flex items-center justify-between border-b border-editorial-border/40 dark:border-editorial-darkBorder/40">
                <span className="text-xs font-mono uppercase tracking-wider text-editorial-secondary dark:text-editorial-darkMuted">
                  Visual Theme
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded border border-editorial-border dark:border-editorial-darkBorder bg-white dark:bg-canvas-darkSurface text-xs font-mono flex items-center gap-2 text-editorial-primary dark:text-editorial-darkText"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-cinema-gold" />
                      <span>LIGHT MODE</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-cinema-accent" />
                      <span>DARK MODE</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="w-full text-center py-3 bg-cinema-accent text-white text-xs font-mono uppercase tracking-wider hover:bg-cinema-accentDark transition-colors"
                >
                  Get in Touch &middot; {profileData.location.split(',')[0]}
                </a>
                <div className="text-center text-xs font-mono text-editorial-secondary dark:text-editorial-darkMuted pt-2">
                  Available for Selected Projects &middot; {profileData.phoneDisplay}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
