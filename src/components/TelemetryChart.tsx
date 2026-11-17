import React, { useState } from 'react';
import { BarChart3, TrendingUp, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { content, benchmarkData } from '../data/content';

interface TelemetryChartProps {
  lang: Language;
}

export const TelemetryChart: React.FC<TelemetryChartProps> = ({ lang }) => {
  const t = content[lang].telemetry;
  const [activeScenario, setActiveScenario] = useState(0);

  const current = benchmarkData[activeScenario];
  const maxFpsScale = 120;

  return (
    <section id="telemetry" className="py-20 bg-dark-base relative border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Scenario Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {benchmarkData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScenario(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeScenario === idx
                  ? 'bg-emerald-500 text-slate-950 shadow-glow-emerald font-bold'
                  : 'bg-dark-card border border-dark-border text-slate-300 hover:text-white hover:border-slate-600'
              }`}
            >
              {item.scenario.split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* Main Telemetry Box */}
        <div className="glass-panel rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-dark-border gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Kịch Bản Kiểm Thử
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {current.scenario}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>+{Math.round(((current.optimizedFps - current.stockFps) / current.stockFps) * 100)}% FPS GAIN</span>
            </div>
          </div>

          {/* Bar comparison area */}
          <div className="space-y-8">
            
            {/* Average FPS Comparison */}
            <div>
              <div className="flex items-center justify-between text-sm font-bold text-slate-200 mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  {t.avg}
                </span>
                <span className="text-xs text-slate-400 font-mono">Càng cao càng mượt mà</span>
              </div>

              {/* Stock Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                  <span>{t.stock}</span>
                  <span className="font-bold text-slate-300">{current.stockFps} FPS</span>
                </div>
                <div className="w-full h-4 rounded-full bg-dark-card overflow-hidden">
                  <div
                    className="h-full bg-slate-600 rounded-full transition-all duration-700"
                    style={{ width: `${(current.stockFps / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>

              {/* Optimized Bar */}
              <div>
                <div className="flex justify-between text-xs text-emerald-300 mb-1 font-mono">
                  <span className="font-bold">{t.optimized}</span>
                  <span className="font-extrabold text-emerald-400 text-sm">{current.optimizedFps} FPS</span>
                </div>
                <div className="w-full h-5 rounded-full bg-dark-card overflow-hidden p-0.5 border border-emerald-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700 shadow-glow-emerald"
                    style={{ width: `${(current.optimizedFps / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 1% Low FPS Comparison (Crucial for stutter) */}
            <div className="pt-4 border-t border-dark-border">
              <div className="flex items-center justify-between text-sm font-bold text-slate-200 mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                  {t.low1}
                </span>
                <span className="text-xs text-slate-400 font-mono">Quyết định độ ổn định khi giao tranh</span>
              </div>

              {/* Stock 1% Low */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                  <span>{t.stock} (Hay bị khựng)</span>
                  <span className="font-bold text-rose-400/80">{current.low1PercentStock} FPS</span>
                </div>
                <div className="w-full h-3.5 rounded-full bg-dark-card overflow-hidden">
                  <div
                    className="h-full bg-rose-900/60 rounded-full transition-all duration-700"
                    style={{ width: `${(current.low1PercentStock / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>

              {/* Optimized 1% Low */}
              <div>
                <div className="flex justify-between text-xs text-teal-300 mb-1 font-mono">
                  <span className="font-bold">{t.optimized} (Khung hình siêu vững)</span>
                  <span className="font-extrabold text-teal-400">{current.low1PercentOptimized} FPS (+{Math.round(((current.low1PercentOptimized - current.low1PercentStock) / current.low1PercentStock) * 100)}%)</span>
                </div>
                <div className="w-full h-4 rounded-full bg-dark-card overflow-hidden p-0.5 border border-teal-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${(current.low1PercentOptimized / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Thử nghiệm với CPU Ryzen 5 5600 + GTX 1660 Super tại máy chủ GTA5VN 300 Slots</span>
            </div>
            <span className="font-mono text-slate-500">Tần số làm tươi: 144Hz G-Sync</span>
          </div>

        </div>

      </div>
    </section>
  );
};
