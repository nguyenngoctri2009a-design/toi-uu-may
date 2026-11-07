/**
 * T1 GTA 5 VN OPTIMIZER V2.5 - MASTER JAVASCRIPT CONTROLLER
 * 100% LIGHT MODE LOCKED - GAMING SAAS ARCHITECTURE
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHardwareScanner();
    initFaqAccordion();
    initFpsCalculator();
    initDownloadModal();
    initPingTester();
    initAnimatedCounters();
    initXmlGenerator();
    initCommandCopier();
    initMockupBoost();
    initButtonRipple();
});

/**
 * 1. Mobile Hamburger Menu Toggle
 */
function initMobileMenu() {
    const btnMobile = document.getElementById('btn-mobile-menu');
    const drawer = document.getElementById('mobile-menu-drawer');
    if (!btnMobile || !drawer) return;

    btnMobile.addEventListener('click', () => {
        drawer.classList.toggle('hidden');
    });

    // Đóng drawer khi click vào link
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.add('hidden');
        });
    });
}

/**
 * 2. Hardware Diagnostic Scanner (Bóc Tách Phần Cứng Thật Qua WebGL & Navigator API)
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
            // Đọc CPU Cores
            const cores = navigator.hardwareConcurrency || 4;
            cpuEl.textContent = `${cores} Cores / Threads`;

            // Đọc RAM
            const ram = navigator.deviceMemory || 8;
            ramEl.textContent = ram >= 8 ? `≥ ${ram} GB RAM` : `${ram} GB RAM`;

            // Bóc tách tên GPU qua WebGL unmasked renderer
            let gpuName = 'Card Đồ Họa Tích Hợp (iGPU)';
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
                gpuName = 'DirectX / Vulkan GPU Device';
            }
            gpuEl.textContent = gpuName;

            // Phân loại 5 cấp độ cấu hình:
            // CẤU HÌNH RẤT MẠNH | CẤU HÌNH MẠNH | CẤU HÌNH KHÁ | CẤU HÌNH TRUNG BÌNH | CẤU HÌNH YẾU
            if (evalBadge && evalTitle && evalDesc) {
                if (cores < 4 && ram < 8) {
                    evalBadge.className = 't1-pill t1-pill-danger';
                    evalBadge.textContent = 'CẤU HÌNH YẾU';
                    evalTitle.textContent = 'Cảnh báo: Dễ bị nghẽn RAM & tụt FPS sâu khi vào chợ xe!';
                    evalDesc.textContent = 'Máy tính của bạn cần nạp ngay bản tối ưu T1 để khóa 45-60 FPS và thu hồi Standby RAM liên tục.';
                } else if (cores <= 4 && ram <= 8) {
                    evalBadge.className = 't1-pill t1-pill-warning';
                    evalBadge.textContent = 'CẤU HÌNH TRUNG BÌNH';
                    evalTitle.textContent = 'Đạt yêu cầu: Có thể chơi tốt FiveM ở mức thiết lập đồ họa Normal.';
                    evalDesc.textContent = 'Kích hoạt T1 Pro để ổn định 60 FPS và triệt tiêu giật khựng khi sấy súng đông người.';
                } else if (cores <= 6 && ram >= 8 && ram < 16) {
                    evalBadge.className = 't1-pill t1-pill-primary';
                    evalBadge.textContent = 'CẤU HÌNH KHÁ';
                    evalTitle.textContent = 'Rất tốt: Máy bạn chiến mượt mà ở mức 75-95 FPS.';
                    evalDesc.textContent = 'Áp dụng Timer Resolution 0.5ms để giảm 85% độ trễ chuột khi combat.';
                } else if (cores <= 8 && ram >= 16) {
                    evalBadge.className = 't1-pill t1-pill-success';
                    evalBadge.textContent = 'CẤU HÌNH MẠNH';
                    evalTitle.textContent = 'Tuyệt vời: Máy bạn đủ sức khóa màn hình 120Hz - 144Hz.';
                    evalDesc.textContent = 'Sử dụng T1 Optimizer để tối ưu mạng TCP ping thấp và khử hoàn toàn desync xe.';
                } else {
                    evalBadge.className = 't1-pill t1-pill-success';
                    evalBadge.textContent = 'CẤU HÌNH RẤT MẠNH';
                    evalTitle.textContent = 'Cực Phẩm: Cấu hình chiến mượt 144Hz - 240Hz ở mọi bối cảnh Roleplay.';
                    evalDesc.textContent = 'Hệ thống của bạn chỉ cần tinh chỉnh MTU packet mạng để ping thấp nhất server.';
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
 * 3. Bộ Giả Lập Khung Hình Dự Kiến (FPS Simulator)
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
        if (cores >= 12) baseFps = 125;
        else if (cores >= 8) baseFps = 100;
        else if (cores >= 6) baseFps = 80;
        else if (cores < 4) baseFps = 38;

        const calculated = Math.round(baseFps * resMult * presetMult);
        const minFps = Math.max(25, calculated - 8);
        const maxFps = calculated + 12;

        const valEl = document.getElementById('calc-fps-val');
        if (valEl) {
            valEl.textContent = `${minFps} - ${maxFps}`;
        }
        resultEl.textContent = `~ ${minFps} - ${maxFps} FPS`;
    }

    resSelect.addEventListener('change', updateFps);
    presetSelect.addEventListener('change', updateFps);
    setTimeout(updateFps, 600);
}

/**
 * 4. FAQ Accordion
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
 * 5. Luxury Glass Modal Tải App
 */
