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
  ry.value = +(x * 10).toFixed(1);
  rx.value = +(-y * 10).toFixed(1);
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
        <div class="flip-card" :class="{ 'is-flipped': flipped }">
          <!-- ====== FRONT: Tactile Laboratory Journal + Precision DNA Helix ====== -->
          <div class="face front">
            <svg
              viewBox="0 0 350 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="hero-dna-svg"
            >
              <defs>
                <!-- Clean Minimalist Paper Shadow -->
                <filter
                  id="f-shadow"
                  x="20"
                  y="0"
                  width="310"
                  height="375"
                  filterUnits="userSpaceOnUse"
                >
                  <feDropShadow
                    dx="0"
                    dy="10"
                    stdDeviation="14"
                    flood-color="#1F2328"
                    flood-opacity="0.08"
                  />
                  <feDropShadow
                    dx="0"
                    dy="2"
                    stdDeviation="4"
                    flood-color="#000000"
                    flood-opacity="0.04"
                  />
                </filter>

                <!-- Notebook Ruled Lines -->
                <pattern id="f-lines" width="100%" height="24" patternUnits="userSpaceOnUse">
                  <line
                    x1="0"
                    y1="23.5"
                    x2="100%"
                    y2="23.5"
                    stroke="var(--dna-lines)"
                    stroke-width="1.2"
                  />
                </pattern>

                <!-- Harmonized Botanical Sage Gradients -->
                <linearGradient id="strand-grad-1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#52B788" />
                  <stop offset="50%" stop-color="#3B7A57" />
                  <stop offset="100%" stop-color="#2E6B56" />
                </linearGradient>

                <linearGradient id="strand-grad-2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#74C69D" />
                  <stop offset="50%" stop-color="#52B788" />
                  <stop offset="100%" stop-color="#2E6B56" />
                </linearGradient>

                <linearGradient id="node-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#74C69D" />
                  <stop offset="100%" stop-color="#2E6B56" />
                </linearGradient>

                <linearGradient id="pedestal-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="var(--dna-text)" stop-opacity="0.05" />
                  <stop offset="25%" stop-color="var(--dna-text)" stop-opacity="0.6" />
                  <stop offset="50%" stop-color="var(--dna-text)" />
                  <stop offset="75%" stop-color="var(--dna-text)" stop-opacity="0.6" />
                  <stop offset="100%" stop-color="var(--dna-text)" stop-opacity="0.05" />
                </linearGradient>
              </defs>

              <!-- Layer 1: Symmetrically balanced hardcover (Sage Moss) -->
              <!-- Rotated around card center (175, 186) by -2.5deg so it peeks out symmetrically on both left & right -->
              <rect
                x="34"
                y="8"
                width="282"
                height="356"
                rx="16"
                transform="rotate(-2.5 175 186)"
                fill="var(--dna-cover)"
              />

              <!-- Layer 2: Main tactile paper notebook page -->
              <g filter="url(#f-shadow)">
                <rect
                  x="38"
                  y="10"
                  width="274"
                  height="352"
                  rx="14"
                  fill="var(--dna-card-bg)"
                  stroke="var(--dna-lines)"
                  stroke-width="1"
                />
                <rect x="38" y="24" width="274" height="324" fill="url(#f-lines)" />

                <!-- Left Spine Ribbon Stitch (Humanist Laboratory Notebook Detail) -->
                <line
                  x1="62"
                  y1="10"
                  x2="62"
                  y2="362"
                  stroke="var(--dna-lines)"
                  stroke-width="1.5"
                  stroke-dasharray="4 3"
                />
                <rect
                  x="56"
                  y="10"
                  width="12"
                  height="26"
                  rx="2"
                  fill="var(--dna-ribbon)"
                  opacity="0.85"
                />

                <!-- ================= DNA DOUBLE HELIX ================= -->
                <!-- Centered at x = 175 -->
                <g class="dna-helix-group">
                  <!-- 1. BASE PAIR RUNGS (Complementary Base Pairs) -->
                  <g class="base-pairs">
                    <!-- Rung 1 -->
                    <g class="rung rung-1">
                      <line
                        x1="139.78"
                        y1="78"
                        x2="173.25"
                        y2="78"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="78"
                        x2="210.22"
                        y2="78"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="78" r="1.5" fill="var(--dna-text)" />
                    </g>
                    <!-- Rung 2 -->
                    <g class="rung rung-2">
                      <line
                        x1="148.90"
                        y1="90"
                        x2="173.25"
                        y2="90"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="90"
                        x2="201.10"
                        y2="90"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="90" r="1.5" fill="var(--dna-text)" />
                    </g>
                    <!-- Rung 3 -->
                    <g class="rung rung-3">
                      <line
                        x1="148.90"
                        y1="122"
                        x2="173.25"
                        y2="122"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="122"
                        x2="201.10"
                        y2="122"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="122" r="1.5" fill="var(--dna-text)" />
                    </g>
                    <!-- Rung 4 -->
                    <g class="rung rung-4">
                      <line
                        x1="135.25"
                        y1="148"
                        x2="173.25"
                        y2="148"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="148"
                        x2="214.75"
                        y2="148"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="148" r="1.5" fill="var(--dna-text)" />
                    </g>
                    <!-- Rung 5 -->
                    <g class="rung rung-5">
                      <line
                        x1="141.10"
                        y1="192"
                        x2="173.25"
                        y2="192"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="192"
                        x2="208.90"
                        y2="192"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="192" r="1.5" fill="var(--dna-text)" />
                    </g>
                    <!-- Rung 6 -->
                    <g class="rung rung-6">
                      <line
                        x1="156.70"
                        y1="218"
                        x2="173.25"
                        y2="218"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="218"
                        x2="193.30"
                        y2="218"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="218" r="1.5" fill="var(--dna-text)" />
                    </g>
                    <!-- Rung 7 -->
                    <g class="rung rung-7">
                      <line
                        x1="152.70"
                        y1="252"
                        x2="173.25"
                        y2="252"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="252"
                        x2="197.30"
                        y2="252"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="252" r="1.5" fill="var(--dna-text)" />
                    </g>
                    <!-- Rung 8 -->
                    <g class="rung rung-8">
                      <line
                        x1="137.90"
                        y1="264"
                        x2="173.25"
                        y2="264"
                        stroke="var(--dna-rung-2)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <line
                        x1="176.75"
                        y1="264"
                        x2="212.10"
                        y2="264"
                        stroke="var(--dna-rung-1)"
                        stroke-width="3.5"
                        stroke-linecap="round"
                      />
                      <circle cx="175" cy="264" r="1.5" fill="var(--dna-text)" />
                    </g>
                  </g>

                  <!-- 2. STRANDS WITH SEAMLESS 3D DEPTH CUTOUT -->
                  <!-- Background Strands -->
                  <path
                    d="M 133.00 65.00 C 145.00 75.00 205.00 95.00 227.00 115.00 C 235.00 122.00 220.00 132.00 212.80 135.00"
                    stroke="var(--dna-back-strand)"
                    stroke-width="5"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <path
                    d="M 212.80 135.00 C 185.00 148.00 130.00 162.00 124.50 172.00 C 122.00 178.00 150.00 195.00 202.95 205.00"
                    stroke="var(--dna-back-strand)"
                    stroke-width="5"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <path
                    d="M 202.95 205.00 C 230.00 218.00 238.00 225.00 218.00 235.00 C 185.00 250.00 120.00 265.00 105.83 275.00"
                    stroke="var(--dna-back-strand)"
                    stroke-width="5"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Foreground Strands (with 3D Cutout understroke) -->
                  <!-- Front Stroke 1 -->
                  <path
                    d="M 217.00 65.00 C 205.00 75.00 145.00 95.00 123.00 115.00 C 115.00 122.00 130.00 132.00 137.20 135.00"
                    stroke="var(--dna-cutout)"
                    stroke-width="9"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <path
                    d="M 217.00 65.00 C 205.00 75.00 145.00 95.00 123.00 115.00 C 115.00 122.00 130.00 132.00 137.20 135.00"
                    stroke="url(#strand-grad-1)"
                    stroke-width="5.5"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Front Stroke 2 -->
                  <path
                    d="M 137.20 135.00 C 165.00 148.00 220.00 162.00 225.50 172.00 C 228.00 178.00 200.00 195.00 147.05 205.00"
                    stroke="var(--dna-cutout)"
                    stroke-width="9"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <path
                    d="M 137.20 135.00 C 165.00 148.00 220.00 162.00 225.50 172.00 C 228.00 178.00 200.00 195.00 147.05 205.00"
                    stroke="url(#strand-grad-2)"
                    stroke-width="5.5"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- Front Stroke 3 -->
                  <path
                    d="M 147.05 205.00 C 120.00 218.00 112.00 225.00 132.00 235.00 C 165.00 250.00 230.00 265.00 244.17 275.00"
                    stroke="var(--dna-cutout)"
                    stroke-width="9"
                    stroke-linecap="round"
                    fill="none"
                  />
                  <path
                    d="M 147.05 205.00 C 120.00 218.00 112.00 225.00 132.00 235.00 C 165.00 250.00 230.00 265.00 244.17 275.00"
                    stroke="url(#strand-grad-1)"
                    stroke-width="5.5"
                    stroke-linecap="round"
                    fill="none"
                  />

                  <!-- 3. NODES -->
                  <g class="backbone-nodes">
                    <g class="genetic-node" transform="translate(139.78, 78)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(210.22, 78)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(148.90, 90)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(201.10, 90)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(148.90, 122)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(201.10, 122)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(135.25, 148)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(214.75, 148)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(141.10, 192)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(208.90, 192)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(156.70, 218)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(193.30, 218)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(152.70, 252)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(197.30, 252)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(137.90, 264)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                    <g class="genetic-node" transform="translate(212.10, 264)">
                      <circle cx="0" cy="0" r="3.8" fill="url(#node-grad)" />
                      <circle cx="-0.6" cy="-0.6" r="1.2" fill="#FFFFFF" />
                    </g>
                  </g>

                  <!-- 4. APEX SCIENTIFIC SPARK -->
                  <g class="apex-spark" transform="translate(175, 48)">
                    <circle cx="0" cy="0" r="2.2" fill="var(--dna-text)" />
                    <line
                      x1="0"
                      y1="-5.5"
                      x2="0"
                      y2="5.5"
                      stroke="var(--dna-text)"
                      stroke-width="1.2"
                      stroke-linecap="round"
                    />
                    <line
                      x1="-5.5"
                      y1="0"
                      x2="5.5"
                      y2="0"
                      stroke="var(--dna-text)"
                      stroke-width="1.2"
                      stroke-linecap="round"
                    />
                  </g>

                  <!-- 5. REFINED BASELINE PEDESTAL -->
                  <rect
                    x="102"
                    y="296"
                    width="146"
                    height="3"
                    rx="1.5"
                    fill="url(#pedestal-grad)"
                  />
                  <circle cx="175" cy="297.5" r="2.8" fill="var(--dna-text)" />
                  <circle cx="175" cy="297.5" r="1" fill="#FFFFFF" />

                  <!-- 6. MONOGRAM BRAND TEXT -->
                  <text
                    x="175"
                    y="320"
                    text-anchor="middle"
                    font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                    font-size="9.5"
                    font-weight="700"
                    letter-spacing="3"
                    fill="var(--dna-text)"
                  >
                    BIOLOGY NOTE
                  </text>
                </g>
              </g>
            </svg>
          </div>

          <!-- ====== BACK: Central Dogma Biology Easter Egg ====== -->
          <div class="face back">
            <svg
              viewBox="0 0 350 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="hero-dna-svg"
            >
              <!-- Back Page (Layered Cover) -->
              <rect
                x="34"
                y="8"
                width="282"
                height="356"
                rx="16"
                transform="rotate(-2.5 175 186)"
                fill="var(--dna-back-card-outer)"
              />

              <!-- Inner Card -->
              <g filter="url(#f-shadow)">
                <rect
                  x="38"
                  y="10"
                  width="274"
                  height="352"
                  rx="14"
                  fill="var(--dna-back-card-bg)"
                  stroke="var(--dna-back-card-border)"
                  stroke-width="1"
                />

                <!-- Decorative Biological Motes -->
                <circle cx="90" cy="55" r="2" fill="var(--dna-text)" opacity="0.4" />
                <circle cx="260" cy="85" r="1.8" fill="var(--dna-text)" opacity="0.4" />
                <circle cx="80" cy="275" r="2" fill="var(--dna-text)" opacity="0.4" />
                <circle cx="270" cy="295" r="2.2" fill="var(--dna-text)" opacity="0.4" />

                <!-- Central Dogma Concept -->
                <text
                  x="175"
                  y="110"
                  text-anchor="middle"
                  font-family="system-ui, -apple-system, sans-serif"
                  font-size="16"
                  font-weight="700"
                  fill="var(--dna-text)"
                  letter-spacing="1.5"
                >
                  中心法则 · 信息流
                </text>

                <text
                  x="175"
                  y="146"
                  text-anchor="middle"
                  font-family="Georgia, 'Times New Roman', serif"
                  font-size="20"
                  font-weight="bold"
                  fill="var(--dna-title)"
                  letter-spacing="0.5"
                >
                  DNA → RNA → 蛋白质
                </text>

                <!-- Mendel Pea Pod Icon -->
                <g class="mendel-pea" transform="translate(130, 180)">
                  <rect
                    x="0"
                    y="0"
                    width="90"
                    height="32"
                    rx="16"
                    fill="var(--dna-pea-bg)"
                    stroke="var(--dna-text)"
                    stroke-width="1.8"
                  />
                  <circle cx="18" cy="16" r="7" fill="var(--dna-text)" />
                  <circle cx="36" cy="16" r="7" fill="var(--dna-rung-2)" />
                  <circle cx="54" cy="16" r="7" fill="var(--dna-text)" />
                  <circle cx="72" cy="16" r="7" fill="var(--dna-rung-2)" />
                </g>

                <text
                  x="175"
                  y="244"
                  text-anchor="middle"
                  font-family="system-ui, sans-serif"
                  font-size="14"
                  font-weight="700"
                  fill="var(--dna-tag)"
                >
                  F₂ 性状分离比 3 : 1
                </text>

                <text
                  x="175"
                  y="286"
                  text-anchor="middle"
                  font-family="system-ui, -apple-system, sans-serif"
                  font-size="15"
                  font-weight="600"
                  fill="var(--dna-title)"
                >
                  🌱 生命的本质
                </text>
                <text
                  x="175"
                  y="312"
                  text-anchor="middle"
                  font-family="system-ui, -apple-system, sans-serif"
                  font-size="12.5"
                  fill="var(--dna-text)"
                  opacity="0.9"
                >
                  信息的流动、表达与演变
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-wrap {
  --dna-card-bg: #faf9f5;
  --dna-lines: #ebe7df;
  --dna-cutout: #faf9f5;
  --dna-back-strand: #a3c9b8;
  --dna-rung-1: #2e6b56;
  --dna-rung-2: #52b788;
  --dna-text: #2e6b56;
  --dna-title: #1f2328;
  --dna-cover: #2e6b56;
  --dna-ribbon: #3b7a57;
  --dna-back-card-outer: #1e3a2f;
  --dna-back-card-bg: #f3f1ec;
  --dna-back-card-border: #e0ddd5;
  --dna-pea-bg: rgba(46, 107, 86, 0.12);
  --dna-tag: #c27803;
}

