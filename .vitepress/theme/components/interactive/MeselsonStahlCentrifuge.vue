<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 06 · 中心法则</div>
      <h3 class="card-title">梅塞尔森-斯塔尔同位素离心条带推导器</h3>
      <p class="card-desc">输入 DNA 复制代数 n，实时查看氯化铯超速离心管中轻带、中带、重带分层与分子守恒。</p>
    </div>

    <div class="control-row">
      <label>转移到 ¹⁴N 培养基中连续复制代数 (n): <span class="val">{{ n }}</span> 代</label>
      <input type="range" v-model.number="n" min="0" max="6" step="1" />
    </div>

    <div class="centrifuge-display">
      <div class="tube-visual">
        <div class="tube-body">
          <div class="band-line light-band" :style="{ opacity: lightOpacity }">
            <span class="band-label">¹⁴N-¹⁴N 轻带 ({{ lightPercent }}%)</span>
          </div>
          <div class="band-line hybrid-band" :style="{ opacity: hybridOpacity }">
            <span class="band-label">¹⁵N-¹⁴N 中带 ({{ hybridPercent }}%)</span>
          </div>
          <div class="band-line heavy-band" :style="{ opacity: heavyOpacity }">
            <span class="band-label">¹⁵N-¹⁵N 重带 ({{ heavyPercent }}%)</span>
          </div>
        </div>
        <div class="tube-desc">氯化铯梯度离心管</div>
      </div>

      <div class="calc-metrics">
        <div class="metric-card">
          <div class="m-label">DNA 分子总数 (2ⁿ)</div>
          <div class="m-val">{{ totalDna }} 个</div>
        </div>
        <div class="metric-card">
          <div class="m-label">含亲代母链 (¹⁵N) 的 DNA 分子数</div>
          <div class="m-val text-amber">{{ hybridDna }} 个 (恒定为 2)</div>
        </div>
        <div class="metric-card">
          <div class="m-label">只含子链 (¹⁴N) 的纯轻带分子数</div>
          <div class="m-val text-blue">{{ lightDna }} 个</div>
        </div>
        <div class="metric-card">
          <div class="m-label">含亲代母链的 DNA 分子占比</div>
          <div class="m-val text-purple">{{ hybridPercent }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const n = ref(2);

const totalDna = computed(() => Math.pow(2, n.value));
const hybridDna = computed(() => (n.value === 0 ? 0 : 2));
const heavyDna = computed(() => (n.value === 0 ? 1 : 0));
const lightDna = computed(() => (n.value === 0 ? 0 : totalDna.value - 2));

const heavyPercent = computed(() => (n.value === 0 ? 100 : 0));
const hybridPercent = computed(() => (n.value === 0 ? 0 : Math.round((2 / totalDna.value) * 100)));
const lightPercent = computed(() => (n.value === 0 ? 0 : Math.round(((totalDna.value - 2) / totalDna.value) * 100)));

const heavyOpacity = computed(() => (n.value === 0 ? 1 : 0.05));
const hybridOpacity = computed(() => (n.value === 0 ? 0.05 : Math.max(0.3, 2 / totalDna.value)));
const lightOpacity = computed(() => (n.value === 0 ? 0.05 : Math.min(1, Math.max(0.2, (totalDna.value - 2) / totalDna.value))));
</script>

<style scoped>
.interactive-card { margin: 24px 0; padding: 24px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); margin-bottom: 8px; }
.card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); }
.card-desc { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
.control-row { margin: 16px 0; }
.control-row label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
.control-row .val { color: var(--vp-c-brand-1); font-family: monospace; }
.centrifuge-display { display: grid; grid-template-columns: 140px 1fr; gap: 24px; align-items: center; }
.tube-visual { text-align: center; }
.tube-body {
  width: 50px; height: 160px; margin: 0 auto; border: 2px solid #94a3b8; border-top: none;
  border-radius: 0 0 25px 25px; background: #f8fafc; position: relative; padding-top: 20px;
}
.band-line { position: absolute; width: 100%; height: 8px; left: 0; transition: opacity 0.3s; }
.light-band { top: 35px; background: #3b82f6; }
.hybrid-band { top: 75px; background: #10b981; }
.heavy-band { top: 115px; background: #d97706; }
.band-label {
  position: absolute; left: 58px; top: -4px; white-space: nowrap; font-size: 10.5px; font-weight: 600; color: var(--vp-c-text-2);
}
.tube-desc { font-size: 11px; color: var(--vp-c-text-3); margin-top: 8px; }
.calc-metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; }
.metric-card { padding: 12px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.m-label { font-size: 11px; color: var(--vp-c-text-2); margin-bottom: 4px; }
.m-val { font-size: 15px; font-weight: 700; font-family: monospace; color: var(--vp-c-text-1); }
.text-amber { color: #d97706; }
.text-blue { color: #2563eb; }
.text-purple { color: #7c3aed; }
</style>