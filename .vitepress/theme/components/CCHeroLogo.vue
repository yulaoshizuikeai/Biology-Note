<script setup lang="ts">
import { ref, computed } from "vue";

const el = ref<HTMLElement>();
const flipped = ref(false);
const hover = ref(false);
const rx = ref(0);
const ry = ref(0);

function onMove(e: MouseEvent) {
  if (!el.value) return;
  const r = el.value.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  ry.value = +(x * 12).toFixed(1);
  rx.value = +(-y * 12).toFixed(1);
}

function onEnter() {
  hover.value = true;
}

function onLeave() {
  hover.value = false;
  rx.value = 0;
  ry.value = 0;
}

function onClick() {
  flipped.value = !flipped.value;
}

const tiltStyle = computed(() => {
  return {
    transform: `rotateX(${rx.value}deg) rotateY(${ry.value}deg)`,
  };
});
</script>

<template>
  <div
    ref="el"
    class="flip-wrap"
    @mousemove="onMove"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
    @click="onClick"
  >
    <div class="levitate-box" :class="{ 'is-hovered': hover }">
      <div class="tilt-layer" :style="tiltStyle">
        <div
          class="flip-card"
          :class="{ 'is-flipped': flipped }"
        >
        <!-- ====== FRONT: Notebook + High-Tech 3D DNA Double Helix ====== -->
        <div class="face front">
          <svg viewBox="0 0 330 380" fill="none" xmlns="http://www.w3.org/2000/svg" class="hero-dna-svg">
            <defs>
              <filter id="f-shadow" x="30" y="0" width="300" height="375" filterUnits="userSpaceOnUse">
                <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#047857" flood-opacity="0.16"/>
                <feDropShadow dx="0" dy="3" stdDeviation="6" flood-color="#000000" flood-opacity="0.06"/>
              </filter>

              <pattern id="f-lines" width="100%" height="24" patternUnits="userSpaceOnUse">
                <line x1="0" y1="23.5" x2="100%" y2="23.5" stroke="var(--dna-lines, #F1F5F9)" stroke-width="1.2"/>
              </pattern>

              <linearGradient id="strand-grad-1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#34D399"/>
                <stop offset="50%" stop-color="#10B981"/>
                <stop offset="100%" stop-color="#059669"/>
              </linearGradient>

              <linearGradient id="strand-grad-2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#2DD4BF"/>
                <stop offset="50%" stop-color="#0D9488"/>
                <stop offset="100%" stop-color="#047857"/>
              </linearGradient>

              <linearGradient id="node-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#A7F3D0"/>
                <stop offset="100%" stop-color="#059669"/>
              </linearGradient>

              <linearGradient id="pedestal-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stop-color="#10B981" stop-opacity="0.05"/>
                <stop offset="25%" stop-color="#10B981" stop-opacity="0.75"/>
                <stop offset="50%" stop-color="#059669"/>
                <stop offset="75%" stop-color="#10B981" stop-opacity="0.75"/>
                <stop offset="100%" stop-color="#10B981" stop-opacity="0.05"/>
              </linearGradient>
            </defs>

            <!-- Layer 1: Back tilted emerald notebook page -->
            <rect y="29.6" width="285.6" height="352" rx="18" transform="rotate(-5.75 0 29.6)" fill="#10B981"/>

            <!-- Layer 2: Main tactile notebook page -->
            <g filter="url(#f-shadow)">
              <rect x="45.5" y="10" width="274" height="352" rx="18" fill="var(--dna-card-bg, #FFFFFF)"/>
              <rect x="45.5" y="24" width="274" height="324" fill="url(#f-lines)"/>

              <!-- ================= DNA DOUBLE HELIX ================= -->
              <g class="dna-helix-group">

                <!-- 1. BASE PAIR RUNGS (Complementary Base Pairs) -->
                <g class="base-pairs">
                  <!-- Rung 1 -->
                  <g class="rung rung-1">
                    <line x1="147.28" y1="78" x2="180.75" y2="78" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="78" x2="217.72" y2="78" stroke="#34D399" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="78" r="1.5" fill="#10B981"/>
                  </g>
                  <!-- Rung 2 -->
                  <g class="rung rung-2">
                    <line x1="156.40" y1="90" x2="180.75" y2="90" stroke="#0D9488" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="90" x2="208.60" y2="90" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="90" r="1.5" fill="#10B981"/>
                  </g>
                  <!-- Rung 3 -->
                  <g class="rung rung-3">
                    <line x1="156.40" y1="122" x2="180.75" y2="122" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="122" x2="208.60" y2="122" stroke="#34D399" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="122" r="1.5" fill="#10B981"/>
                  </g>
                  <!-- Rung 4 -->
                  <g class="rung rung-4">
                    <line x1="142.75" y1="148" x2="180.75" y2="148" stroke="#0D9488" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="148" x2="222.25" y2="148" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="148" r="1.5" fill="#10B981"/>
                  </g>
                  <!-- Rung 5 -->
                  <g class="rung rung-5">
                    <line x1="148.60" y1="192" x2="180.75" y2="192" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="192" x2="216.40" y2="192" stroke="#34D399" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="192" r="1.5" fill="#10B981"/>
                  </g>
                  <!-- Rung 6 -->
                  <g class="rung rung-6">
                    <line x1="164.20" y1="218" x2="180.75" y2="218" stroke="#0D9488" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="218" x2="200.80" y2="218" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="218" r="1.5" fill="#10B981"/>
                  </g>
                  <!-- Rung 7 -->
                  <g class="rung rung-7">
                    <line x1="160.20" y1="252" x2="180.75" y2="252" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="252" x2="204.80" y2="252" stroke="#34D399" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="252" r="1.5" fill="#10B981"/>
                  </g>
                  <!-- Rung 8 -->
                  <g class="rung rung-8">
                    <line x1="145.40" y1="264" x2="180.75" y2="264" stroke="#0D9488" stroke-width="4" stroke-linecap="round"/>
                    <line x1="184.25" y1="264" x2="219.60" y2="264" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
                    <circle cx="182.5" cy="264" r="1.5" fill="#10B981"/>
                  </g>
                </g>

                <!-- 2. STRANDS WITH SEAMLESS 3D DEPTH CUTOUT -->
                <!-- Background Strands -->
                <path d="M 140.50 65.00 L 140.91 67.33 L 142.14 69.67 L 144.17 72.00 L 146.97 74.33 L 150.48 76.67 L 154.67 79.00 L 159.45 81.33 L 164.76 83.67 L 170.52 86.00 L 176.62 88.33 L 182.97 90.67 L 189.47 93.00 L 195.99 95.33 L 202.43 97.67 L 208.67 100.00 L 214.59 102.33 L 220.08 104.67 L 225.02 107.00 L 229.33 109.33 L 232.92 111.67 L 235.70 114.00 L 237.62 116.33 L 238.63 118.67 L 238.70 121.00 L 237.84 123.33 L 236.05 125.67 L 233.36 128.00 L 229.80 130.33 L 225.43 132.67 L 220.30 135.00"
                      stroke="var(--dna-back-strand, #A7F3D0)" stroke-width="5.5" stroke-linecap="round" fill="none"/>

                <path d="M 220.30 135.00 L 214.52 137.33 L 208.19 139.67 L 201.42 142.00 L 194.34 144.33 L 187.06 146.67 L 179.74 149.00 L 172.50 151.33 L 165.48 153.67 L 158.82 156.00 L 152.65 158.33 L 147.10 160.67 L 142.27 163.00 L 138.27 165.33 L 135.19 167.67 L 133.10 170.00 L 132.05 172.33 L 132.09 174.67 L 133.22 177.00 L 135.43 179.33 L 138.71 181.67 L 142.99 184.00 L 148.21 186.33 L 154.29 188.67 L 161.12 191.00 L 168.58 193.33 L 176.54 195.67 L 184.86 198.00 L 193.39 200.33 L 201.97 202.67 L 210.45 205.00"
                      stroke="var(--dna-back-strand, #A7F3D0)" stroke-width="5.5" stroke-linecap="round" fill="none"/>

                <path d="M 210.45 205.00 L 217.47 207.33 L 223.77 209.67 L 229.23 212.00 L 233.72 214.33 L 237.15 216.67 L 239.45 219.00 L 240.54 221.33 L 240.40 223.67 L 239.02 226.00 L 236.42 228.33 L 232.65 230.67 L 227.76 233.00 L 221.85 235.33 L 215.02 237.67 L 207.41 240.00 L 199.15 242.33 L 190.41 244.67 L 181.36 247.00 L 172.18 249.33 L 163.05 251.67 L 154.17 254.00 L 145.72 256.33 L 137.89 258.67 L 130.86 261.00 L 124.78 263.33 L 119.82 265.67 L 116.10 268.00 L 113.72 270.33 L 112.78 272.67 L 113.33 275.00"
                      stroke="var(--dna-back-strand, #A7F3D0)" stroke-width="5.5" stroke-linecap="round" fill="none"/>

                <!-- Foreground Strands (with 3D Cutout understroke) -->
                <!-- Cutout Understrokes -->
                <path d="M 224.50 65.00 L 224.09 67.33 L 222.86 69.67 L 220.83 72.00 L 218.03 74.33 L 214.52 76.67 L 210.33 79.00 L 205.55 81.33 L 200.24 83.67 L 194.48 86.00 L 188.38 88.33 L 182.03 90.67 L 175.53 93.00 L 169.01 95.33 L 162.57 97.67 L 156.33 100.00 L 150.41 102.33 L 144.92 104.67 L 139.98 107.00 L 135.67 109.33 L 132.08 111.67 L 129.30 114.00 L 127.38 116.33 L 126.37 118.67 L 126.30 121.00 L 127.16 123.33 L 128.95 125.67 L 131.64 128.00 L 135.20 130.33 L 139.57 132.67 L 144.70 135.00"
                      stroke="var(--dna-cutout, #FFFFFF)" stroke-width="10" stroke-linecap="round" fill="none"/>
                <!-- Front Stroke 1 -->
                <path d="M 224.50 65.00 L 224.09 67.33 L 222.86 69.67 L 220.83 72.00 L 218.03 74.33 L 214.52 76.67 L 210.33 79.00 L 205.55 81.33 L 200.24 83.67 L 194.48 86.00 L 188.38 88.33 L 182.03 90.67 L 175.53 93.00 L 169.01 95.33 L 162.57 97.67 L 156.33 100.00 L 150.41 102.33 L 144.92 104.67 L 139.98 107.00 L 135.67 109.33 L 132.08 111.67 L 129.30 114.00 L 127.38 116.33 L 126.37 118.67 L 126.30 121.00 L 127.16 123.33 L 128.95 125.67 L 131.64 128.00 L 135.20 130.33 L 139.57 132.67 L 144.70 135.00"
                      stroke="url(#strand-grad-1)" stroke-width="6.5" stroke-linecap="round" fill="none" class="helix-strand strand-front-1"/>

                <!-- Cutout Understroke 2 -->
                <path d="M 144.70 135.00 L 150.48 137.33 L 156.81 139.67 L 163.58 142.00 L 170.66 144.33 L 177.94 146.67 L 185.26 149.00 L 192.50 151.33 L 199.52 153.67 L 206.18 156.00 L 212.35 158.33 L 217.90 160.67 L 222.73 163.00 L 226.73 165.33 L 229.81 167.67 L 231.90 170.00 L 232.95 172.33 L 232.91 174.67 L 231.78 177.00 L 229.57 179.33 L 226.29 181.67 L 222.01 184.00 L 216.79 186.33 L 210.71 188.67 L 203.88 191.00 L 196.42 193.33 L 188.46 195.67 L 180.14 198.00 L 171.61 200.33 L 163.03 202.67 L 154.55 205.00"
                      stroke="var(--dna-cutout, #FFFFFF)" stroke-width="10" stroke-linecap="round" fill="none"/>
                <!-- Front Stroke 2 -->
                <path d="M 144.70 135.00 L 150.48 137.33 L 156.81 139.67 L 163.58 142.00 L 170.66 144.33 L 177.94 146.67 L 185.26 149.00 L 192.50 151.33 L 199.52 153.67 L 206.18 156.00 L 212.35 158.33 L 217.90 160.67 L 222.73 163.00 L 226.73 165.33 L 229.81 167.67 L 231.90 170.00 L 232.95 172.33 L 232.91 174.67 L 231.78 177.00 L 229.57 179.33 L 226.29 181.67 L 222.01 184.00 L 216.79 186.33 L 210.71 188.67 L 203.88 191.00 L 196.42 193.33 L 188.46 195.67 L 180.14 198.00 L 171.61 200.33 L 163.03 202.67 L 154.55 205.00"
                      stroke="url(#strand-grad-2)" stroke-width="6.5" stroke-linecap="round" fill="none" class="helix-strand strand-front-2"/>

                <!-- Cutout Understroke 3 -->
                <path d="M 154.55 205.00 L 147.53 207.33 L 141.23 209.67 L 135.77 212.00 L 131.28 214.33 L 127.85 216.67 L 125.55 219.00 L 124.46 221.33 L 124.60 223.67 L 125.98 226.00 L 128.58 228.33 L 132.35 230.67 L 137.24 233.00 L 143.15 235.33 L 149.98 237.67 L 157.59 240.00 L 165.85 242.33 L 174.59 244.67 L 183.64 247.00 L 192.82 249.33 L 201.95 251.67 L 210.83 254.00 L 219.28 256.33 L 227.11 258.67 L 234.14 261.00 L 240.22 263.33 L 245.18 265.67 L 248.90 268.00 L 251.28 270.33 L 252.22 272.67 L 251.67 275.00"
                      stroke="var(--dna-cutout, #FFFFFF)" stroke-width="10" stroke-linecap="round" fill="none"/>
                <!-- Front Stroke 3 -->
                <path d="M 154.55 205.00 L 147.53 207.33 L 141.23 209.67 L 135.77 212.00 L 131.28 214.33 L 127.85 216.67 L 125.55 219.00 L 124.46 221.33 L 124.60 223.67 L 125.98 226.00 L 128.58 228.33 L 132.35 230.67 L 137.24 233.00 L 143.15 235.33 L 149.98 237.67 L 157.59 240.00 L 165.85 242.33 L 174.59 244.67 L 183.64 247.00 L 192.82 249.33 L 201.95 251.67 L 210.83 254.00 L 219.28 256.33 L 227.11 258.67 L 234.14 261.00 L 240.22 263.33 L 245.18 265.67 L 248.90 268.00 L 251.28 270.33 L 252.22 272.67 L 251.67 275.00"
                      stroke="url(#strand-grad-1)" stroke-width="6.5" stroke-linecap="round" fill="none" class="helix-strand strand-front-3"/>

                <!-- 3. PHOSPHODIESTER BACKBONE NODES (Concentric precision beads) -->
                <g class="backbone-nodes">
                  <g class="genetic-node node-1" transform="translate(147.28, 78)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-2" transform="translate(217.72, 78)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-3" transform="translate(156.40, 90)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-4" transform="translate(208.60, 90)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-5" transform="translate(156.40, 122)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-6" transform="translate(208.60, 122)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-7" transform="translate(142.75, 148)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-8" transform="translate(222.25, 148)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-1" transform="translate(148.60, 192)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-2" transform="translate(216.40, 192)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-3" transform="translate(164.20, 218)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-4" transform="translate(200.80, 218)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-5" transform="translate(160.20, 252)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-6" transform="translate(204.80, 252)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-7" transform="translate(145.40, 264)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node node-8" transform="translate(219.60, 264)"><circle cx="0" cy="0" r="4.2" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <!-- End terminals -->
                  <g class="genetic-node terminal" transform="translate(140.50, 65)"><circle cx="0" cy="0" r="4.5" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node terminal" transform="translate(224.50, 65)"><circle cx="0" cy="0" r="4.5" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node terminal" transform="translate(113.33, 275)"><circle cx="0" cy="0" r="4.5" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                  <g class="genetic-node terminal" transform="translate(251.67, 275)"><circle cx="0" cy="0" r="4.5" fill="url(#node-grad)"/><circle cx="-0.8" cy="-0.8" r="1.5" fill="#FFFFFF"/></g>
                </g>

                <!-- 4. APEX SCIENTIFIC SPARK -->
                <g class="apex-spark" transform="translate(182.5, 48)">
                  <circle cx="0" cy="0" r="2.5" fill="#10B981"/>
                  <line x1="0" y1="-6.5" x2="0" y2="6.5" stroke="#10B981" stroke-width="1.4" stroke-linecap="round"/>
                  <line x1="-6.5" y1="0" x2="6.5" y2="0" stroke="#10B981" stroke-width="1.4" stroke-linecap="round"/>
                </g>

                <!-- 5. REFINED BASELINE PEDESTAL -->
                <rect x="110" y="296" width="145" height="3.5" rx="1.75" fill="url(#pedestal-grad)"/>
                <circle cx="182.5" cy="297.75" r="3" fill="#059669"/>
                <circle cx="182.5" cy="297.75" r="1.2" fill="#FFFFFF"/>

                <!-- 6. MONOGRAM BRAND TEXT -->
                <text x="182.5" y="320" text-anchor="middle"
                      font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                      font-size="9" font-weight="700" letter-spacing="2.8" fill="var(--dna-text, #059669)">
                  BIOLOGY NOTE
                </text>
              </g>
            </g>
          </svg>
        </div>

        <!-- ====== BACK: Easter Egg with Central Dogma ====== -->
        <div class="face back">
          <svg viewBox="0 0 330 380" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Back page (forest green, tilted) -->
            <rect y="29.6" width="285.6" height="352" rx="18" transform="rotate(-5.75 0 29.6)" fill="#064e3b"/>
            <!-- Card face -->
            <g filter="url(#b-shadow)">
              <rect x="45.5" y="10" width="274" height="352" rx="18" fill="#047857"/>
              
              <!-- Micro Bio Particles -->
              <circle cx="95" cy="55" r="2.2" fill="#a7f3d0" class="star star-1"/>
              <circle cx="260" cy="85" r="1.8" fill="#a7f3d0" class="star star-2"/>
              <circle cx="80" cy="275" r="2.2" fill="#a7f3d0" class="star star-3"/>
              <circle cx="290" cy="295" r="2.4" fill="#a7f3d0" class="star star-1"/>
              <circle cx="130" cy="320" r="1.6" fill="#a7f3d0" class="star star-2"/>
              <circle cx="255" cy="48" r="1.4" fill="#a7f3d0" class="star star-3"/>
              <circle cx="300" cy="195" r="2" fill="#a7f3d0" class="star star-2"/>
              <circle cx="70" cy="145" r="1.8" fill="#a7f3d0" class="star star-1"/>
              
              <!-- Central Dogma Flow -->
              <text x="182" y="115" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#a7f3d0" letter-spacing="1">中心法则 · 信息流</text>
              <text x="182" y="152" text-anchor="middle" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="white" class="easter-dogma">DNA → RNA → 蛋白质</text>
              
              <!-- Mendel's Pea Pod Icon -->
              <g class="mendel-pea">
                <rect x="135" y="180" width="95" height="34" rx="17" fill="#065f46" stroke="#34d399" stroke-width="2"/>
                <circle cx="152" cy="197" r="8" fill="#34d399"/>
                <circle cx="172" cy="197" r="8" fill="#10b981"/>
                <circle cx="192" cy="197" r="8" fill="#34d399"/>
                <circle cx="212" cy="197" r="8" fill="#10b981"/>
              </g>

              <text x="182" y="244" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#fbbf24">F₂ 性状分离比 3 : 1</text>

              <!-- Fun text -->
              <text x="182" y="288" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="white" opacity="0.95">🎉 发现生命彩蛋！</text>
              <text x="182" y="314" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" fill="#a7f3d0" opacity="0.85">— 生命的本质是信息的流动与演变</text>
            </g>
            
            <defs>
              <filter id="b-shadow" x="35.5" y="0" width="294" height="372" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="bg"/>
                <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="a"/>
                <feOffset/><feGaussianBlur stdDeviation="5"/>
                <feComposite in2="a" operator="out"/>
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend in2="bg" result="s"/><feBlend in="SourceGraphic" in2="s"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
:root {
  --dna-card-bg: #FFFFFF;
  --dna-lines: #F1F5F9;
  --dna-cutout: #FFFFFF;
  --dna-back-strand: #A7F3D0;
  --dna-text: #059669;
}

