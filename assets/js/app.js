/**
 * T1 GTA 5 VN OPTIMIZER - LIVE HARDWARE CHECKER & UI LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    initHardwareScanner();
    initFaqAccordion();
    initFpsCalculator();
});

/**
 * Quét phần cứng người dùng qua Web API & WebGL
 */
function initHardwareScanner() {
    const cpuEl = document.getElementById('spec-cpu');
    const ramEl = document.getElementById('spec-ram');
    const gpuEl = document.getElementById('spec-gpu');
    const evalBadge = document.getElementById('eval-badge');
    const evalTitle = document.getElementById('eval-title');
    const evalDesc = document.getElementById('eval-desc');
    const btnRescan = document.getElementById('btn-rescan');

    function performScan() {
        // Trạng thái chờ
        cpuEl.textContent = 'Đang đọc...';
        ramEl.textContent = 'Đang đọc...';
        gpuEl.textContent = 'Đang đọc...';
        evalBadge.className = 'px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-mono font-bold uppercase rounded animate-pulse';
        evalBadge.textContent = 'Đang quét...';
        evalTitle.textContent = 'Hệ thống đang đối chiếu dữ liệu GTA 5 VN...';

        setTimeout(() => {
            // 1. Kiểm tra luồng CPU
            const cores = navigator.hardwareConcurrency || 4;
            cpuEl.textContent = `${cores} Cores / Threads`;

            // 2. Kiểm tra bộ nhớ RAM (ước tính qua Device Memory API)
            const ram = navigator.deviceMemory || 8;
            ramEl.textContent = ram >= 8 ? `≥ ${ram} GB` : `${ram} GB`;

            // 3. Kiểm tra GPU qua WebGL unmasked renderer
            let gpuName = 'Card Tích Hợp (iGPU)';
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        const rawRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                        // Rút gọn tên GPU để không tràn layout
                        gpuName = rawRenderer.replace(/ANGLE \(|Direct3D11 vs_5_0 ps_5_0\)|vs_\d+_\d+ ps_\d+_\d+|\)/g, '').trim();
                    }
                }
            } catch (e) {
                gpuName = 'DirectX / Vulkan GPU';
            }
            gpuEl.textContent = gpuName;

            // 4. Đánh giá khả năng chiến FiveM VN
            evaluateSystem(cores, ram, gpuName);
        }, 600);
    }

    function evaluateSystem(cores, ram, gpu) {
        const isLowEnd = cores < 4 || ram < 8;
        const isMidEnd = cores >= 4 && ram >= 8 && cores < 8;
        
        if (isLowEnd) {
            evalBadge.className = 'px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold uppercase rounded';
            evalBadge.textContent = 'Cấu Hình Yếu (Cần Tối Ưu)';
            evalTitle.textContent = 'Cảnh báo: Dễ bị nghẽn RAM & tụt FPS ở khu vực đông người!';
            evalDesc.textContent = 'Hệ thống của bạn cần áp dụng ngay bản tối ưu T1 Optimizer để khóa khung hình 45-60 FPS và dọn cache RAM ảo định kỳ.';
        } else if (isMidEnd) {
            evalBadge.className = 'px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-mono font-bold uppercase rounded';
            evalBadge.textContent = 'Cấu Hình Đạt Chuẩn (Khuyên Dùng Tool)';
            evalTitle.textContent = 'Khả quan: Máy bạn có thể chiến FiveM ổn định ở mức 60-80 FPS.';
            evalDesc.textContent = 'Kích hoạt bản tối ưu T1 để triệt tiêu hiện tượng drop FPS 1% Low khi đua xe tốc độ cao hoặc đọ súng đông người.';
        } else {
            evalBadge.className = 'px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold uppercase rounded';
            evalBadge.textContent = 'Cấu Hình Mạnh (Sẵn Sàng Chiến)';
            evalTitle.textContent = 'Rất Tốt: Máy bạn đủ sức gánh mức thiết lập đồ họa cao và FPS trên 100.';
            evalDesc.textContent = 'Sử dụng T1 Optimizer để tối ưu mạng TCP/Ping thấp và kích hoạt texture mượt mà nhất.';
        }
    }

    performScan();

    if (btnRescan) {
        btnRescan.addEventListener('click', performScan);
    }
}

/**
 * Khởi tạo Bộ Giả Lập Khung Hình Dự Kiến (FPS Simulator)
 */
function initFpsCalculator() {
    const resSelect = document.getElementById('calc-res');
    const presetSelect = document.getElementById('calc-preset');
    const resultEl = document.getElementById('calc-fps-result');

    if (!resSelect || !presetSelect || !resultEl) return;

    function updateFps() {
        const cores = navigator.hardwareConcurrency || 4;
        const resMult = parseFloat(resSelect.value) || 1.0;
        const presetMult = parseFloat(presetSelect.value) || 1.0;

        // Base FPS estimate dựa theo số luồng CPU
        let baseFps = 55;
        if (cores >= 8) {
            baseFps = 100;
        } else if (cores >= 6) {
            baseFps = 80;
        } else if (cores < 4) {
            baseFps = 38;
        }

        const calculated = Math.round(baseFps * resMult * presetMult);
        const minFps = Math.max(25, calculated - 8);
        const maxFps = calculated + 12;

        resultEl.textContent = `~ ${minFps} - ${maxFps} FPS`;
    }

    resSelect.addEventListener('change', updateFps);
    presetSelect.addEventListener('change', updateFps);
    
    // Gọi tính toán khởi tạo sau khi phần cứng quét xong
    setTimeout(updateFps, 700);
}

/**
 * Khởi tạo Accordion cho phần FAQ
 */
function initFaqAccordion() {
    const faqButtons = document.querySelectorAll('.faq-toggle');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('i');
            
            const isOpen = !content.classList.contains('hidden');
            
            // Đóng tất cả tab khác
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-toggle i').forEach(ic => ic.style.transform = 'rotate(0deg)');
            
            if (!isOpen) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

