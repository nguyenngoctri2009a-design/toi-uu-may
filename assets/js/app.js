/**
 * T1 GTA 5 VN OPTIMIZER - JAVASCRIPT CORE
 * Thiết Kế T1 3D Neumorphic-Glass Hybrid
 */

document.addEventListener('DOMContentLoaded', () => {
    initHardwareScanner();
    initFaqAccordion();
    initFpsCalculator();
    initDownloadModal();
});

/**
 * 1. Quét Cấu Hình Phần Cứng Trực Tiếp (Hardware Diagnostic)
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
        if (!cpuEl || !ramEl || !gpuEl) return;

        cpuEl.textContent = 'Đang đọc...';
        ramEl.textContent = 'Đang đọc...';
        gpuEl.textContent = 'Đang đọc...';
        
        if (evalBadge) {
            evalBadge.className = 't1-pill t1-pill-warning animate-pulse';
            evalBadge.textContent = 'ĐANG PHÂN TÍCH';
        }
        if (evalTitle) evalTitle.textContent = 'Hệ thống đang đối chiếu dữ liệu FiveM VN...';

        setTimeout(() => {
            // CPU Cores
            const cores = navigator.hardwareConcurrency || 4;
            cpuEl.textContent = `${cores} Cores / Threads`;

            // RAM
            const ram = navigator.deviceMemory || 8;
            ramEl.textContent = ram >= 8 ? `≥ ${ram} GB RAM` : `${ram} GB RAM`;

            // GPU qua WebGL
            let gpuName = 'Card Tích Hợp (iGPU)';
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        const raw = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                        gpuName = raw.replace(/ANGLE \(|Direct3D11 vs_5_0 ps_5_0\)|vs_\d+_\d+ ps_\d+_\d+|\)/g, '').trim();
                    }
                }
            } catch (e) {
                gpuName = 'DirectX / Vulkan GPU';
            }
            gpuEl.textContent = gpuName;

            // Đánh giá
            if (evalBadge && evalTitle && evalDesc) {
                if (cores < 4 || ram < 8) {
                    evalBadge.className = 't1-pill t1-pill-danger';
                    evalBadge.textContent = 'CẤU HÌNH YẾU (CẦN TỐI ƯU GẤP)';
                    evalTitle.textContent = 'Cảnh báo: Dễ bị nghẽn RAM & tụt FPS sâu khi vào chợ xe!';
                    evalDesc.textContent = 'Cấu hình của bạn cần áp dụng ngay bản tối ưu T1 để khóa khung hình 45-60 FPS và dọn RAM ảo liên tục.';
                } else if (cores < 8) {
                    evalBadge.className = 't1-pill t1-pill-cyan';
                    evalBadge.textContent = 'CẤU HÌNH ĐẠT CHUẨN FIVEM';
                    evalTitle.textContent = 'Khả quan: Máy bạn có thể chiến FiveM mượt mà ở mức 70-95 FPS.';
                    evalDesc.textContent = 'Áp dụng T1 Optimizer để triệt tiêu hoàn toàn giật khựng 1% Low khi sấy súng đông người.';
                } else {
                    evalBadge.className = 't1-pill t1-pill-success';
                    evalBadge.textContent = 'CẤU HÌNH MẠNH (CHIẾN TỐT 144HZ)';
                    evalTitle.textContent = 'Rất Tốt: Máy bạn đủ sức gánh đồ họa cao và FPS trên 120.';
                    evalDesc.textContent = 'Sử dụng T1 Optimizer để tối ưu mạng TCP/MTU ping thấp và khử hoàn toàn độ trễ chuột.';
                }
            }
        }, 500);
    }

    performScan();

    if (btnRescan) {
        btnRescan.addEventListener('click', performScan);
    }
}

/**
 * 2. Bộ Giả Lập Khung Hình Dự Kiến (FPS Simulator)
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

        let baseFps = 55;
        if (cores >= 8) baseFps = 105;
        else if (cores >= 6) baseFps = 82;
        else if (cores < 4) baseFps = 38;

        const calculated = Math.round(baseFps * resMult * presetMult);
        const minFps = Math.max(25, calculated - 8);
        const maxFps = calculated + 12;

        resultEl.textContent = `~ ${minFps} - ${maxFps} FPS`;
    }

    resSelect.addEventListener('change', updateFps);
    presetSelect.addEventListener('change', updateFps);
    setTimeout(updateFps, 600);
}

/**
 * 3. FAQ Accordion
 */
function initFaqAccordion() {
    const buttons = document.querySelectorAll('.faq-toggle');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            const isHidden = content.classList.contains('hidden');

            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
            document.querySelectorAll('.faq-toggle i').forEach(i => i.style.transform = 'rotate(0deg)');

            if (isHidden) {
                content.classList.remove('hidden');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

/**
 * 4. Luxury Glass Modal Tải App
 */
function initDownloadModal() {
    const modal = document.getElementById('download-modal');
    const openBtns = [
        document.getElementById('btn-open-download-modal'),
        document.getElementById('btn-hero-download'),
        document.getElementById('btn-hero-zip'),
        document.getElementById('btn-quick-optimize')
    ];
    const closeBtn = document.getElementById('btn-close-modal');
    const doneBtn = document.getElementById('btn-modal-done');
    const copyHashBtn = document.getElementById('btn-copy-hash');
    const hashText = document.getElementById('hash-text');

    if (!modal) return;

    function openModal() {
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    openBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (doneBtn) doneBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (copyHashBtn && hashText) {
        copyHashBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(hashText.textContent.trim()).then(() => {
                copyHashBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-600"></i> Đã sao chép!';
                setTimeout(() => {
                    copyHashBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép';
                }, 2000);
            });
        });
    }
}
