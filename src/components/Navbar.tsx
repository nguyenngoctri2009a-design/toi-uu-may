import React, { useState, useEffect } from 'react';
import { Download, Globe, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { playTactileClick, toggleSound, isSoundEnabled } from '../utils/sound';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, onToggleLang, onOpenDownload }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(isSoundEnabled());
  const [nativeHz, setNativeHz] = useState<number>(75);
  const [fps, setFps] = useState<number>(120);

  const t = content[lang].nav;

  // Real-time browser telemetry monitoring (displayed cleanly in the header, never overlapping text)
  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      const delta = now - startTime;
      if (delta >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / delta);
        setFps(currentFps);
        if (currentFps >= 340) setNativeHz(360);
        else if (currentFps >= 220) setNativeHz(240);
        else if (currentFps >= 155) setNativeHz(165);
        else if (currentFps >= 135) setNativeHz(144);
        else if (currentFps >= 110) setNativeHz(120);
        else if (currentFps >= 70) setNativeHz(75);
        else setNativeHz(60);

        frameCount = 0;
        startTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundActive(newState);
    playTactileClick('subtle');
  };

  const scrollToSection = (id: string) => {
    playTactileClick('subtle');
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#DFEAF4] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Live Status */}
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
              <span className="font-black text-xl tracking-tight text-[#152238] font-heading flex items-center">
                GTA5VN<span className="text-[#0796E5] ml-1">SYSTEM</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10.5px] font-bold rounded-full bg-[#ECFDF5] text-[#00A88A] border border-[#A7F3D0] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A88A] animate-pulse"></span>
                <span>{fps} FPS • {nativeHz}Hz</span>
              </span>
            </div>
            <span className="text-[11.5px] text-[#64748B] font-semibold tracking-wide">
              FiveM eSports Optimization Suite
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#475569]">
          <button 
            onClick={() => scrollToSection('features')} 
            className="px-3.5 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.features}
          </button>
          <button 
            onClick={() => scrollToSection('specs')} 
            className="px-3.5 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.specs}
          </button>
          <button 
            onClick={() => scrollToSection('telemetry')} 
            className="px-3.5 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.telemetry}
          </button>
          <button 
            onClick={() => scrollToSection('bang-xep-hang')} 
            className="px-3.5 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all text-[#D97706]"
          >
            Xếp Hạng
          </button>
          <button 
            onClick={() => scrollToSection('danh-gia')} 
            className="px-3.5 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            Đánh Giá
          </button>
          <button 
            onClick={() => scrollToSection('faq')} 
            className="px-3.5 py-2 rounded-xl hover:text-[#0796E5] hover:bg-[#EDF6FF] transition-all"
          >
            {t.faq}
          </button>
        </nav>

        {/* Right Actions: Live HUD, Sound Toggle, 1 duy nhất nút Language & Nút Tải Sạch Sẽ */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Audio Tactile Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`w-9 h-9 rounded-xl border transition-all flex items-center justify-center shadow-xs focus:outline-none ${
              soundActive
                ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#00A88A]'
                : 'bg-[#F8FAFC] border-[#DFEAF4] text-[#94A3B8]'
            }`}
            title={soundActive ? 'Tắt âm thanh click' : 'Bật âm thanh click'}
          >
            {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Discord Pill */}
          <a
            href="https://discord.gg/gtavn"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playTactileClick('subtle')}
            className="hidden sm:inline-flex t1-btn-3d px-3 py-2 text-xs font-bold bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl shadow-xs"
          >
            <span>DISCORD</span>
          </a>

          {/* Duy nhất 1 nút chuyển đổi ngôn ngữ (Không bị lặp lại) */}
          <button
            onClick={() => {
              playTactileClick('subtle');
              onToggleLang();
            }}
            className="t1-btn-3d t1-btn-surface px-3 py-2 text-xs font-bold gap-1.5 shadow-2xs"
            title="Đổi ngôn ngữ (VI / EN)"
          >
            <Globe className="w-3.5 h-3.5 text-[#0796E5]" />
            <span>{lang.toUpperCase()}</span>
          </button>

          {/* Nút Tải Về Ngay (Đã gỡ bỏ chữ D thừa) */}
          <button
            onClick={() => {
              playTactileClick('down');
              onOpenDownload();
            }}
            className="t1-btn-3d t1-btn-primary px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold gap-2 shadow-sm whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadBtn}</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => {
              playTactileClick('subtle');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="xl:hidden p-2 rounded-xl bg-white border border-[#DFEAF4] text-[#152238] shadow-xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-[#DFEAF4] bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
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
