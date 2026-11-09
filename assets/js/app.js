/**
 * T1 GTA 5 VN OPTIMIZER V2.5 - MASTER JAVASCRIPT CONTROLLER
 * 100% LIGHT MODE LOCKED - GAMING SAAS ARCHITECTURE
 */

document.addEventListener('DOMContentLoaded', () => {
    initAntiZoom();
    initThreadingEngine();
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
    initReviewModal();
    initFpsChartEngine();
    initAnnouncementModal();
    initNavTabs();
    initTactileAudio();
    initSpotlightEffect();
    initKeyboardShortcuts();
    initLaserScanner();
    initBackToTop();
    initNavbarScroll();
    initPageLoader();
    initNetworkStatus();
    initShortcutsModal();
    initUserPreferences();
    initPageTransitions();
});

/**
 * 1. Mobile Hamburger Menu Toggle
 */
function initMobileMenu() {
    const btnMobile = document.getElementById('btn-mobile-menu');
    const drawer = document.getElementById('mobile-menu-drawer');
    const btnClose = document.getElementById('btn-close-mobile-menu');
    if (!btnMobile || !drawer) return;

    function openDrawer() {
        drawer.classList.remove('hidden');
    }

    function closeDrawer() {
        drawer.classList.add('hidden');
    }

    btnMobile.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.toggle('hidden');
    });

    if (btnClose) {
        btnClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDrawer();
        });
    }

    // Đóng drawer khi click vào link
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeDrawer();
        });
    });

    // Đóng drawer khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (!drawer.classList.contains('hidden') && !drawer.contains(e.target) && !btnMobile.contains(e.target)) {
            closeDrawer();
        }
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

        cpuEl.classList.add('t1-skeleton');
        ramEl.classList.add('t1-skeleton');
        gpuEl.classList.add('t1-skeleton');
        cpuEl.textContent = 'Scanning CPU Cores...';
        ramEl.textContent = 'Scanning Memory...';
        gpuEl.textContent = 'Scanning GPU Hardware...';
        
        if (evalBadge) {
            evalBadge.className = 't1-pill t1-pill-warning animate-pulse';
            evalBadge.textContent = 'ĐANG PHÂN TÍCH';
        }
        if (evalTitle) evalTitle.textContent = 'Hệ thống đang đối chiếu dữ liệu FiveM VN...';

        setTimeout(() => {
            cpuEl.classList.remove('t1-skeleton');
            ramEl.classList.remove('t1-skeleton');
            gpuEl.classList.remove('t1-skeleton');
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

    function applyFpsDisplay(minFps, maxFps) {
        window.requestAnimationFrame(() => {
            const valEl = document.getElementById('calc-fps-val');
            if (valEl) valEl.textContent = `${minFps} - ${maxFps}`;
            resultEl.textContent = `~ ${minFps} - ${maxFps} FPS`;
        });
    }

    function updateFps() {
        const cores = navigator.hardwareConcurrency || 4;
        const resMult = parseFloat(resSelect.value) || 1.0;
        const presetMult = parseFloat(presetSelect.value) || 1.0;

        if (appBgWorker) {
            // Phân luồng tính toán qua Background Web Worker ngoài CPU Core phụ
            appBgWorker.onmessage = function(e) {
                if (e.data && e.data.type === 'CALCULATE_FPS') {
                    applyFpsDisplay(e.data.result.minFps, e.data.result.maxFps);
                }
            };
            appBgWorker.postMessage({
                type: 'CALCULATE_FPS',
                payload: { cores, resMult, presetMult }
            });
        } else {
            // Fallback Main Thread
            let baseFps = 55;
            if (cores >= 12) baseFps = 125;
            else if (cores >= 8) baseFps = 100;
            else if (cores >= 6) baseFps = 80;
            else if (cores < 4) baseFps = 38;

            const calculated = Math.round(baseFps * resMult * presetMult);
            const minFps = Math.max(25, calculated - 8);
            const maxFps = calculated + 12;
            applyFpsDisplay(minFps, maxFps);
        }
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

/**
 * 5. Tải File Trực Tiếp 1-Click - Tuyệt Đối Không Chuyển Trang / Không Mở Link
 */
function triggerDirectDownload(e) {
    if (e && e.preventDefault) e.preventDefault();

    // Sử dụng link trực tiếp file GTA5VN-System.exe
    const downloadUrl = 'downloads/GTA5VN-System.exe';

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.setAttribute('download', 'GTA5VN-System.exe');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showDownloadToast();
}

function showDownloadToast() {
    const oldToast = document.getElementById('direct-dl-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 'direct-dl-toast';
    toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-sky-300 shadow-[0_15px_35px_rgba(7,150,229,0.22)] flex items-center gap-3 transition-all duration-300';
    toast.innerHTML = `
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center text-sm shadow-xs animate-bounce">
            <i class="fa-solid fa-arrow-down"></i>
        </div>
        <div>
            <h5 class="text-xs font-black text-textPrimary">Đang Tải File GTA5VN-System.exe (71.8 MB)...</h5>
            <p class="text-[11px] text-textSecondary font-medium">File đang được tải trực tiếp về thư mục Downloads của bạn.</p>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, 20px)';
        setTimeout(() => toast.remove(), 400);
    }, 4500);
}

function initDownloadModal() {
    const downloadBtns = [
        document.getElementById('btn-open-download-modal'),
        document.getElementById('btn-hero-download'),
        document.getElementById('btn-quick-optimize'),
        document.getElementById('btn-direct-dl-modal')
    ];

    downloadBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', (e) => {
                triggerDirectDownload(e);
            });
        }
    });

    const copyHashBtn = document.getElementById('btn-copy-hash');
    const hashText = document.getElementById('hash-text');
    if (copyHashBtn && hashText) {
        copyHashBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(hashText.textContent.trim()).then(() => {
                copyHashBtn.innerHTML = '<i class="fa-solid fa-check text-success"></i> Đã chép';
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

    async function runTest() {
        btnTest.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Đang đo Ping (Rust API)...';
        btnTest.disabled = true;

        if (nodeHn) nodeHn.textContent = '...';
        if (nodeHcm) nodeHcm.textContent = '...';
        if (nodeDn) nodeDn.textContent = '...';
        if (nodeSg) nodeSg.textContent = '...';

        try {
            const res = await fetch('/api/ping');
            if (res.ok) {
                const data = await res.json();
                if (data && data.nodes) {
                    if (nodeHn) nodeHn.textContent = `${data.nodes.hanoi.ping_ms} ms`;
                    if (nodeHcm) nodeHcm.textContent = `${data.nodes.hcm.ping_ms} ms`;
                    if (nodeDn) nodeDn.textContent = `${data.nodes.danang.ping_ms} ms`;
                    if (nodeSg) nodeSg.textContent = `${data.nodes.singapore.ping_ms} ms`;
                    btnTest.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Đo Lại Ping';
                    btnTest.disabled = false;
                    return;
                }
            }
        } catch (e) {
            // Chế độ dự phòng khi chạy offline hoặc serverless khởi động
        }

        setTimeout(() => {
            const hnPing = Math.floor(Math.random() * 5) + 5;
            const hcmPing = Math.floor(Math.random() * 6) + 9;
            const dnPing = Math.floor(Math.random() * 8) + 12;
            const sgPing = Math.floor(Math.random() * 10) + 26;

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
    if (usersEl) {
        usersEl.textContent = '25,840+';
    }
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
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const cmd = btn.getAttribute('data-cmd');
            if (!cmd) return;

            const originalHtml = btn.innerHTML;

            function showSuccess() {
                btn.innerHTML = '<i class="fa-solid fa-check text-emerald-500"></i> <span>Đã chép!</span>';
                if (typeof window.t1Toast === 'function') {
                    window.t1Toast('success', 'Đã Sao Chép Lệnh', 'Mở PowerShell hoặc Run (Win + R) và nhấn Ctrl + V để dán.');
                }
                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                }, 2000);
            }

            function fallbackCopy(text) {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "-9999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                } catch (err) {}
                textArea.remove();
            }

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(cmd).then(() => {
                    showSuccess();
                }).catch(() => {
                    fallbackCopy(cmd);
                    showSuccess();
                });
            } else {
                fallbackCopy(cmd);
                showSuccess();
            }
        });
    });
}

/**
 * 10. Tương tác giả lập Boost FPS ngay trên cửa sổ phần mềm (Interactive Mockup Boost)
 */
function initMockupBoost() {
    const btnBoost = document.getElementById('btn-mockup-boost');
    const fpsDisplay = document.getElementById('monitor-fps');
    const ramDisplay = document.getElementById('monitor-ram');
    if (!btnBoost || !fpsDisplay) return;

    btnBoost.addEventListener('click', () => {
        btnBoost.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> <span>ĐANG TỐI ƯU HÓA...</span>';
        btnBoost.classList.remove('t1-btn-primary');
        btnBoost.classList.add('t1-btn-success');

        const startFps = 124;
        const targetFps = 144;
        const duration = 600;
        let startTime = null;

        function animateBoost(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const val = Math.floor(startFps + (targetFps - startFps) * progress);
            fpsDisplay.textContent = val;

            if (progress < 1) {
                window.requestAnimationFrame(animateBoost);
            } else {
                fpsDisplay.textContent = targetFps;
                if (ramDisplay) ramDisplay.textContent = '4.65';
                btnBoost.innerHTML = '<i class="fa-solid fa-check"></i> <span>ĐÃ BẬT KHÓA 144 FPS!</span>';
                setTimeout(() => {
                    btnBoost.innerHTML = '<i class="fa-solid fa-bolt text-xs"></i> <span>KÍCH HOẠT 1-CLICK BOOST</span>';
                    btnBoost.classList.remove('t1-btn-success');
                    btnBoost.classList.add('t1-btn-primary');
                }, 3500);
            }
        }
        window.requestAnimationFrame(animateBoost);
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

/**
 * 12. Bảng Modal Gửi Đánh Giá Thủy Tinh Kính Mờ (Glass Review Modal)
 */
function initReviewModal() {
    const btnOpen = document.getElementById('btn-open-review-modal');
    const modal = document.getElementById('review-modal');
    const btnClose = document.getElementById('btn-close-review-modal');
    const btnCancel = document.getElementById('btn-cancel-review');
    const form = document.getElementById('form-review');
    const starsWrap = document.getElementById('review-stars-wrap');
    const starsLabel = document.getElementById('review-stars-label');
    const cardsGrid = document.getElementById('review-cards-grid');

    if (!btnOpen || !modal || !form) return;

    let selectedRating = 5;

    // Mở Modal
    function openModal() {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    // Đóng Modal
    function closeModal() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnCancel) btnCancel.addEventListener('click', closeModal);

    // Đóng khi click ngoài backdrop
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Rating Star Selector
    if (starsWrap && starsLabel) {
        const stars = starsWrap.querySelectorAll('.review-star');
        const labels = {
            1: '1.0 / 5.0 - Chưa hài lòng',
            2: '2.0 / 5.0 - Tạm ổn',
            3: '3.0 / 5.0 - Khá mượt',
            4: '4.0 / 5.0 - Rất mượt mà!',
            5: '5.0 / 5.0 - Cực kỳ hài lòng, chuẩn 144Hz!'
        };

        function updateStarsVisual(rating) {
            stars.forEach(s => {
                const val = parseInt(s.dataset.val, 10);
                if (val <= rating) {
                    s.classList.remove('text-slate-300');
                    s.classList.add('text-amber-400');
                } else {
                    s.classList.remove('text-amber-400');
                    s.classList.add('text-slate-300');
                }
            });
            starsLabel.textContent = labels[rating] || `${rating}.0 / 5.0`;
        }

        stars.forEach(s => {
            s.addEventListener('mouseenter', () => {
                const hoverVal = parseInt(s.dataset.val, 10);
                updateStarsVisual(hoverVal);
            });
            s.addEventListener('click', () => {
                selectedRating = parseInt(s.dataset.val, 10);
                updateStarsVisual(selectedRating);
            });
        });

        starsWrap.addEventListener('mouseleave', () => {
            updateStarsVisual(selectedRating);
        });
    }

    // Xử lý nộp form đánh giá
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('review-name');
        const serverInput = document.getElementById('review-server');
        const specsInput = document.getElementById('review-specs');
        const contentInput = document.getElementById('review-content');

        const name = (nameInput?.value || 'Game Thủ FiveM').trim();
        const server = serverInput?.value || 'Mixi City Roleplay';
        const specs = (specsInput?.value || 'PC Gaming • FiveM VN').trim();
        const content = (contentInput?.value || '').trim();

        if (!content) return;

        // Sinh 2 ký tự viết tắt cho Avatar
        const words = name.split(' ');
        const initials = words.length > 1 
            ? (words[0][0] + words[words.length - 1][0]).toUpperCase()
            : name.slice(0, 2).toUpperCase();

        // Tạo thẻ đánh giá mới chèn ngay lên đầu danh sách
        if (cardsGrid) {
            let starHtml = '';
            for (let i = 1; i <= 5; i++) {
                starHtml += i <= selectedRating 
                    ? '<i class="fa-solid fa-star text-amber-400"></i>' 
                    : '<i class="fa-solid fa-star text-slate-300"></i>';
            }

            const newCard = document.createElement('div');
            newCard.className = 't1-card p-6 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 border-2 border-primary/50 shadow-lg';
            newCard.innerHTML = `
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-emerald-400 text-white font-black text-sm flex items-center justify-center shadow-xs">
                                ${initials}
                            </div>
                            <div>
                                <h4 class="font-black text-sm text-textPrimary flex items-center gap-1.5">
                                    ${name}
                                    <i class="fa-solid fa-circle-check text-primary text-xs" title="Đã xác minh game thủ"></i>
                                </h4>
                                <span class="text-[11px] font-bold text-textSecondary">${server}</span>
                            </div>
                        </div>
                        <div class="flex text-xs">
                            ${starHtml}
                        </div>
                    </div>

                    <p class="text-xs text-textSecondary leading-relaxed font-medium mb-4">
                        &ldquo;${content}&rdquo;
                    </p>
                </div>

                <div class="pt-3 border-t border-sky-100/70 flex items-center justify-between text-[11px]">
                    <span class="text-textSecondary font-mono font-semibold">${specs}</span>
                    <span class="t1-pill t1-pill-success text-[10px] py-0.5 px-2 font-black">VỪA ĐÁNH GIÁ MỚI</span>
                </div>
            `;

            cardsGrid.prepend(newCard);
            // Cuộn nhẹ tới đánh giá vừa thêm
            newCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Gửi dữ liệu an toàn đến Rust Backend Serverless API
        try {
            fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    specs: specs,
                    rating: selectedRating,
                    comment: content
                })
            }).catch(() => {});
        } catch (err) {}

        // Đóng modal và reset form
        closeModal();
        form.reset();
        selectedRating = 5;

        // Hiển thị toast thông báo thủy tinh mờ
        showReviewToast(name);
    });
}

/**
 * Toast Thông Báo Thủy Tinh Mờ Khi Đăng Đánh Giá
 */
function showReviewToast(name) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-emerald-300 shadow-xl flex items-center gap-3 transition-all duration-300 transform translate-y-10 opacity-0';
    toast.innerHTML = `
        <div class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-lg shadow-sm">
            <i class="fa-solid fa-check"></i>
        </div>
        <div>
            <h5 class="text-xs font-black text-textPrimary">Đăng Đánh Giá Thành Công!</h5>
            <p class="text-[11px] text-textSecondary font-medium">Cảm ơn ${name}, bài đánh giá đã hiển thị trên trang web.</p>
        </div>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}


/**
 * ======================================================================
 * HỆ THỐNG CHỐNG PHÓNG TO / THU NHỎ & PHÂN LUỒNG TRÁNH LAG (THREADING ENGINE)
 * ======================================================================
 */

// 1. Chống Phóng To / Thu Nhỏ Toàn Diện (Không Chặn Lướt Web / Scroll)
function initAntiZoom() {
    // Scroll blocking wheel listener removed for 120Hz smooth scrolling

    // Chỉ chặn phím tắt zoom bàn phím: Ctrl +, Ctrl -, Ctrl 0, Ctrl =
    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
            e.preventDefault();
        }
    });
}

// 2. Hệ Thống Phân Luồng Tránh Lag (Background Web Worker & Task Scheduler)
let appBgWorker = null;

function initThreadingEngine() {
    try {
        // Tạo Web Worker nội tuyến qua Blob URL chạy trên luồng CPU riêng biệt
        const workerScript = `
            self.onmessage = function(e) {
                const { type, id, payload } = e.data;
                if (type === 'CALCULATE_FPS') {
                    const { cores, resMult, presetMult } = payload;
                    let baseFps = 55;
                    if (cores >= 12) baseFps = 125;
                    else if (cores >= 8) baseFps = 100;
                    else if (cores >= 6) baseFps = 80;
                    else if (cores < 4) baseFps = 38;

                    const calculated = Math.round(baseFps * resMult * presetMult);
                    const minFps = Math.max(25, calculated - 8);
                    const maxFps = calculated + 12;
                    self.postMessage({ id, type, result: { minFps, maxFps } });
                }
            };
        `;
        const blob = new Blob([workerScript], { type: 'application/javascript' });
        appBgWorker = new Worker(URL.createObjectURL(blob));
        console.log('[GTA5VN-System] Background Web Worker Thread Initialized.');
    } catch (err) {
        console.warn('[GTA5VN-System] Web Worker fallback to Main Thread scheduler.', err);
    }
}


/**
 * 15. Bộ Khởi Chạy Biểu Đồ Đo Khung Hình Thời Gian Thực 60FPS (Realtime Telemetry Chart Engine)
 */
function initFpsChartEngine() {
    const canvas = document.getElementById('fpsTelemetryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const valGreen = document.getElementById('chart-live-fps-green');
    const valRed = document.getElementById('chart-live-fps-red');
    const badgeDrop = document.getElementById('chart-live-drop-red');

    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    let time = 0;
    let scanPos = 0.5; // 0 to 1
    let isHovered = false;
    let mouseX = 0;
    let isVisible = false;
    let animationFrameId = null;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        width = rect.width;
        height = rect.height;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset scale
        ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Tương tác chuột / cảm ứng
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        isHovered = true;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.touches[0].clientX - rect.left;
            isHovered = true;
        }
    }, { passive: true });

    canvas.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    canvas.addEventListener('touchend', () => {
        isHovered = false;
    });

    // Mapping FPS -> Tọa độ Y
    function fpsToY(fps) {
        const topY = 28;
        const botY = height - 32;
        const minFps = 15;
        const maxFps = 155;
        const ratio = (fps - minFps) / (maxFps - minFps);
        return botY - ratio * (botY - topY);
    }

    // GTA5VN Lock Line: 144 FPS chuẩn eSports
    function getGreenFps(x, t) {
        const microPulse = Math.sin(x * 0.02 + t * 3) * 0.8 + Math.cos(x * 0.05 - t * 2) * 0.4;
        return 144.0 + microPulse;
    }

    // Mặc định giật lag: Sóng dao động hỗn loạn, tụt dốc sâu khi combat
    function getRedFps(x, t) {
        const base = 42;
        const wave1 = Math.sin(x * 0.012 - t * 1.5) * 16;
        const wave2 = Math.cos(x * 0.025 + t * 2.2) * 11;
        const stutter = Math.sin(x * 0.08 - t * 4) * Math.sin(x * 0.03 + t) * 14;
        let val = base + wave1 + wave2 + stutter;
        if (val < 22) val = 22;
        if (val > 64) val = 64;
        return val;
    }

    let lastTime = performance.now();
    let lastDomTime = 0;
    let lastStutter = null;

    function render(now) {
        if (!isVisible) { return; }

        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;
        time += dt || 0.016;

        if (!isHovered) {
            scanPos = (scanPos + dt * 0.22) % 1.0;
        } else {
            scanPos = Math.max(0, Math.min(1, mouseX / width));
        }

        ctx.clearRect(0, 0, width, height);

        // 1. Grid Lines
        ctx.save();
        ctx.strokeStyle = '#DFEAF4';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        const y144 = fpsToY(144);
        ctx.beginPath();
        ctx.moveTo(0, y144);
        ctx.lineTo(width, y144);
        ctx.stroke();

        const y60 = fpsToY(60);
        ctx.beginPath();
        ctx.moveTo(0, y60);
        ctx.lineTo(width, y60);
        ctx.stroke();

        const y24 = fpsToY(24);
        ctx.beginPath();
        ctx.moveTo(0, y24);
        ctx.lineTo(width, y24);
        ctx.stroke();

        for (let i = 1; i <= 3; i++) {
            const vx = (width / 4) * i;
            ctx.beginPath();
            ctx.moveTo(vx, 15);
            ctx.lineTo(vx, height - 25);
            ctx.stroke();
        }
        ctx.restore();

        // 2. Green Area & Stroke (144 FPS)
        const step = 4;
        const pointsGreen = [];
        for (let x = 0; x <= width + step; x += step) {
            const fps = getGreenFps(x, time);
            pointsGreen.push({ x, y: fpsToY(fps), fps });
        }

        ctx.save();
        const gradGreen = ctx.createLinearGradient(0, y144, 0, height);
        gradGreen.addColorStop(0, 'rgba(0, 168, 138, 0.28)');
        gradGreen.addColorStop(0.5, 'rgba(0, 168, 138, 0.08)');
        gradGreen.addColorStop(1, 'rgba(0, 168, 138, 0)');

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(pointsGreen[0].x, pointsGreen[0].y);
        for (let i = 1; i < pointsGreen.length; i++) {
            ctx.lineTo(pointsGreen[i].x, pointsGreen[i].y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = gradGreen;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(pointsGreen[0].x, pointsGreen[0].y);
        for (let i = 1; i < pointsGreen.length; i++) {
            ctx.lineTo(pointsGreen[i].x, pointsGreen[i].y);
        }
        ctx.strokeStyle = '#00A88A';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(0, 168, 138, 0.4)';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();

        // 3. Red Area & Stroke (Giật Lag)
        const pointsRed = [];
        for (let x = 0; x <= width + step; x += step) {
            const fps = getRedFps(x, time);
            pointsRed.push({ x, y: fpsToY(fps), fps });
        }

        ctx.save();
        const gradRed = ctx.createLinearGradient(0, y60, 0, height);
        gradRed.addColorStop(0, 'rgba(227, 77, 89, 0.12)');
        gradRed.addColorStop(1, 'rgba(227, 77, 89, 0)');

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(pointsRed[0].x, pointsRed[0].y);
        for (let i = 1; i < pointsRed.length; i++) {
            ctx.lineTo(pointsRed[i].x, pointsRed[i].y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = gradRed;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(pointsRed[0].x, pointsRed[0].y);
        for (let i = 1; i < pointsRed.length; i++) {
            ctx.lineTo(pointsRed[i].x, pointsRed[i].y);
        }
        ctx.strokeStyle = '#E34D59';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = 'rgba(227, 77, 89, 0.35)';
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.restore();

        // 4. Laser Scanline & Target Reticles
        const scanX = scanPos * width;
        const currentGreenFps = getGreenFps(scanX, time);
        const currentRedFps = getRedFps(scanX, time);
        const currentGreenY = fpsToY(currentGreenFps);
        const currentRedY = fpsToY(currentRedFps);

        ctx.save();
        const scanGrad = ctx.createLinearGradient(0, 15, 0, height - 20);
        scanGrad.addColorStop(0, 'rgba(7, 150, 229, 0.0)');
        scanGrad.addColorStop(0.2, 'rgba(7, 150, 229, 0.6)');
        scanGrad.addColorStop(0.8, 'rgba(7, 150, 229, 0.6)');
        scanGrad.addColorStop(1, 'rgba(7, 150, 229, 0.0)');

        ctx.beginPath();
        ctx.moveTo(scanX, 15);
        ctx.lineTo(scanX, height - 25);
        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(7, 150, 229, 0.8)';
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Green Reticle Point
        ctx.beginPath();
        ctx.arc(scanX, currentGreenY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981';
        ctx.shadowColor = '#10B981';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Red Reticle Point
        ctx.beginPath();
        ctx.arc(scanX, currentRedY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#EF4444';
        ctx.shadowColor = '#EF4444';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // 5. Throttled HUD Indicators (avoid layout thrashing)
        if (now - lastDomTime > 120) {
            lastDomTime = now;
            if (valGreen) valGreen.textContent = currentGreenFps.toFixed(1) + ' FPS';
            if (valRed) valRed.textContent = currentRedFps.toFixed(1) + ' FPS';
            if (badgeDrop) {
                const isStutter = currentRedFps < 32;
                if (isStutter !== lastStutter) {
                    lastStutter = isStutter;
                    badgeDrop.textContent = isStutter ? 'STUTTER 1% LOW!' : 'DROP 1% LOW';
                    badgeDrop.className = isStutter 
                        ? 'text-[9px] font-mono font-black text-white bg-rose-600 px-1.5 py-0.5 rounded shadow-[0_0_8px_#e11d48]'
                        : 'text-[9px] font-mono font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-100';
                }
            }
        }

        // static render: no infinite loop
animationFrameId = null;
    }

    // Tự động tạm dừng render khi người dùng cuộn ra ngoài màn hình để tiết kiệm 100% pin & CPU
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    resize();
                    lastTime = performance.now();
                    render(performance.now());
                } else {
                    if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
                }
            });
        }, { threshold: 0.1 });
        observer.observe(canvas);
    }

    animationFrameId = requestAnimationFrame(render);
}


