<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 15 · 基因工程</div>
      <h3 class="card-title">PCR 扩增循环与等长目标片段演进仪</h3>
      <p class="card-desc">
        步进点击循环轮数，直观解析为什么两端等长的目标 DNA 双链分子必须在第 3 轮才首次诞生。
      </p>
    </div>

    <div class="cycle-stepper">
      <div class="cycle-info">
        <span>当前循环轮数：</span>
        <strong class="cycle-tag">第 {{ cycle }} 轮循环</strong>
      </div>
      <div class="btn-group">
        <button class="step-btn" :disabled="cycle <= 1" @click="cycle--">◀ 上一轮</button>
        <button class="step-btn next" :disabled="cycle >= 8" @click="cycle++">下一轮 ➔</button>
        <button class="step-btn reset" @click="cycle = 1">重置</button>
      </div>
    </div>

    <div class="pcr-metrics-grid">
      <div class="p-card">
        <div class="p-label">总产物 DNA 分子数 (2ⁿ)</div>
        <div class="p-num">{{ totalMolecules }} 个</div>
      </div>
      <div class="p-card">
        <div class="p-label">不合目标规格的非等长分子</div>
        <div class="p-num text-amber">{{ nonTargetMolecules }} 个</div>
      </div>
      <div class="p-card highlight">
        <div class="p-label">两端等长的目标 DNA 分子 (2ⁿ - 2n)</div>
        <div class="p-num text-brand">{{ targetMolecules }} 个</div>
      </div>
      <div class="p-card">
        <div class="p-label">目标产物纯度占比</div>
        <div class="p-num text-purple">{{ targetPercentage }}%</div>
      </div>
    </div>

    <div class="pcr-explanation">
      <div class="pcr-status-callout" :class="cycle >= 3 ? 'text-green' : 'text-red'">
        {{
          cycle >= 3
            ? "✔ 已生成两端等长的目标双链 DNA 片段！"
            : "❌ 尚未出现两端等长的目标 DNA 片段！"
        }}
      </div>
      <p class="pcr-desc-text">{{ cycleAnalysis }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const cycle = ref(3);

const totalMolecules = computed(() => Math.pow(2, cycle.value));
const targetMolecules = computed(() => {
  if (cycle.value < 3) return 0;
  return Math.pow(2, cycle.value) - 2 * cycle.value;
});
const nonTargetMolecules = computed(() => totalMolecules.value - targetMolecules.value);
const targetPercentage = computed(() => {
  if (totalMolecules.value === 0) return 0;
  return Math.round((targetMolecules.value / totalMolecules.value) * 100);
});

const cycleAnalysis = computed(() => {
  if (cycle.value === 1)
    return "第 1 轮：以原始双链 DNA 为模板，引物结合后沿 5' ➔ 3' 延伸，产物均为一端定长、另一端延伸的不定长单链。目标分子数 = 0。";
  if (cycle.value === 2)
    return "第 2 轮：以第 1 轮产物为模板合成，产生了一端定长、另一端受另一引物限定的单链，但双链中仍有一条为长单链。目标双链分子数 = 0。";
  if (cycle.value === 3)
    return "第 3 轮：【里程碑】以第 2 轮单链为模板合成时，两端均被引物严格限定的等长目标 DNA 双链分子【首次出现 2 个】！";
  return `第 ${cycle.value} 轮：等长目标分子呈指数级暴增至 ${targetMolecules.value} 个，占全部 PCR 产物的 ${targetPercentage.value}%，成为绝对优势产物！`;
});
</script>

<style scoped>
.interactive-card {
  margin: 24px 0;
  padding: 24px;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
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
.cycle-stepper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  flex-wrap: wrap;
  gap: 10px;
}
.cycle-tag {
  font-size: 16px;
  color: var(--vp-c-brand-1);
  font-family: monospace;
}
.btn-group {
  display: flex;
  gap: 6px;
}
.step-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.step-btn.next {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.step-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.pcr-metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}
.p-card {
  padding: 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.p-card.highlight {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.p-label {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}
.p-num {
  font-size: 18px;
  font-weight: 700;
  font-family: monospace;
}
.text-brand {
  color: var(--vp-c-brand-1);
}
.text-amber {
  color: #d97706;
}
.text-purple {
  color: #7c3aed;
}
.pcr-explanation {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border-left: 3px solid var(--vp-c-brand-1);
}
.pcr-status-callout {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 6px;
}
.text-green {
  color: #166534;
}
.text-red {
  color: #b91c1c;
}
.pcr-desc-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0;
}
</style>
