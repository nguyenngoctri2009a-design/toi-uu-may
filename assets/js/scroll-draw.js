/**
 * ==========================================================================
 * T1 SCROLL DRAWING ANIMATION ENGINE (ARTISTIC HAND-DRAWN SKETCH RIBBON)
 * Dynamically draws an artistic illustrated trail and cute checkpoint doodles
 * as the user scrolls, with a magical glowing paintbrush nib leading the stroke.
 * Reversible on scroll up. 100% pointer-events: none. Zero layout reflow.
 * ==========================================================================
 */

(function() {
    'use strict';

    // SVG templates for checkpoint illustrated doodles
    // Each doodle has its paths styled for stroke-dasharray progressive revelation
    const DOODLES = [
        {
            // Doodle 1: Star & Cloud (Hero / Intro)
            id: 'doodle-hero',
            side: 'left',
            getRelativeY: (h) => Math.min(420, h * 0.08),
            offsetX: 38,
            svg: `
            <g class="sketch-doodle" data-progress="0.08">
                <!-- Cute Cloud -->
                <path class="sketch-line" d="M12 28 C8 28 4 25 4 21 C4 17 8 14 12 15 C14 9 22 7 28 11 C32 7 40 8 42 14 C47 14 50 17 50 21 C50 26 46 28 42 28 Z" fill="rgba(14, 165, 233, 0.08)" stroke="#0ea5e9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Cute Sparkle Star -->
                <path class="sketch-line" d="M38 4 Q41 12 49 15 Q41 18 38 26 Q35 18 27 15 Q35 12 38 4 Z" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.8" stroke-linejoin="round"/>
                <circle cx="20" cy="20" r="1.5" fill="#0ea5e9"/>
                <circle cx="34" cy="20" r="1.5" fill="#0ea5e9"/>
                <path d="M25 22 Q27 24 29 22" stroke="#0ea5e9" stroke-width="1.2" stroke-linecap="round" fill="none"/>
            </g>`
        },
        {
            // Doodle 2: Heartbeat & Gamer Star (Thống Kê / Telemetry)
            id: 'doodle-stats',
            side: 'right',
            getRelativeY: (h) => h * 0.23,
            offsetX: -45,
            svg: `
            <g class="sketch-doodle" data-progress="0.23">
                <!-- Telemetry Heart pulse ribbon -->
                <path class="sketch-line" d="M4 22 L14 22 L18 10 L24 34 L30 14 L34 26 L38 22 L52 22" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Cute Little Heart -->
                <path class="sketch-line" d="M38 10 C38 6 34 3 30 5 C26 7 28 12 30 15 L38 22 L46 15 C48 12 50 7 46 5 C42 3 38 6 38 10 Z" fill="rgba(244, 63, 94, 0.14)" stroke="#f43f5e" stroke-width="1.8" stroke-linejoin="round"/>
            </g>`
        },
        {
            // Doodle 3: Playful Bunny Silhouette (Cấu Hình / Checker)
            id: 'doodle-checker',
            side: 'left',
            getRelativeY: (h) => h * 0.42,
            offsetX: 42,
            svg: `
            <g class="sketch-doodle" data-progress="0.42">
                <!-- Bunny outline sketch -->
                <path class="sketch-line" d="M12 38 C10 28 18 20 28 22 C34 22 42 28 40 38 C34 42 18 42 12 38 Z" fill="rgba(14, 165, 233, 0.08)" stroke="#0284c7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Left ear -->
                <path class="sketch-line" d="M18 22 C14 10 12 2 17 2 C22 2 22 12 21 22 Z" fill="rgba(244, 114, 182, 0.12)" stroke="#0284c7" stroke-width="1.8"/>
                <!-- Right ear -->
                <path class="sketch-line" d="M26 22 C24 8 28 2 33 3 C37 4 33 13 29 22 Z" fill="rgba(244, 114, 182, 0.12)" stroke="#0284c7" stroke-width="1.8"/>
                <!-- Little face -->
                <circle cx="21" cy="28" r="1.5" fill="#0f172a"/>
                <circle cx="28" cy="28" r="1.5" fill="#0f172a"/>
                <polygon points="24,31 25.5,31 24.8,32.2" fill="#f43f5e"/>
            </g>`
        },
        {
            // Doodle 4: Lucky Four-Leaf Clover & Gear (Công Cụ / Toolkit)
            id: 'doodle-tools',
            side: 'right',
            getRelativeY: (h) => h * 0.60,
            offsetX: -44,
            svg: `
            <g class="sketch-doodle" data-progress="0.60">
                <!-- Four leaf clover sketch -->
                <path class="sketch-line" d="M26 26 C22 20 14 20 14 26 C14 32 22 32 26 26 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.8"/>
                <path class="sketch-line" d="M26 26 C32 20 40 20 40 26 C40 32 32 32 26 26 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.8"/>
                <path class="sketch-line" d="M26 26 C20 22 20 14 26 14 C32 14 32 22 26 26 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.8"/>
                <path class="sketch-line" d="M26 26 C20 30 20 38 26 38 C32 38 32 30 26 26 Z" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.8"/>
                <!-- Stem -->
                <path class="sketch-line" d="M26 26 Q29 38 25 44" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>
                <!-- Sparkle -->
                <path class="sketch-line" d="M38 8 Q40 14 46 16 Q40 18 38 24 Q36 18 30 16 Q36 14 38 8 Z" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" stroke-width="1.5"/>
            </g>`
        },
        {
            // Doodle 5: Trophy & 5-Star Banner (Bảng Xếp Hạng & Đánh Giá)
            id: 'doodle-reviews',
            side: 'left',
            getRelativeY: (h) => h * 0.78,
            offsetX: 40,
            svg: `
            <g class="sketch-doodle" data-progress="0.78">
                <!-- Cute Trophy Cup -->
                <path class="sketch-line" d="M16 12 L36 12 C36 24 30 28 26 28 C22 28 16 24 16 12 Z" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/>
                <!-- Handles -->
                <path class="sketch-line" d="M16 15 C10 15 10 21 16 22" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/>
                <path class="sketch-line" d="M36 15 C42 15 42 21 36 22" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round"/>
                <!-- Base -->
                <path class="sketch-line" d="M26 28 L26 35 M20 35 L32 35" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
                <!-- Little stars floating -->
                <polygon points="12,6 13.5,9.5 17,9.8 14.3,12 15.2,15.5 12,13.6 8.8,15.5 9.7,12 7,9.8 10.5,9.5" fill="#f59e0b"/>
                <polygon points="40,6 41.5,9.5 45,9.8 42.3,12 43.2,15.5 40,13.6 36.8,15.5 37.7,12 35,9.8 38.5,9.5" fill="#f59e0b"/>
            </g>`
        },
        {
            // Doodle 6: Blooming Flower & Heart (Hỏi Đáp / Footer)
            id: 'doodle-footer',
            side: 'right',
            getRelativeY: (h) => Math.max(h - 550, h * 0.92),
            offsetX: -42,
            svg: `
            <g class="sketch-doodle" data-progress="0.92">
                <!-- Cute Flower -->
                <circle cx="26" cy="22" r="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.6"/>
                <circle cx="26" cy="12" r="4.5" fill="rgba(244, 114, 182, 0.25)" stroke="#f43f5e" stroke-width="1.6"/>
                <circle cx="26" cy="32" r="4.5" fill="rgba(244, 114, 182, 0.25)" stroke="#f43f5e" stroke-width="1.6"/>
                <circle cx="16" cy="22" r="4.5" fill="rgba(244, 114, 182, 0.25)" stroke="#f43f5e" stroke-width="1.6"/>
                <circle cx="36" cy="22" r="4.5" fill="rgba(244, 114, 182, 0.25)" stroke="#f43f5e" stroke-width="1.6"/>
                <!-- Stem and leaf -->
                <path class="sketch-line" d="M26 36 Q25 44 26 48" fill="none" stroke="#10b981" stroke-width="1.8" stroke-linecap="round"/>
                <path class="sketch-line" d="M26 41 Q32 39 34 43" fill="none" stroke="#10b981" stroke-width="1.6" stroke-linecap="round"/>
            </g>`
        }
    ];

    // Magical Paintbrush Nib SVG
    const SVG_PAINTBRUSH = `
    <div id="artist-brush-nib" class="artist-brush-nib">
        <svg viewBox="0 0 32 32" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="rotate(-35 16 16)">
                <!-- Brush Handle -->
                <path d="M14 2 L18 2 L17 18 L15 18 Z" fill="url(#brushWoodGrad)" stroke="#78350f" stroke-width="0.8"/>
                <!-- Ferrule (Silver metal band) -->
                <rect x="14.5" y="18" width="3" height="4" rx="0.5" fill="#cbd5e1" stroke="#64748b" stroke-width="0.6"/>
                <!-- Bristles Tip -->
                <path d="M14.5 22 Q14 27 16 29 Q18 27 17.5 22 Z" fill="#0284c7" stroke="#0369a1" stroke-width="0.7"/>
                <!-- Wet Paint Drop Gleam -->
                <circle cx="16" cy="28.5" r="1.5" fill="#38bdf8"/>
            </g>
            <defs>
                <linearGradient id="brushWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#fde68a"/>
                    <stop offset="50%" stop-color="#d97706"/>
                    <stop offset="100%" stop-color="#b45309"/>
                </linearGradient>
            </defs>
        </svg>
        <div class="brush-paint-sparkle"></div>
    </div>`;

    function initScrollDrawing() {
        const playground = document.getElementById('scroll-draw-playground');
        if (!playground) return;

        // Check prefers-reduced-motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            playground.style.display = 'none';
            return;
        }

        const svgEl = playground.querySelector('svg#scroll-draw-svg');
        const pathEl = playground.querySelector('path#scroll-main-path');
        const doodlesContainer = playground.querySelector('#scroll-doodles-container');
        let brushEl = playground.querySelector('#artist-brush-nib');

        if (!brushEl) {
            const wrap = document.createElement('div');
            wrap.innerHTML = SVG_PAINTBRUSH;
            brushEl = wrap.firstElementChild;
            playground.appendChild(brushEl);
        }

        let docHeight = document.documentElement.scrollHeight;
        let winHeight = window.innerHeight;
        let winWidth = window.innerWidth;
        let totalPathLength = 0;
        let currentDrawLength = 0;
        let targetDrawLength = 0;
        let isTicking = false;

        // Generate the master meandering spline that flows through page sections
        function buildDrawingPath() {
            docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            winHeight = window.innerHeight;
            winWidth = window.innerWidth;

            svgEl.setAttribute('width', winWidth);
            svgEl.setAttribute('height', docHeight);
            svgEl.setAttribute('viewBox', `0 0 ${winWidth} ${docHeight}`);

            const leftGutter = Math.max(20, Math.min(60, winWidth * 0.04));
            const rightGutter = winWidth - leftGutter;

            // Generate meandering waypoints down the document height
            // Weaving gracefully along the margins
            const waypoints = [
                { x: leftGutter + 40, y: 120 },
                { x: leftGutter + 20, y: docHeight * 0.08 },
                { x: winWidth * 0.35, y: docHeight * 0.15 },
                { x: rightGutter - 25, y: docHeight * 0.23 },
                { x: winWidth * 0.65, y: docHeight * 0.32 },
                { x: leftGutter + 25, y: docHeight * 0.42 },
                { x: winWidth * 0.38, y: docHeight * 0.51 },
                { x: rightGutter - 30, y: docHeight * 0.60 },
                { x: winWidth * 0.60, y: docHeight * 0.69 },
                { x: leftGutter + 25, y: docHeight * 0.78 },
                { x: winWidth * 0.45, y: docHeight * 0.85 },
                { x: rightGutter - 25, y: docHeight * 0.92 },
                { x: winWidth * 0.50, y: docHeight - 120 }
            ];

            // Build smooth cubic bezier SVG path string
            let d = `M ${waypoints[0].x} ${waypoints[0].y}`;
            for (let i = 1; i < waypoints.length; i++) {
                const prev = waypoints[i - 1];
                const curr = waypoints[i];
                const midY = (prev.y + curr.y) / 2;
                d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
            }

            pathEl.setAttribute('d', d);
            totalPathLength = pathEl.getTotalLength();

            // Set up stroke-dasharray
            pathEl.style.strokeDasharray = `${totalPathLength} ${totalPathLength}`;
            pathEl.style.strokeDashoffset = `${totalPathLength}`;

            // Build & Position Doodles
            doodlesContainer.innerHTML = '';
            DOODLES.forEach(doodle => {
                const yPos = doodle.getRelativeY(docHeight);
                const xPos = doodle.side === 'left' ? leftGutter + doodle.offsetX : rightGutter + doodle.offsetX;

                const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                g.id = doodle.id;
                g.setAttribute('transform', `translate(${Math.max(10, Math.min(winWidth - 60, xPos))}, ${yPos})`);
                g.innerHTML = doodle.svg;
                doodlesContainer.appendChild(g);

                // Prepare stroke-dasharray on sketch lines inside doodle
                const lines = g.querySelectorAll('.sketch-line');
                lines.forEach(l => {
                    if (l.getTotalLength) {
                        const len = l.getTotalLength();
                        l.style.strokeDasharray = `${len} ${len}`;
                        l.style.strokeDashoffset = `${len}`;
                        l.setAttribute('data-len', len);
                    }
                });
            });

            updateProgress();
        }

        // Calculate scroll progress (0.0 to 1.0)
        function getScrollProgress() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollableDist = Math.max(1, docHeight - winHeight);
            return Math.min(1.0, Math.max(0.0, scrollTop / scrollableDist));
        }

        // Smooth Lerp Update Loop
        function updateProgress() {
            const progress = getScrollProgress();
            targetDrawLength = progress * totalPathLength;

            // Interpolate smooth movement
            currentDrawLength += (targetDrawLength - currentDrawLength) * 0.15;
            if (Math.abs(targetDrawLength - currentDrawLength) < 0.5) {
                currentDrawLength = targetDrawLength;
            }

            // Update main path stroke-dashoffset
            const offset = Math.max(0, totalPathLength - currentDrawLength);
            pathEl.style.strokeDashoffset = offset;

            // Update brush nib position and angle
            if (totalPathLength > 0 && currentDrawLength > 5) {
                const safeLen = Math.min(totalPathLength - 1, Math.max(0, currentDrawLength));
                const pt = pathEl.getPointAtLength(safeLen);
                
                // Slight tangent angle calculation
                const ptAhead = pathEl.getPointAtLength(Math.min(totalPathLength, safeLen + 4));
                const angleRad = Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x);
                const angleDeg = (angleRad * 180 / Math.PI);

                brushEl.style.transform = `translate3d(${pt.x - 16}px, ${pt.y - 28}px, 0) rotate(${angleDeg * 0.3}deg)`;
                brushEl.style.opacity = progress > 0.005 && progress < 0.99 ? '1' : (progress <= 0.005 ? '0' : '0.6');
            } else {
                brushEl.style.opacity = '0';
            }

            // Update individual checkpoint doodles based on progress
            const doodles = doodlesContainer.querySelectorAll('.sketch-doodle');
            doodles.forEach(doodle => {
                const targetProg = parseFloat(doodle.getAttribute('data-progress'));
                // Trigger drawing slightly before reaching scroll position
                const startProg = Math.max(0, targetProg - 0.08);
                const endProg = Math.min(1, targetProg + 0.04);

                let localRatio = 0;
                if (progress >= endProg) {
                    localRatio = 1;
                } else if (progress > startProg) {
                    localRatio = (progress - startProg) / (endProg - startProg);
                }

                const lines = doodle.querySelectorAll('.sketch-line');
                lines.forEach(l => {
                    const len = parseFloat(l.getAttribute('data-len') || '100');
                    l.style.strokeDashoffset = `${len * (1 - localRatio)}`;
                });

                // Completed watercolor soft tint
                if (localRatio >= 0.95) {
                    doodle.classList.add('doodle-completed');
                } else {
                    doodle.classList.remove('doodle-completed');
                }
            });

            if (Math.abs(targetDrawLength - currentDrawLength) >= 0.5) {
                requestAnimationFrame(updateProgress);
            } else {
                isTicking = false;
            }
        }

        function onScroll() {
            if (!isTicking) {
                isTicking = true;
                requestAnimationFrame(updateProgress);
            }
        }

        // Event listeners with passive options for 60fps scrolling
        window.addEventListener('scroll', onScroll, { passive: true });
        
        let resizeTimer = null;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(buildDrawingPath, 200);
        }, { passive: true });

        // Initialize when document is loaded
        setTimeout(buildDrawingPath, 400);

        // Global toggle if requested
        window.toggleScrollDraw = function(force) {
            const isHidden = playground.style.display === 'none';
            playground.style.display = (typeof force === 'boolean') ? (force ? 'block' : 'none') : (isHidden ? 'block' : 'none');
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollDrawing);
    } else {
        initScrollDrawing();
    }
})();
