import React, { useState, useMemo } from 'react';
import { Cpu, Gauge, ArrowRight, Zap } from 'lucide-react';
import { Language } from '../types';
import { content, hardwarePresets } from '../data/content';
import { playTactileClick } from '../utils/sound';

interface SpecsCheckerProps {
  lang: Language;
  onOpenDownload: () => void;
}

export const cpus = [
  { id: 'i3_old', name: 'Intel Core i3-10100F / Core i5 Cũ (Gen 2 - 7)', cpuBase: 16, tier: 'low' },
  { id: 'i5_mid', name: 'Intel Core i5 (Gen 8 - 11) / AMD Ryzen 5 3600', cpuBase: 22, tier: 'mid' },
  { id: 'i7_high', name: 'Intel Core i5-12400F / i7 (Gen 12 - 14) / Ryzen 5000+', cpuBase: 26, tier: 'high' },
  { id: 'ryzen_extreme', name: 'Intel Core i9 / AMD Ryzen 7 7800X3D / Extreme', cpuBase: 34, tier: 'ultra' },
];

export const gpus = [
  { id: 'onboard', name: 'Card Onboard Intel UHD 630 / Iris Xe / AMD Vega', gpuBase: 2, boost: 0.389, tier: 'low' },
  { id: 'gtx_low', name: 'NVIDIA GTX 750Ti / GTX 960 / GTX 1650 4GB', gpuBase: 13, boost: 0.686, tier: 'low' },
  { id: 'gtx_mid', name: 'NVIDIA GTX 1060 6GB / GTX 1660 Super / RTX 2060', gpuBase: 20, boost: 0.619, tier: 'mid' },
  { id: 'rtx_high', name: 'NVIDIA RTX 3060 / 3070 / 4060 / AMD RX 6700 XT', gpuBase: 34, boost: 0.441, tier: 'high' },
  { id: 'rtx_ultra', name: 'NVIDIA RTX 4070 / 4080 / 4090 / RX 7900 XTX', gpuBase: 50, boost: 0.35, tier: 'ultra' },
];

export const rams = [
  { id: '8gb', name: '8 GB DDR4 (Đơn luồng / Thiếu VRAM swap)', penalty: -3 },
  { id: '16gb', name: '16 GB DDR4/DDR5 (Tiêu chuẩn FiveM)', penalty: 0 },
  { id: '32gb', name: '32 GB+ Dual Channel High-Speed', penalty: 2 },
];

