import React from 'react';
import { Download, Sparkles, Shield, Cpu, Activity, Zap, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface HeroProps {
  lang: Language;
  onOpenDownload: () => void;
  onScrollToSpecs: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenDownload, onScrollToSpecs }) => {
  const t = content[lang].hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 ambient-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Pill / Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase mb-8 shadow-inner-glass">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{t.badge}</span>
          </div>

          {/* Main Title - 100% clean UTF-8 */}
          <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent drop-shadow-sm">
              {t.titleHighlight}
            </span>
            <br />
            <span className="text-slate-100">
              {t.titleRest}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed mb-10 font-normal">
            {t.description}
          </p>

          {/* Call-to-action Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
            <button
              onClick={onOpenDownload}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-bold text-base shadow-glow-emerald hover:shadow-glow-emerald-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <Download className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              <div className="text-left">
                <div>{t.downloadCta}</div>
                <div className="text-[11px] font-normal text-slate-900/80 -mt-0.5">
                  {t.downloadSub}
                </div>
              </div>
            </button>

            <button
              onClick={onScrollToSpecs}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-dark-card/90 hover:bg-dark-cardHover border border-dark-border hover:border-emerald-500/40 text-slate-200 font-semibold text-base transition-all flex items-center justify-center gap-2.5 shadow-inner-glass"
            >
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>{t.specsCta}</span>
            </button>
          </div>

          {/* Real-time Visual Status Indicator */}
          <div className="w-full max-w-4xl p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent mb-16">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Trạng Thái Động Cơ Tối Ưu
                  </div>
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    DirectX 11/12 Engine Buffer
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-300">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% FiveM Ban-Safe</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Zero DLL Injection</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-surface border border-dark-border">
                  <Shield className="w-4 h-4 text-teal-400" />
                  <span>1-Click Restore Point</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat Metric Cards */}
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-panel glass-panel-hover rounded-xl p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-1">
                {t.statFps}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                {t.statFpsLabel}
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Đo lường trên hơn 1,200 cấu hình máy thực tế
              </div>
            </div>

            <div className="glass-panel glass-panel-hover rounded-xl p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-teal-300 mb-1">
                {t.statLatency}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                {t.statLatencyLabel}
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Giảm thiểu tối đa tình trạng trễ phản hồi chuột
              </div>
            </div>

            <div className="glass-panel glass-panel-hover rounded-xl p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 mb-1">
                {t.statStutter}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                {t.statStutterLabel}
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Xóa sổ khựng hình khi lia chuột nhanh
              </div>
            </div>

            <div className="glass-panel glass-panel-hover rounded-xl p-5 sm:p-6 text-left">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white mb-1">
                {t.statUsers}
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                {t.statUsersLabel}
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Từ các server FiveM hàng đầu Việt Nam
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
