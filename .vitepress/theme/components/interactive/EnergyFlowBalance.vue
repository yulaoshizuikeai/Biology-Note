<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 11 · 生态系统</div>
      <h3 class="card-title">生态系统能量流动平衡守恒流向图</h3>
      <p class="card-desc">
        输入第一营养级同化量，调节第二营养级摄入量与未同化粪便量，即时校验同化量平衡与能量传递效率。
      </p>
    </div>

    <div class="flow-controls">
      <div class="f-item">
        <label
          >第一营养级 (生产者) 同化量: <span class="val">{{ producerAssimilated }} kJ</span></label
        >
        <input
          type="range"
          v-model.number="producerAssimilated"
          min="5000"
          max="50000"
          step="1000"
        />
      </div>
      <div class="f-item">
        <label
          >第二营养级 (初级消费者) 摄入量: <span class="val">{{ ingested }} kJ</span></label
        >
        <input type="range" v-model.number="ingested" min="1000" max="15000" step="500" />
      </div>
      <div class="f-item">
        <label
          >未同化排出量 (粪便量): <span class="val">{{ feces }} kJ</span></label
        >
        <input
          type="range"
          v-model.number="feces"
          min="200"
          :max="Math.max(200, ingested - 500)"
          step="100"
        />
      </div>
    </div>

    <div class="balance-display">
      <div class="balance-node bg-light">
        <div class="node-title">摄入量 ({{ ingested }} kJ)</div>
        <div class="node-formula">= 同化量 ({{ assimilated }}) + 粪便量 ({{ feces }})</div>
      </div>
      <div class="balance-arrow">➔</div>
      <div class="balance-node bg-main">
        <div class="node-title">初级消费者同化量</div>
        <div class="node-val">{{ assimilated }} kJ</div>
        <div class="node-desc">= 呼吸散失 ({{ respiration }}) + 生长发育繁殖 ({{ growth }})</div>
      </div>
      <div class="balance-arrow">➔</div>
      <div class="balance-node" :class="efficiencyValid ? 'bg-valid' : 'bg-invalid'">
        <div class="node-title">能量传递效率</div>
        <div class="node-val">{{ transferEfficiency }}%</div>
        <div class="node-badge">
          {{ efficiencyValid ? "正常范围 (10% ~ 20%)" : "偏离正常范围" }}
        </div>
      </div>
    </div>

    <div class="critical-warning">
      <strong>★ 高考排雷必背：</strong>
      初级消费者的<strong>粪便量（{{ feces }} kJ）</strong
      >并未被其吸收同化，其包含的能量<strong>全部属于第一营养级（生产者）的同化量</strong>中流向分解者的部分！
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

const producerAssimilated = ref(20000);
const ingested = ref(5000);
const feces = ref(2000);

watch(ingested, (newIngested) => {
  const maxAllowedFeces = Math.max(200, newIngested - 500);
  if (feces.value > maxAllowedFeces) {
    feces.value = maxAllowedFeces;
  }
});

const assimilated = computed(() => Math.max(0, ingested.value - feces.value));
const respiration = computed(() => Math.round(assimilated.value * 0.65));
const growth = computed(() => Math.max(0, assimilated.value - respiration.value));

const transferEfficiency = computed(() => {
  if (producerAssimilated.value === 0) return "0.0";
  return ((assimilated.value / producerAssimilated.value) * 100).toFixed(1);
});

const efficiencyValid = computed(() => {
  const eff = parseFloat(transferEfficiency.value);
  return eff >= 10 && eff <= 20;
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
.flow-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin: 16px 0;
}
.f-item label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}
.f-item .val {
  color: var(--vp-c-brand-1);
  font-family: monospace;
}
.balance-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.balance-node {
  flex: 1;
  min-width: 180px;
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.node-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 4px;
}
.node-val {
  font-size: 18px;
  font-weight: 700;
  font-family: monospace;
}
.node-formula,
.node-desc {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}
.balance-arrow {
  font-size: 18px;
  color: var(--vp-c-text-3);
}
.bg-valid {
  border-color: #86efac;
  background: #f0fdf4;
}
.bg-valid .node-val {
  color: #166534;
}
.bg-invalid {
  border-color: #fca5a5;
  background: #fef2f2;
}
.bg-invalid .node-val {
  color: #b91c1c;
}
.node-badge {
  font-size: 10.5px;
  font-weight: 700;
  margin-top: 4px;
}
.critical-warning {
  padding: 12px 16px;
  border-radius: 8px;
  background: #fffbeb;
  border-left: 3px solid #f59e0b;
  font-size: 12px;
  color: #92400e;
  line-height: 1.5;
}
</style>
