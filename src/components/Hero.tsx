import React, { useState, useEffect } from 'react';
import { Download, Shield, Cpu, Activity, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { playTactileClick } from '../utils/sound';

interface HeroProps {
  lang: Language;
  onOpenDownload: () => void;
  onScrollToSpecs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenDownload, onScrollToSpecs }) => {
  const t = content[lang].hero;
  const [nativeHz, setNativeHz] = useState<number>(144);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      const delta = now - startTime;
      if (delta >= 1000) {
        const detected = Math.round((frameCount * 1000) / delta);
        if (detected >= 340) setNativeHz(360);
        else if (detected >= 220) setNativeHz(240);
        else if (detected >= 155) setNativeHz(165);
        else if (detected >= 135) setNativeHz(144);
        else if (detected >= 110) setNativeHz(120);
        else if (detected >= 70) setNativeHz(75);
        else setNativeHz(60);
      } else {
        animId = requestAnimationFrame(measure);
      }
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative pt-10 pb-20 lg:pt-16 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Pill / Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-bold font-heading uppercase tracking-wider mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
            <span>{t.badge}</span>
            <span className="text-[#64748B] font-mono text-[11px] font-normal">| {nativeHz}Hz NATIVE</span>
          </div>

          {/* Main Title - T1 Gradient Headline */}
          <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-[66px] font-extrabold text-[#152238] font-heading tracking-tight leading-[1.08] mb-5">
            <span className="t1-hero-gradient">
              {t.titleHighlight}
            </span>
            <br />
            <span className="text-[#152238]">
              {t.titleRest}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-[#64748B] leading-relaxed mb-8 font-normal">
            {t.description}
          </p>

          {/* 3D Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <button
              onClick={() => {
                playTactileClick('down');
                onOpenDownload();
              }}
              className="t1-btn-3d t1-btn-primary w-full sm:w-auto px-8 py-4 gap-3 group text-base"
            >
              <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              <div className="text-left">
                <div className="font-extrabold">{t.downloadCta}</div>
                <div className="text-[11px] font-normal opacity-90 -mt-0.5">
                  {t.downloadSub}
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                playTactileClick('subtle');
                onScrollToSpecs();
              }}
              className="t1-btn-3d t1-btn-surface w-full sm:w-auto px-7 py-4 gap-2.5 text-base"
            >
              <Cpu className="w-5 h-5 text-[#0796E5]" />
              <span className="font-bold text-[#1E293B]">{t.specsCta}</span>
              <ChevronRight className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>

          {/* ================================================================
              MASTER HERO SHOWCASE BANNER (NHƯ CÁC WEB CÔNG NGHỆ HÀNG ĐẦU)
              ================================================================ */}
          <div className="w-full max-w-5xl mb-14 relative group">
            {/* 3D Showcase Frame */}
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_60px_rgba(7,150,229,0.18)] bg-white transform transition-all duration-300 hover:scale-[1.01]">
              <img 
                src="/images/hero-banner.jpg" 
                alt="Tối Ưu Máy - Tối Ưu PC Laptop GTA5VN System" 
                className="w-full h-auto object-cover block select-none"
                loading="eager"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

              {/* Floating Live Badge On Banner */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#DFEAF4] shadow-md text-xs font-bold text-[#152238]">
                <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
                <span className="font-heading">CHƠI GAME & LÀM VIỆC MƯỢT HƠN</span>
              </div>
            </div>
          </div>

          {/* Real-time Visual Status Indicator Bar */}
          <div className="w-full max-w-4xl mb-14">
            <div className="t1-card p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-[#DFEAF4]">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EDF6FF] border border-[#BAE6FD] flex items-center justify-center text-[#0796E5] shadow-xs">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider text-[#64748B] font-bold">
                    Trạng Thái Động Cơ Tối Ưu
                  </div>
                  <div className="text-lg font-extrabold text-[#152238] font-heading flex items-center gap-2">
                    DirectX 11/12 Engine Buffer
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00A88A] animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[#475569]">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <CheckCircle2 className="w-4 h-4 text-[#00A88A]" />
                  <span>100% FiveM Ban-Safe</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Zap className="w-4 h-4 text-[#F59E0B]" />
                  <span>Zero DLL Injection</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                  <Shield className="w-4 h-4 text-[#0796E5]" />
                  <span>1-Click Restore Point</span>
                </div>
              </div>

            </div>
          </div>

          {/* Stat Metric Cards (T1 White KPI Panels) */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="t1-card t1-card-hover p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#00A88A] mb-1">
                {t.statFps}
              </div>
              <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
                {t.statFpsLabel}
              </div>
              <div className="mt-2 text-[11px] text-[#64748B]">
                Đo lường trên hơn 1,200 cấu hình máy
              </div>
            </div>

            <div className="t1-card t1-card-hover p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#0796E5] mb-1">
                {t.statLatency}
              </div>
              <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
                {t.statLatencyLabel}
              </div>
              <div className="mt-2 text-[11px] text-[#64748B]">
                Giảm thiểu tối đa độ trễ chuột
              </div>
            </div>

            <div className="t1-card t1-card-hover p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#059669] mb-1">
                {t.statStutter}
              </div>
              <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
                {t.statStutterLabel}
              </div>
              <div className="mt-2 text-[11px] text-[#64748B]">
                Xóa sổ khựng hình khi lia chuột nhanh
              </div>
            </div>

            <div className="t1-card t1-card-hover p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-heading text-[#152238] mb-1">
                {t.statUsers}
              </div>
              <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
                {t.statUsersLabel}
              </div>
              <div className="mt-2 text-[11px] text-[#64748B]">
                Từ các server FiveM hàng đầu Việt Nam
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
