import React, { useState, useMemo } from 'react';
import { Cpu, Gauge, ArrowRight, Zap } from 'lucide-react';
import { Language } from '../types';
import { content, hardwarePresets } from '../data/content';

interface SpecsCheckerProps {
  lang: Language;
  onOpenDownload: () => void;
}

const cpus = [
  { id: 'i3_old', name: 'Intel Core i3 / Core i5 (Gen 2 - 7) / Cũ', tier: 'low' },
  { id: 'i5_mid', name: 'Intel Core i5 (Gen 8 - 11) / Ryzen 3, 5 3600', tier: 'mid' },
  { id: 'i7_high', name: 'Intel Core i5/i7 (Gen 12 - 14) / Ryzen 5, 7 5000+', tier: 'high' },
  { id: 'ryzen_extreme', name: 'Intel Core i9 / AMD Ryzen 7 7800X3D / Extreme', tier: 'ultra' },
];

const gpus = [
  { id: 'onboard', name: 'Card Onboard Intel UHD / Iris Xe / AMD Vega', score: 25, tier: 'low' },
  { id: 'gtx_low', name: 'NVIDIA GTX 750Ti / GTX 960 / GTX 1050 2GB-4GB', score: 40, tier: 'low' },
  { id: 'gtx_mid', name: 'NVIDIA GTX 1060 / GTX 1660 Super / RTX 2060 6GB', score: 65, tier: 'mid' },
  { id: 'rtx_high', name: 'NVIDIA RTX 3060 / 3070 / 4060 / AMD RX 6700 XT', score: 85, tier: 'high' },
  { id: 'rtx_ultra', name: 'NVIDIA RTX 4070 / 4080 / 4090 / RX 7900 XTX', score: 100, tier: 'ultra' },
];

const rams = [
  { id: '8gb', name: '8 GB DDR4 (Đơn luồng / Thiếu VRAM swap)', penalty: -15 },
  { id: '16gb', name: '16 GB DDR4/DDR5 (Tiêu chuẩn FiveM)', penalty: 0 },
  { id: '32gb', name: '32 GB+ Dual Channel High-Speed', penalty: 5 },
];

