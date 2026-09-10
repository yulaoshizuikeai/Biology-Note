<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 07 · 进化理论</div>
      <h3 class="card-title">哈代-温伯格平衡与常/伴染色体演变计算器</h3>
      <p class="card-desc">拖动显性基因频率 p，即时输出隐性基因频率 q 及三种基因型频率，直观对比伴 X 遗传男女发病率悬殊差距。</p>
    </div>

    <div class="slider-box">
      <label>显性基因频率 (p): <span class="val">{{ p.toFixed(2) }}</span> ➔ 隐性基因频率 (q): <span class="val">{{ q.toFixed(2) }}</span></label>
      <input type="range" v-model.number="p" min="0.01" max="0.99" step="0.01" />
    </div>

    <div class="results-grid">
      <div class="freq-card">
        <div class="freq-name">显性纯合 (AA = p²)</div>
        <div class="freq-bar"><div class="bar-fill bg-blue" :style="{ width: (p2 * 100) + '%' }"></div></div>
        <div class="freq-num">{{ (p2 * 100).toFixed(2) }}%</div>
      </div>
      <div class="freq-card">
        <div class="freq-name">杂合子 (Aa = 2pq)</div>
        <div class="freq-bar"><div class="bar-fill bg-green" :style="{ width: (twoPq * 100) + '%' }"></div></div>
        <div class="freq-num">{{ (twoPq * 100).toFixed(2) }}%</div>
      </div>
      <div class="freq-card">
        <div class="freq-name">隐性纯合 (aa = q²)</div>
        <div class="freq-bar"><div class="bar-fill bg-amber" :style="{ width: (q2 * 100) + '%' }"></div></div>
        <div class="freq-num">{{ (q2 * 100).toFixed(2) }}%</div>
      </div>
    </div>

    <div class="x-linked-box">
      <div class="x-title">★ 高考压轴对比：若该隐性基因为伴 X 染色体致病基因（如红绿色盲/血友病）：</div>
      <div class="x-stats">
        <div class="x-item">男性发病率 (XᵃY = q)：<strong>{{ (q * 100).toFixed(2) }}%</strong></div>
        <div class="x-item">女性发病率 (XᵃXᵃ = q²)：<strong>{{ (q2 * 100).toFixed(2) }}%</strong></div>
        <div class="x-item ratio">男女发病倍数比：<strong>{{ (1 / q).toFixed(1) }} 倍！</strong></div>
      </div>
      <p class="x-note">结论：伴 X 隐性遗传病在男性中的发病率（q）远高于女性（q²），随着基因频率越低，男女发病差距越呈几何级倍增！</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const p = ref(0.6);
const q = computed(() => 1 - p.value);
const p2 = computed(() => p.value * p.value);
const twoPq = computed(() => 2 * p.value * q.value);
const q2 = computed(() => q.value * q.value);
</script>

<style scoped>
.interactive-card { margin: 24px 0; padding: 24px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); margin-bottom: 8px; }
.card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); }
.card-desc { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
.slider-box { margin: 16px 0; }
.slider-box label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.slider-box .val { color: var(--vp-c-brand-1); font-family: monospace; }
.results-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; margin-bottom: 16px; }
.freq-card { padding: 12px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.freq-name { font-size: 12px; font-weight: 600; margin-bottom: 6px; }
.freq-bar { height: 6px; background: var(--vp-c-bg-alt); border-radius: 3px; overflow: hidden; margin-bottom: 4px; }
.bar-fill { height: 100%; border-radius: 3px; }
.bg-blue { background: #3b82f6; }
.bg-green { background: #10b981; }
.bg-amber { background: #f59e0b; }
.freq-num { font-size: 16px; font-weight: 700; font-family: monospace; text-align: right; }
.x-linked-box { padding: 14px; border-radius: 8px; background: var(--vp-c-bg-alt); border-left: 3px solid var(--vp-c-brand-1); }
.x-title { font-size: 12.5px; font-weight: 700; margin-bottom: 8px; color: var(--vp-c-text-1); }
.x-stats { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 6px; }
.x-item { font-size: 12.5px; }
.x-item strong { color: var(--vp-c-brand-1); font-family: monospace; }
.x-item.ratio strong { color: #dc2626; }
.x-note { margin: 0; font-size: 11.5px; color: var(--vp-c-text-2); line-height: 1.4; }
</style>