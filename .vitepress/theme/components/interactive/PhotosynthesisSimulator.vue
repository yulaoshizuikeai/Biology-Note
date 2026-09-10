<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 03 · 经典模型</div>
      <h3 class="card-title">光合作用微观机理与瞬时突变动态模拟器</h3>
      <p class="card-desc">开关光照与 CO₂ 供应，动态观察 ATP、[H] 与 C₃、C₅ 库容波形，验证“断光升三降五，断碳升五降三”。</p>
    </div>

    <div class="switches-panel">
      <div class="switch-card">
        <span class="switch-label">光反应输入：光照条件</span>
        <button :class="['toggle-btn', { on: lightOn }]" @click="lightOn = !lightOn">
          <span class="indicator"></span>
          {{ lightOn ? '光照充足 (ON)' : '光照停止 (OFF)' }}
        </button>
      </div>
      <div class="switch-card">
        <span class="switch-label">暗反应输入：CO₂ 供应</span>
        <button :class="['toggle-btn', { on: co2On }]" @click="co2On = !co2On">
          <span class="indicator"></span>
          {{ co2On ? 'CO₂ 充足 (ON)' : '停止供给 CO₂ (OFF)' }}
        </button>
      </div>
    </div>

    <div class="status-banner" :class="statusBadgeClass">
      <strong>当前生理状态：</strong>{{ stateTitle }}
      <span class="rule-hint">{{ stateRule }}</span>
    </div>

    <div class="gauges-grid">
      <div class="gauge-card">
        <div class="gauge-title">ATP & [H] (光反应产物)</div>
        <div class="gauge-bar-bg"><div class="gauge-bar bg-amber" :style="{ width: atpHLevel + '%' }"></div></div>
        <div class="gauge-meta"><span>库容水平</span><strong>{{ atpHLevel }}%</strong></div>
      </div>
      <div class="gauge-card">
        <div class="gauge-title">C₃ 含量 (三碳酸还原物)</div>
        <div class="gauge-bar-bg"><div class="gauge-bar bg-emerald" :style="{ width: c3Level + '%' }"></div></div>
        <div class="gauge-meta"><span>相对含量</span><strong>{{ c3Level }}%</strong></div>
      </div>
      <div class="gauge-card">
        <div class="gauge-title">C₅ 含量 (五碳核酮糖接受体)</div>
        <div class="gauge-bar-bg"><div class="gauge-bar bg-blue" :style="{ width: c5Level + '%' }"></div></div>
        <div class="gauge-meta"><span>相对含量</span><strong>{{ c5Level }}%</strong></div>
      </div>
      <div class="gauge-card">
        <div class="gauge-title">(CH₂O) 净合成速率</div>
        <div class="gauge-bar-bg"><div class="gauge-bar bg-purple" :style="{ width: sugarRate + '%' }"></div></div>
        <div class="gauge-meta"><span>输出效率</span><strong>{{ sugarRate }}%</strong></div>
      </div>
    </div>

    <div class="reasoning-box">
      <div class="reasoning-title">微观生化因果逻辑链：</div>
      <div class="reasoning-text">{{ reasoningChain }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const lightOn = ref(true);
const co2On = ref(true);

const atpHLevel = computed(() => (lightOn.value ? 85 : 15));
const c3Level = computed(() => {
  if (lightOn.value && co2On.value) return 50;
  if (!lightOn.value && co2On.value) return 90; // 断光升三
  if (lightOn.value && !co2On.value) return 15; // 断碳降三
  return 40;
});
const c5Level = computed(() => {
  if (lightOn.value && co2On.value) return 50;
  if (!lightOn.value && co2On.value) return 15; // 断光降五
  if (lightOn.value && !co2On.value) return 90; // 断碳升五
  return 40;
});
const sugarRate = computed(() => (lightOn.value && co2On.value ? 80 : 5));

const stateTitle = computed(() => {
  if (lightOn.value && co2On.value) return '正常光合动态平衡';
  if (!lightOn.value && co2On.value) return '突然中断光照（断光瞬间）';
  if (lightOn.value && !co2On.value) return '突然停止供应 CO₂（断碳瞬间）';
  return '光照与 CO₂ 双停';
});

const stateRule = computed(() => {
  if (!lightOn.value && co2On.value) return '口诀：断光升三降五！';
  if (lightOn.value && !co2On.value) return '口诀：断碳升五降三！';
  return '';
});

const statusBadgeClass = computed(() => {
  if (lightOn.value && co2On.value) return 'bg-steady';
  if (!lightOn.value && co2On.value) return 'bg-dark';
  return 'bg-nocarbon';
});

const reasoningChain = computed(() => {
  if (lightOn.value && co2On.value) {
    return '光反应水光解持续产生 O₂、ATP 与 [H]；暗反应卡尔文循环中 CO₂ 固定与 C₃ 还原保持动态平衡，糖类稳定合成。';
  }
  if (!lightOn.value && co2On.value) {
    return '【断光瞬间】光反应停止 ➔ ATP 和 [H] 骤减 ➔ C₃ 还原受阻消耗骤减，而 CO₂ 固定仍在进行生成 C₃ ➔ C₃ 增加；C₅ 消耗而无来源 ➔ C₅ 减少！';
  }
  if (lightOn.value && !co2On.value) {
    return '【断碳瞬间】CO₂ 供应切断 ➔ CO₂ 固定停止，不再消耗 C₅ 亦不生成 C₃；而此时光反应供应充沛，原有的 C₃ 仍在继续还原为 C₅ ➔ C₃ 减少、C₅ 积累增多！';
  }
  return '光反应与暗反应均停滞，物质转化全面中断。';
});
</script>

<style scoped>
.interactive-card { margin: 24px 0; padding: 24px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); margin-bottom: 8px; }
.card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); }
.card-desc { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
.switches-panel { display: flex; gap: 16px; margin: 18px 0; flex-wrap: wrap; }
.switch-card { flex: 1; min-width: 240px; padding: 12px 16px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); display: flex; justify-content: space-between; align-items: center; }
.switch-label { font-size: 12.5px; font-weight: 600; color: var(--vp-c-text-1); }
.toggle-btn { padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; border: 1px solid #cbd5e1; background: #e2e8f0; color: #475569; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: all 0.25s; }
.toggle-btn .indicator { width: 8px; height: 8px; border-radius: 50%; background: #94a3b8; }
.toggle-btn.on { background: #dcfce7; color: #166534; border-color: #86efac; }
.toggle-btn.on .indicator { background: #22c55e; box-shadow: 0 0 6px #22c55e; }
.status-banner { padding: 10px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--vp-c-divider); }
.bg-steady { background: #f0fdf4; color: #166534; border-color: #bbf7d0; }
.bg-dark { background: #fffbeb; color: #b45309; border-color: #fde68a; }
.bg-nocarbon { background: #eff6ff; color: #1e40af; border-color: #bfdbfe; }
.rule-hint { font-weight: 700; color: #dc2626; }
.gauges-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px; }
.gauge-card { padding: 12px 14px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.gauge-title { font-size: 12px; font-weight: 600; color: var(--vp-c-text-2); margin-bottom: 6px; }
.gauge-bar-bg { height: 7px; background: var(--vp-c-bg-alt); border-radius: 4px; overflow: hidden; margin-bottom: 6px; }
.gauge-bar { height: 100%; transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1); border-radius: 4px; }
.bg-amber { background: #f59e0b; }
.bg-emerald { background: #10b981; }
.bg-blue { background: #3b82f6; }
.bg-purple { background: #8b5cf6; }
.gauge-meta { display: flex; justify-content: space-between; font-size: 11px; color: var(--vp-c-text-2); }
.reasoning-box { padding: 12px 16px; border-radius: 8px; background: var(--vp-c-bg-alt); border-left: 3px solid var(--vp-c-brand-1); }
.reasoning-title { font-size: 12px; font-weight: 700; margin-bottom: 4px; color: var(--vp-c-text-1); }
.reasoning-text { font-size: 12px; color: var(--vp-c-text-2); line-height: 1.5; }
</style>