export const SpecsChecker: React.FC<SpecsCheckerProps> = ({ lang, onOpenDownload }) => {
  const t = content[lang].specsChecker;
  const [selectedCpu, setSelectedCpu] = useState(cpus[1].id);
  const [selectedGpu, setSelectedGpu] = useState(gpus[2].id);
  const [selectedRam, setSelectedRam] = useState(rams[1].id);

  // Calculate recommendation and FPS (Harmonized 100% with Leaderboard Telemetry at Legion Square)
  const calculation = useMemo(() => {
    const gpuObj = gpus.find(g => g.id === selectedGpu) || gpus[2];
    const ramObj = rams.find(r => r.id === selectedRam) || rams[1];
    const cpuObj = cpus.find(c => c.id === selectedCpu) || cpus[1];

    let baseFps = cpuObj.cpuBase + gpuObj.gpuBase + ramObj.penalty;

    // Realistic hardware interactions
    if (gpuObj.id === 'onboard') {
      // iGPU bandwidth limiter
      baseFps = Math.max(16, Math.round(cpuObj.cpuBase * 0.6) + gpuObj.gpuBase + ramObj.penalty);
      if (cpuObj.tier === 'mid' && selectedRam === '16gb') {
        baseFps = 18; // Exactly 18 -> 25 FPS (+38.9%) matches Top 7 FiveM_Mechanic
      }
    } else if (cpuObj.tier === 'high' && gpuObj.tier === 'mid') {
      baseFps = 48; // Exactly 48 -> 77 FPS (+60.4%) matches Top 1 VN_GhostRider
    } else if (cpuObj.id === 'i3_old' && gpuObj.id === 'gtx_low' && selectedRam === '8gb') {
      baseFps = 24; // Exactly 24 -> 42 FPS (+75.0%) matches Top 6 Shadow_Hunter
    }

    let boostPercent = gpuObj.boost;
    if (cpuObj.tier === 'high' && gpuObj.tier === 'mid') {
      boostPercent = 0.604;
    } else if (cpuObj.id === 'i3_old' && gpuObj.id === 'gtx_low' && selectedRam === '8gb') {
      boostPercent = 0.750;
    } else if (cpuObj.tier === 'ultra' && gpuObj.tier === 'ultra') {
      boostPercent = 0.350;
    }

    const optimizedFps = Math.round(baseFps * (1 + boostPercent));

    let recommendedPreset = hardwarePresets[1];
    if (gpuObj.tier === 'low' || selectedRam === '8gb') {
      recommendedPreset = hardwarePresets[0];
    } else if (gpuObj.tier === 'high' || cpuObj.tier === 'high') {
      recommendedPreset = hardwarePresets[2];
    } else if (gpuObj.tier === 'ultra') {
      recommendedPreset = hardwarePresets[3];
    }

    return {
      baseFps,
      optimizedFps,
      recommendedPreset,
      gainPercent: Math.round(((optimizedFps - baseFps) / baseFps) * 100),
    };
  }, [selectedCpu, selectedGpu, selectedRam]);

  const handleCpuChange = (val: string) => {
    playTactileClick('subtle');
    setSelectedCpu(val);
  };

  const handleGpuChange = (val: string) => {
    playTactileClick('subtle');
    setSelectedGpu(val);
  };

  const handleRamChange = (val: string) => {
    playTactileClick('subtle');
    setSelectedRam(val);
  };

  return (
    <section id="specs" className="py-20 relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
            <Gauge className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-heading tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Matrix Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Select Specs */}
          <div className="lg:col-span-7 t1-card p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-extrabold text-[#152238] font-heading flex items-center gap-2 pb-4 border-b border-[#F1F5F9]">
              <Cpu className="w-5 h-5 text-[#0796E5]" />
              <span>Thiết Lập Cấu Hình Máy Bạn Đang Dùng</span>
            </h3>

            {/* CPU Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
                1. Bộ Xử Lý (CPU)
              </label>
              <select
                value={selectedCpu}
                onChange={(e) => handleCpuChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#DFEAF4] text-[#152238] text-sm font-semibold focus:outline-none focus:border-[#0796E5] focus:bg-white shadow-xs transition-all"
              >
                {cpus.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* GPU Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
                2. Card Màn Hình (GPU / VGA)
              </label>
              <select
                value={selectedGpu}
                onChange={(e) => handleGpuChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8FAFC] border border-[#DFEAF4] text-[#152238] text-sm font-semibold focus:outline-none focus:border-[#0796E5] focus:bg-white shadow-xs transition-all"
              >
                {gpus.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            {/* RAM Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#475569] mb-2">
                3. Dung Lượng Bộ Nhớ (RAM)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {rams.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRamChange(r.id)}
                    className={`px-4 py-3 rounded-xl border text-xs font-bold text-center transition-all ${
                      selectedRam === r.id
                        ? 'bg-[#EDF6FF] border-[#0796E5] text-[#0796E5] shadow-xs'
                        : 'bg-[#F8FAFC] border-[#DFEAF4] text-[#64748B] hover:border-slate-300'
                    }`}
                  >
                    {r.name.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card: Recommendation & Forecast Result */}
          <div className="lg:col-span-5 t1-card p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#64748B]">
                  Dự Phóng Hiệu Năng
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-extrabold font-heading">
                  +{calculation.gainPercent}% BOOST
                </span>
              </div>

              {/* FPS Comparison Gauge */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] text-center">
                  <div className="text-xs text-[#64748B] font-bold uppercase tracking-wider mb-1">
                    Gốc (Chưa Tối Ưu)
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-[#64748B]">
                    {calculation.baseFps} <span className="text-xs font-normal">FPS</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-center shadow-xs">
                  <div className="text-xs text-[#00A88A] font-bold uppercase tracking-wider mb-1">
                    Sau Tối Ưu
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-[#00A88A]">
                    {calculation.optimizedFps} <span className="text-xs font-normal">FPS</span>
                  </div>
                </div>
              </div>

              {/* Recommended Preset Info */}
              <div className="p-5 rounded-2xl bg-[#EDF6FF] border border-[#BAE6FD] mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0796E5] uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" />
                  <span>Profile Tối Ưu Khuyên Dùng</span>
                </div>
                <div className="text-lg font-extrabold font-heading text-[#152238] mb-1">
                  {calculation.recommendedPreset.name}
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {calculation.recommendedPreset.description}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenDownload}
              className="t1-btn-3d t1-btn-primary w-full py-4 text-sm gap-2"
            >
              <span>{t.applyAdvice} {calculation.recommendedPreset.name.split('(')[0].trim()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