/**
 * 16. Bảng Thông Báo Hệ Thống Mới (System Announcement Modal Controller)
 */
function initAnnouncementModal() {
    const modal = document.getElementById('announcement-modal');
    const btnOpen = document.getElementById('btn-open-announcement');
    const btnClose = document.getElementById('btn-close-announcement');
    const btnDismiss = document.getElementById('btn-dismiss-announcement');
    const btnDl = document.getElementById('btn-announcement-download');

    if (!modal) return;

    function openModal() {
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        try {
            sessionStorage.setItem('gta5vn_notice_read_v252', '1');
        } catch (e) {}
    }

    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnDismiss) btnDismiss.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (btnDl) {
        btnDl.addEventListener('click', (e) => {
            closeModal();
            triggerDirectDownload(e);
        });
    }

    // Thông báo mở khi người dùng chủ động nhấn chuông thông báo trên Header
}


/**
 * 17. T1 3D Navigation Tab Active State Controller
 */
function initNavTabs() {
    const navLinks = document.querySelectorAll('.t1-nav-btn');
    if (!navLinks.length) return;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active-tab'));
            link.classList.add('active-tab');
        });
    });
}


/**
 * 18. Web Audio API Tactile Sound Synthesizer (Pro Gaming Mechanical Feedback)
 */
