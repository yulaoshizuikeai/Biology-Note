<script setup lang="ts">
import { pageviewCount } from "@waline/client";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

import { ensureBusuanzi } from "../../composables/useBusuanzi";
import { useWalineBase } from "./useWalineBase";

const { serverURL, route } = useWalineBase();
let abortPageview: (() => void) | null = null;
const isLoading = ref(true);
let observer: MutationObserver | null = null;

const runBusuanzi = () => {
  void ensureBusuanzi();
};

const runPageview = (path: string) => {
  isLoading.value = true;
  if (serverURL) {
    if (abortPageview) abortPageview();
    abortPageview = pageviewCount({ serverURL, path });
  } else {
    runBusuanzi();
  }
};

const setupObserver = () => {
  if (typeof window === "undefined") return;
  if (observer) observer.disconnect();
  const el = document.getElementById("busuanzi_value_page_pv");
  if (!el) return;

  observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList" || mutation.type === "characterData") {
        if (el.textContent && el.textContent !== "--" && el.textContent.trim() !== "") {
          isLoading.value = false;
        }
      }
    }
  });

  observer.observe(el, { childList: true, characterData: true, subtree: true });
};

onMounted(() => {
  setupObserver();
  runPageview(route.path);
});

watch(
  () => route.path,
  async (path) => {
    if (typeof window === "undefined") return;
    runPageview(path);
    await nextTick();
    setupObserver();
  },
);

onBeforeUnmount(() => {
  if (abortPageview) abortPageview();
  if (observer) observer.disconnect();
});
</script>

<template>
  <span class="waline-pageview">
    <svg
      class="waline-pageview-icon"
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
    <span
      id="busuanzi_value_page_pv"
      class="waline-pageview-count"
      :class="{ 'is-loading': isLoading }"
      >--</span
    >
    views
  </span>
</template>

<style scoped>
.waline-pageview {
  display: inline-flex;
  gap: 0.35em;
  align-items: center;
  white-space: nowrap;
  font-size: 14px;
}

.waline-pageview-icon {
  flex-shrink: 0;
  opacity: 0.75;
}

.waline-pageview-count {
  display: inline-block;
  min-width: 1.2em;
  text-align: center;
  transition: opacity 0.3s ease;
}

.waline-pageview-count.is-loading {
  color: transparent !important;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, var(--vp-c-text-3) 20%, transparent) 25%,
    color-mix(in srgb, var(--vp-c-text-3) 40%, transparent) 50%,
    color-mix(in srgb, var(--vp-c-text-3) 20%, transparent) 75%
  );
  background-size: 200% 100%;
  animation: cc-shimmer 1.5s infinite linear;
  border-radius: 4px;
}

@keyframes cc-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
