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
    <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile / Tablet Top Banner (Hiện trên màn hình điện thoại & tablet) */}
        <div className="lg:hidden flex flex-col items-center text-center mb-8">
          {/* Top Pill / Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-bold font-heading uppercase tracking-wider mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
            <span>{t.badge}</span>
            <span className="text-[#64748B] font-mono text-[11px] font-normal">| {nativeHz}Hz NATIVE</span>
          </div>

          {/* 3D Showcase Banner on Mobile */}
          <div className="w-full mb-6">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-[0_16px_40px_rgba(7,150,229,0.15)] bg-white">
              <img 
                src="/images/hero-banner.jpg" 
                alt="Tối Ưu Máy - Tối Ưu PC Laptop GTA5VN System" 
                className="w-full h-auto object-cover block select-none"
                loading="eager"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-[#DFEAF4] shadow-md text-[11px] font-bold text-[#152238]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A88A] animate-ping" />
                <span className="font-heading">CHƠI GAME & LÀM VIỆC MƯỢT HƠN</span>
              </div>
            </div>
          </div>

          {/* 3D Action Buttons on Mobile */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full">
            <button
              onClick={() => {
                playTactileClick('down');
                onOpenDownload();
              }}
              className="t1-btn-3d t1-btn-primary w-full sm:w-auto px-7 py-3.5 gap-2.5 text-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadCta}</span>
            </button>

            <button
              onClick={() => {
                playTactileClick('subtle');
                onScrollToSpecs();
              }}
              className="t1-btn-3d t1-btn-surface w-full sm:w-auto px-6 py-3.5 gap-2 text-sm"
            >
              <Cpu className="w-4 h-4 text-[#0796E5]" />
              <span>{t.specsCta}</span>
            </button>
          </div>
        </div>

        {/* Desktop Balanced 2-Column Showcase (Tối ưu màn hình máy tính - Hết chiếm diện tích & hết trống trải) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center mb-14">
          
          {/* Left Column: Quick Value Props & Actions */}
          <div className="lg:col-span-5 text-left flex flex-col justify-center">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-bold font-heading uppercase tracking-wider mb-5 self-start shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
              <span>BẢN CẬP NHẬT 2026 PRO</span>
              <span className="text-[#64748B] font-mono text-[11px] font-normal">| {nativeHz}Hz NATIVE</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl xl:text-4xl font-extrabold text-[#152238] font-heading tracking-tight leading-tight mb-4">
              Tối Ưu Máy Chơi FiveM <br />
              <span className="t1-hero-gradient">Chuẩn eSports Gaming</span>
            </h1>

            {/* Key Value Checklist */}
            <div className="space-y-2.5 mb-7 text-xs font-bold text-[#334155]">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Tăng FPS tức thì từ +45% đến +90% trên mọi cấu hình</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Triệt tiêu 1% Low Stutter tại các điểm đông người</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Dọn sạch RAM ảo • 100% FiveM Ban-Safe • 1-Click khôi phục</span>
              </div>
            </div>

            {/* 3D Action Buttons */}
            <div className="flex items-center gap-3.5 mb-6">
              <button
                onClick={() => {
                  playTactileClick('down');
                  onOpenDownload();
                }}
                className="t1-btn-3d t1-btn-primary px-7 py-4 gap-2.5 text-sm"
              >
                <Download className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-extrabold text-[13px]">{t.downloadCta}</div>
                  <div className="text-[10.5px] font-normal opacity-90 -mt-0.5">Dung lượng ~75 MB • Miễn phí</div>
                </div>
              </button>

              <button
                onClick={() => {
                  playTactileClick('subtle');
                  onScrollToSpecs();
                }}
                className="t1-btn-3d t1-btn-surface px-5 py-4 gap-2 text-xs"
              >
                <Cpu className="w-4 h-4 text-[#0796E5]" />
                <span className="font-bold text-[#1E293B]">Đo Cấu Hình</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#64748B]" />
              </button>
            </div>

            {/* Micro Engine Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white border border-[#DFEAF4] shadow-xs text-[11px] font-semibold text-[#475569] self-start">
              <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-pulse" />
              <span>DirectX 11/12 Engine Buffer</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#00A88A] font-bold">100% Ban-Safe</span>
            </div>

          </div>

          {/* Right Column: 3D Showcase Banner (Gọn gàng, vừa vặn khung nhìn, không bị tràn màn hình) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(7,150,229,0.18)] bg-white transform transition-all duration-300 hover:scale-[1.01]">
              <img 
                src="/images/hero-banner.jpg" 
                alt="Tối Ưu Máy - Tối Ưu PC Laptop GTA5VN System" 
                className="w-full h-auto object-cover block select-none"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-[#DFEAF4] shadow-md text-xs font-bold text-[#152238]">
                <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
                <span className="font-heading">CHƠI GAME & LÀM VIỆC MƯỢT HƠN</span>
              </div>
            </div>
          </div>

        </div>

        {/* Real-time Visual Status Indicator Bar (Dành cho cả Desktop & Mobile) */}
        <div className="w-full mb-12">
          <div className="t1-card p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 bg-white border border-[#DFEAF4]">
            
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#EDF6FF] border border-[#BAE6FD] flex items-center justify-center text-[#0796E5] shadow-xs flex-shrink-0">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-[11px] uppercase tracking-wider text-[#64748B] font-bold">
                  Trạng Thái Động Cơ Tối Ưu
                </div>
                <div className="text-base font-extrabold text-[#152238] font-heading flex items-center gap-2">
                  DirectX 11/12 Engine Buffer
                  <span className="inline-block w-2 h-2 rounded-full bg-[#00A88A] animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs font-bold text-[#475569]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00A88A]" />
                <span>100% FiveM Ban-Safe</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <Zap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Zero DLL Injection</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <Shield className="w-3.5 h-3.5 text-[#0796E5]" />
                <span>1-Click Restore Point</span>
              </div>
            </div>

          </div>
        </div>

        {/* Stat Metric Cards (T1 White KPI Panels - Trải đều 4 cột cân xứng) */}
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
    </section>
  );
};
