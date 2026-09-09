<script setup lang="ts">
// 18 gentle ambient botanical motes (Warm Neo-Minimalism)
// Low-opacity, calm drifting motes blending seamlessly into paper backgrounds.
const particles = [
  { left: 8, top: 24, size: 26, delay: 0.0, duration: 22, type: "sage", op: 0.14 },
  { left: 16, top: 70, size: 20, delay: 3.5, duration: 26, type: "moss", op: 0.12 },
  { left: 25, top: 38, size: 30, delay: 6.0, duration: 24, type: "herb", op: 0.13 },
  { left: 34, top: 80, size: 16, delay: 1.5, duration: 28, type: "slate", op: 0.1 },
  { left: 44, top: 20, size: 28, delay: 4.8, duration: 20, type: "sage", op: 0.15 },
  { left: 52, top: 60, size: 22, delay: 7.2, duration: 25, type: "herb", op: 0.12 },
  { left: 60, top: 84, size: 32, delay: 1.0, duration: 29, type: "moss", op: 0.11 },
  { left: 68, top: 26, size: 18, delay: 5.5, duration: 23, type: "sage", op: 0.13 },
  { left: 76, top: 74, size: 26, delay: 2.5, duration: 26, type: "slate", op: 0.12 },
  { left: 84, top: 18, size: 24, delay: 8.1, duration: 24, type: "herb", op: 0.14 },
  { left: 91, top: 58, size: 30, delay: 4.2, duration: 27, type: "moss", op: 0.11 },
  { left: 12, top: 86, size: 22, delay: 9.0, duration: 25, type: "herb", op: 0.12 },
  { left: 30, top: 14, size: 18, delay: 5.1, duration: 27, type: "moss", op: 0.13 },
  { left: 56, top: 34, size: 32, delay: 7.8, duration: 26, type: "sage", op: 0.11 },
  { left: 72, top: 90, size: 22, delay: 2.2, duration: 23, type: "herb", op: 0.13 },
  { left: 88, top: 46, size: 24, delay: 10.2, duration: 28, type: "slate", op: 0.11 },
  { left: 22, top: 54, size: 16, delay: 8.5, duration: 25, type: "sage", op: 0.13 },
  { left: 80, top: 36, size: 20, delay: 6.2, duration: 27, type: "moss", op: 0.12 },
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

/* Feathered organic motes */
.bio-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  will-change: transform, opacity;
  animation: bio-float ease-in-out infinite alternate;
  filter: blur(2px);
}

/* Light mode: Warm botanical hues blending softly with #FAF9F5 */
.bio-orb.type-sage {
  background: radial-gradient(
    circle,
    rgba(46, 107, 86, 0.45) 0%,
    rgba(46, 107, 86, 0.12) 50%,
    transparent 70%
  );
}

.bio-orb.type-moss {
  background: radial-gradient(
    circle,
    rgba(59, 122, 87, 0.4) 0%,
    rgba(59, 122, 87, 0.1) 50%,
    transparent 70%
  );
}

.bio-orb.type-herb {
  background: radial-gradient(
    circle,
    rgba(82, 183, 136, 0.45) 0%,
    rgba(82, 183, 136, 0.12) 50%,
    transparent 70%
  );
}

.bio-orb.type-slate {
  background: radial-gradient(
    circle,
    rgba(74, 102, 94, 0.35) 0%,
    rgba(74, 102, 94, 0.08) 50%,
    transparent 70%
  );
}

/* Gentle, relaxed organic drift */
@keyframes bio-float {
  0% {
    opacity: var(--base-op);
    transform: translate3d(0, 0, 0) scale(0.95);
  }
  50% {
    opacity: calc(var(--base-op) * 1.2);
    transform: translate3d(8px, -14px, 0) scale(1.05);
  }
  100% {
    opacity: calc(var(--base-op) * 0.9);
    transform: translate3d(-6px, -24px, 0) scale(0.98);
  }
}

/* Dark mode: Luminous sage & moss softly illuminating #151718 */
:global(html.dark) .bio-orb {
  filter: blur(1.5px);
}
:global(html.dark) .bio-orb.type-sage {
  background: radial-gradient(
    circle,
    rgba(82, 183, 136, 0.5) 0%,
    rgba(82, 183, 136, 0.15) 50%,
    transparent 70%
  );
}
:global(html.dark) .bio-orb.type-moss {
  background: radial-gradient(
    circle,
    rgba(116, 198, 157, 0.45) 0%,
    rgba(116, 198, 157, 0.12) 50%,
    transparent 70%
  );
}
:global(html.dark) .bio-orb.type-herb {
  background: radial-gradient(
    circle,
    rgba(149, 213, 178, 0.4) 0%,
    rgba(149, 213, 178, 0.1) 50%,
    transparent 70%
  );
}
:global(html.dark) .bio-orb.type-slate {
  background: radial-gradient(
    circle,
    rgba(100, 140, 126, 0.35) 0%,
    rgba(100, 140, 126, 0.08) 50%,
    transparent 70%
  );
}

@media (prefers-reduced-motion: reduce) {
  .bio-orb {
    animation: none;
    opacity: var(--base-op);
  }
}
</style>
