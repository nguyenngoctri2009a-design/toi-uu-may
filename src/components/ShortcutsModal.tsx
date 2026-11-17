import React, { useEffect } from 'react';
import { X, Keyboard, Download, Volume2, Cpu, HelpCircle } from 'lucide-react';
import { playTactileClick } from '../utils/sound';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDownload: () => void;
  onScrollToSpecs: () => void;
  onToggleSound: () => void;
  soundActive: boolean;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({
  isOpen,
  onClose,
  onOpenDownload,
  onScrollToSpecs,
  onToggleSound,
  soundActive,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      if (key === 'ESCAPE') {
        onClose();
      } else if (key === 'D') {
        playTactileClick('down');
        onOpenDownload();
      } else if (key === 'C') {
        playTactileClick('down');
        onScrollToSpecs();
      } else if (key === 'M') {
        onToggleSound();
      } else if (key === '?' || key === 'K') {
        playTactileClick('down');
        if (isOpen) onClose();
        else {
          // Toggle modal handled externally
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onOpenDownload, onScrollToSpecs, onToggleSound]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Light Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white border border-[#DFEAF4] rounded-3xl shadow-[0_20px_60px_rgba(7,150,229,0.18)] p-6 sm:p-7 z-10 my-8 select-none">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDF6FF] text-[#0796E5] border border-[#BAE6FD] flex items-center justify-center text-base shadow-xs">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#152238] font-heading">
                PHÍM TẮT HỆ THỐNG
              </h3>
              <span className="text-[11px] font-semibold text-[#64748B] block">
                Thao tác nhanh cho Pro Gamer
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-2.5 mb-6 text-xs font-semibold text-[#334155]">
          
          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#0796E5]" />
              <span>Tải nhanh bộ tối ưu (.EXE)</span>
            </div>
            <kbd className="t1-keycap font-mono font-bold text-xs px-2.5 py-0.5">D</kbd>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-[#00A88A]" />
              <span>Bật / Tắt âm thanh click Tactile</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-[#64748B]">{soundActive ? 'Đang bật' : 'Đang tắt'}</span>
              <kbd className="t1-keycap font-mono font-bold text-xs px-2.5 py-0.5">M</kbd>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#F59E0B]" />
              <span>Kiểm tra phần cứng máy tính</span>
            </div>
            <kbd className="t1-keycap font-mono font-bold text-xs px-2.5 py-0.5">C</kbd>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#0796E5]" />
              <span>Mở bảng danh sách phím tắt</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="t1-keycap font-mono font-bold text-xs px-2 py-0.5">?</kbd>
              <span className="text-[#94A3B8]">/</span>
              <kbd className="t1-keycap font-mono font-bold text-xs px-2 py-0.5">K</kbd>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <X className="w-4 h-4 text-[#E11D48]" />
              <span>Đóng cửa sổ thông báo / Modal</span>
            </div>
            <kbd className="t1-keycap font-mono font-bold text-xs px-2.5 py-0.5">ESC</kbd>
          </div>

        </div>

        <button 
          onClick={onClose}
          className="t1-btn-3d t1-btn-primary w-full text-xs py-3 justify-center"
        >
          <span>ĐÃ HIỂU</span>
        </button>

      </div>
    </div>
  );
};
