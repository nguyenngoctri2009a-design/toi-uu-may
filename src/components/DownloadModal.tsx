import React, { useState, useEffect } from 'react';
import { X, Download, ShieldCheck, Copy, Check, AlertTriangle, FileCheck } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, lang }) => {
  const [activeTab, setActiveTab] = useState<'chrome' | 'edge' | 'smartscreen'>('chrome');
  const [copied, setCopied] = useState(false);
  const t = content[lang].modal;

  const sha256Hash = 'C9A49936B685C7AEC2F91F096161B67C58CB5A7227C97EF0AA8BA6606B885522';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(sha256Hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Light Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card (T1 White Neumorphic 3D) */}
      <div className="relative w-full max-w-2xl bg-white border border-[#DFEAF4] rounded-3xl shadow-[0_20px_60px_rgba(7,150,229,0.15)] overflow-hidden z-10 my-8">
        
        {/* Top Header */}
        <div className="p-6 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#EDF6FF] border border-[#BAE6FD] flex items-center justify-center text-[#0796E5] shadow-xs">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-[#152238] font-heading">
                {t.title}
              </h3>
              <p className="text-xs text-[#64748B]">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition-all focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* File Information Card */}
          <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#DFEAF4] flex items-center justify-center text-[#0796E5] shadow-xs">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-[#152238] font-heading">
                  GTA5VN-System.exe
                </div>
                <div className="text-xs text-[#64748B]">
                  Phiên bản 2026 Pro • Dung lượng ~75 MB • 100% Sạch
                </div>
              </div>
            </div>

            {/* Direct Download Trigger */}
            <a
              href="/downloads/GTA5VN-System.exe"
              download="GTA5VN-System.exe"
              className="t1-btn-3d t1-btn-primary px-6 py-3 text-xs sm:text-sm gap-2"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadButton}</span>
            </a>
          </div>

          {/* SHA-256 Checksum Box */}
          <div className="p-3.5 rounded-xl bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <ShieldCheck className="w-4 h-4 text-[#00A88A] flex-shrink-0" />
              <div className="text-xs font-mono text-[#475569] truncate">
                <span className="font-bold text-[#152238]">SHA-256:</span> {sha256Hash}
              </div>
            </div>
            <button
              onClick={handleCopyHash}
              className="p-1.5 rounded-lg bg-white border border-[#DFEAF4] hover:bg-slate-50 text-[#0796E5] transition-all flex items-center gap-1 text-[11px] font-bold flex-shrink-0 shadow-2xs"
              title="Sao chép mã hash"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00A88A]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Chép'}</span>
            </button>
          </div>

          {/* Security & Antivirus Bypass Guide */}
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#152238] font-heading mb-3">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.guideTabTitle}</span>
            </div>

            {/* Browser Selector Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => setActiveTab('chrome')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'chrome'
                    ? 'bg-[#EDF6FF] text-[#0796E5] border border-[#0796E5] shadow-xs'
                    : 'bg-[#F8FAFC] border border-[#DFEAF4] text-[#64748B] hover:border-slate-300'
                }`}
              >
                Google Chrome
              </button>
              <button
                onClick={() => setActiveTab('edge')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'edge'
                    ? 'bg-[#EDF6FF] text-[#0796E5] border border-[#0796E5] shadow-xs'
                    : 'bg-[#F8FAFC] border border-[#DFEAF4] text-[#64748B] hover:border-slate-300'
                }`}
              >
                Microsoft Edge
              </button>
              <button
                onClick={() => setActiveTab('smartscreen')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'smartscreen'
                    ? 'bg-[#EDF6FF] text-[#0796E5] border border-[#0796E5] shadow-xs'
                    : 'bg-[#F8FAFC] border border-[#DFEAF4] text-[#64748B] hover:border-slate-300'
                }`}
              >
                Windows SmartScreen
              </button>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-[#DFEAF4] space-y-3">
              {activeTab === 'chrome' && (
                <ol className="space-y-2 text-xs text-[#475569] list-decimal list-inside font-medium leading-relaxed">
                  {t.chromeSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              )}

              {activeTab === 'edge' && (
                <ol className="space-y-2 text-xs text-[#475569] list-decimal list-inside font-medium leading-relaxed">
                  {t.edgeSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              )}

              {activeTab === 'smartscreen' && (
                <ol className="space-y-2 text-xs text-[#475569] list-decimal list-inside font-medium leading-relaxed">
                  {t.smartscreenSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex items-center justify-end">
          <button
            onClick={onClose}
            className="t1-btn-3d t1-btn-surface px-5 py-2.5 text-xs"
          >
            Đóng Cửa Sổ
          </button>
        </div>

      </div>
    </div>
  );
};
