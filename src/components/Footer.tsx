import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = content[lang].footer;

  return (
    <footer className="border-t border-[#DFEAF4] bg-[#F8FAFC] py-12 text-[#64748B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0796E5] to-[#00A88A] p-0.5 shadow-xs">
              <img 
                src="/images/logo.png" 
                alt="GTA5VN System" 
                className="w-full h-full object-contain rounded-[10px] bg-white"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm text-[#152238] font-heading">
                GTA5VN<span className="text-[#0796E5] ml-0.5">SYSTEM</span>
              </span>
              <span className="text-[11px] text-[#64748B]">
                {t.disclaimer}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://discord.gg/gtavn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="t1-btn-3d t1-btn-surface px-4 py-2 text-xs gap-1.5"
            >
              <span>{t.joinDiscord}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>{t.copyright}</div>
          <div className="flex items-center gap-1">
            <span>Thiết kế chuẩn T1 3D Neumorphic-Glass Hybrid</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
