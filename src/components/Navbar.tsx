import React, { useState } from 'react';
import { Download, Globe, Menu, X } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { playTactileClick } from '../utils/sound';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[lang].nav;

  const scrollToSection = (id: string) => {
    playTactileClick('subtle');
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#DFEAF4] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => {
            playTactileClick('up');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0796E5] to-[#00A88A] p-0.5 shadow-md shadow-sky-500/20">
            <img 
              src="/images/logo.png" 
              alt="GTA5VN System Logo" 
              className="w-full h-full object-contain rounded-[14px] bg-white"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-[#152238] font-heading flex items-center">
                GTA5VN<span className="text-[#0796E5] ml-1">SYSTEM</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10.5px] font-bold rounded-full bg-[#ECFDF5] text-[#00A88A] border border-[#A7F3D0] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A88A] animate-pulse"></span>
                ONLINE
              </span>
            </div>
            <span className="text-[11.5px] text-[#64748B] font-semibold tracking-wide">
              FiveM eSports Optimization Suite
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-[11.5px] font-bold uppercase tracking-wider text-[#475569]">
          <button 
            onClick={() => scrollToSection('features')} 
            className="px-3 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.features}
          </button>
          <button 
            onClick={() => scrollToSection('specs')} 
            className="px-3 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.specs}
          </button>
          <button 
            onClick={() => scrollToSection('telemetry')} 
            className="px-3 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.telemetry}
          </button>
          <button 
            onClick={() => scrollToSection('bang-xep-hang')} 
            className="px-3 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all text-[#D97706]"
          >
            Xếp Hạng
          </button>
          <button 
            onClick={() => scrollToSection('danh-gia')} 
            className="px-3 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            Đánh Giá
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="px-3 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.faq}
          </button>
        </nav>

        {/* Right Actions: Lang Switcher & CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Discord Pill */}
          <a
            href="https://discord.gg/gtavn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick('subtle')}
            className="t1-btn-3d px-3 py-2 text-xs font-bold bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl shadow-xs"
          >
            <span>DISCORD</span>
          </a>

          {/* Language Toggle */}
          <button
            onClick={() => {
              playTactileClick('subtle');
              onToggleLang();
            }}
            className="t1-btn-3d t1-btn-surface px-3 py-2 text-xs gap-1.5"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-[#0796E5]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Download CTA Button */}
          <button
            onClick={() => {
              playTactileClick('down');
              onOpenDownload();
            }}
            className="t1-btn-3d t1-btn-primary px-5 py-2.5 text-xs sm:text-[13px] gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadBtn}</span>
            <span className="t1-keycap ml-1 text-[9px] bg-sky-700/30 text-white border-sky-400/40">D</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => {
              playTactileClick('subtle');
              onToggleLang();
            }}
            className="px-2.5 py-1.5 rounded-lg border border-[#DFEAF4] bg-white text-xs font-bold text-[#475569]"
          >
            {lang.toUpperCase()}
          </button>
          <button
            onClick={() => {
              playTactileClick('subtle');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-white border border-[#DFEAF4] text-[#152238] shadow-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#DFEAF4] bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
          <button
            onClick={() => scrollToSection('features')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] hover:bg-[#EDF6FF] hover:text-[#0796E5]"
          >
            {t.features}
          </button>
          <button
            onClick={() => scrollToSection('specs')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] hover:bg-[#EDF6FF] hover:text-[#0796E5]"
          >
            {t.specs}
          </button>
          <button
            onClick={() => scrollToSection('telemetry')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] hover:bg-[#EDF6FF] hover:text-[#0796E5]"
          >
            {t.telemetry}
          </button>
          <button
            onClick={() => scrollToSection('bang-xep-hang')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-[#D97706] hover:bg-[#FFFBEB]"
          >
            Bảng Xếp Hạng Top
          </button>
          <button
            onClick={() => scrollToSection('danh-gia')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] hover:bg-[#EDF6FF] hover:text-[#0796E5]"
          >
            Đánh Giá Cộng Đồng
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-[#1E293B] hover:bg-[#EDF6FF] hover:text-[#0796E5]"
          >
            {t.faq}
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                playTactileClick('down');
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="t1-btn-3d t1-btn-primary w-full py-3 text-sm gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
