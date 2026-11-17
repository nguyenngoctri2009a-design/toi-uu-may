import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SpecsChecker } from './components/SpecsChecker';
import { TelemetryChart } from './components/TelemetryChart';
import { Leaderboard } from './components/Leaderboard';
import { Reviews } from './components/Reviews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { ShortcutsModal } from './components/ShortcutsModal';
import { QuickHudDock } from './components/QuickHudDock';
import { Language } from './types';
import { toggleSound, isSoundEnabled, playTactileClick } from './utils/sound';

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const scrollToSpecs = () => {
    playTactileClick('subtle');
    const el = document.getElementById('specs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-[#152238] flex flex-col font-sans selection:bg-sky-500 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero
          lang={lang}
          onOpenDownload={() => setIsDownloadOpen(true)}
          onScrollToSpecs={scrollToSpecs}
        />

        <div className="section-optimize">
          <Features lang={lang} />
        </div>

        <div className="section-optimize">
          <SpecsChecker
            lang={lang}
            onOpenDownload={() => setIsDownloadOpen(true)}
          />
        </div>

        <div className="section-optimize">
          <TelemetryChart lang={lang} />
        </div>

        <div className="section-optimize">
          <Leaderboard lang={lang} />
        </div>

        <div className="section-optimize">
          <Reviews lang={lang} />
        </div>

        <div className="section-optimize">
          <FaqSection lang={lang} />
        </div>
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Quick Floating HUD Dock */}
      <QuickHudDock
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onToggleSound={handleToggleSound}
        soundActive={soundActive}
      />

      {/* Download Modal Dialog */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        lang={lang}
      />

      {/* Shortcuts Modal Dialog */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        onOpenDownload={() => {
          setIsShortcutsOpen(false);
          setIsDownloadOpen(true);
        }}
        onScrollToSpecs={() => {
          setIsShortcutsOpen(false);
          scrollToSpecs();
        }}
        onToggleSound={handleToggleSound}
        soundActive={soundActive}
      />
    </div>
  );
}
