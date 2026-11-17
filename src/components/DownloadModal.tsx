import React, { useState, useEffect } from 'react';
import { X, Download, ShieldCheck, Copy, Check, AlertTriangle, FileCheck, ExternalLink } from 'lucide-react';
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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-dark-surface border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Header */}
        <div className="p-6 border-b border-dark-border flex items-center justify-between bg-dark-card/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {t.title}
              </h3>
              <p className="text-xs text-slate-400">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-card transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* File Meta Summary */}
          <div className="p-4 rounded-xl bg-dark-base border border-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.fileName}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  {t.version}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {t.fileSize} • Tải trực tiếp không qua quảng cáo rút gọn link
              </div>
            </div>

            {/* Direct Download Button */}
            <a
              href="/downloads/GTA5VN-System.exe"
              download="GTA5VN-System.exe"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-glow-emerald hover:shadow-glow-emerald-lg transition-all flex items-center justify-center gap-2 text-center"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadButton}</span>
            </a>
          </div>

          {/* Backup ZIP link */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Nếu máy của bạn chặn tải file .exe trực tiếp:</span>
            <a
              href="/downloads/GTA5VN-System.zip"
              download="GTA5VN-System.zip"
              className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <span>{t.downloadZip}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* SHA-256 Checksum Container */}
          <div className="p-3.5 rounded-xl bg-dark-card border border-dark-border">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span className="font-semibold text-slate-300">{t.sha256Label}</span>
              <button
                onClick={handleCopyHash}
                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono text-[11px] transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? t.copied : t.copyHash}</span>
              </button>
            </div>
            <div className="font-mono text-[11px] text-slate-300 bg-dark-base p-2 rounded-lg border border-white/5 break-all select-all">
              {sha256Hash}
            </div>
          </div>

          {/* Security & Bypass Guide Accordion / Tabs */}
          <div className="border border-dark-border rounded-xl bg-dark-base/40 overflow-hidden">
            <div className="p-4 border-b border-dark-border bg-dark-card/30 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                {t.guideTabTitle}
              </h4>
            </div>

            {/* Tab switch buttons */}
            <div className="flex border-b border-dark-border bg-dark-base">
              <button
                onClick={() => setActiveTab('chrome')}
                className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
                  activeTab === 'chrome'
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabs.chrome}
              </button>
              <button
                onClick={() => setActiveTab('edge')}
                className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
                  activeTab === 'edge'
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabs.edge}
              </button>
              <button
                onClick={() => setActiveTab('smartscreen')}
                className={`flex-1 py-2.5 text-xs font-semibold text-center border-b-2 transition-colors ${
                  activeTab === 'smartscreen'
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {t.tabs.smartscreen}
              </button>
            </div>

            {/* Tab Content Display */}
            <div className="p-4 space-y-3">
              {activeTab === 'chrome' && (
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                  {t.chromeSteps.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      <span className="text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'edge' && (
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                  {t.edgeSteps.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      <span className="text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              )}

              {activeTab === 'smartscreen' && (
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
                  {t.smartscreenSteps.map((step, idx) => (
                    <li key={idx} className="pl-1">
                      <span className="text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            {/* Bottom Disclaimer */}
            <div className="p-3 bg-amber-500/10 border-t border-amber-500/20 text-[11px] text-amber-200/90 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t.safetyNote}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
