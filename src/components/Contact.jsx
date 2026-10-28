import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Send } from 'lucide-react';
import { profileData } from '../data/profile';
import {
  cinematicEase,
  dramaticEase,
  defaultViewport,
  buttonTap
} from '../utils/motion';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Wedding Film',
    timeline: 'Within 1-2 months',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profileData.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name or organization.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide a valid email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please check the formatting of your email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief outline of your project or footage.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Please share at least a few details (min 10 characters).';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      const subject = encodeURIComponent(`Project Inquiry: ${formData.service} — ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Rupesh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\nTimeline: ${formData.timeline}\n\nProject Details:\n${formData.message}\n\nSent from portfolio contact form.`
      );
      const mailtoLink = `mailto:${profileData.email}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        window.location.href = mailtoLink;
      }, 600);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#121214] text-white relative overflow-hidden">
      {/* Editorial top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cinema-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease: cinematicEase }}
          className="max-w-3xl mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-cinema-accent animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-cinema-wider text-cinema-accent font-semibold">
              Contact &middot; Selected Engagements
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
            Have a story <br />
            <span className="italic font-normal font-serif text-white/80">
              to tell?
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-editorial-darkMuted font-light leading-relaxed">
            Let's create something worth watching.
          </p>
        </motion.div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact & Availability (5 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease: dramaticEase }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="bg-[#18181C] p-6 sm:p-8 border border-editorial-darkBorder space-y-6 shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 block pb-3 border-b border-white/10">
                Direct Communication
              </span>

              {/* Email Block */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-cinema-accent block uppercase tracking-wider">
                  Email
                </span>
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`mailto:${profileData.email}`}
                    className="font-serif text-xl sm:text-2xl text-white hover:text-cinema-accent transition-colors break-all"
                  >
                    {profileData.email}
                  </a>
                  <motion.button
                    type="button"
                    onClick={handleCopyEmail}
                    whileTap={buttonTap}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors flex-shrink-0"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
                {copiedEmail && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] font-mono text-emerald-400 block pt-1"
                  >
                    Email copied to clipboard!
                  </motion.span>
                )}
              </div>

              {/* Phone Block */}
              <div className="space-y-1 pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-cinema-accent block uppercase tracking-wider">
                  Phone / WhatsApp
                </span>
                <div className="flex items-center justify-between gap-4">
                  <a
                    href={`tel:${profileData.phone}`}
                    className="font-mono text-lg sm:text-xl text-white hover:text-cinema-accent transition-colors"
                  >
                    {profileData.phoneDisplay}
                  </a>
                  <motion.button
                    type="button"
                    onClick={handleCopyPhone}
                    whileTap={buttonTap}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors flex-shrink-0"
                    title="Copy phone number"
                    aria-label="Copy phone number"
                  >
                    {copiedPhone ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
                {copiedPhone && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] font-mono text-emerald-400 block pt-1"
                  >
                    Phone number copied!
                  </motion.span>
                )}
              </div>

              {/* Location Block */}
              <div className="space-y-1 pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-cinema-accent block uppercase tracking-wider">
                  Location &amp; Availability
                </span>
                <div className="font-serif text-lg text-white">
                  {profileData.location}
                </div>
                <p className="text-xs font-mono text-editorial-darkMuted pt-1">
                  Open for selected commercial, wedding, and narrative projects both locally in Nepal and remotely worldwide.
                </p>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-4 bg-[#141417] border border-editorial-darkBorder flex items-center gap-3 text-xs font-mono text-white/70">
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
              <span>Direct replies typically within 24 hours.</span>
            </div>
          </motion.div>

          {/* Right Column: Project Inquiry Form (7 cols) */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, delay: 0.15, ease: dramaticEase }}
            className="lg:col-span-7"
          >
            <div className="bg-[#18181C] p-6 sm:p-10 border border-editorial-darkBorder shadow-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-white/50 block pb-3 mb-6 border-b border-white/10">
                Project Consultation Form
              </span>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="submitted-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-8 space-y-4 text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Inquiry Prepared
                    </h3>
                    <p className="text-sm font-mono text-editorial-darkMuted max-w-md mx-auto leading-relaxed">
                      Your email client was opened with your project brief. You can also send directly to{' '}
                      <span className="text-white underline">{profileData.email}</span>.
                    </p>
                    <motion.button
                      type="button"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={buttonTap}
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          service: 'Wedding Film',
                          timeline: 'Within 1-2 months',
                          message: ''
                        });
                      }}
                      className="mt-4 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      Send Another Note
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="form-name"
                        className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2"
                      >
                        Your Name or Organization <span className="text-cinema-accent">*</span>
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Manil Ghimire or Production Studio"
                        className={`w-full bg-[#121214] border ${
                          errors.name ? 'border-red-500' : 'border-editorial-darkBorder'
                        } px-4 py-3 text-sm text-white placeholder-white/30 focus:border-cinema-accent focus:outline-none font-sans transition-colors`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs font-mono text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="form-email"
                        className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2"
                      >
                        Your Email Address <span className="text-cinema-accent">*</span>
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className={`w-full bg-[#121214] border ${
                          errors.email ? 'border-red-500' : 'border-editorial-darkBorder'
                        } px-4 py-3 text-sm text-white placeholder-white/30 focus:border-cinema-accent focus:outline-none font-sans transition-colors`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1.5 text-xs font-mono text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Service & Timeline Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="form-service"
                          className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2"
                        >
                          Service Required
                        </label>
                        <select
                          id="form-service"
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full bg-[#121214] border border-editorial-darkBorder px-4 py-3 text-sm text-white focus:border-cinema-accent focus:outline-none font-sans transition-colors"
                        >
                          <option value="Wedding Film">Wedding Film Editing</option>
                          <option value="Commercial TVC">Commercial / TVC Editing</option>
                          <option value="Color Grading">Color Grading (DaVinci Resolve)</option>
                          <option value="Cinematography & Post">Cinematography & Full Post</option>
                          <option value="Other Project">Other / Custom Project</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="form-timeline"
                          className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2"
                        >
                          Target Timeline
                        </label>
                        <select
                          id="form-timeline"
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full bg-[#121214] border border-editorial-darkBorder px-4 py-3 text-sm text-white focus:border-cinema-accent focus:outline-none font-sans transition-colors"
                        >
                          <option value="Urgent (1-2 weeks)">Urgent (1 &ndash; 2 weeks)</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="Within 1-2 months">Within 1 &ndash; 2 months</option>
                          <option value="Flexible / Future Planning">Flexible / In Planning</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div>
                      <label
                        htmlFor="form-message"
                        className="block text-xs font-mono uppercase tracking-wider text-white/80 mb-2"
                      >
                        Project Outline &amp; Footage Details <span className="text-cinema-accent">*</span>
                      </label>
                      <textarea
                        id="form-message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about the story, estimated footage volume, camera formats (RAW/Log), and creative expectations..."
                        className={`w-full bg-[#121214] border ${
                          errors.message ? 'border-red-500' : 'border-editorial-darkBorder'
                        } px-4 py-3 text-sm text-white placeholder-white/30 focus:border-cinema-accent focus:outline-none font-sans leading-relaxed transition-colors`}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-xs font-mono text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                        whileTap={buttonTap}
                        className="w-full py-4 px-8 bg-cinema-accent hover:bg-cinema-accentDark disabled:opacity-60 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-lg"
                      >
                        {isSubmitting ? (
                          <span>Preparing Inquiry...</span>
                        ) : (
                          <>
                            <span>Transmit Project Brief</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </motion.button>
                      <span className="block text-[11px] font-mono text-white/40 text-center mt-3">
                        Submitting initiates a pre-addressed email draft to rupes1777@gmail.com
                      </span>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Editorial Footer */}
        <div className="mt-24 pt-8 border-t border-editorial-darkBorder/60 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-white">RUPESH POUDYAL</span>
            <span>&bull;</span>
            <span>{profileData.location}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white transition-colors"
            >
              Back to Top &uarr;
            </button>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} Rupesh Poudyal. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
