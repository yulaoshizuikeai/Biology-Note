<script setup lang="ts">
import mediumZoom, { type Zoom } from "medium-zoom";
import { useRoute } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, onMounted, onBeforeUnmount, watch } from "vue";

import CCAmbientParticles from "./components/CCAmbientParticles.vue";
import CCBackToTop from "./components/CCBackToTop.vue";
import Breadcrumb from "./components/CCBreadCrumb.vue";
import CCDailyQuote from "./components/CCDailyQuote.vue";
import CCFooter from "./components/CCFooter.vue";
import CCHeroLogo from "./components/CCHeroLogo.vue";
import { CCPageviews, CCWaline } from "./components/waline";
import { bootstrapSiteSettings } from "./composables/useSiteSettings";

const { Layout } = DefaultTheme;
const route = useRoute();
const contentImageSelector = ".vp-doc img:not([data-no-zoom])";
let imageZoom: Zoom | undefined;
let refreshTimer: number | undefined;

const normalizePath = (p: string) => p.replace(/\/$/, "");
const runOnClientFrame = (cb: FrameRequestCallback) => {
  if (typeof window === "undefined") return;
  window.requestAnimationFrame(cb);
};
const scheduleRefresh = () => {
  if (typeof window === "undefined") return;
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => runOnClientFrame(refreshPageEnhancements), 80);
};

const expandCurrentSidebarGroup = () => {
  if (typeof window === "undefined") return;
  const currentPath = normalizePath(window.location.pathname);
  const groups = document.querySelectorAll(".VPSidebarItem.level-0.collapsible.is-link");

  groups.forEach((group) => {
    const link = group.querySelector(":scope > .item > a.VPLink");
    const caret = group.querySelector(":scope > .item > .caret");
    if (!(link instanceof HTMLAnchorElement) || !(caret instanceof HTMLElement)) return;

    const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
    if (linkPath === currentPath && group.classList.contains("collapsed")) {
      caret.click();
    }
  });
};

const setupImageZoom = () => {
  if (!imageZoom) return;
  imageZoom.detach();
  document.querySelectorAll(`${contentImageSelector}[data-esa-optimized]`).forEach((image) => {
    if (!(image instanceof HTMLImageElement)) return;
    const originalUrl = new URL(image.currentSrc || image.src, window.location.href);
    originalUrl.searchParams.delete("image_process");
    image.dataset.zoomSrc = originalUrl.href;
  });
  imageZoom.attach(contentImageSelector);
};

const refreshPageEnhancements = () => {
  expandCurrentSidebarGroup();
  setupImageZoom();
  attachScrollHints();
};

// 为可横向滚动的图解段落与宽表格插入滑动提示（幂等，路由切换后 DOM 重建自动重跑）
const attachScrollHints = () => {
  if (typeof window === "undefined") return;
  const candidates = new Set<HTMLElement>();
  document.querySelectorAll<HTMLElement>(".cc-table-wrap").forEach((wrap) => {
    candidates.add(wrap);
  });
  document.querySelectorAll<HTMLElement>(".vp-doc img[src$='.svg']").forEach((image) => {
    const parent = image.parentElement;
    if (
      parent instanceof HTMLElement &&
      (parent.tagName === "DIV" || parent.tagName === "P" || parent.tagName === "FIGURE") &&
      parent.children.length === 1
    ) {
      candidates.add(parent);
    }
  });
  candidates.forEach((el) => {
    if (el.dataset.ccScrollHint === "1") return;
    if (el.scrollWidth - el.clientWidth <= 4) return;
    el.dataset.ccScrollHint = "1";
    const hint = document.createElement("div");
    hint.className = "cc-scroll-hint";
    hint.textContent = "↔ 左右滑动查看完整内容";
    el.insertAdjacentElement("afterend", hint);
  });
};

const onSectionTitleClick = (event: Event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const titleLink = target.closest(".VPSidebarItem.level-0.collapsible.is-link > .item > a.VPLink");
  if (!(titleLink instanceof HTMLAnchorElement)) return;

  const group = titleLink.closest(".VPSidebarItem.level-0.collapsible.is-link");
  const caret = group?.querySelector(":scope > .item > .caret");
  if (group?.classList.contains("collapsed") && caret instanceof HTMLElement) {
    caret.click();
  }
};

onMounted(() => {
  imageZoom = mediumZoom({ background: "transparent" });
  bootstrapSiteSettings();
  document.addEventListener("click", onSectionTitleClick, true);
  runOnClientFrame(refreshPageEnhancements);
});

onBeforeUnmount(() => {
  imageZoom?.detach();
  imageZoom = undefined;
  if (typeof window !== "undefined") window.clearTimeout(refreshTimer);
  document.removeEventListener("click", onSectionTitleClick, true);
});

watch(
  () => route.path,
  async () => {
    await nextTick();
    scheduleRefresh();
  },
  { immediate: true },
);
</script>

<template>
  <Layout>
    <!-- 首页草木环境悬浮微粒背景 -->
    <template #home-hero-before>
      <ClientOnly>
        <CCAmbientParticles />
      </ClientOnly>
    </template>

    <!-- 首页动态交互 Logo -->
    <template #home-hero-image>
      <CCHeroLogo />
    </template>

    <!-- 首页高中生物核心微速记 (每次刷新随机一条，几秒读完，点击可切换) -->
    <template #home-hero-info-after>
      <ClientOnly>
        <CCDailyQuote />
      </ClientOnly>
    </template>

    <!-- 面包屑 -->
    <template #doc-before>
      <Breadcrumb />
    </template>

    <!-- 评论区 -->
    <template #doc-after>
      <div class="cc-comments-region">
        <ClientOnly>
          <CCWaline />
        </ClientOnly>
      </div>
    </template>

    <!-- 浏览量 -->
    <template #aside-bottom>
      <ClientOnly>
        <CCPageviews />
      </ClientOnly>
    </template>

    <!-- 页脚信息 -->
    <template #doc-bottom>
      <CCFooter />
    </template>

    <!-- 返回顶部 -->
    <template #layout-bottom>
      <CCBackToTop />
    </template>
  </Layout>
</template>