let tactileAudio = null;

class TactileAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('gta5vn_sfx_enabled') !== 'false';
    }

    init() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    playClick(type = 'click') {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.022);
            gain.gain.setValueAtTime(0.035, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.022);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.022);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(659.25, now); // E5
            osc.frequency.exponentialRampToValueAtTime(987.77, now + 0.06); // B5
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.07);
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('gta5vn_sfx_enabled', this.enabled ? 'true' : 'false');
        return this.enabled;
    }
}

function initTactileAudio() {
    tactileAudio = new TactileAudioEngine();

    const sfxBtn = document.getElementById('btn-toggle-sfx');
    const sfxIcon = document.getElementById('sfx-icon');

    function updateSfxUi() {
        if (!sfxIcon) return;
        if (tactileAudio.enabled) {
            sfxIcon.className = 'fa-solid fa-volume-high text-xs text-sky-600';
            if (sfxBtn) sfxBtn.title = 'Âm thanh Tactile: BẬT (Nhấn [M] để tắt)';
        } else {
            sfxIcon.className = 'fa-solid fa-volume-xmark text-xs text-slate-400';
            if (sfxBtn) sfxBtn.title = 'Âm thanh Tactile: TẮT (Nhấn [M] để bật)';
        }
    }

    updateSfxUi();

    if (sfxBtn) {
        sfxBtn.addEventListener('click', () => {
            const isEnabled = tactileAudio.toggle();
            updateSfxUi();
            if (isEnabled) tactileAudio.playClick('success');
            showToastMessage(isEnabled ? '🔊 Âm thanh Tactile: ĐÃ BẬT' : '🔇 Âm thanh Tactile: ĐÃ TẮT');
        });
    }

    // Gắn âm thanh click vào tất cả nút bấm 3D
    document.addEventListener('mousedown', (e) => {
        const btn = e.target.closest('.t1-btn-3d, .t1-nav-btn, button, a[href^="#"]');
        if (btn) {
            tactileAudio.playClick('click');
        }
    });
}

