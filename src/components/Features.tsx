import React from 'react';
import { Layers, ShieldCheck, Zap, Server, RefreshCw, Monitor, Check } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface FeaturesProps {
  lang: Language;
}

const icons = [Layers, Zap, Monitor, Server, RefreshCw, ShieldCheck];

export const Features: React.FC<FeaturesProps> = ({ lang }) => {
  const t = content[lang].features;

  return (
    <section id="features" className="py-20 relative bg-dark-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index} 
                className="glass-panel glass-panel-hover rounded-2xl p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-500/20 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-dark-card border border-dark-border text-slate-400">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-dark-border flex items-center gap-2 text-xs text-emerald-400/90 font-medium">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Kích hoạt chỉ với 1 cú click</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
