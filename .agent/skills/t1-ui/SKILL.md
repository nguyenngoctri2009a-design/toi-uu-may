---
name: t1-ui
description: Chuyên thiết kế và xây dựng giao diện Web, Landing Page, Dashboard theo phong cách T1 Esports (White Edition / Dark Carbon, màu đỏ Crimson #E2012D, huy hiệu 5 sao Worlds Champions, typography góc cạnh).
---

# T1 Esports UI & Design System Skill

Skill này hướng dẫn và cung cấp bộ quy chuẩn thiết kế giao diện (Design System) chuẩn phong cách **T1 Esports (SK telecom T1)**. Áp dụng cho Web, Landing Page game, ứng dụng phần mềm thi đấu, hoặc trang giới thiệu app.

---

## 1. Hệ Màu Chuẩn T1 (Color Palette)

### Bản Sáng (T1 White Edition - Đang áp dụng)
- **Nền chính (Background)**: `#FFFFFF` và `#F8FAFC` (Slate-50).
- **Màu thương hiệu (T1 Crimson Red)**: `#E2012D` (Primary Action, CTA, Icons).
- **Đỏ nhấn đậm (Deep Crimson)**: `#B30022` (Hover states).
- **Viền & Ngăn cách (Borders)**: `#E2E8F0` (Slate-200) hoặc `rgba(226, 1, 45, 0.2)` cho viền LED.
- **Chữ chính (Headings & Body)**: `#0F172A` (Slate-900) cho tiêu đề, `#64748B` (Slate-500) cho mô tả.
- **Huy hiệu Vô Địch (Worlds Gold)**: `#F59E0B` (Amber-500) cho 5 ngôi sao (★★★★★).

### Bản Tối (T1 Cyberpunk Dark Edition)
- **Nền chính**: `#0A0D14` (Carbon Dark) và `#121620` (Surface Dark Card).
- **Màu thương hiệu**: `#E2012D` kết hợp hiệu ứng phát sáng Neon `box-shadow: 0 0 20px rgba(226, 1, 45, 0.6)`.

---

## 2. Typography (Kiểu Chữ)
- **Tiêu đề & Thương hiệu**: `Outfit` hoặc `Montserrat`, trọng lượng `font-black` (900) hoặc `font-extrabold` (800), viết hoa (UPPERCASE), khoảng cách chữ hẹp (`tracking-tight`).
- **Thông số kỹ thuật, Code, Badge**: `Space Grotesk` hoặc `JetBrains Mono` (`font-mono`, `uppercase`, `tracking-wider`).

---

## 3. Các Thành Phần Giao Diện Đặc Trưng Của T1 (Core Components)

### A. Logo Box T1 & Huy Hiệu 5 Sao
```html
<div class="relative">
    <div class="w-10 h-10 bg-[#E2012D] flex items-center justify-center rounded-sm shadow-[0_4px_14px_rgba(226,1,45,0.4)]">
        <span class="font-mono font-black text-2xl text-white">T1</span>
    </div>
    <!-- 5 Ngôi sao Vô địch Thế giới (2013, 2015, 2016, 2023, 2024) -->
    <div class="absolute -top-2.5 -right-2 flex text-[9px] text-amber-500 gap-0.5">
        ★★★★★
    </div>
</div>
```

### B. Nút Bấm Hành Động (CTA Button)
- Góc bo rất nhỏ (`rounded-sm` - 2px đến 4px), góc cạnh sắc sảo thể hiện tính chiến đấu thể thao điện tử.
- Hiệu ứng vệt sáng trượt qua khi hover (`overflow-hidden`, lớp phủ `transform -translate-x-full group-hover:translate-x-0`).

### C. Khối Kỹ Năng (Champion Skill Cards)
Gắn mác chiêu thức tương tự Liên Minh Huyền Thoại:
- `KỸ NĂNG 1 [Q]`: Phản xạ, tốc độ xử lý chuột (Faker).
- `KỸ NĂNG 2 [W]`: Bắn chuẩn, khóa khung hình (Gumayusi).
- `KỸ NĂNG 3 [E]`: Tầm nhìn, giải nén texture map (Keria).
- `CHIÊU CUỐI [R]`: Đua xe, dọn RAM ảo chống văng game (Oner).

---

## 4. Hiệu Ứng Nền (Cyber Grid Light)
```css
.cyber-grid-light {
    background-size: 40px 40px;
    background-image: 
        linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 80%);
}
```

---

## 5. Quy Trình Tạo Giao Diện T1 Mới
1. Khởi tạo cấu trúc HTML5 với Tailwind CDN và Font Awesome.
2. Cấu hình bảng màu `t1red: #E2012D`, nền `t1bg: #F8FAFC`.
3. Gắn Header với Logo Box T1 + Huy hiệu 5 sao vàng.
4. Xây dựng Hero Section với tiêu đề giật tít, vầng hào quang đỏ nhạt làm nền.
5. Tạo khối Bộ Kỹ Năng T1 (Q-W-E-R).
6. Tích hợp thanh Benchmark so sánh trước/sau tối ưu.
