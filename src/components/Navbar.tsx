import React, { useState } from 'react';
import { Download, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang].nav;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-[#080a0f]/95 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-0.5 shadow-glow-emerald">
            <img 
              src="/images/logo.png" 
              alt="GTA5VN System Logo" 
              className="w-full h-full object-contain rounded-lg bg-dark-surface"
              onError={(e) => {
                // fallback if image fails
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 rounded-xl bg-emerald-500/20 blur-[2px] -z-10" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                GTA5VN<span className="text-brand-400 ml-1">SYSTEM</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ONLINE
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium tracking-wide">
              FiveM eSports Optimization Suite
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button 
            onClick={() => scrollToSection('features')} 
            className="hover:text-emerald-400 transition-colors focus:outline-none"
          >
            {t.features}
          </button>
          <button 
            onClick={() => scrollToSection('specs')} 
            className="hover:text-emerald-400 transition-colors focus:outline-none"
          >
            {t.specs}
          </button>
          <button 
            onClick={() => scrollToSection('telemetry')} 
            className="hover:text-emerald-400 transition-colors focus:outline-none"
          >
            {t.telemetry}
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="hover:text-emerald-400 transition-colors focus:outline-none"
          >
            {t.faq}
          </button>
        </nav>

        {/* Right Actions: Lang Switcher & CTA */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dark-border bg-dark-card/60 hover:bg-dark-card text-xs font-semibold text-slate-200 transition-all hover:border-slate-600 focus:outline-none"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Download CTA Button */}
          <button
            onClick={onOpenDownload}
            className="relative group overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm tracking-wide shadow-glow-emerald hover:shadow-glow-emerald-lg transition-all duration-300 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            <span>{t.downloadBtn}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleLang}
            className="p-2 rounded-lg border border-dark-border bg-dark-card text-slate-200 text-xs font-bold"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-dark-border text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-dark-border bg-dark-surface/95 backdrop-blur-2xl px-6 py-6 space-y-4">
          <button 
            onClick={() => scrollToSection('features')} 
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            {t.features}
          </button>
          <button 
            onClick={() => scrollToSection('specs')} 
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            {t.specs}
          </button>
          <button 
            onClick={() => scrollToSection('telemetry')} 
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            {t.telemetry}
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="block w-full text-left py-2 text-base font-medium text-slate-200 hover:text-emerald-400"
          >
            {t.faq}
          </button>
          <div className="pt-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDownload(); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-base shadow-glow-emerald"
            >
              <Download className="w-5 h-5" />
              <span>{t.downloadBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
