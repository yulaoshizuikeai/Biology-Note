<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 10 · 植物激素</div>
      <h3 class="card-title">生长素两重性与不同器官敏感度三曲线探针</h3>
      <p class="card-desc">拖动浓度探针，即时查看根、芽、茎在不同生长素浓度下的促进/抑制响应，直观破解顶端优势与根向地性。</p>
    </div>

    <div class="slider-zone">
      <label>生长素摩尔浓度 (mol/L): <span class="val">10^{{ exp }} mol/L</span></label>
      <input type="range" v-model.number="exp" min="-11" max="-2" step="1" />
    </div>

    <div class="organs-grid">
      <div class="organ-card" :class="rootClass">
        <div class="organ-name">根 (Root · 最敏感)</div>
        <div class="organ-status">{{ rootStatus }}</div>
        <div class="organ-rate">响应程度：{{ rootRate }}</div>
        <div class="organ-sub">最适浓度：10⁻¹⁰ mol/L</div>
      </div>
      <div class="organ-card" :class="shootClass">
        <div class="organ-name">芽 (Bud · 中度敏感)</div>
        <div class="organ-status">{{ shootStatus }}</div>
        <div class="organ-rate">响应程度：{{ shootRate }}</div>
        <div class="organ-sub">最适浓度：10⁻⁸ mol/L</div>
      </div>
      <div class="organ-card" :class="stemClass">
        <div class="organ-name">茎 (Stem · 最耐受)</div>
        <div class="organ-status">{{ stemStatus }}</div>
        <div class="organ-rate">响应程度：{{ stemRate }}</div>
        <div class="organ-sub">最适浓度：10⁻⁴ mol/L</div>
      </div>
    </div>

    <div class="probe-phenomenon">
      <strong>当前浓度生产现象与原理透析：</strong>
      <span>{{ phenomenonText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const exp = ref(-8);

const rootStatus = computed(() => (exp.value > -10 ? '受到强烈抑制 (高浓度抑制)' : '处于促进状态'));
const rootRate = computed(() => {
  if (exp.value === -10) return '+100% (顶峰促进)';
  if (exp.value < -10) return '+40% (微弱促进)';
  return '-80% (严重抑制)';
});
const rootClass = computed(() => (exp.value > -10 ? 'status-inhibit' : 'status-promote'));

const shootStatus = computed(() => {
  if (exp.value < -8) return '低浓度促进中';
  if (exp.value === -8) return '处于最适促进顶峰';
  if (exp.value <= -6) return '微弱促进 / 临界';
  return '受到高浓度抑制';
});
const shootRate = computed(() => {
  if (exp.value === -8) return '+100% (最大促进)';
  if (exp.value < -8) return '+60%';
  if (exp.value <= -6) return '+20%';
  return '-70% (抑制生长)';
});
const shootClass = computed(() => (exp.value > -6 ? 'status-inhibit' : 'status-promote'));

const stemStatus = computed(() => {
  if (exp.value <= -4) return '持续促进中';
  if (exp.value <= -3) return '高浓度微弱促进';
  return '浓度过高抑制生长';
});
const stemRate = computed(() => {
  if (exp.value === -4) return '+100% (最适促进)';
  if (exp.value <= -4) return '+80%';
  return '-40%';
});
const stemClass = computed(() => (exp.value > -3 ? 'status-inhibit' : 'status-promote'));

const phenomenonText = computed(() => {
  if (exp.value === -10) return '此浓度为根生长的最适浓度，大幅促进根伸长，但对茎促进作用微弱。';
  if (exp.value === -8) return '此浓度为芽的最适浓度；此时根由于敏感度极高已经被严重抑制！体现了不同器官敏感度差异。';
  if (exp.value === -6) return '顶端优势典型状态：近顶端侧芽由于浓度接近此范围生长受到强烈抑制，而顶芽生长素浓度适宜继续优先生长！';
  if (exp.value === -4) return '茎生长的最适浓度！此时根与侧芽均被极度抑制，此浓度可用作促进插条快速生根的高浓度沾蘸液（短时间沾蘸）。';
  return '高浓度状态：可作为 2,4-D 等除草剂灭除双子叶杂草。';
});
</script>

<style scoped>
.interactive-card { margin: 24px 0; padding: 24px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); margin-bottom: 8px; }
.card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); }
.card-desc { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
.slider-zone { margin: 16px 0; }
.slider-zone label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.slider-zone .val { color: var(--vp-c-brand-1); font-family: monospace; font-size: 14px; }
.organs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 16px; }
.organ-card { padding: 14px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.organ-name { font-size: 13px; font-weight: 700; margin-bottom: 4px; }
.organ-status { font-size: 12px; font-weight: 600; margin-bottom: 4px; }
.organ-rate { font-size: 12px; color: var(--vp-c-text-1); font-family: monospace; }
.organ-sub { font-size: 11px; color: var(--vp-c-text-3); margin-top: 4px; }
.status-promote { border-left: 4px solid #10b981; }
.status-promote .organ-status { color: #059669; }
.status-inhibit { border-left: 4px solid #ef4444; }
.status-inhibit .organ-status { color: #dc2626; }
.probe-phenomenon { padding: 12px 16px; border-radius: 8px; background: var(--vp-c-bg-alt); border-left: 3px solid var(--vp-c-brand-1); font-size: 12.5px; color: var(--vp-c-text-1); line-height: 1.5; }
</style>