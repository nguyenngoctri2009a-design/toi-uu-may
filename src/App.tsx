import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SpecsChecker } from './components/SpecsChecker';
import { TelemetryChart } from './components/TelemetryChart';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DownloadModal } from './components/DownloadModal';
import { Language } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('vi');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const toggleLang = () => {
    setLang((prev) => (prev === 'vi' ? 'en' : 'vi'));
  };

  const scrollToSpecs = () => {
    const el = document.getElementById('specs');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-base text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-slate-950">
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

        <Features lang={lang} />

        <SpecsChecker
          lang={lang}
          onOpenDownload={() => setIsDownloadOpen(true)}
        />

        <TelemetryChart lang={lang} />

        <FaqSection lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Modal Dialog */}
      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        lang={lang}
      />
    </div>
  );
}
