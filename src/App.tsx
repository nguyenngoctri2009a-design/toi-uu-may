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
          <FaqSection lang={lang} />
        </div>
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
