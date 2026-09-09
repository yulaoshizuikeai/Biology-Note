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
        <!-- ====== FRONT: Notebook + Animated DNA Double Helix ====== -->
        <div class="face front">
          <svg viewBox="0 0 330 380" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Back page (emerald green, tilted) -->
            <rect y="29.6086" width="285.591" height="352" rx="18" transform="rotate(-5.74915 0 29.6086)" fill="#10B981"/>
            
            <!-- Front page -->
            <g filter="url(#f-shadow)">
              <rect x="45.5326" y="10" width="274" height="352" rx="18" fill="white"/>
              <rect x="45.5326" y="10" width="274" height="352" rx="18" fill="url(#f-lines)"/>
              
              <!-- DNA Double Helix Base Pairs (Horizontal Connectors) -->
              <g class="base-pair-group">
                <line x1="148" y1="92" x2="217" y2="92" stroke="#10B981" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8 4" class="rung rung-1"/>
                <line x1="138" y1="126" x2="227" y2="126" stroke="#059669" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="9 4" class="rung rung-2"/>
                <circle cx="182.5" cy="165" r="7" fill="#10B981" class="helix-center"/>
                <line x1="138" y1="204" x2="227" y2="204" stroke="#059669" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="9 4" class="rung rung-3"/>
                <line x1="148" y1="238" x2="217" y2="238" stroke="#10B981" stroke-width="4.5" stroke-linecap="round" stroke-dasharray="8 4" class="rung rung-4"/>
              </g>

              <!-- Strand A (Fluid Sine Wave) -->
              <path d="M152 75 C124 110, 124 145, 182.5 165 C241 185, 241 220, 213 255" stroke="#059669" stroke-width="8" stroke-linecap="round" fill="none" class="helix-strand strand-a"/>

              <!-- Strand B (Opposite Sine Wave) -->
              <path d="M213 75 C241 110, 241 145, 182.5 165 C124 185, 124 220, 152 255" stroke="#10B981" stroke-width="8" stroke-linecap="round" fill="none" class="helix-strand strand-b"/>

              <!-- Genetic Nodes with Breathing Animation -->
              <g class="genetic-node node-1">
                <circle cx="152" cy="75" r="7" fill="#047857"/>
                <circle cx="152" cy="75" r="2.5" fill="#ffffff"/>
              </g>
              <g class="genetic-node node-2">
                <circle cx="213" cy="75" r="7" fill="#10B981"/>
                <circle cx="213" cy="75" r="2.5" fill="#ffffff"/>
              </g>
              <g class="genetic-node node-3">
                <circle cx="132" cy="122" r="7.5" fill="#047857"/>
                <circle cx="132" cy="122" r="2.5" fill="#ffffff"/>
              </g>
              <g class="genetic-node node-4">
                <circle cx="233" cy="122" r="7.5" fill="#10B981"/>
                <circle cx="233" cy="122" r="2.5" fill="#ffffff"/>
              </g>
              <g class="genetic-node node-5">
                <circle cx="132" cy="208" r="7.5" fill="#10B981"/>
                <circle cx="132" cy="208" r="2.5" fill="#ffffff"/>
              </g>
              <g class="genetic-node node-6">
                <circle cx="233" cy="208" r="7.5" fill="#047857"/>
                <circle cx="233" cy="208" r="2.5" fill="#ffffff"/>
              </g>
              <g class="genetic-node node-7">
                <circle cx="152" cy="255" r="7" fill="#10B981"/>
                <circle cx="152" cy="255" r="2.5" fill="#ffffff"/>
              </g>
              <g class="genetic-node node-8">
                <circle cx="213" cy="255" r="7" fill="#047857"/>
                <circle cx="213" cy="255" r="2.5" fill="#ffffff"/>
              </g>

              <!-- Life Sprout glint at top -->
              <path d="M182.5 60 C182.5 48, 194 46, 194 46 C194 46, 186 54, 186 60 Z" fill="#10B981" class="sprout-a"/>
              <path d="M182.5 60 C182.5 50, 172 48, 172 48 C172 48, 179 55, 182.5 60 Z" fill="#059669" class="sprout-b"/>

              <!-- Underline -->
              <path d="M97.5326 280H267.033" stroke="#10B981" stroke-width="10" stroke-linecap="round"/>
            </g>

            <defs>
              <filter id="f-shadow" x="35.5326" y="0" width="294" height="372" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.18 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
              </filter>
              <pattern id="f-lines" patternUnits="userSpaceOnUse" patternTransform="matrix(1370 0 0 40 45.5326 182)" preserveAspectRatio="none" viewBox="0 0 1370 40" width="1" height="1">
                <rect width="274" height="8" fill="#D1D1D1" fill-opacity="0.32"/>
              </pattern>
            </defs>
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

.helix-center {
  animation: center-pulse 2.8s ease-in-out infinite;
  transform-origin: 182.5px 165px;
}

.genetic-node {
  animation: node-breathe 3.5s ease-in-out infinite alternate;
}

.node-1, .node-4 { animation-delay: 0s; }
.node-2, .node-3 { animation-delay: 0.8s; }
.node-5, .node-8 { animation-delay: 1.6s; }
.node-6, .node-7 { animation-delay: 2.4s; }

.sprout-a, .sprout-b {
  animation: sprout-sway 4s ease-in-out infinite alternate;
  transform-origin: 182.5px 60px;
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

@keyframes center-pulse {
  0%, 100% {
    transform: scale(0.92);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.25);
    opacity: 1;
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

@keyframes sprout-sway {
  0% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(3deg);
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
