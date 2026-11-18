import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Wrench, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface FaqSectionProps {
  lang: Language;
}

const troubleshootingItems = [
  {
    id: 1,
    title: '1. Lỗi không áp dụng được tối ưu hoặc game không tăng FPS',
    cause: 'Game FiveM đang chạy song song trong lúc áp dụng cấu hình (khiến tệp settings.xml bị khóa không thể ghi đè), hoặc máy bạn sử dụng Card Onboard (iGPU) nên bị giới hạn băng thông RAM hệ thống.',
    steps: [
      'Thoát hoàn toàn FiveM và Rockstar Games Launcher trước khi nhấn áp dụng Preset.',
      'Nếu dùng laptop/PC chạy card tích hợp (như Intel UHD/Iris Xe), hãy chuyển sang chế độ Potato (Khoai Tây Siêu Mượt) thay vì Balanced để giảm tải độ phân giải nội bộ.',
    ],
    verify: 'Mở lại FiveM, vào khu vực đông người như Legion Square và kiểm tra chỉ số 1% Low FPS ổn định ở mức 25–52 FPS tùy cấu hình.',
  },
  {
    id: 2,
    title: '2. Lỗi mất tiếng, sai màu hoặc giao diện game quá mờ sau khi tối ưu',
    cause: 'Các preset tối ưu sâu thường tắt bớt hiệu ứng đổ bóng, sương mù hoặc giảm tỷ lệ khung hình (Frame Scaling) để ưu tiên độ mượt.',
    steps: [
      'Sử dụng tính năng 1-Click Restore Point (Khôi phục cài đặt gốc) tích hợp sẵn để đưa toàn bộ thông số đồ họa về trạng thái ban đầu trước khi chỉnh sửa.',
      'Nếu muốn tự chỉnh lại thủ công: Vào Settings > Graphics trong FiveM và tăng mục Frame Scaling Mode lên mức 1.000 (Off).',
    ],
    verify: 'Hình ảnh nhân vật và phương tiện sắc nét trở lại như mặc định ban đầu.',
  },
  {
    id: 3,
    title: '3. Lỗi kết nối mạng, Desync hoặc Voice Chat bị trễ',
    cause: 'Tính năng NetSync tối ưu gói tin UDP có thể xung đột với các phần mềm giảm ping bên thứ ba (như ExitLag, GearUP Booster) hoặc VPN đang bật sẵn trên máy.',
    steps: [
      'Tắt hoàn toàn các phần mềm VPN hoặc bộ tăng tốc mạng khác nếu đang kích hoạt NetSync.',
      'Khởi động lại bộ định tuyến (Router) hoặc chuyển sang kết nối dây mạng LAN thay vì Wi-Fi để ổn định Tickrate.',
    ],
    verify: 'Ping trong server FiveM ổn định, tình trạng giật lag khi va chạm xe hoặc trễ tiếng nói (Voice Chat) biến mất.',
  },
  {
    id: 4,
    title: '4. Lỗi liên kết tải về hoặc nút bấm trên trang web không phản hồi',
    cause: 'Trình chặn quảng cáo (AdBlock) hoặc trình duyệt chặn cửa sổ bật lên (Pop-up) ngăn cản chuyển hướng tới máy chủ lưu trữ hoặc kênh Discord GTA5VN.',
    steps: [
      'Tạm tắt tiện ích chặn quảng cáo trên trang gta5vn.vercel.app và tải lại trang (F5).',
      'Nếu nút tải trực tiếp gặp sự cố bảo trì, hãy truy cập trực tiếp qua kênh Discord chính thức để lấy liên kết dự phòng.',
    ],
    verify: 'Trang web phản hồi ngay khi bấm nút và chuyển hướng đúng tới trang tải hoặc lời mời Discord.',
    hasDiscordLink: true,
  },
];

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = content[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EDF6FF] border border-[#BAE6FD] text-[#0796E5] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#152238] font-heading tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List (T1 White Cards) */}
        <div className="space-y-4">
          {t.questions.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`t1-card transition-all overflow-hidden ${
                  isOpen ? 'border-[#BAE6FD] shadow-md' : 'border-[#DFEAF4]'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                >
                  <span className={`text-base font-extrabold font-heading ${
                    isOpen ? 'text-[#0796E5]' : 'text-[#152238]'
                  }`}>
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#EDF6FF] text-[#0796E5]' : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-[#475569] leading-relaxed border-t border-[#F1F5F9]">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Troubleshooting & Diagnostics Guide */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-xs font-bold font-heading uppercase tracking-wider mb-3 shadow-xs">
              <Wrench className="w-3.5 h-3.5" />
              <span>XỬ LÝ SỰ CỐ & KHẮC PHỤC LỖI</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#152238] font-heading tracking-tight">
              Hướng Dẫn Khắc Phục Nhanh Các Lỗi Thường Gặp
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {troubleshootingItems.map((item) => (
              <div key={item.id} className="t1-card p-6 flex flex-col justify-between border-[#DFEAF4]">
                <div>
                  <h4 className="text-base font-extrabold text-[#152238] font-heading mb-3">
                    {item.title}
                  </h4>

                  <div className="mb-3 p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] leading-relaxed">
                    <span className="font-bold inline-flex items-center gap-1 mr-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] inline" />
                      Nguyên nhân:
                    </span>
                    {item.cause}
                  </div>

                  <div className="mb-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#0796E5] mb-2">
                      Cách xử lý:
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#475569] leading-relaxed list-disc pl-4">
                      {item.steps.map((step, sIdx) => (
                        <li key={sIdx}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-[#00A88A] font-medium bg-[#ECFDF5] p-2.5 rounded-xl border border-[#A7F3D0]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-bold">Xác minh:</strong> {item.verify}
                    </span>
                  </div>

                  {item.hasDiscordLink && (
                    <a
                      href="https://discord.gg/gtavn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t1-btn-3d t1-btn-surface w-full py-2 text-xs gap-1.5 justify-center"
                    >
                      <span>Truy cập Discord GTA5VN chính thức</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
