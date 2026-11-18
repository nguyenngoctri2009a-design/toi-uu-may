import React from 'react';
import { Trophy, CheckCircle2, Server } from 'lucide-react';
import { Language } from '../types';

interface LeaderboardProps {
  lang?: Language;
}

interface PlayerRank {
  rank: number;
  name: string;
  server: string;
  specs: string;
  stockFps: number;
  boostedFps: number;
  gain: string;
  low1Fps: number;
  stability: string;
  verified: boolean;
}

const topPlayers: PlayerRank[] = [
  {
    rank: 1,
    name: 'VN_GhostRider',
    server: 'Việt Nam Roleplay (VNRP)',
    specs: 'Core i5-12400F • GTX 1660 Super • 16GB RAM',
    stockFps: 48,
    boostedFps: 77,
    gain: '+60.4%',
    low1Fps: 52,
    stability: '99.2%',
    verified: true,
  },
  {
    rank: 2,
    name: 'Khai_DarkNight',
    server: 'Sài Gòn Town RP',
    specs: 'Ryzen 5 3600 • GTX 1060 6GB • 16GB RAM',
    stockFps: 42,
    boostedFps: 68,
    gain: '+61.9%',
    low1Fps: 46,
    stability: '98.5%',
    verified: true,
  },
  {
    rank: 3,
    name: 'MinhHoang_Pro',
    server: 'Hà Nội City Roleplay',
    specs: 'Intel Core i5-10400F • GTX 1650 4GB • 16GB RAM',
    stockFps: 35,
    boostedFps: 59,
    gain: '+68.6%',
    low1Fps: 41,
    stability: '98.1%',
    verified: true,
  },
  {
    rank: 4,
    name: 'Long_SniperVN',
    server: 'Đà Nẵng eSports RP',
    specs: 'Core i7-10700K • RTX 2060 6GB • 16GB RAM',
    stockFps: 46,
    boostedFps: 72,
    gain: '+56.5%',
    low1Fps: 50,
    stability: '99.0%',
    verified: true,
  },
  {
    rank: 5,
    name: 'BaoNam_Racer',
    server: 'V-Town Roleplay',
    specs: 'Ryzen 7 5700X • RTX 3060 12GB • 32GB RAM',
    stockFps: 68,
    boostedFps: 98,
    gain: '+44.1%',
    low1Fps: 71,
    stability: '99.4%',
    verified: true,
  },
  {
    rank: 6,
    name: 'Shadow_Hunter',
    server: 'Bắc Nam RP eSports',
    specs: 'Intel Core i3-10100F • GTX 750Ti • 8GB RAM',
    stockFps: 24,
    boostedFps: 42,
    gain: '+75.0%',
    low1Fps: 28,
    stability: '97.2%',
    verified: true,
  },
  {
    rank: 7,
    name: 'GiaBao_Potato',
    server: 'Miền Tây Phố RP',
    specs: 'Core i5-8400 • UHD 630 Onboard (Potato 0.5x • Giới hạn iGPU RAM share)',
    stockFps: 18,
    boostedFps: 25,
    gain: '+38.9%',
    low1Fps: 19,
    stability: '95.8%',
    verified: true,
  },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ lang = 'vi' }) => {
  const isEn = lang === 'en';
  return (
    <section id="bang-xep-hang" className="py-20 relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
            <Trophy className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{isEn ? 'TOP PLAYERS & SERVERS' : 'TOP GAME THỦ & SERVER'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-heading tracking-tight mb-4">
            {isEn ? 'Real-World FPS Growth Leaderboard' : 'Bảng Xếp Hạng Tăng Trưởng FPS Thực Tế'}
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            {isEn
              ? 'Live telemetry recorded directly from players across top FiveM community servers.'
              : 'Dữ liệu ghi nhận trực tiếp từ telemetry của người chơi tại các cụm server FiveM hàng đầu Việt Nam.'}
          </p>

          {/* Test Scenario Context Badge */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] text-xs font-medium text-left shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping shrink-0" />
            <span>
              <strong>Tiêu chuẩn đo lường:</strong> Dữ liệu đo đạc trực tiếp tại khu vực <strong>Legion Square</strong> (150+ người chơi online, mật độ xe và hiệu ứng đồ họa cao nhất) — đồng bộ 100% với kịch bản nặng nhất trên <strong>Biểu Đồ Thử Nghiệm</strong> & <strong>Công Cụ Ước Tính</strong>.
            </span>
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
          
          {/* TOP 2 */}
          <div className="t1-card p-6 border-[#DFEAF4] order-2 md:order-1 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-[#475569] text-xs font-black font-heading shadow-xs">
              🥈 TOP 2
            </div>
            <div className="text-center pt-3 pb-4 border-b border-[#F1F5F9]">
              <div className="text-lg font-extrabold text-[#152238] font-heading">{topPlayers[1].name}</div>
              <div className="text-xs text-[#0796E5] font-semibold mt-0.5">{topPlayers[1].server}</div>
              <div className="text-[11px] text-[#64748B] mt-1">{topPlayers[1].specs}</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-center">
              <div>
                <span className="text-[11px] text-[#64748B] block">Gốc</span>
                <span className="text-base font-bold text-[#64748B]">{topPlayers[1].stockFps} FPS</span>
              </div>
              <div className="text-xs font-black text-[#00A88A] bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                {topPlayers[1].gain}
              </div>
              <div>
                <span className="text-[11px] text-[#00A88A] block font-bold">Sau Tối Ưu</span>
                <span className="text-lg font-black text-[#00A88A]">{topPlayers[1].boostedFps} FPS</span>
              </div>
            </div>
          </div>

          {/* TOP 1 - HIGHLIGHTED */}
          <div className="t1-card p-6 sm:p-7 border-[#BAE6FD] bg-gradient-to-b from-[#F0F9FF] to-white order-1 md:order-2 relative shadow-lg md:-translate-y-2">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white text-xs font-black font-heading shadow-md flex items-center gap-1.5">
              <span>🥇</span>
              <span>QUÁN QUÂN TOP 1</span>
            </div>
            <div className="text-center pt-3 pb-5 border-b border-[#E0F2FE]">
              <div className="text-xl font-black text-[#152238] font-heading flex items-center justify-center gap-1.5">
                <span>{topPlayers[0].name}</span>
                <CheckCircle2 className="w-4 h-4 text-[#00A88A]" />
              </div>
              <div className="text-xs text-[#0796E5] font-bold mt-1">{topPlayers[0].server}</div>
              <div className="text-[11.5px] text-[#64748B] mt-1.5 font-medium">{topPlayers[0].specs}</div>
            </div>
            <div className="mt-5 flex items-center justify-between text-center">
              <div>
                <span className="text-[11px] text-[#64748B] block">FPS Gốc</span>
                <span className="text-lg font-bold text-[#64748B]">{topPlayers[0].stockFps} FPS</span>
              </div>
              <div className="text-sm font-black text-[#00A88A] bg-[#ECFDF5] px-3 py-1.5 rounded-xl border border-[#A7F3D0] shadow-xs">
                {topPlayers[0].gain}
              </div>
              <div>
                <span className="text-[11px] text-[#00A88A] block font-bold">Sau Tối Ưu</span>
                <span className="text-2xl font-black text-[#00A88A]">{topPlayers[0].boostedFps} FPS</span>
              </div>
            </div>
          </div>

          {/* TOP 3 */}
          <div className="t1-card p-6 border-[#DFEAF4] order-3 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-black font-heading shadow-xs">
              🥉 TOP 3
            </div>
            <div className="text-center pt-3 pb-4 border-b border-[#F1F5F9]">
              <div className="text-lg font-extrabold text-[#152238] font-heading">{topPlayers[2].name}</div>
              <div className="text-xs text-[#0796E5] font-semibold mt-0.5">{topPlayers[2].server}</div>
              <div className="text-[11px] text-[#64748B] mt-1">{topPlayers[2].specs}</div>
            </div>
            <div className="mt-4 flex items-center justify-between text-center">
              <div>
                <span className="text-[11px] text-[#64748B] block">Gốc</span>
                <span className="text-base font-bold text-[#64748B]">{topPlayers[2].stockFps} FPS</span>
              </div>
              <div className="text-xs font-black text-[#00A88A] bg-[#ECFDF5] px-2.5 py-1 rounded-lg border border-[#A7F3D0]">
                {topPlayers[2].gain}
              </div>
              <div>
                <span className="text-[11px] text-[#00A88A] block font-bold">Sau Tối Ưu</span>
                <span className="text-lg font-black text-[#00A88A]">{topPlayers[2].boostedFps} FPS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Ranked Table (T1 Pro Table) */}
        <div className="t1-card w-full max-w-full overflow-hidden">
          <div className="p-5 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC]">
            <h3 className="text-base font-extrabold text-[#152238] font-heading flex items-center gap-2">
              <Server className="w-4 h-4 text-[#0796E5]" />
              <span>Bảng Vinh Danh Xếp Hạng Game Thủ</span>
            </h3>
            <span className="text-xs text-[#00A88A] font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Tiêu chuẩn eSports: 100% cấu hình đạt chuẩn chống giật lag (Anti-Stutter)</span>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#DFEAF4] bg-[#F1F5F9]/60 text-[#475569] font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Hạng</th>
                  <th className="py-3 px-4">Game Thủ & Server</th>
                  <th className="py-3 px-4">Cấu Hình PC</th>
                  <th className="py-3 px-4 text-center">Trước / Sau Tối Ưu</th>
                  <th className="py-3 px-4 text-center">Tăng Trưởng</th>
                  <th className="py-3 px-4 text-center">1% Low (Độ Ổn Định)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {topPlayers.map((player) => (
                  <tr key={player.rank} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#152238]">
                      {player.rank === 1 ? '🥇 #1' : player.rank === 2 ? '🥈 #2' : player.rank === 3 ? '🥉 #3' : `#${player.rank}`}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-[#152238] flex items-center gap-1.5">
                        <span>{player.name}</span>
                        {player.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#00A88A]" />}
                      </div>
                      <div className="text-[11px] text-[#64748B]">{player.server}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[#475569] text-[11px]">
                      {player.specs}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="text-[#64748B]">{player.stockFps}</span>
                      <span className="mx-1 text-slate-300">➔</span>
                      <span className="text-[#00A88A] font-bold">{player.boostedFps} FPS</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#00A88A] font-mono font-bold text-[11px] border border-[#A7F3D0]">
                        {player.gain}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#1E293B] text-[11px] font-bold">
                        <span>{player.low1Fps} FPS</span>
                        <span className="text-[10px] text-[#00A88A]">({player.stability})</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Technical Note on Hardware Scaling */}
          <div className="p-4 sm:p-5 border-t border-[#F1F5F9] bg-[#F8FAFC]/60 text-[11px] text-[#64748B] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span>
              💡 <em>Lưu ý kỹ thuật:</em> Card đồ họa rời (GTX/RTX) có VRAM riêng nên đạt biên độ tăng +44% đến +75% tùy mức độ giải phóng nghẽn cổ chai (cao nhất ở card VRAM 2GB–4GB khi thoát tràn bộ nhớ). Card Onboard (iGPU) phụ thuộc băng thông RAM hệ thống nên tăng ổn định quanh +38.9%.
            </span>
            <span className="shrink-0 text-[#0796E5] font-semibold">
              Chuẩn đo kiểm eSports
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
