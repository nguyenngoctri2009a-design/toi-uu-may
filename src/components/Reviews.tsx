import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface ReviewsProps {
  lang?: Language;
}

interface ReviewItem {
  name: string;
  avatar: string;
  server: string;
  stars: number;
  date: string;
  comment: string;
  specs: string;
  fpsGain: string;
}

const reviews: ReviewItem[] = [
  {
    name: 'Hoàng Long (LongK)',
    avatar: 'HL',
    server: 'Mixi City Roleplay',
    stars: 5,
    date: '2 ngày trước',
    comment: 'Trước đi xe qua Legion Square hay bị khựng khựng đứng hình 1 giây rất ức chế. Áp dụng profile eSports xong lướt êm ru, FPS từ 45 nhảy lên 82 ổn định luôn!',
    specs: 'Core i5-10400F • GTX 1660 Ti',
    fpsGain: '+82% FPS',
  },
  {
    name: 'Tuấn Anh (Sniper99)',
    avatar: 'TA',
    server: 'Độ Tộc Server',
    stars: 5,
    date: '3 ngày trước',
    comment: 'Phần mềm dọn RAM ảo đỉnh thật, bật game lên chơi 4-5 tiếng không bị tràn bộ nhớ văng crash game như trước. Đặc biệt trỏ chuột lia rất mượt không bị trễ.',
    specs: 'Ryzen 5 3600 • 16GB RAM',
    fpsGain: '+75% FPS',
  },
  {
    name: 'Minh Quân (QuanB)',
    avatar: 'MQ',
    server: 'Sài Gòn Phố RP',
    stars: 5,
    date: 'Hôm qua',
    comment: 'Máy mình laptop văn phòng chip Intel UHD tưởng không chơi nổi FiveM. Bật Potato Preset lên bắn nhau ầm ầm được 50 FPS, cảm ơn đội ngũ phát triển nhiều!',
    specs: 'Laptop Core i5-1135G7 Iris Xe',
    fpsGain: '+95% FPS',
  },
  {
    name: 'Bảo Nam (NamSeven)',
    avatar: 'BN',
    server: 'GVN City eSports',
    stars: 5,
    date: '4 ngày trước',
    comment: 'Thích nhất là cái nút khôi phục 1-click rất an tâm. Tool sạch, quét qua VirusTotal xanh lè 100%. Anh em bắn súng war băng đảng khuyên thật lòng nên dùng.',
    specs: 'Ryzen 7 5700X • RTX 3060',
    fpsGain: '+60% FPS',
  },
  {
    name: 'Đức Trọng',
    avatar: 'DT',
    server: 'V-Town Roleplay',
    stars: 5,
    date: '5 ngày trước',
    comment: 'Không bị ban tài khoản nha mọi người, mình dùng cả tháng nay trên FiveM và Steam bình thường. FPS tăng thấy rõ rệt khi trời mưa giông.',
    specs: 'Core i7-9700 • GTX 1070 8GB',
    fpsGain: '+70% FPS',
  },
  {
    name: 'Văn Hùng (HungMix)',
    avatar: 'VH',
    server: 'Hà Nội Phố RP',
    stars: 5,
    date: '1 tuần trước',
    comment: 'Giao diện T1 đẹp đỉnh chóp, thao tác dễ hiểu. Bật tool lên rồi ấn 1 nút là xong, vào game hưởng thụ độ mượt.',
    specs: 'Core i5-12400 • RTX 2060 Super',
    fpsGain: '+68% FPS',
  },
];

export const Reviews: React.FC<ReviewsProps> = ({ lang = 'vi' }) => {
  const isEn = lang === 'en';
  return (
    <section id="danh-gia" className="py-20 relative">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <span>{isEn ? '4.9 / 5 TRUST SCORE' : '4.9 / 5 SAO TÍN NHIỆM'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-heading tracking-tight mb-4">
            {isEn ? 'What Does The FiveM Community Say?' : 'Cộng Đồng FiveM Việt Nam Nói Gì?'}
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            {isEn
              ? 'Over 25,800+ players across top FiveM Roleplay servers have verified real combat performance.'
              : 'Hơn 25,800+ người chơi tại Mixi City, Độ Tộc, Sài Gòn Phố, GVN City đã kiểm chứng hiệu quả thực tế.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div key={idx} className="t1-card t1-card-hover p-6 flex flex-col justify-between">
              <div>
                {/* Header User */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0796E5] to-[#00A88A] text-white flex items-center justify-center font-black text-xs shadow-xs">
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#152238] font-heading flex items-center gap-1">
                        <span>{rev.name}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-[#00A88A]" />
                      </div>
                      <div className="text-[11px] text-[#0796E5] font-semibold">{rev.server}</div>
                    </div>
                  </div>
                  <span className="text-[10.5px] text-[#64748B]">{rev.date}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs text-[#475569] leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* Bottom Card Specs & Gain */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px]">
                <span className="text-[#64748B] font-medium">{rev.specs}</span>
                <span className="font-mono font-bold text-[#00A88A] bg-[#ECFDF5] px-2 py-0.5 rounded-md border border-[#A7F3D0]">
                  {rev.fpsGain}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