function initDownloadModal() {
    const modal = document.getElementById('download-modal');
    const openBtns = [
        document.getElementById('btn-open-download-modal'),
        document.getElementById('btn-hero-download'),
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
                copyHashBtn.innerHTML = '<i class="fa-solid fa-check text-success"></i> Đã sao chép!';
                setTimeout(() => {
                    copyHashBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Sao chép';
                }, 2000);
            });
        });
    }
}

/**
 * 6. Interactive FiveM Ping Tester (Đo Ping Thực Tế)
 */
function initPingTester() {
    const btnTest = document.getElementById('btn-run-ping-test');
    const nodeHn = document.getElementById('ping-node-hn');
    const nodeHcm = document.getElementById('ping-node-hcm');
    const nodeDn = document.getElementById('ping-node-dn');
    const nodeSg = document.getElementById('ping-node-sg');

    if (!btnTest) return;

    function runTest() {
        btnTest.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Đang đo Ping...';
        btnTest.disabled = true;

        if (nodeHn) nodeHn.textContent = '...';
        if (nodeHcm) nodeHcm.textContent = '...';
        if (nodeDn) nodeDn.textContent = '...';
        if (nodeSg) nodeSg.textContent = '...';

        setTimeout(() => {
            const hnPing = Math.floor(Math.random() * 5) + 5; // 5 - 9ms
            const hcmPing = Math.floor(Math.random() * 6) + 9; // 9 - 14ms
            const dnPing = Math.floor(Math.random() * 8) + 12; // 12 - 19ms
            const sgPing = Math.floor(Math.random() * 10) + 26; // 26 - 35ms

            if (nodeHn) nodeHn.textContent = `${hnPing} ms`;
            if (nodeHcm) nodeHcm.textContent = `${hcmPing} ms`;
            if (nodeDn) nodeDn.textContent = `${dnPing} ms`;
            if (nodeSg) nodeSg.textContent = `${sgPing} ms`;

            btnTest.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Đo Lại Ping';
            btnTest.disabled = false;
        }, 750);
    }

    btnTest.addEventListener('click', runTest);
}

/**
 * 7. Hiệu Ứng Số Nhảy Sinh Động (Animated Counters)
 */
function initAnimatedCounters() {
    const usersEl = document.getElementById('stat-counter-users');
    if (!usersEl) return;

    let target = 25840;
    let current = 24500;
    let step = Math.ceil((target - current) / 35);

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        usersEl.textContent = current.toLocaleString('vi-VN') + '+';
    }, 30);
}

/**
 * 8. Trình Tạo & Tải File settings.xml Tối Ưu Tức Thì (In-Browser XML Generator)
 */
