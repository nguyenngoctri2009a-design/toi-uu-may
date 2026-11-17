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
    <section id="features" className="py-20 relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDF6FF] border border-[#BAE6FD] text-[#0796E5] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
            <Zap className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-heading tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Feature Grid: T1 White Neumorphic 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div 
                key={index} 
                className="t1-card t1-card-hover p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EDF6FF] border border-[#BAE6FD] flex items-center justify-center text-[#0796E5] group-hover:scale-105 group-hover:bg-[#0796E5] group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-[#152238] font-heading mb-2 group-hover:text-[#0796E5] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex items-center gap-2 text-xs text-[#00A88A] font-bold">
                  <Check className="w-4 h-4 text-[#00A88A]" />
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
