import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = content[lang].footer;

  return (
    <footer className="border-t border-dark-border bg-dark-surface/90 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Community Card */}
        <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/60 via-dark-card to-dark-surface border border-emerald-500/30 p-8 sm:p-10 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow-emerald">
          <div className="text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              Gia Nhập Cộng Đồng GTA5VN Hơn 15,000 Thành Viên
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Cập nhật bản mod đồ họa mới nhất, hỗ trợ kỹ thuật 24/7 và giao lưu với các cao thủ FiveM hàng đầu.
            </p>
          </div>

          <a
            href="https://discord.gg/gta5vn"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-sm flex items-center gap-2.5 shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <MessageSquare className="w-5 h-5" />
            <span>{t.joinDiscord}</span>
          </a>
        </div>

        {/* Footer Main Grid */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/40 p-1">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-extrabold text-base text-white">
                GTA5VN<span className="text-emerald-400 ml-0.5">SYSTEM</span>
              </span>
              <p className="text-xs text-slate-400">
                {t.tagline}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#features" className="hover:text-emerald-400 transition-colors">Tính Năng</a>
            <a href="#specs" className="hover:text-emerald-400 transition-colors">Đo Cấu Hình</a>
            <a href="#telemetry" className="hover:text-emerald-400 transition-colors">Đo Đạc FPS</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">Hỏi Đáp</a>
            <a href="https://discord.gg/gta5vn" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Discord Hỗ Trợ</a>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center md:text-left">
          <p className="max-w-2xl leading-relaxed">
            {t.disclaimer}
          </p>
          <div className="flex items-center gap-1 font-mono shrink-0">
            <span>{t.copyright}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
