/**
 * ==========================================================================
 * T1 LUXURY MASCOT COMPANIONS: DUAL ANIMATED PLAYFUL BUNNIES (SNOWY & COCO)
 * 100% Vector SVG Character Rigs with Procedural Hop, Chase & Sniff Engine
 * Zero DOM reflow, GPU-accelerated translate3d, 100% pointer-events: none
 * ==========================================================================
 */

(function() {
    'use strict';

    // SVG Character Templates (White Bunny "Snowy" & Caramel Bunny "Coco")
    const SVG_WHITE_BUNNY = `
    <svg viewBox="0 0 54 44" width="54" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="26" cy="40" rx="18" ry="3.5" fill="#94a3b8" opacity="0.32"/>
        <g class="tail">
            <circle cx="44" cy="27" r="5.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <circle cx="43" cy="26" r="3.5" fill="#f8fafc"/>
        </g>
        <g class="paw-back">
            <ellipse cx="36" cy="35" rx="5.5" ry="3.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <ellipse cx="35" cy="35" rx="3.5" ry="2" fill="#fce7f3"/>
        </g>
        <path d="M16 28 C16 18 26 18 36 21 C44 23 44 34 38 36 C32 38 18 37 16 28 Z" fill="url(#whiteGrad)" stroke="#cbd5e1" stroke-width="1.2"/>
        <g class="ear-left">
            <path d="M16 14 C12 4 10 -2 14 -2 C18 -2 19 6 18 14 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <path d="M15 11 C13 5 12 1 14 1 C16 1 17 6 16 11 Z" fill="#fce7f3"/>
        </g>
        <g class="ear-right">
            <path d="M22 14 C20 3 22 -3 26 -3 C29 -3 27 5 24 14 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <path d="M23 11 C22 4 23 0 25 0 C27 0 26 5 24 11 Z" fill="#fce7f3"/>
        </g>
        <circle cx="16" cy="20" r="10" fill="url(#whiteGrad)" stroke="#cbd5e1" stroke-width="1.2"/>
        <ellipse cx="11" cy="23" rx="2.5" ry="1.5" fill="#fda4af" opacity="0.65"/>
        <ellipse cx="20" cy="23" rx="2.5" ry="1.5" fill="#fda4af" opacity="0.65"/>
        <ellipse cx="14" cy="18" rx="2" ry="2.5" fill="#0f172a"/>
        <circle cx="13.2" cy="17" r="0.8" fill="#ffffff"/>
        <circle cx="14.8" cy="19.2" r="0.4" fill="#ffffff"/>
        <polygon points="9,21 11,21 10,22.5" fill="#f43f5e"/>
        <path d="M8.5 23.5 Q10 24.5 10 23 Q10 24.5 11.5 23.5" stroke="#64748b" stroke-width="0.8" stroke-linecap="round" fill="none"/>
        <g class="paw-front">
            <ellipse cx="16" cy="35" rx="5" ry="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.2"/>
            <ellipse cx="15" cy="35" rx="3" ry="1.6" fill="#fce7f3"/>
        </g>
        <defs>
            <linearGradient id="whiteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#f1f5f9"/>
            </linearGradient>
        </defs>
    </svg>`;

    const SVG_CARAMEL_BUNNY = `
    <svg viewBox="0 0 54 44" width="54" height="44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="26" cy="40" rx="18" ry="3.5" fill="#94a3b8" opacity="0.32"/>
        <g class="tail">
            <circle cx="44" cy="27" r="5.5" fill="#fef3c7" stroke="#fcd34d" stroke-width="1.2"/>
            <circle cx="43" cy="26" r="3.5" fill="#fffbeb"/>
        </g>
        <g class="paw-back">
            <ellipse cx="36" cy="35" rx="5.5" ry="3.5" fill="#fde68a" stroke="#d97706" stroke-width="1"/>
            <ellipse cx="35" cy="35" rx="3.5" ry="2" fill="#fed7aa"/>
        </g>
        <path d="M16 28 C16 18 26 18 36 21 C44 23 44 34 38 36 C32 38 18 37 16 28 Z" fill="url(#caramelGrad)" stroke="#d97706" stroke-width="1.2"/>
        <path d="M20 30 C22 24 30 24 34 26 C38 30 36 36 30 36 C24 36 20 34 20 30 Z" fill="#fffbeb" opacity="0.9"/>
        <g class="ear-left">
            <path d="M16 14 C12 4 10 -2 14 -2 C18 -2 19 6 18 14 Z" fill="#fde68a" stroke="#d97706" stroke-width="1.2"/>
            <path d="M15 11 C13 5 12 1 14 1 C16 1 17 6 16 11 Z" fill="#fce7f3"/>
        </g>
        <g class="ear-right">
            <path d="M22 14 C20 3 22 -3 26 -3 C29 -3 27 5 24 14 Z" fill="#fde68a" stroke="#d97706" stroke-width="1.2"/>
            <path d="M23 11 C22 4 23 0 25 0 C27 0 26 5 24 11 Z" fill="#fce7f3"/>
        </g>
        <circle cx="16" cy="20" r="10" fill="url(#caramelGrad)" stroke="#d97706" stroke-width="1.2"/>
        <ellipse cx="11" cy="23" rx="2.5" ry="1.5" fill="#fb7185" opacity="0.65"/>
        <ellipse cx="20" cy="23" rx="2.5" ry="1.5" fill="#fb7185" opacity="0.65"/>
        <ellipse cx="14" cy="18" rx="2" ry="2.5" fill="#451a03"/>
        <circle cx="13.2" cy="17" r="0.8" fill="#ffffff"/>
        <circle cx="14.8" cy="19.2" r="0.4" fill="#ffffff"/>
        <polygon points="9,21 11,21 10,22.5" fill="#e11d48"/>
        <path d="M8.5 23.5 Q10 24.5 10 23 Q10 24.5 11.5 23.5" stroke="#78350f" stroke-width="0.8" stroke-linecap="round" fill="none"/>
        <g class="paw-front">
            <ellipse cx="16" cy="35" rx="5" ry="3" fill="#fde68a" stroke="#d97706" stroke-width="1"/>
            <ellipse cx="15" cy="35" rx="3" ry="1.6" fill="#fed7aa"/>
        </g>
        <defs>
            <linearGradient id="caramelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#fef3c7"/>
                <stop offset="60%" stop-color="#fde68a"/>
                <stop offset="100%" stop-color="#f59e0b"/>
            </linearGradient>
        </defs>
    </svg>`;

    // Dust particle pool (maximum 8 particles, zero allocation in loop)
    let dustLayer = null;
    let dustPuffCount = 0;

    function spawnDustPuff(x, y) {
        if (!dustLayer || dustPuffCount >= 8) return;
        const d = document.createElement('div');
        d.className = 'bunny-dust-puff';
        const size = Math.floor(6 + Math.random() * 5);
        d.style.width = size + 'px';
        d.style.height = size + 'px';
        d.style.left = (x - size / 2) + 'px';
        d.style.top = (y - size / 2) + 'px';
        dustLayer.appendChild(d);
        dustPuffCount++;
        setTimeout(() => {
            d.remove();
            dustPuffCount--;
        }, 420);
    }

    // Bunny Actor Class
    class BunnyActor {
        constructor(el, name, initialDist, baseSpeedRatio) {
            this.el = el;
            this.name = name;
            this.dist = initialDist; // 0.0 -> 1.0 along perimeter
            this.baseSpeedRatio = baseSpeedRatio;
            this.currentSpeedRatio = baseSpeedRatio;
            
            // State: 'HOPPING', 'IDLE_SIT', 'HAPPY_JUMP', 'MEETING'
            this.state = 'HOPPING';
            this.stateTime = 0;
            this.nextStateChange = 3.5 + Math.random() * 4.0;
            
            this.dir = 1; // 1 = clockwise, -1 = counter-clockwise
            this.facing = 1; // 1 = right, -1 = left
            this.hopPhase = Math.random() * Math.PI * 2;
            
            this.x = 0;
            this.y = 0;
            this.angle = 0;
            this.hopY = 0;
            this.scaleSquash = 1;
            this.isChasing = false;
        }

        setState(newState) {
            this.state = newState;
            this.stateTime = 0;
            if (newState === 'HOPPING') {
                this.el.className = 'bunny-actor hopping';
            } else if (newState === 'IDLE_SIT') {
                this.el.className = 'bunny-actor idle';
            } else if (newState === 'HAPPY_JUMP') {
                this.el.className = 'bunny-actor happy';
            } else if (newState === 'MEETING') {
                this.el.className = 'bunny-actor meeting';
            }
        }

        update(dt, bounds, otherBunny) {
            const totalPerimeter = (bounds.width + bounds.height) * 2;
            this.stateTime += dt;

            // Compute distance to other bunny along perimeter
            let distDiff = (this.dist - otherBunny.dist);
            // Normalize distance wrap-around to [-0.5, 0.5]
            if (distDiff > 0.5) distDiff -= 1.0;
            if (distDiff < -0.5) distDiff += 1.0;
            const pixelDistance = Math.abs(distDiff) * totalPerimeter;

            // 1. Social Interactions: Meeting & Looking at Each Other
            if (pixelDistance < 80 && this.state !== 'MEETING' && otherBunny.state !== 'MEETING') {
                if (Math.random() < 0.04) {
                    this.setState('MEETING');
                    otherBunny.setState('MEETING');
                    // Face each other
                    this.facing = (otherBunny.x > this.x) ? 1 : -1;
                    otherBunny.facing = (this.x > otherBunny.x) ? 1 : -1;
                }
            }

            // 2. State Machine Transitions
            if (this.state === 'HOPPING') {
                // Occasional playful speedup / chase
                if (Math.random() < 0.003 && !this.isChasing) {
                    this.isChasing = true;
                    this.currentSpeedRatio = this.baseSpeedRatio * 1.5;
                    setTimeout(() => {
                        this.isChasing = false;
                        this.currentSpeedRatio = this.baseSpeedRatio;
                    }, 2500);
                }

                if (this.stateTime >= this.nextStateChange) {
                    const roll = Math.random();
                    if (roll < 0.45) {
                        this.setState('IDLE_SIT');
                        this.nextStateChange = 2.0 + Math.random() * 2.5;
                    } else if (roll < 0.70) {
                        this.setState('HAPPY_JUMP');
                        this.nextStateChange = 1.4 + Math.random() * 1.0;
                    } else {
                        // Keep hopping, 25% chance to flip direction
                        if (Math.random() < 0.25) this.dir *= -1;
                        this.nextStateChange = 4.0 + Math.random() * 3.5;
                    }
                }
            } else if (this.state === 'IDLE_SIT') {
                if (this.stateTime >= this.nextStateChange) {
                    if (Math.random() < 0.3) this.dir *= -1; // change mind and hop other way
                    this.setState('HOPPING');
                    this.nextStateChange = 3.5 + Math.random() * 4.0;
                }
            } else if (this.state === 'HAPPY_JUMP') {
                if (this.stateTime >= this.nextStateChange) {
                    this.setState('HOPPING');
                    this.nextStateChange = 3.5 + Math.random() * 3.5;
                }
            } else if (this.state === 'MEETING') {
                if (this.stateTime >= 2.2) {
                    // Say goodbye and continue in opposite directions or chase
                    this.dir = (Math.random() < 0.5) ? 1 : -1;
                    this.setState('HOPPING');
                    this.nextStateChange = 4.0 + Math.random() * 3.0;
                }
            }

            // 3. Movement & Arc Calculations
            if (this.state === 'HOPPING') {
                const baseSpeed = 125 * this.currentSpeedRatio; // px/sec
                const deltaDist = (baseSpeed * dt * this.dir) / totalPerimeter;
                this.dist = (this.dist + deltaDist + 1.0) % 1.0;

                // Natural parabolic hop cycle
                this.hopPhase += dt * (this.isChasing ? 12 : 8.5);
                const hopSin = Math.sin(this.hopPhase);
                if (hopSin > 0) {
                    this.hopY = -hopSin * (this.isChasing ? 16 : 13);
                    this.scaleSquash = 1.0 + hopSin * 0.12;
                } else {
                    this.hopY = 0;
                    this.scaleSquash = 1.0 - Math.abs(hopSin) * 0.14; // squash on landing
                    // Dust puff on foot strike
                    if (Math.random() < 0.18) {
                        spawnDustPuff(this.x + 24, this.y + 36);
                    }
                }
            } else if (this.state === 'HAPPY_JUMP') {
                // Excited high vertical hops in place
                this.hopPhase += dt * 14;
                const hopSin = Math.sin(this.hopPhase);
                this.hopY = -Math.abs(hopSin) * 22;
                this.scaleSquash = hopSin > 0 ? 1.15 : 0.9;
                if (Math.random() < 0.25) {
                    spawnDustPuff(this.x + 24, this.y + 36);
                }
            } else {
                // Idle breathing & sitting
                this.hopY = 0;
                this.scaleSquash = 1.0 + Math.sin(this.stateTime * 3) * 0.03;
            }

            // 4. Perimeter Position Mapping
            const pt = calculatePerimeterPoint(this.dist, bounds);
            this.x = pt.x;
            this.y = pt.y;
            this.angle = pt.tiltAngle;

            if (this.state === 'HOPPING') {
                this.facing = pt.defaultFacing * this.dir;
            }

            // 5. Hardware-Accelerated 3D Transform
            // SVG faces Left naturally (facing=1 -> flip=-1, facing=-1 -> flip=1)
            const flip = this.facing === 1 ? -1 : 1;
            this.el.style.transform = `translate3d(${Math.round(this.x)}px, ${Math.round(this.y + this.hopY)}px, 0) rotate(${this.angle}deg) scale(${flip * this.scaleSquash}, ${this.scaleSquash})`;
        }
    }

    // Mapping 0.0 -> 1.0 along the 4 edges of the viewport frame
    function calculatePerimeterPoint(dist, bounds) {
        const { left, top, width, height } = bounds;
        const w = width;
        const h = height;
        const perim = 2 * (w + h);
        let d = ((dist % 1.0) + 1.0) % 1.0 * perim;

        // Edge 0: Bottom edge (Left -> Right)
        if (d < w) {
            return {
                x: left + d,
                y: top + h - 38,
                tiltAngle: 0,
                defaultFacing: 1
            };
        }
        d -= w;

        // Edge 1: Right edge (Bottom -> Top, bounding up with playful tilt)
        if (d < h) {
            return {
                x: left + w - 46,
                y: top + h - 38 - d,
                tiltAngle: -22,
                defaultFacing: 1
            };
        }
        d -= h;

        // Edge 2: Top edge (Right -> Left, under sticky header)
        if (d < w) {
            return {
                x: left + w - 46 - d,
                y: top,
                tiltAngle: 0,
                defaultFacing: -1
            };
        }
        d -= w;

        // Edge 3: Left edge (Top -> Bottom, bounding down with playful tilt)
        return {
            x: left,
            y: top + d,
            tiltAngle: 22,
            defaultFacing: 1
        };
    }

    // Determine current responsive frame bounds
    function getResponsiveBounds() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const paddingX = Math.max(12, Math.min(32, vw * 0.025));
        const paddingTop = 52; // sits comfortably below the 48px sticky header
        const paddingBottom = Math.max(16, Math.min(36, vh * 0.035));

        return {
            left: paddingX,
            top: paddingTop,
            width: Math.max(260, vw - (paddingX * 2)),
            height: Math.max(280, vh - paddingTop - paddingBottom)
        };
    }

    // Bootstrapping Engine
    function initMascotBunnies() {
        const playground = document.getElementById('bunny-playground');
        const snowyEl = document.getElementById('bunny-snowy');
        const cocoEl = document.getElementById('bunny-coco');
        dustLayer = document.getElementById('bunny-dust-layer');

        if (!playground || !snowyEl || !cocoEl) return;

        // Inject high-detail SVG character rigs
        snowyEl.innerHTML = SVG_WHITE_BUNNY;
        cocoEl.innerHTML = SVG_CARAMEL_BUNNY;

        // Create actors
        const snowy = new BunnyActor(snowyEl, 'Snowy', 0.12, 1.05);
        const coco = new BunnyActor(cocoEl, 'Coco', 0.05, 0.96);

        let lastTime = performance.now();
        let isPaused = false;

        // Check prefers-reduced-motion
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            playground.style.display = 'none';
            return;
        }

        // Animation Loop (60FPS requestAnimationFrame)
        function animationFrame(now) {
            if (!isPaused) {
                const dt = Math.min((now - lastTime) / 1000, 0.1);
                lastTime = now;

                const bounds = getResponsiveBounds();
                snowy.update(dt, bounds, coco);
                coco.update(dt, bounds, snowy);
            }
            requestAnimationFrame(animationFrame);
        }

        requestAnimationFrame(animationFrame);

        // Expose global controller if needed
        window.toggleBunnies = function(force) {
            isPaused = typeof force === 'boolean' ? !force : !isPaused;
            playground.style.display = isPaused ? 'none' : 'block';
        };
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMascotBunnies);
    } else {
        initMascotBunnies();
    }
})();
