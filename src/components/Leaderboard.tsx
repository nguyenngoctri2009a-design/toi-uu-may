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
  scars: number; // 0 = sạch, 1 = 1 sẹo, 2 = 2 sẹo
  verified: boolean;
}

const topPlayers: PlayerRank[] = [
  {
    rank: 1,
    name: 'Mixi_Dragon99',
    server: 'Mixi City Roleplay (VIP)',
    specs: 'Core i5-12400F • GTX 1660 Super • 16GB RAM',
    stockFps: 48,
    boostedFps: 89,
    gain: '+85.4%',
    scars: 0,
    verified: true,
  },
  {
    rank: 2,
    name: 'DoToc_KillerVN',
    server: 'Độ Tộc Server 1',
    specs: 'Ryzen 5 3600 • GTX 1060 6GB • 16GB RAM',
    stockFps: 42,
    boostedFps: 76,
    gain: '+80.9%',
    scars: 0,
    verified: true,
  },
  {
    rank: 3,
    name: 'Saigon_Shadow',
    server: 'Sài Gòn Phố RP',
    specs: 'Intel Core i3-10100F • GTX 750Ti • 8GB RAM',
    stockFps: 29,
    boostedFps: 53,
    gain: '+82.7%',
    scars: 0,
    verified: true,
  },
  {
    rank: 4,
    name: 'GVN_SniperPro',
    server: 'GVN City eSports',
    specs: 'Core i7-10700K • RTX 2060 • 32GB RAM',
    stockFps: 65,
    boostedFps: 114,
    gain: '+75.3%',
    scars: 0,
    verified: true,
  },
  {
    rank: 5,
    name: 'V_Town_Racer',
    server: 'V-Town Gangster',
    specs: 'Ryzen 7 5700X • RTX 3060 12GB • 32GB RAM',
    stockFps: 72,
    boostedFps: 122,
    gain: '+69.4%',
    scars: 1,
    verified: true,
  },
  {
    rank: 6,
    name: 'NoLag_Hunter',
    server: 'Hà Nội Phố Roleplay',
    specs: 'Intel Core i5-9400F • GTX 1050Ti • 16GB RAM',
    stockFps: 38,
    boostedFps: 66,
    gain: '+73.6%',
    scars: 0,
    verified: true,
  },
  {
    rank: 7,
    name: 'FiveM_Mechanic',
    server: 'Bình Dân City RP',
    specs: 'Core i5-8400 • Card Onboard UHD 630 • 16GB',
    stockFps: 24,
    boostedFps: 46,
    gain: '+91.6%',
    scars: 0,
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
              ? 'Live telemetry telemetry recorded directly from players across top FiveM community servers.'
              : 'Dữ liệu ghi nhận trực tiếp từ telemetry của người chơi tại các cụm server FiveM hàng đầu Việt Nam.'}
          </p>
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
          <div className="t1-card p-7 border-[#BAE6FD] bg-gradient-to-b from-[#F0F9FF] to-white order-1 md:order-2 relative shadow-lg -translate-y-2">
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
        <div className="t1-card overflow-hidden">
          <div className="p-5 border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC]">
            <h3 className="text-base font-extrabold text-[#152238] font-heading flex items-center gap-2">
              <Server className="w-4 h-4 text-[#0796E5]" />
              <span>Bảng Vinh Danh Xếp Hạng Game Thủ</span>
            </h3>
            <span className="text-xs text-[#64748B] font-semibold">
              Hệ thống kỷ luật: 3 Sẹo đuổi thẳng • Hiện tại: 100% Sạch
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
                  <th className="py-3 px-4 text-center">Kỷ Luật</th>
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
                    <td className="py-3.5 px-4 text-center">
                      {player.scars === 0 ? (
                        <span className="text-[10.5px] font-bold text-[#00A88A] bg-[#ECFDF5] px-2 py-0.5 rounded-md">
                          0/3 Sẹo
                        </span>
                      ) : (
                        <span className="text-[10.5px] font-bold text-[#D97706] bg-[#FFFBEB] px-2 py-0.5 rounded-md">
                          {player.scars}/3 Sẹo
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </section>
  );
};
