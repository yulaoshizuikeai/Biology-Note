<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 03 · 细胞呼吸</div>
      <h3 class="card-title">双装置测定细胞呼吸与 RQ 液滴移动仪</h3>
      <p class="card-desc">切换底物与氧气工况，动态观察装置一（含 NaOH）与装置二（含清水）红墨水滴移动方向。</p>
    </div>

    <div class="control-grid">
      <div class="control-item">
        <label>呼吸作用类型：</label>
        <div class="pill-group">
          <button :class="['pill-btn', { active: respType === 'aerobic_glucose' }]" @click="respType = 'aerobic_glucose'">有氧分解葡萄糖</button>
          <button :class="['pill-btn', { active: respType === 'aerobic_lipid' }]" @click="respType = 'aerobic_lipid'">有氧分解脂肪 (富氢)</button>
          <button :class="['pill-btn', { active: respType === 'anaerobic_alcohol' }]" @click="respType = 'anaerobic_alcohol'">酵母菌酒精发酵</button>
          <button :class="['pill-btn', { active: respType === 'anaerobic_lactate' }]" @click="respType = 'anaerobic_lactate'">乳酸菌乳酸发酵</button>
        </div>
      </div>
    </div>

    <div class="apparatus-grid">
      <div class="apparatus-box">
        <div class="app-title">装置一：放置 20% NaOH 溶液 (吸收 CO₂)</div>
        <div class="pipe-view">
          <div class="pipe-tube">
            <div class="indicator-drop" :style="{ left: drop1Pos + '%' }"></div>
          </div>
          <div class="pipe-labels"><span>左移 (耗 O₂)</span><span>不动</span><span>右移</span></div>
        </div>
        <div class="app-status">液滴状态：<strong>{{ drop1Desc }}</strong></div>
        <div class="app-hint">NaOH 吸收全部 CO₂，故装置一气压变化仅由 <strong>O₂ 消耗量</strong> 决定！</div>
      </div>

      <div class="apparatus-box">
        <div class="app-title">装置二：放置等量蒸馏水 (不吸收气体)</div>
        <div class="pipe-view">
          <div class="pipe-tube">
            <div class="indicator-drop" :style="{ left: drop2Pos + '%' }"></div>
          </div>
          <div class="pipe-labels"><span>左移 (耗O₂ &gt; 产CO₂)</span><span>不动</span><span>右移 (产CO₂ &gt; 耗O₂)</span></div>
        </div>
        <div class="app-status">液滴状态：<strong>{{ drop2Desc }}</strong></div>
        <div class="app-hint">装置二气压变化取决于 <strong>CO₂ 释放量与 O₂ 消耗量的差值</strong>！</div>
      </div>
    </div>

    <div class="rq-summary">
      <div class="rq-val">呼吸熵 RQ 判定：<strong>{{ rqResult }}</strong></div>
      <div class="rq-rule">★ 物理对照校正原则：必须设置将活材料替换为<strong>等体积死材料（如煮沸杀死的种子）</strong>的对照组以消除物理温压波动误差。</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const respType = ref('aerobic_glucose');

const drop1Pos = computed(() => {
  if (respType.value === 'aerobic_glucose' || respType.value === 'aerobic_lipid') return 25;
  return 50; // 无氧不耗氧
});

const drop1Desc = computed(() => {
  if (respType.value === 'aerobic_glucose' || respType.value === 'aerobic_lipid') return '向左移动（消耗 O₂）';
  return '保持不动（不消耗 O₂）';
});

const drop2Pos = computed(() => {
  if (respType.value === 'aerobic_glucose') return 50; // 耗 O2 = 产 CO2
  if (respType.value === 'aerobic_lipid') return 30; // 耗 O2 > 产 CO2 -> 气压减小左移
  if (respType.value === 'anaerobic_alcohol') return 75; // 不耗 O2 产 CO2 -> 气压增大右移
  return 50; // 乳酸发酵不产生气体
});

const drop2Desc = computed(() => {
  if (respType.value === 'aerobic_glucose') return '保持不动（消耗 O₂ 等于 产生 CO₂）';
  if (respType.value === 'aerobic_lipid') return '向左移动（消耗 O₂ 大于 产生 CO₂）';
  if (respType.value === 'anaerobic_alcohol') return '向右移动（不耗 O₂，产生 CO₂ 膨胀）';
  return '保持不动（既不耗 O₂，也不产生 CO₂）';
});

const rqResult = computed(() => {
  if (respType.value === 'aerobic_glucose') return 'RQ = 1.0（呼吸底物全部为糖类）';
  if (respType.value === 'aerobic_lipid') return 'RQ < 1.0（约 0.7~0.8，底物富含脂肪）';
  if (respType.value === 'anaerobic_alcohol') return 'RQ = ∞（只进行无氧酒精发酵）';
  return '无气体交换（纯乳酸发酵）';
});
</script>

<style scoped>
.interactive-card { margin: 24px 0; padding: 24px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); margin-bottom: 8px; }
.card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); }
.card-desc { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
.control-grid { margin: 16px 0; }
.pill-group { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; }
.pill-btn { padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-2); cursor: pointer; }
.pill-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.apparatus-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin: 16px 0; }
.apparatus-box { padding: 16px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); }
.app-title { font-size: 13px; font-weight: 700; margin-bottom: 12px; }
.pipe-view { margin: 12px 0; }
.pipe-tube { height: 12px; background: #e2e8f0; border-radius: 6px; position: relative; border: 1px solid #cbd5e1; }
.indicator-drop { width: 14px; height: 14px; border-radius: 50%; background: #ef4444; position: absolute; top: -2px; transform: translateX(-50%); transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 6px rgba(239, 68, 68, 0.6); }
.pipe-labels { display: flex; justify-content: space-between; font-size: 10px; color: var(--vp-c-text-3); margin-top: 4px; }
.app-status { font-size: 12.5px; margin: 8px 0 4px; color: var(--vp-c-text-1); }
.app-hint { font-size: 11px; color: var(--vp-c-text-2); }
.rq-summary { padding: 14px; border-radius: 8px; background: var(--vp-c-bg-alt); border-left: 3px solid var(--vp-c-brand-1); }
.rq-val { font-size: 14px; margin-bottom: 4px; color: var(--vp-c-text-1); }
.rq-rule { font-size: 11.5px; color: var(--vp-c-text-2); }
</style>