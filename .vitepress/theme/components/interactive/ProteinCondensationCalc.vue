<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 01 · 分子计算</div>
      <h3 class="card-title">蛋白质脱水缩合与分子量秒算仪</h3>
      <p class="card-desc">输入氨基酸数、肽链数与二硫键数，即时推导肽键数、脱水数与蛋白质相对分子质量。</p>
    </div>

    <div class="control-grid">
      <div class="control-item">
        <label>氨基酸数 (n): <span class="val">{{ n }}</span></label>
        <input type="range" v-model.number="n" min="2" max="200" step="1" />
      </div>
      <div class="control-item">
        <label>肽链数 (m): <span class="val">{{ m }}</span></label>
        <div class="pill-group">
          <button v-for="chain in [1, 2, 3, 4]" :key="chain" :class="['pill-btn', { active: m === chain }]" @click="m = chain">
            {{ chain }} 条链
          </button>
        </div>
      </div>
      <div class="control-item">
        <label>二硫键数 (-S-S-): <span class="val">{{ k }}</span></label>
        <input type="range" v-model.number="k" min="0" max="10" step="1" />
      </div>
      <div class="control-item">
        <label>氨基酸平均分子量 (a): <span class="val">{{ a }}</span></label>
        <input type="range" v-model.number="a" min="100" max="140" step="1" />
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-box">
        <div class="stat-label">脱去水分子数 (n - m)</div>
        <div class="stat-num text-emerald">{{ peptideBonds }}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">肽键数 (-CO-NH-)</div>
        <div class="stat-num text-blue">{{ peptideBonds }}</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">游离氨基 / 羧基至少数</div>
        <div class="stat-num text-amber">{{ m }} 个</div>
      </div>
      <div class="stat-box">
        <div class="stat-label">蛋白质相对分子质量</div>
        <div class="stat-num text-purple">{{ proteinMw.toLocaleString() }}</div>
      </div>
    </div>

    <div class="formula-banner">
      <strong>计算公式推导：</strong>
      <span>相对分子质量 = {{ n }} × {{ a }} - 18 × ({{ n }} - {{ m }}) - 2 × {{ k }} = <strong>{{ proteinMw }}</strong></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const n = ref(100);
const m = ref(2);
const k = ref(3);
const a = ref(128);

const peptideBonds = computed(() => Math.max(0, n.value - m.value));
const proteinMw = computed(() => {
  return n.value * a.value - 18 * peptideBonds.value - 2 * k.value;
});
</script>

<style scoped>
.interactive-card {
  margin: 24px 0;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
}
.card-header {
  margin-bottom: 20px;
}
.badge {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  margin-bottom: 8px;
}
.card-title {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.card-desc {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}
.control-item label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}
.control-item .val {
  color: var(--vp-c-brand-1);
  font-family: monospace;
}
input[type="range"] {
  width: 100%;
  accent-color: var(--vp-c-brand-1);
}
.pill-group {
  display: flex;
  gap: 6px;
}
.pill-btn {
  flex: 1;
  padding: 6px 0;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.pill-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.stat-box {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.stat-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}
.stat-num {
  font-size: 18px;
  font-weight: 700;
  font-family: monospace;
}
.text-emerald { color: #059669; }
.text-blue { color: #2563eb; }
.text-amber { color: #d97706; }
.text-purple { color: #7c3aed; }
.formula-banner {
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  border-left: 3px solid var(--vp-c-brand-1);
}
</style>