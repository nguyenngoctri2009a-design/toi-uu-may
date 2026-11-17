import React, { useState } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
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
    <section id="telemetry" className="py-20 relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDF6FF] border border-[#BAE6FD] text-[#0796E5] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-heading tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Interactive Scenario Tabs (3D Neumorphic Chips) */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-10">
          {benchmarkData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveScenario(idx)}
              className={`t1-btn-3d px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeScenario === idx
                  ? 't1-btn-primary'
                  : 't1-btn-surface'
              }`}
            >
              {item.scenario.split('(')[0].trim()}
            </button>
          ))}
        </div>

        {/* Main Telemetry Box (T1 White Card) */}
        <div className="t1-card p-6 sm:p-10 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#F1F5F9] gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0796E5]">
                Kịch Bản Kiểm Thử
              </span>
              <h3 className="text-xl font-extrabold text-[#152238] font-heading mt-0.5">
                {current.scenario}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#00A88A] text-xs font-extrabold font-heading">
              <TrendingUp className="w-4 h-4 text-[#00A88A]" />
              <span>+{Math.round(((current.optimizedFps - current.stockFps) / current.stockFps) * 100)}% FPS GAIN</span>
            </div>
          </div>

          {/* Bar comparison area */}
          <div className="space-y-8">
            
            {/* Average FPS Comparison */}
            <div>
              <div className="flex items-center justify-between text-sm font-bold text-[#1E293B] mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A88A]" />
                  {t.avg}
                </span>
                <span className="text-xs text-[#64748B] font-mono">Càng cao càng mượt mà</span>
              </div>

              {/* Stock Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-[#64748B] mb-1 font-mono font-semibold">
                  <span>{t.stock}</span>
                  <span className="font-bold text-[#1E293B]">{current.stockFps} FPS</span>
                </div>
                <div className="w-full h-4 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div
                    className="h-full bg-[#94A3B8] rounded-full transition-all duration-700"
                    style={{ width: `${(current.stockFps / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>

              {/* Optimized Bar */}
              <div>
                <div className="flex justify-between text-xs text-[#00A88A] mb-1 font-mono font-bold">
                  <span>{t.optimized}</span>
                  <span className="font-extrabold text-[#00A88A] text-sm">{current.optimizedFps} FPS</span>
                </div>
                <div className="w-full h-5 rounded-full bg-[#E2E8F0] overflow-hidden p-0.5 border border-[#A7F3D0]">
                  <div
                    className="h-full bg-gradient-to-r from-[#00C49F] to-[#00A88A] rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${(current.optimizedFps / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 1% Low FPS Comparison */}
            <div className="pt-6 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between text-sm font-bold text-[#1E293B] mb-3">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0796E5]" />
                  {t.low1}
                </span>
                <span className="text-xs text-[#64748B] font-mono">Quyết định độ ổn định khi giao tranh</span>
              </div>

              {/* Stock Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-[#64748B] mb-1 font-mono font-semibold">
                  <span>{t.stock}</span>
                  <span className="font-bold text-[#1E293B]">{current.low1PercentStock} FPS</span>
                </div>
                <div className="w-full h-4 rounded-full bg-[#E2E8F0] overflow-hidden">
                  <div
                    className="h-full bg-[#94A3B8] rounded-full transition-all duration-700"
                    style={{ width: `${(current.low1PercentStock / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>

              {/* Optimized Bar */}
              <div>
                <div className="flex justify-between text-xs text-[#0796E5] mb-1 font-mono font-bold">
                  <span>{t.optimized}</span>
                  <span className="font-extrabold text-[#0796E5] text-sm">{current.low1PercentOptimized} FPS</span>
                </div>
                <div className="w-full h-5 rounded-full bg-[#E2E8F0] overflow-hidden p-0.5 border border-[#BAE6FD]">
                  <div
                    className="h-full bg-gradient-to-r from-[#18A2F2] to-[#0796E5] rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: `${(current.low1PercentOptimized / maxFpsScale) * 100}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