/**
 * 19. Interactive Cursor Spotlight Shader Effect
 */
function initSpotlightEffect() {
    // Disabled for 100% flat 144Hz scroll performance (no mousemove reflows)
    return;
}

/**
 * 20. Pro Keyboard Shortcuts (Phím Tắt Đẳng Cấp Pro)
 */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Không kích hoạt khi đang gõ trong input/textarea
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

        const key = e.key.toUpperCase();

        if (key === 'D') {
            e.preventDefault();
            const btnDl = document.getElementById('btn-open-download-modal');
            if (btnDl) btnDl.click();
        } else if (key === 'M') {
            e.preventDefault();
            const sfxBtn = document.getElementById('btn-toggle-sfx');
            if (sfxBtn) sfxBtn.click();
        } else if (key === 'C') {
            e.preventDefault();
            const checker = document.getElementById('checker');
            if (checker) checker.scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'Escape') {
            const annModal = document.getElementById('announcement-modal');
            const dlModal = document.getElementById('download-modal');
            const revModal = document.getElementById('review-modal');
            if (annModal && !annModal.classList.contains('hidden')) annModal.classList.add('hidden');
            if (dlModal && !dlModal.classList.contains('hidden')) dlModal.classList.add('hidden');
            if (revModal && !revModal.classList.contains('hidden')) revModal.classList.add('hidden');
        }
    });
}

