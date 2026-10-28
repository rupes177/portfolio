import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import FeaturedWork from './components/FeaturedWork';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import VideoModal from './components/VideoModal';
import AmbientCursor from './components/AmbientCursor';
import { profileData } from './data/profile';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenVideo = (videoDetails) => {
    setSelectedVideo(videoDetails);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleOpenShowreelModal = () => {
    const showreel = profileData.showreel;
    handleOpenVideo({
      title: "A Selection of Moving Images — 2025 Showreel",
      category: "Cinematic Showreel",
      description: showreel.subtext,
      videoProvider: showreel.provider,
      videoId: showreel.videoId,
      aspectRatio: "16:9",
      year: "2025",
      timecode: showreel.timecode,
      colorGrade: "Kodak 2383 Film Print Emulation · Rec.709",
      tools: ["DaVinci Resolve Studio", "Adobe Premiere Pro"],
      highlights: [
        "Dynamic montage across commercial, wedding, and tech work",
        "4K DCI calibrated color grading and rhythm editing",
        "Spatial audio and sound design integration"
      ]
    });
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-canvas-light dark:bg-canvas-dark text-editorial-primary dark:text-editorial-darkText font-sans selection:bg-cinema-accent selection:text-white transition-colors duration-300">
        {/* Subtle Desktop-Only Reticle Ambient Cursor */}
        <AmbientCursor />

        {/* Top Main Navigation */}
        <Navigation />

        {/* Main Content Sections */}
        <main>
          {/* Section B: Hero */}
          <Hero onOpenShowreel={handleOpenShowreelModal} />

          {/* Section C: Showreel (The Primary Visual Feature) */}
          <Showreel onOpenModal={handleOpenVideo} />

          {/* Section D: Featured Work (The Most Important Section) */}
          <FeaturedWork onSelectProject={handleOpenVideo} />

          {/* Section E: About Rupesh */}
          <About />

          {/* Section F: Services */}
          <Services />

          {/* Section G: Professional Experience */}
          <Experience />

          {/* Section H: Software & Creative Skills */}
          <Skills />

          {/* Section I & J: Education & Additional Information */}
          <Education />

          {/* Section K: Contact & Footer */}
          <Contact />
        </main>

        {/* Video Screening Room Modal */}
        <VideoModal
          project={selectedVideo}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </ThemeProvider>
  );
}