:global(html.dark) {
  --dna-card-bg: #1B1B1F;
  --dna-lines: #2E2E32;
  --dna-cutout: #1B1B1F;
  --dna-back-strand: #064E3B;
  --dna-text: #6EE7B7;
}

.flip-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  perspective: 1000px;
  cursor: pointer;
  user-select: none;
}

/* Ambient Anti-gravity levitation */
.levitate-box {
  width: 100%;
  animation: notebook-float 6s ease-in-out infinite;
  will-change: transform;
}

.levitate-box.is-hovered {
  animation-play-state: paused;
}

.tilt-layer {
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.15s ease-out;
  will-change: transform;
}

.flip-card {
  position: relative;
  width: 100%;
  aspect-ratio: 330 / 380;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.34, 1.25, 0.64, 1);
  will-change: transform;
}

.flip-card.is-flipped {
  transform: rotateY(180deg);
}

.face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.face svg {
  display: block;
  width: 100%;
  height: 100%;
  transition: filter 0.35s ease;
}

.back {
  transform: rotateY(180deg);
}

.flip-wrap:hover .front svg,
.flip-wrap:hover .back svg {
  filter: drop-shadow(0 14px 28px rgba(16, 185, 129, 0.38));
}

/* ---- Front DNA Micro-Animations ---- */
.helix-strand {
  transition: stroke-width 0.3s ease;
}

