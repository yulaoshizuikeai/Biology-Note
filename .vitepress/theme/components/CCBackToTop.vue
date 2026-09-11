<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

const visible = ref(false);

const prefersReducedMotion = () =>
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const update = () => {
  visible.value = window.scrollY > 600;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", update, { passive: true });
  update();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", update);
});
</script>

<template>
  <Transition name="cc-btt">
    <button
      v-if="visible"
      type="button"
      class="cc-back-to-top"
      aria-label="返回顶部"
      title="返回顶部"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 4.6 4.6 12l1.4 1.4 5-5V20h2V8.4l5 5L19.4 12 12 4.6Z"
        />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.cc-back-to-top {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 35;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  box-shadow: 0 4px 14px rgb(0 0 0 / 12%);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.cc-back-to-top:hover {
  color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
}

.cc-back-to-top:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.cc-btt-enter-active,
.cc-btt-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.cc-btt-enter-from,
.cc-btt-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .cc-back-to-top,
  .cc-btt-enter-active,
  .cc-btt-leave-active {
    transition: none;
  }
}

@media print {
  .cc-back-to-top {
    display: none;
  }
}
</style>
