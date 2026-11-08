# ⚡ GTA5VN-System Pro - Fullstack Rust + Vercel Architecture

Hệ thống Landing Page & Công cụ Tối ưu hóa GTA 5 / FiveM Roleplay Việt Nam.
Giao diện chuẩn **T1 3D Neumorphic-Glass Hybrid**, tích hợp **Rust Serverless Backend** hiệu năng cao triển khai trực tiếp trên **Vercel** kết nối kho lưu trữ **GitHub**.

---

## 🏗️ Kiến Trúc Hệ Thống (Architecture Overview)

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository (Source)               │
│               nguyenngoctri2009a-design/toi-uu-may          │
└──────────────────────────────┬──────────────────────────────┘
                               │ Auto-Deploy on Push (main)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                       Vercel Cloud Platform                 │
├──────────────────────────────┬──────────────────────────────┤
│    Frontend (Global Edge CDN)│   Backend (Rust Serverless)  │
│  - 100% Light Mode T1 Glass  │  - vercel_runtime v2 + Tokio │
│  - index.html, 404, 500      │  - api/status.rs             │
│  - assets/css, assets/js     │  - api/specs.rs              │
│  - 144Hz Telemetry Canvas    │  - api/reviews.rs            │
│  - Web Audio Tactile Engine  │  - api/ping.rs               │
│  - LocalStorage Persistence  │  - api/settings.rs           │
└──────────────────────────────┴──────────────────────────────┘
```

---

## 🚀 Danh Sách Endpoint Rust API (`api/*.rs`)

| Endpoint | Method | Chức Năng | Output |
| :--- | :--- | :--- | :--- |
| `/api/status` | `GET` | Kiểm tra trạng thái máy chủ, runtime Rust, tính năng khóa 144Hz | JSON |
| `/api/ping` | `GET` | Đo độ trễ thời gian thực tới 4 cụm máy chủ VN & Quốc tế | JSON |
| `/api/specs` | `GET` | Thuật toán chẩn đoán phần cứng (CPU, RAM, GPU) và dự đoán FPS | JSON |
| `/api/reviews` | `GET, POST` | Lấy danh sách & Đăng bài đánh giá cộng đồng (Lọc XSS, Rate limit) | JSON |
| `/api/settings` | `GET` | Engine sinh file `gta5_settings.xml` tối ưu theo phân khúc máy | XML |

---

## 🛠️ Hướng Dẫn Cài Đặt & Phát Triển Cục Bộ (Local Development)

### 1. Yêu cầu môi trường
- Đã cài đặt [Rust & Cargo](https://rustup.rs/) (phiên bản 1.70 trở lên).
- Đã cài đặt [Vercel CLI](https://vercel.com/cli):
  ```bash
  npm i -g vercel
  ```

### 2. Cài đặt biến môi trường
Tạo file `.env.local` tại thư mục gốc (dựa theo `.env.example`):
```bash
ENVIRONMENT=development
RUST_LOG=debug
DATABASE_URL=postgres://user:password@host/database?sslmode=require
API_SECRET_KEY=local_development_secret_key
```

### 3. Khởi chạy môi trường Dev
Chạy lệnh sau tại thư mục dự án:
```bash
vercel dev
```
Vercel CLI sẽ tự động biên dịch các file trong `api/*.rs` bằng Cargo và khởi tạo máy chủ tại `http://localhost:3000`.

---

## 🌐 Hướng Dẫn Triển Khai Lên Vercel (Production Deployment)

### 1. Kết nối Repository với Vercel
1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard) -> Chọn **Add New Project**.
2. Chọn Repository GitHub: `nguyenngoctri2009a-design/toi-uu-may`.
3. Framework Preset: Chọn **Other**.
4. Cấu hình biến môi trường trong mục **Environment Variables**:
   - `ENVIRONMENT`: `production`
   - `DATABASE_URL`: Đường dẫn kết nối database Supabase / Neon / Postgres của bạn.
   - `API_SECRET_KEY`: Khóa bí mật API.
5. Bấm **Deploy**. Vercel sẽ tự động build binary Rust và kích hoạt website trực tuyến.

---

## 🛡️ Bảo Mật & Toàn Vẹn Dữ Liệu

1. **Bảo vệ biến môi trường**: File `.env*` đã được đưa vào `.gitignore`, ngăn chặn rò rỉ credential lên GitHub.
2. **Cơ sở dữ liệu bền vững**: Không lưu trữ file dữ liệu quan trọng trên filesystem tạm `/tmp` của Serverless Function. Mọi dữ liệu đều được lưu trữ trên Cloud Database độc lập.
3. **Phòng chống tấn công XSS & Injection**: Mọi dữ liệu người dùng gửi lên qua `/api/reviews` đều được hàm `sanitize_text` của Rust làm sạch trước khi xử lý.
4. **Bảo mật Header**: Cấu hình đầy đủ `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Permissions-Policy`.

---

## ❓ Xử Lý Lỗi Thường Gặp (Troubleshooting)

- **Lỗi 1: `Function Execution Timeout`**:
  - *Nguyên nhân*: Hàm Rust mất quá 10s để thực thi.
  - *Khắc phục*: Tối ưu connection pool database hoặc tăng `maxDuration` trong `vercel.json`.
- **Lỗi 2: `Database Connection Lost`**:
  - *Nguyên nhân*: Serverless function đóng kết nối khi instance ngủ đông.
  - *Khắc phục*: Sử dụng Connection Pooling (PgBouncer hoặc HTTP REST Adapter như Neon/Supabase/Upstash).
- **Lỗi 3: Chạy offline không tải được dữ liệu**:
  - *Cơ chế dự phòng*: Toàn bộ frontend đã tích hợp sẵn Service Fallback. Khi mất kết nối hoặc API serverless đang khởi động nguội, frontend tự động sử dụng bộ tính toán client mà không làm gián đoạn trải nghiệm người dùng.