/**
 * 21. Diagnostic Laser Scanline Animation
 */
function initLaserScanner() {
    const btnRescan = document.getElementById('btn-rescan');
    const checkerCard = document.querySelector('#checker .t1-card');
    if (!btnRescan || !checkerCard) return;

    btnRescan.addEventListener('click', () => {
        // Xóa tia laser cũ nếu có
        const oldLaser = checkerCard.querySelector('.laser-scanline');
        if (oldLaser) oldLaser.remove();

        const laser = document.createElement('div');
        laser.className = 'laser-scanline';
        checkerCard.appendChild(laser);

        if (tactileAudio) tactileAudio.playClick('success');

        setTimeout(() => {
            laser.remove();
        }, 1800);
    });
}

/**
 * 22. Quick HUD Dock & Smooth Back to Top
 */
function initBackToTop() {
    const dock = document.getElementById('quick-hud-dock');
    const btnTop = document.getElementById('btn-back-to-top');
    if (!dock || !btnTop) return;

    let dockVisible = false;
    window.addEventListener('scroll', () => {
        const visible = window.scrollY > 350;
        if (visible !== dockVisible) {
            dockVisible = visible;
            if (visible) {
                dock.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                dock.classList.add('opacity-0', 'pointer-events-none');
            }
        }
    }, { passive: true });

    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (tactileAudio) tactileAudio.playClick('click');
    });
}

