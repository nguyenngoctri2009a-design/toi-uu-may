import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Keyboard, ChevronRight } from 'lucide-react';
import { playTactileClick } from '../utils/sound';

interface QuickHudDockProps {
  onOpenShortcuts: () => void;
  onToggleSound: () => void;
  soundActive: boolean;
}

export const QuickHudDock: React.FC<QuickHudDockProps> = ({
  onOpenShortcuts,
  onToggleSound,
  soundActive,
}) => {
  const [fps, setFps] = useState<number>(120);
  const [hz, setHz] = useState<number>(144);
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    let frameCount = 0;
    let startTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      const delta = now - startTime;
      if (delta >= 1000) {
        const currentFps = Math.round((frameCount * 1000) / delta);
        setFps(currentFps);
        if (currentFps >= 340) setHz(360);
        else if (currentFps >= 220) setHz(240);
        else if (currentFps >= 155) setHz(165);
        else if (currentFps >= 135) setHz(144);
        else if (currentFps >= 110) setHz(120);
        else if (currentFps >= 70) setHz(75);
        else setHz(60);

        frameCount = 0;
        startTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-1.5 select-none transition-all duration-300">
      {collapsed ? (
        /* Collapsed mini indicator (không che khuất bất kỳ văn bản nào) */
        <button
          onClick={() => {
            playTactileClick('subtle');
            setCollapsed(false);
          }}
          className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#DFEAF4] shadow-md text-xs font-mono font-bold text-[#00A88A] flex items-center gap-2 hover:bg-[#ECFDF5] transition-all hover:scale-105"
          title="Mở thanh HUD hiệu năng"
        >
          <span className="w-2 h-2 rounded-full bg-[#00A88A] animate-ping" />
          <span>{fps} FPS</span>
        </button>
      ) : (
        /* Expanded full HUD dock with collapse toggle */
        <div className="flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md rounded-2xl border border-[#DFEAF4] shadow-[0_8px_25px_rgba(7,150,229,0.12)] opacity-85 hover:opacity-100 transition-opacity">
          
          {/* Live Telemetry Pill */}
          <div className="px-3 py-1.5 text-[11px] font-mono font-bold text-[#1E293B] flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A88A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A88A]"></span>
            </span>
            <span className="text-[#00A88A] font-extrabold">{fps} FPS</span>
            <span className="text-slate-300">•</span>
            <span className="text-[#0796E5] font-bold">{hz}Hz</span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              onToggleSound();
              playTactileClick('subtle');
            }}
            className={`w-7 h-7 rounded-xl border transition-all flex items-center justify-center focus:outline-none ${
              soundActive
                ? 'bg-white border-[#DFEAF4] text-[#00A88A] hover:bg-[#ECFDF5]'
                : 'bg-[#F1F5F9] border-[#CBD5E1] text-[#94A3B8]'
            }`}
            title={soundActive ? 'Tắt âm thanh click (phím M)' : 'Bật âm thanh click (phím M)'}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Keyboard Shortcuts Trigger Button */}
          <button
            onClick={() => {
              playTactileClick('down');
              onOpenShortcuts();
            }}
            className="w-7 h-7 rounded-xl bg-white border border-[#DFEAF4] text-[#0796E5] hover:bg-[#EDF6FF] hover:border-[#BAE6FD] transition-all flex items-center justify-center focus:outline-none"
            title="Mở bảng phím tắt (phím ? hoặc K)"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>

          {/* Collapse Button (Thu gọn để không che chữ) */}
          <button
            onClick={() => {
              playTactileClick('subtle');
              setCollapsed(true);
            }}
            className="w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition-all focus:outline-none"
            title="Thu nhỏ thanh HUD"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

        </div>
      )}
    </div>
  );
};
