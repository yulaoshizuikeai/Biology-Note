<script setup lang="ts">
// 22 elegant organic bioluminescent motes (bokeh / cellular vesicles)
// Soft radial gradients and gentle floating drift, completely eliminating harsh "dead pixel" specks.
const particles = [
  { left: 6, top: 22, size: 28, delay: 0.0, duration: 14, type: "emerald", op: 0.30 },
  { left: 14, top: 68, size: 22, delay: 2.5, duration: 16, type: "teal", op: 0.25 },
  { left: 22, top: 40, size: 34, delay: 5.0, duration: 15, type: "mint", op: 0.28 },
  { left: 30, top: 82, size: 18, delay: 1.2, duration: 18, type: "cyan", op: 0.22 },
  { left: 38, top: 18, size: 32, delay: 3.8, duration: 13, type: "emerald", op: 0.32 },
  { left: 46, top: 58, size: 24, delay: 6.2, duration: 17, type: "mint", op: 0.26 },
  { left: 54, top: 86, size: 36, delay: 0.8, duration: 19, type: "teal", op: 0.24 },
  { left: 62, top: 28, size: 20, delay: 4.5, duration: 14, type: "emerald", op: 0.28 },
  { left: 70, top: 72, size: 30, delay: 2.0, duration: 16, type: "cyan", op: 0.25 },
  { left: 78, top: 15, size: 26, delay: 7.1, duration: 15, type: "mint", op: 0.30 },
  { left: 86, top: 62, size: 34, delay: 3.2, duration: 18, type: "teal", op: 0.22 },
  { left: 92, top: 35, size: 22, delay: 5.6, duration: 13, type: "emerald", op: 0.26 },
  { left: 10, top: 88, size: 26, delay: 8.0, duration: 15, type: "mint", op: 0.25 },
  { left: 26, top: 12, size: 20, delay: 4.1, duration: 17, type: "teal", op: 0.28 },
  { left: 50, top: 32, size: 38, delay: 6.8, duration: 16, type: "emerald", op: 0.22 },
  { left: 66, top: 92, size: 24, delay: 1.9, duration: 14, type: "mint", op: 0.27 },
  { left: 82, top: 48, size: 28, delay: 9.2, duration: 18, type: "cyan", op: 0.24 },
  { left: 95, top: 80, size: 30, delay: 3.5, duration: 15, type: "teal", op: 0.25 },
  { left: 18, top: 52, size: 18, delay: 7.5, duration: 16, type: "emerald", op: 0.28 },
  { left: 42, top: 76, size: 26, delay: 2.8, duration: 14, type: "mint", op: 0.26 },
  { left: 74, top: 42, size: 22, delay: 5.2, duration: 17, type: "teal", op: 0.24 },
  { left: 88, top: 18, size: 32, delay: 1.5, duration: 15, type: "emerald", op: 0.28 }
];
</script>

<template>
  <div class="cc-bio-field" aria-hidden="true">
    <div
      v-for="(p, i) in particles"
      :key="i"
      :class="['bio-orb', `type-${p.type}`]"
      :style="{
        left: `${p.left}%`,
        top: `${p.top}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        animationDelay: `${p.delay}s`,
        animationDuration: `${p.duration}s`,
        '--base-op': p.op,
      }"
    />
  </div>
</template>

<style scoped>
.cc-bio-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  contain: strict;
}

/* Soft organic bioluminescent motes with radial feathered gradients */
.bio-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
  animation: bio-float ease-in-out infinite alternate;
  filter: blur(1.5px);
}

/* Gradients tailored for soft life bokeh */
.bio-orb.type-emerald {
  background: radial-gradient(circle, rgba(16, 185, 129, 0.65) 0%, rgba(16, 185, 129, 0.15) 50%, rgba(16, 185, 129, 0) 72%);
}

.bio-orb.type-teal {
  background: radial-gradient(circle, rgba(20, 184, 166, 0.60) 0%, rgba(20, 184, 166, 0.15) 50%, rgba(20, 184, 166, 0) 72%);
}

.bio-orb.type-mint {
  background: radial-gradient(circle, rgba(52, 211, 153, 0.70) 0%, rgba(52, 211, 153, 0.18) 50%, rgba(52, 211, 153, 0) 72%);
}

.bio-orb.type-cyan {
  background: radial-gradient(circle, rgba(6, 182, 212, 0.55) 0%, rgba(6, 182, 212, 0.12) 50%, rgba(6, 182, 212, 0) 72%);
}

/* Gentle organic cytoplasmic drift */
@keyframes bio-float {
  0% {
    opacity: var(--base-op);
    transform: translate3d(0, 0, 0) scale(0.92);
  }
  50% {
    opacity: calc(var(--base-op) * 1.35);
    transform: translate3d(14px, -24px, 0) scale(1.12);
  }
  100% {
    opacity: calc(var(--base-op) * 0.85);
    transform: translate3d(-10px, -48px, 0) scale(0.96);
  }
}

/* Dark mode luminescence enhancement */
:global(html.dark) .bio-orb {
  filter: blur(1px);
}
:global(html.dark) .bio-orb.type-emerald {
  background: radial-gradient(circle, rgba(52, 211, 153, 0.8) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(16, 185, 129, 0) 72%);
}
:global(html.dark) .bio-orb.type-teal {
  background: radial-gradient(circle, rgba(45, 212, 191, 0.75) 0%, rgba(20, 184, 166, 0.25) 50%, rgba(20, 184, 166, 0) 72%);
}
:global(html.dark) .bio-orb.type-mint {
  background: radial-gradient(circle, rgba(110, 231, 183, 0.85) 0%, rgba(52, 211, 153, 0.35) 50%, rgba(52, 211, 153, 0) 72%);
}
:global(html.dark) .bio-orb.type-cyan {
  background: radial-gradient(circle, rgba(34, 211, 238, 0.7) 0%, rgba(6, 182, 212, 0.25) 50%, rgba(6, 182, 212, 0) 72%);
}

@media (prefers-reduced-motion: reduce) {
  .bio-orb {
    animation: none;
    opacity: var(--base-op);
  }
}
</style>