.genetic-node {
  animation: node-breathe 3.5s ease-in-out infinite alternate;
}

.node-1, .node-4 { animation-delay: 0s; }
.node-2, .node-3 { animation-delay: 0.8s; }
.node-5, .node-8 { animation-delay: 1.6s; }
.node-6, .node-7 { animation-delay: 2.4s; }

.apex-spark {
  animation: spark-twinkle 2.5s ease-in-out infinite alternate;
  transform-origin: 182.5px 48px;
}

/* ---- Back Face Animations ---- */
.star {
  transform-origin: center;
  animation: star-twinkle 2.5s ease-in-out infinite;
}

.star-1 { animation-delay: 0s; }
.star-2 { animation-delay: 0.8s; }
.star-3 { animation-delay: 1.6s; }

.easter-dogma {
  animation: dogma-radiance 4s ease-in-out infinite;
}

.mendel-pea {
  animation: pea-hover 3s ease-in-out infinite;
}

/* ---- Keyframe Animations ---- */
@keyframes notebook-float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-6px) rotate(0.4deg);
  }
}

@keyframes node-breathe {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1.08);
  }
}

@keyframes spark-twinkle {
  0%, 100% {
    opacity: 0.65;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
}

@keyframes star-twinkle {
  0%, 100% {
    opacity: 0.35;
    transform: scale(0.85);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
}

@keyframes dogma-radiance {
  0%, 100% {
    filter: drop-shadow(0 0 2px rgba(167, 243, 208, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(167, 243, 208, 0.9));
  }
}

@keyframes pea-hover {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@media (max-width: 640px) {
  .flip-wrap {
    max-width: 250px;
  }
}
</style>