export const SpecsChecker: React.FC<SpecsCheckerProps> = ({ lang, onOpenDownload }) => {
  const t = content[lang].specsChecker;
  const [selectedCpu, setSelectedCpu] = useState(cpus[1].id);
  const [selectedGpu, setSelectedGpu] = useState(gpus[2].id);
  const [selectedRam, setSelectedRam] = useState(rams[1].id);

  // Calculate recommendation and FPS
  const calculation = useMemo(() => {
    const gpuObj = gpus.find(g => g.id === selectedGpu) || gpus[2];
    const ramObj = rams.find(r => r.id === selectedRam) || rams[1];
    const cpuObj = cpus.find(c => c.id === selectedCpu) || cpus[1];

    let baseFps = 35;
    if (gpuObj.tier === 'low') baseFps = 28;
    if (gpuObj.tier === 'mid') baseFps = 48;
    if (gpuObj.tier === 'high') baseFps = 72;
    if (gpuObj.tier === 'ultra') baseFps = 105;

    // RAM adjustment
    baseFps = Math.max(22, baseFps + ramObj.penalty);

    // Optimized FPS boost
    let boostPercent = 0.7; // 70% average
    if (gpuObj.tier === 'low') boostPercent = 0.95; // huge gain from potato preset
    if (gpuObj.tier === 'mid') boostPercent = 0.65;
    if (gpuObj.tier === 'high') boostPercent = 0.45;
    if (gpuObj.tier === 'ultra') boostPercent = 0.35;

    const optimizedFps = Math.round(baseFps * (1 + boostPercent));

    // Determine recommended preset
    let recommendedPreset = hardwarePresets[1]; // balanced
    if (gpuObj.tier === 'low' || selectedRam === '8gb') {
      recommendedPreset = hardwarePresets[0]; // potato
    } else if (gpuObj.tier === 'high' || cpuObj.tier === 'high') {
      recommendedPreset = hardwarePresets[2]; // esports
    } else if (gpuObj.tier === 'ultra') {
      recommendedPreset = hardwarePresets[3]; // ultra
    }

    return {
      baseFps,
      optimizedFps,
      recommendedPreset,
      gainPercent: Math.round(((optimizedFps - baseFps) / baseFps) * 100),
    };
  }, [selectedCpu, selectedGpu, selectedRam]);

  return (
    <section id="specs" className="py-20 bg-dark-base/50 relative border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Gauge className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls: 7 cols */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-dark-border pb-4">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Lựa Chọn Phần Cứng Đang Sử Dụng</span>
            </h3>

            {/* CPU Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {t.cpuLabel}
              </label>
              <select
                value={selectedCpu}
                onChange={(e) => setSelectedCpu(e.target.value)}
                className="w-full bg-dark-card border border-dark-border focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 font-medium focus:outline-none transition-colors"
              >
                {cpus.map(cpu => (
                  <option key={cpu.id} value={cpu.id}>
                    {cpu.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GPU Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {t.gpuLabel}
              </label>
              <select
                value={selectedGpu}
                onChange={(e) => setSelectedGpu(e.target.value)}
                className="w-full bg-dark-card border border-dark-border focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 font-medium focus:outline-none transition-colors"
              >
                {gpus.map(gpu => (
                  <option key={gpu.id} value={gpu.id}>
                    {gpu.name}
                  </option>
                ))}
              </select>
            </div>

            {/* RAM Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                {t.ramLabel}
              </label>
              <select
                value={selectedRam}
                onChange={(e) => setSelectedRam(e.target.value)}
                className="w-full bg-dark-card border border-dark-border focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-slate-100 font-medium focus:outline-none transition-colors"
              >
                {rams.map(ram => (
                  <option key={ram.id} value={ram.id}>
                    {ram.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 text-xs text-slate-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Thuật toán đo đạc dựa trên cơ sở dữ liệu thực nghiệm tại server 300 người chơi.</span>
            </div>
          </div>

          {/* Result Card: 5 cols */}
          <div className="lg:col-span-5 relative rounded-2xl bg-gradient-to-br from-emerald-500/10 via-dark-card to-dark-surface border border-emerald-500/30 p-6 sm:p-8 shadow-glow-emerald">
            
            <div className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              {t.calculatedHeader}
            </div>
            
            <div className="text-2xl font-extrabold text-white mb-3">
              {calculation.recommendedPreset.name}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {calculation.recommendedPreset.description}
            </p>

            {/* Comparison Metrics */}
            <div className="space-y-4 mb-6">
              
              {/* Baseline FPS */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 font-medium mb-1">
                  <span>{t.currentEstimated}</span>
                  <span className="font-mono text-slate-300 font-bold">{calculation.baseFps} FPS</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-dark-base overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-slate-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (calculation.baseFps / 140) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Optimized FPS */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-emerald-300 mb-1">
                  <span>{t.afterEstimated}</span>
                  <span className="font-mono text-emerald-400 font-extrabold text-sm">
                    {calculation.optimizedFps} FPS (+{calculation.gainPercent}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-dark-base overflow-hidden border border-emerald-500/30 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-glow-emerald"
                    style={{ width: `${Math.min(100, (calculation.optimizedFps / 140) * 100)}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Preset Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-dark-base/60 border border-dark-border text-left">
                <div className="text-[11px] text-slate-400">Hiệu Năng Tăng Dự Kiến</div>
                <div className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
                  {calculation.recommendedPreset.fpsGain}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-dark-base/60 border border-dark-border text-left">
                <div className="text-[11px] text-slate-400">Tiết Kiệm Bộ Nhớ</div>
                <div className="text-sm font-bold font-mono text-teal-300 mt-0.5">
                  {calculation.recommendedPreset.vramSaved}
                </div>
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              onClick={onOpenDownload}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm tracking-wide shadow-glow-emerald hover:shadow-glow-emerald-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Áp Dụng Preset Này Ngay</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