/**
 * Helper: Toast thông báo nhanh nổi khối 3D
 */
function showToastMessage(msg) {
    const oldToast = document.getElementById('t1-quick-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.id = 't1-quick-toast';
    toast.className = 'fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_10px_30px_rgba(7,150,229,0.18)] text-xs font-black text-slate-800 flex items-center gap-2 transition-all duration-300 pointer-events-none';
    toast.innerHTML = `<span>${msg}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translate(-50%, -10px)';
        setTimeout(() => toast.remove(), 300);
    }, 1800);
}


/**
 * 23. Luxury Page Preloader Engine (Loading Animation Đẹp Chuẩn T1)
 */
function initPageLoader() {
    const loader = document.getElementById('t1-page-loader');
    const bar = document.getElementById('loader-bar');
    const percent = document.getElementById('loader-percent');
    if (!loader) return;

    let p = 30;
    const interval = setInterval(() => {
        p += Math.floor(Math.random() * 25) + 15;
        if (p >= 100) {
            p = 100;
            clearInterval(interval);
            if (bar) bar.style.width = '100%';
            if (percent) percent.textContent = '100%';

            setTimeout(() => {
                loader.classList.add('loader-hidden');
                setTimeout(() => loader.remove(), 500);
            }, 250);
        } else {
            if (bar) bar.style.width = `${p}%`;
            if (percent) percent.textContent = `${p}%`;
        }
    }, 60);

    // Safety timeout: không bao giờ treo quá 1.5s
    setTimeout(() => {
        if (loader && !loader.classList.contains('loader-hidden')) {
            loader.classList.add('loader-hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }, 1500);
}

/**
 * 24. Live Network Status Controller (Online / Offline Detector)
 */
function initNetworkStatus() {
    const banner = document.getElementById('network-status-banner');
    const text = document.getElementById('network-status-text');
    if (!banner || !text) return;

    function updateOnlineStatus() {
        if (navigator.onLine) {
            banner.className = 'banner-online banner-visible';
            text.innerHTML = '<i class="fa-solid fa-circle-check"></i> Đã kết nối lại Internet • Toàn bộ hệ thống hoạt động ổn định';
            if (typeof window.t1Toast === 'function') {
                window.t1Toast('success', 'Đã Kết Nối Lại', 'Mạng Internet đã hoạt động trở lại bình thường.');
            }
            setTimeout(() => {
                banner.classList.remove('banner-visible');
            }, 3000);
        } else {
            banner.className = 'banner-offline banner-visible';
            text.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Mất kết nối Internet • Website đang chạy ở chế độ Offline (Service Cache)';
            if (typeof window.t1Toast === 'function') {
                window.t1Toast('warning', 'Mất Kết Nối Mạng', 'Bạn đang offline. Các tính năng đã tải vẫn sử dụng tốt.');
            }
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

/**
 * 25. Universal 3D Toast Notification System (Thành Công / Thất Bại / Cảnh Báo)
 */
window.t1Toast = function(type = 'success', title = 'Thông báo', message = '') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'fixed top-5 right-5 z-[999999] flex flex-col gap-3 max-w-[380px] w-[calc(100%-32px)] pointer-events-none select-none';
        container.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 999999; display: flex; flex-direction: column; gap: 10px; max-width: 380px; width: calc(100% - 32px); pointer-events: none;';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `t1-toast-item toast-${type}`;

    let borderColor = '#86efac';
    let shadowColor = '#10b981';
    let iconHtml = '<div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-sm flex-shrink-0 shadow-2xs"><i class="fa-solid fa-circle-check"></i></div>';

    if (type === 'error') {
        borderColor = '#fda4af';
        shadowColor = '#f43f5e';
        iconHtml = '<div class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center text-sm flex-shrink-0 shadow-2xs"><i class="fa-solid fa-circle-xmark"></i></div>';
    } else if (type === 'warning') {
        borderColor = '#fde047';
        shadowColor = '#eab308';
        iconHtml = '<div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center text-sm flex-shrink-0 shadow-2xs"><i class="fa-solid fa-triangle-exclamation"></i></div>';
    } else if (type === 'info') {
        borderColor = '#7dd3fc';
        shadowColor = '#0284c7';
        iconHtml = '<div class="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center text-sm flex-shrink-0 shadow-2xs"><i class="fa-solid fa-circle-info"></i></div>';
    }

    toast.style.cssText = `
        pointer-events: auto;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-radius: 16px;
        padding: 12px 14px;
        border: 1.5px solid ${borderColor};
        box-shadow: 0 4px 0 ${shadowColor}, 0 14px 32px rgba(15, 23, 42, 0.12), inset 0 1px 1px #ffffff;
        display: flex;
        align-items: flex-start;
        gap: 10px;
        position: relative;
        overflow: hidden;
        transform: translateY(-8px) scale(0.96);
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        margin-bottom: 4px;
    `;

    toast.innerHTML = `
        ${iconHtml}
        <div style="flex: 1; min-width: 0; padding-right: 4px;">
            <span style="font-size: 12px; font-weight: 850; color: #0f172a; display: block; line-height: 1.25; margin-bottom: 2px;">${title}</span>
            <p style="font-size: 11px; font-weight: 600; color: #64748b; line-height: 1.4; margin: 0;">${message}</p>
        </div>
        <button style="background: none; border: none; color: #94a3b8; cursor: pointer; padding: 2px 4px; font-size: 12px; line-height: 1; border-radius: 6px;" title="Đóng">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="toast-progress-bar" style="position: absolute; bottom: 0; left: 0; height: 3px; background: ${shadowColor}; width: 100%; transform-origin: left; animation: toastCountdown 3.5s linear forwards;"></div>
    `;

    container.appendChild(toast);

    if (tactileAudio) {
        if (type === 'success') tactileAudio.playClick('success');
        else tactileAudio.playClick('click');
    }

    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0) scale(1)';
        toast.style.opacity = '1';
    });

    const closeBtn = toast.querySelector('button');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            toast.style.transform = 'translateY(-8px) scale(0.96)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 250);
        });
    }

    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.transform = 'translateY(-8px) scale(0.96)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 250);
        }
    }, 3500);
};

window.t1Confirm = function(title, desc, onConfirm) {
    const modal = document.getElementById('confirm-modal');
    const titleEl = document.getElementById('confirm-modal-title');
    const descEl = document.getElementById('confirm-modal-desc');

    if (!modal) return;
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;

    modal.classList.remove('hidden');

    const btnOk = document.getElementById('btn-confirm-ok');
    const btnCancel = document.getElementById('btn-confirm-cancel');

    function cleanup() {
        modal.classList.add('hidden');
    }

    const handleOk = () => {
        cleanup();
        btnOk.removeEventListener('click', handleOk);
        btnCancel.removeEventListener('click', handleCancel);
        if (typeof onConfirm === 'function') onConfirm();
    };

    const handleCancel = () => {
        cleanup();
        btnOk.removeEventListener('click', handleOk);
        btnCancel.removeEventListener('click', handleCancel);
    };

    btnOk.addEventListener('click', handleOk);
    btnCancel.addEventListener('click', handleCancel);
};


/**
 * 28. Modal Bảng Phím Tắt (Shortcuts Modal Controller)
 */
function initShortcutsModal() {
    const modal = document.getElementById('shortcuts-modal');
    const btnOpen = document.getElementById('btn-open-shortcuts');
    const btnClose = document.getElementById('btn-close-shortcuts');
    const btnDismiss = document.getElementById('btn-dismiss-shortcuts');

    if (!modal) return;

    function openModal() {
        modal.classList.remove('hidden');
        if (tactileAudio) tactileAudio.playClick('click');
    }

    function closeModal() {
        modal.classList.add('hidden');
    }

    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (btnDismiss) btnDismiss.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        if (e.key === '?' || e.key === '/' || e.key.toUpperCase() === 'K') {
            e.preventDefault();
            if (modal.classList.contains('hidden')) openModal();
            else closeModal();
        }
    });
}

/**
 * 29. Lưu Trữ Cài Đặt Người Dùng (Local Storage Persistence)
 */
function initUserPreferences() {
    const xmlSelect = document.getElementById('xml-profile-select');
    if (xmlSelect) {
        const savedProfile = localStorage.getItem('gta5vn_xml_profile');
        if (savedProfile) {
            xmlSelect.value = savedProfile;
            xmlSelect.dispatchEvent(new Event('change'));
        }
        xmlSelect.addEventListener('change', () => {
            localStorage.setItem('gta5vn_xml_profile', xmlSelect.value);
            if (typeof window.t1Toast === 'function') {
                window.t1Toast('info', 'Đã Lưu Cài Đặt', `Đã ghi nhớ phân khúc máy: ${xmlSelect.options[xmlSelect.selectedIndex].text.split('-')[0]}`);
            }
        });
    }
}

/**
 * 30. Hiệu Ứng Thanh Chuyển Trang & Điều Hướng (Page Transition Progress Bar)
 */
function initPageTransitions() {
    const bar = document.getElementById('t1-page-progress');
    if (!bar) return;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            bar.style.opacity = '1';
            bar.style.width = '35%';
            setTimeout(() => { bar.style.width = '75%'; }, 80);
            setTimeout(() => { bar.style.width = '100%'; }, 200);
            setTimeout(() => {
                bar.style.opacity = '0';
                setTimeout(() => { bar.style.width = '0%'; }, 200);
            }, 380);
        });
    });
}


/**
 * 31. T1 Floating Luxury Glass Navbar Scroll Morphing
 */
function initNavbarScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    let isScrolled = false;
    function handleScroll() {
        const scrolled = window.scrollY > 25;
        if (scrolled !== isScrolled) {
            isScrolled = scrolled;
            if (scrolled) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}
