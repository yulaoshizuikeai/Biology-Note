<script setup lang="ts">
// 18 lightweight ambient bio life particles with deterministic positions
const particles = [
  { left: 8, top: 75, size: 3.5, delay: 0, duration: 13, color: "var(--p-emerald)" },
  { left: 16, top: 35, size: 2.5, delay: 2.5, duration: 15, color: "var(--p-teal)" },
  { left: 24, top: 82, size: 4.0, delay: 5.0, duration: 14, color: "var(--p-mint)" },
  { left: 32, top: 20, size: 2.0, delay: 1.2, duration: 17, color: "var(--p-emerald)" },
  { left: 40, top: 60, size: 3.0, delay: 3.8, duration: 12, color: "var(--p-teal)" },
  { left: 48, top: 88, size: 4.5, delay: 6.2, duration: 16, color: "var(--p-mint)" },
  { left: 56, top: 15, size: 2.5, delay: 0.8, duration: 18, color: "var(--p-emerald)" },
  { left: 63, top: 70, size: 3.2, delay: 4.5, duration: 13, color: "var(--p-teal)" },
  { left: 71, top: 40, size: 2.8, delay: 2.0, duration: 15, color: "var(--p-mint)" },
  { left: 79, top: 85, size: 4.0, delay: 7.1, duration: 14, color: "var(--p-emerald)" },
  { left: 86, top: 25, size: 2.2, delay: 3.2, duration: 16, color: "var(--p-teal)" },
  { left: 93, top: 65, size: 3.5, delay: 5.6, duration: 12, color: "var(--p-mint)" },
  { left: 12, top: 92, size: 3.0, delay: 8.0, duration: 14, color: "var(--p-emerald)" },
  { left: 38, top: 90, size: 2.5, delay: 4.1, duration: 17, color: "var(--p-teal)" },
  { left: 68, top: 95, size: 3.8, delay: 6.8, duration: 15, color: "var(--p-mint)" },
  { left: 82, top: 50, size: 2.0, delay: 1.9, duration: 13, color: "var(--p-emerald)" },
  { left: 28, top: 45, size: 3.2, delay: 9.2, duration: 16, color: "var(--p-teal)" },
  { left: 52, top: 30, size: 2.8, delay: 3.5, duration: 14, color: "var(--p-mint)" },
];
</script>

<template>
  <div class="cc-bio-field" aria-hidden="true">
    <div
      v-for="(p, i) in particles"
      :key="i"
      class="bio-particle"
      :style="{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        animationDelay: `${p.delay}s`,
        animationDuration: `${p.duration}s`,
        backgroundColor: p.color,
      }"
    />
  </div>
</template>

<style scoped>
.cc-bio-field {
  --p-emerald: #10B981;
  --p-teal: #14B8A6;
  --p-mint: #34D399;
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  opacity: 0.65;
}

.bio-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  box-shadow: 0 0 10px currentColor;
  animation: quantum-float ease-in-out infinite;
  will-change: transform, opacity;
}

@keyframes quantum-float {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) scale(0.6);
  }
  20% {
    opacity: 0.65;
  }
  50% {
    opacity: 0.85;
    transform: translate3d(12px, -45px, 0) scale(1.1);
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translate3d(-10px, -95px, 0) scale(0.5);
  }
}

@media (prefers-reduced-motion: reduce) {
  .quantum-particle {
    animation: none;
    opacity: 0.3;
  }
}
</style>