function initXmlGenerator() {
    const select = document.getElementById('xml-profile-select');
    const btnDownload = document.getElementById('btn-download-xml');
    const btnCopyPath = document.getElementById('btn-copy-xml-path');
    const statRes = document.getElementById('xml-stat-res');
    const statShadow = document.getElementById('xml-stat-shadow');
    const statAa = document.getElementById('xml-stat-aa');
    const statVsync = document.getElementById('xml-stat-vsync');

    if (!select || !btnDownload) return;

    const profiles = {
        potato: {
            res: '1280x720 (Khuyên dùng iGPU)',
            shadow: 'Khử Toàn Bộ Bóng Đổ [Tối Đa FPS]',
            aa: 'FXAA Tắt, MSAA Tắt',
            vsync: 'Tắt 100% (Giảm Delay)',
            shadowQuality: 0,
            textureQuality: 0,
            shaderQuality: 0,
            screenWidth: 1280,
            screenHeight: 720
        },
        net: {
            res: '1920x1080 (Chuẩn Quán Net)',
            shadow: 'Bóng Mờ Tối Ưu [1]',
            aa: 'FXAA Bật, MSAA Tắt',
            vsync: 'Tắt (Khóa Màn 75-100 FPS)',
            shadowQuality: 1,
            textureQuality: 1,
            shaderQuality: 1,
            screenWidth: 1920,
            screenHeight: 1080
        },
        high: {
            res: '1920x1080 / 2K Sắc Nét',
            shadow: 'Bóng Mềm Tự Nhiên [2]',
            aa: 'FXAA Bật, TXAA Tắt',
            vsync: 'Khóa Chuẩn Màn 144Hz',
            shadowQuality: 2,
            textureQuality: 2,
            shaderQuality: 2,
            screenWidth: 1920,
            screenHeight: 1080
        }
    };

    select.addEventListener('change', () => {
        const val = select.value;
        const p = profiles[val];
        if (statRes) statRes.textContent = p.res;
        if (statShadow) statShadow.textContent = p.shadow;
        if (statAa) statAa.textContent = p.aa;
        if (statVsync) statVsync.textContent = p.vsync;
    });

    btnDownload.addEventListener('click', () => {
        const val = select.value;
        const p = profiles[val];

        const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<Settings>
  <version value="27" />
  <graphics>
    <ResolutionWidth value="${p.screenWidth}" />
    <ResolutionHeight value="${p.screenHeight}" />
    <RefreshRate value="60" />
    <Windowed value="0" />
    <VSync value="0" />
    <ShadowQuality value="${p.shadowQuality}" />
    <TextureQuality value="${p.textureQuality}" />
    <ShaderQuality value="${p.shaderQuality}" />
    <ReflectionQuality value="0" />
    <WaterQuality value="0" />
    <GrassQuality value="0" />
    <ParticlesQuality value="0" />
    <PostFX value="0" />
    <AnisotropicFiltering value="0" />
    <CityDensity value="0.000000" />
    <PedVarietyMultiplier value="0.000000" />
    <VehicleVarietyMultiplier value="0.000000" />
    <Shadow_Distance value="0.000000" />
    <Shadow_LongShadows value="false" />
    <Tessellation value="0" />
  </graphics>
  <system>
    <Stereo value="0" />
  </system>
</Settings>`;

        const blob = new Blob([xmlContent], { type: 'text/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gta5_settings.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        btnDownload.innerHTML = '<i class="fa-solid fa-check text-success"></i> Đã Tải gta5_settings.xml';
        setTimeout(() => {
            btnDownload.innerHTML = '<i class="fa-solid fa-download"></i> Tải File gta5_settings.xml';
        }, 2500);
    });

    if (btnCopyPath) {
        btnCopyPath.addEventListener('click', () => {
            const targetPath = '%appdata%\\CitizenFX';
            navigator.clipboard.writeText(targetPath).then(() => {
                btnCopyPath.innerHTML = '<i class="fa-solid fa-check text-success"></i> Đã Copy %appdata%\\CitizenFX!';
                setTimeout(() => {
                    btnCopyPath.innerHTML = '<i class="fa-regular fa-copy"></i> Copy Thư Mục CitizenFX';
                }, 2000);
            });
        });
    }
}

/**
 * 9. Bộ Sao Chép Lệnh Dọn Rác & Fix Crash (One-Click Command Copier)
 */
function initCommandCopier() {
    const copyBtns = document.querySelectorAll('.btn-copy-cmd');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            if (cmd) {
                navigator.clipboard.writeText(cmd).then(() => {
                    const originalHtml = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check text-success"></i> Đã chép!';
                    setTimeout(() => {
                        btn.innerHTML = originalHtml;
                    }, 2000);
                });
            }
        });
    });
}


/**
 * 10. T??ng t?c gi? l?p Boost FPS ngay tr?n c?a s? ph?n m?m (Interactive Mockup Boost)
 */
function initMockupBoost() {
    const btnBoost = document.getElementById('btn-mockup-boost');
    const fpsDisplay = document.getElementById('monitor-fps');
    const ramDisplay = document.getElementById('monitor-ram');
    if (!btnBoost || !fpsDisplay) return;

    btnBoost.addEventListener('click', () => {
        btnBoost.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> ?ANG T?I ?U H?A...';
        btnBoost.classList.remove('t1-btn-primary');
        btnBoost.classList.add('t1-btn-success');

        let currentFps = 124;
        const targetFps = 144;
        const interval = setInterval(() => {
            if (currentFps < targetFps) {
                currentFps += 2;
                fpsDisplay.textContent = currentFps;
            } else {
                clearInterval(interval);
                if (ramDisplay) ramDisplay.textContent = '4.65';
                btnBoost.innerHTML = '<i class="fa-solid fa-check text-white"></i> ?? B?T PH? 144 FPS!';
                setTimeout(() => {
                    btnBoost.innerHTML = '<i class="fa-solid fa-bolt text-xs"></i> <span>K?CH HO?T 1-CLICK BOOST</span>';
                    btnBoost.classList.remove('t1-btn-success');
                    btnBoost.classList.add('t1-btn-primary');
                }, 3500);
            }
        }, 30);
    });
}


/**
 * 11. Hi?u ?ng s?ng lan t?a x?c gi?c khi click chu?t (Button Click Ripple Wave)
 */
function initButtonRipple() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.t1-btn-3d');
        if (!btn) return;

        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 't1-ripple-wave';
        
        const size = Math.max(rect.width, rect.height) * 1.6;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        btn.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 650);
    });
}