:global(html.dark) .flip-wrap {
  --dna-card-bg: #1c1f21;
  --dna-lines: #282c2e;
  --dna-cutout: #1c1f21;
  --dna-back-strand: #264a3d;
  --dna-rung-1: #52b788;
  --dna-rung-2: #74c69d;
  --dna-text: #52b788;
  --dna-title: #e3e5e8;
  --dna-cover: #1a382c;
  --dna-ribbon: #52b788;
  --dna-back-card-outer: #152820;
  --dna-back-card-bg: #1c1f21;
  --dna-back-card-border: rgba(255, 255, 255, 0.08);
  --dna-pea-bg: rgba(82, 183, 136, 0.15);
  --dna-tag: #f0c37b;
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
  z-index: 2;
}

/* Ambient levitation */
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
  aspect-ratio: 350 / 380;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.34, 1.25, 0.64, 1);
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
  transition: filter 0.3s ease;
}

.back {
  transform: rotateY(180deg);
}

.flip-wrap:hover .front svg,
.flip-wrap:hover .back svg {
  filter: drop-shadow(0 10px 24px rgba(46, 107, 86, 0.16));
}

:global(html.dark) .flip-wrap:hover .front svg,
:global(html.dark) .flip-wrap:hover .back svg {
  filter: drop-shadow(0 10px 24px rgba(0, 0, 0, 0.45));
}

/* Micro animations */
.genetic-node {
  animation: node-breathe 3.5s ease-in-out infinite alternate;
}

.apex-spark {
  animation: spark-twinkle 2.5s ease-in-out infinite alternate;
  transform-origin: 175px 48px;
}

.mendel-pea {
  animation: pea-hover 3s ease-in-out infinite;
}

@keyframes notebook-float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-5px) rotate(0.3deg);
  }
}

@keyframes node-breathe {
  0% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1.06);
  }
}

@keyframes spark-twinkle {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes pea-hover {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@media (max-width: 640px) {
  .flip-wrap {
    max-width: 250px;
  }
}
</style>
