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
      {/* Expansive Container: mở rộng chiều ngang 1480px, xóa sạch khoảng trống hai bên */}
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* ================================================================
            MOBILE & TABLET VIEW (< lg): GIỮ NGUYÊN BỐ CỤC DỌC HOÀN HẢO
            ================================================================ */}
        <div className="lg:hidden flex flex-col items-center text-center mb-10">
          {/* Top Pill / Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-bold font-heading uppercase tracking-wider mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
            <span>{t.badge}</span>
            <span className="text-[#64748B] font-mono text-[11px] font-normal">| {nativeHz}Hz NATIVE</span>
          </div>

          {/* 3D Showcase Banner on Mobile */}
          <div className="w-full mb-6">
            <div className="p-2 sm:p-2.5 rounded-[26px] bg-white border-2 border-[#DFEAF4] shadow-[0_16px_40px_rgba(7,150,229,0.15)]">
              <div className="px-3 py-2 flex items-center justify-between border-b border-[#F1F5F9] mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80" />
                </div>
                <span className="text-[10px] font-mono font-bold text-[#64748B] tracking-wider uppercase">
                  GTA5VN System • Preview
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-[#E2E8F0] bg-[#0F172A]">
                <img 
                  src="/images/hero-banner.jpg" 
                  alt="Tối Ưu Máy - Tối Ưu PC Laptop GTA5VN System" 
                  className="w-full h-auto object-cover block select-none scale-[1.01]"
                  loading="eager"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/95 backdrop-blur-md border border-[#DFEAF4] shadow-md text-[11px] font-bold text-[#152238]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A88A] animate-ping" />
                  <span className="font-heading">CHƠI GAME & LÀM VIỆC MƯỢT HƠN</span>
                </div>
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

        {/* ================================================================
            DESKTOP EXPANSIVE 2-COLUMN SHOWCASE (RỘNG RÃI, THOÁNG ĐÃNG)
            ================================================================ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center mb-14">
          
          {/* Left Column: Quick Value Props & Actions (Rộng rãi, không chật chội) */}
          <div className="lg:col-span-5 xl:col-span-5 text-left flex flex-col justify-center pr-2">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-bold font-heading uppercase tracking-wider mb-6 self-start shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
              <span>BẢN CẬP NHẬT 2026 PRO</span>
              <span className="text-[#64748B] font-mono text-[11px] font-normal">| {nativeHz}Hz NATIVE</span>
            </div>

            {/* Headline - Thoáng, sang trọng */}
            <h1 className="text-3xl xl:text-[40px] font-black text-[#152238] font-heading tracking-tight leading-[1.15] mb-5">
              Tối Ưu Máy Chơi FiveM <br />
              <span className="t1-hero-gradient">Chuẩn eSports Gaming</span>
            </h1>

            {/* Key Value Checklist - Chữ to, thoáng */}
            <div className="space-y-3 mb-8 text-[13.5px] font-semibold text-[#334155]">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Tăng FPS tức thì từ +40% đến +65% trên mọi cấu hình</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Tối ưu CPU Affinity & Triệt tiêu 1% Low Stutter tại các điểm đông người</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Dọn cache FiveM sạch sẽ • 100% FiveM Ban-Safe • 1-Click khôi phục</span>
              </div>
            </div>

            {/* 3D Action Buttons (Không bị bóp méo hay ép co lại) */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <button
                onClick={() => {
                  playTactileClick('down');
                  onOpenDownload();
                }}
                data-download-url="/downloads/GTA5VN-System.exe"
                className="t1-btn-3d t1-btn-primary px-7 py-4 gap-3 text-sm shadow-md"
              >
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-extrabold text-sm">{t.downloadCta}</div>
                  <div className="text-[11px] font-normal opacity-90 -mt-0.5">Dung lượng ~75 MB • Miễn phí</div>
                </div>
              </button>

              <button
                onClick={() => {
                  playTactileClick('subtle');
                  onScrollToSpecs();
                }}
                className="t1-btn-3d t1-btn-surface px-6 py-4 gap-2 text-sm shadow-sm"
              >
                <Cpu className="w-4 h-4 text-[#0796E5]" />
                <span className="font-bold text-[#1E293B]">Đo Cấu Hình</span>
                <ChevronRight className="w-4 h-4 text-[#64748B]" />
              </button>
            </div>

            {/* Direct Download Anchor Link */}
            <div className="mb-6 text-xs text-[#64748B] flex items-center gap-2">
              <span>Tải trực tiếp không qua popup:</span>
              <a
                href="/downloads/GTA5VN-System.exe"
                download="GTA5VN-System.exe"
                className="font-bold text-[#0796E5] hover:underline"
              >
                GTA5VN-System.exe (v2.4.1)
              </a>
            </div>

            {/* Micro Engine Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white border border-[#DFEAF4] shadow-xs text-xs font-semibold text-[#475569] self-start">
              <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-pulse" />
              <span>DirectX 11/12 Engine Buffer</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#00A88A] font-bold">100% Ban-Safe</span>
            </div>

          </div>

          {/* Right Column: 3D Showcase Banner (Rộng rãi, khung viền 3D T1 sắc nét cân đối) */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="p-2.5 sm:p-3.5 rounded-[30px] bg-white border-2 border-[#DFEAF4] shadow-[0_24px_60px_rgba(7,150,229,0.16)] transform transition-all duration-300 hover:scale-[1.01]">
              <div className="px-4 py-2.5 flex items-center justify-between border-b border-[#F1F5F9] mb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444]/85" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B]/85" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981]/85" />
                  <span className="ml-2 text-xs font-mono font-bold text-[#475569]">
                    GTA5VN-System.exe • eSports Suite
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[10.5px] font-bold text-[#00A88A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A88A] animate-pulse" />
                  <span>v2.4.1 LIVE</span>
                </span>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-[#CBD5E1]/70 bg-[#0F172A]">
                <img 
                  src="/images/hero-banner.jpg" 
                  alt="Tối Ưu Máy - Tối Ưu PC Laptop GTA5VN System" 
                  className="w-full h-auto object-cover block select-none scale-[1.01]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-[#DFEAF4] shadow-md text-xs font-bold text-[#152238]">
                  <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
                  <span className="font-heading tracking-wide">CHƠI GAME & LÀM VIỆC MƯỢT HƠN</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================
            STATUS INDICATOR BAR & KPI METRIC CARDS (RỘNG RÃI TRẢI ĐỀU 1480PX)
            ================================================================ */}
        <div className="w-full mb-10">
          <div className="t1-card p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-[#DFEAF4]">
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EDF6FF] border border-[#BAE6FD] flex items-center justify-center text-[#0796E5] shadow-xs flex-shrink-0">
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
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <CheckCircle2 className="w-4 h-4 text-[#00A88A]" />
                <span>100% FiveM Ban-Safe</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <Zap className="w-4 h-4 text-[#F59E0B]" />
                <span>Zero DLL Injection</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <Shield className="w-4 h-4 text-[#0796E5]" />
                <span>1-Click Restore Point</span>
              </div>
            </div>

          </div>
        </div>

        {/* Stat Metric Cards (T1 White KPI Panels - Trải đều 4 cột rộng rãi) */}
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="t1-card t1-card-hover p-6 sm:p-7 text-left">
            <div className="text-3xl sm:text-4xl font-black font-heading text-[#00A88A] mb-1.5">
              {t.statFps}
            </div>
            <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
              {t.statFpsLabel}
            </div>
            <div className="mt-2 text-xs text-[#64748B]">
              Đo lường trên hơn 1,200 cấu hình máy thực tế
            </div>
          </div>

          <div className="t1-card t1-card-hover p-6 sm:p-7 text-left">
            <div className="text-3xl sm:text-4xl font-black font-heading text-[#0796E5] mb-1.5">
              {t.statLatency}
            </div>
            <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
              {t.statLatencyLabel}
            </div>
            <div className="mt-2 text-xs text-[#64748B]">
              Giảm từ 20.8 ms xuống 12.9 ms tại 77 FPS
            </div>
          </div>

          <div className="t1-card t1-card-hover p-6 sm:p-7 text-left">
            <div className="text-3xl sm:text-4xl font-black font-heading text-[#059669] mb-1.5">
              {t.statStutter}
            </div>
            <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
              {t.statStutterLabel}
            </div>
            <div className="mt-2 text-xs text-[#64748B]">
              Xóa sổ khựng hình khi lia chuột nhanh
            </div>
          </div>

          <div className="t1-card t1-card-hover p-6 sm:p-7 text-left">
            <div className="text-3xl sm:text-4xl font-black font-heading text-[#152238] mb-1.5">
              {t.statUsers}
            </div>
            <div className="text-xs sm:text-sm text-[#1E293B] font-bold">
              {t.statUsersLabel}
            </div>
            <div className="mt-2 text-xs text-[#64748B]">
              Từ các server FiveM hàng đầu Việt Nam
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
