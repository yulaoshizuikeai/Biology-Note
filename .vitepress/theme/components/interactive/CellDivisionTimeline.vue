<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 04 · 细胞增殖</div>
      <h3 class="card-title">细胞分裂染色体与 DNA 数量联动时钟</h3>
      <p class="card-desc">拖动时期时间轴，即时观察有丝分裂各时期染色体行为特征与数量折线变化。</p>
    </div>

    <div class="timeline-ctrl">
      <div class="phase-selector">
        <button v-for="(p, idx) in phases" :key="p.name" :class="['phase-btn', { active: currentPhaseIdx === idx }]" @click="currentPhaseIdx = idx">
          {{ p.name }}
        </button>
      </div>
    </div>

    <div class="display-panel">
      <div class="visual-box">
        <div class="visual-header">微观细胞图景 (2n = 4 模式生物)</div>
        <div class="cell-stage-graphic">
          <div class="chrom-container">
            <span class="phase-callout">{{ phases[currentPhaseIdx].name }}</span>
            <div class="stage-tagline">{{ phases[currentPhaseIdx].behavior }}</div>
          </div>
        </div>
      </div>

      <div class="data-table-box">
        <div class="data-row">
          <span>染色体数 (着丝粒数)：</span>
          <strong>{{ phases[currentPhaseIdx].chromCount }}</strong>
        </div>
        <div class="data-row">
          <span>染色单体数：</span>
          <strong>{{ phases[currentPhaseIdx].chromatidCount }}</strong>
        </div>
        <div class="data-row">
          <span>核 DNA 分子数：</span>
          <strong>{{ phases[currentPhaseIdx].dnaCount }}</strong>
        </div>
        <div class="data-row highlight">
          <span>时期核心特征：</span>
          <span class="feat">{{ phases[currentPhaseIdx].feature }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentPhaseIdx = ref(2);

const phases = [
  { name: '间期 (G1/S/G2)', chromCount: '4', chromatidCount: '0 ➔ 8', dnaCount: '4 ➔ 8', behavior: 'DNA 复制与中心粒复制', feature: '染色质呈细丝网状，完成 DNA 复制与蛋白质合成' },
  { name: '前期 (Prophase)', chromCount: '4', chromatidCount: '8', dnaCount: '8', behavior: '散乱分布在纺锤体中央', feature: '核仁解体、核膜消失，染色质高度螺旋形成染色体' },
  { name: '中期 (Metaphase)', chromCount: '4', chromatidCount: '8', dnaCount: '8', behavior: '着丝粒整齐排列在赤道板', feature: '染色体形态最固定、数目最清晰，最佳观察时期' },
  { name: '后期 (Anaphase)', chromCount: '8 (加倍!)', chromatidCount: '0', dnaCount: '8', behavior: '着丝粒分裂，单体分开移向两极', feature: '着丝粒分裂导致染色体数目瞬间加倍，无染色单体！' },
  { name: '末期 (Telophase)', chromCount: '4 (每子细胞)', chromatidCount: '0', dnaCount: '4', behavior: '细胞板形成细胞壁，均分完成', feature: '两消两现：核膜核仁重现，纺锤体与染色体消失' }
];
</script>

<style scoped>
.interactive-card { margin: 24px 0; padding: 24px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); margin-bottom: 8px; }
.card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); }
.card-desc { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
.phase-selector { display: flex; gap: 6px; margin: 16px 0; overflow-x: auto; padding-bottom: 4px; }
.phase-btn {
  flex: 1; padding: 8px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;
  border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg); color: var(--vp-c-text-2); cursor: pointer; white-space: nowrap;
}
.phase-btn.active { background: var(--vp-c-brand-1); color: #fff; border-color: var(--vp-c-brand-1); }
.display-panel { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.visual-box { padding: 16px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); text-align: center; }
.visual-header { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 12px; }
.cell-stage-graphic { min-height: 100px; display: flex; align-items: center; justify-content: center; }
.phase-callout { font-size: 18px; font-weight: 700; color: var(--vp-c-brand-1); display: block; margin-bottom: 6px; }
.stage-tagline { font-size: 13px; color: var(--vp-c-text-1); font-weight: 600; }
.data-table-box { padding: 16px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); display: flex; flex-direction: column; justify-content: space-around; gap: 8px; }
.data-row { display: flex; justify-content: space-between; font-size: 13px; padding-bottom: 6px; border-bottom: 1px dashed var(--vp-c-divider); }
.data-row strong { font-family: monospace; font-size: 14px; color: var(--vp-c-brand-1); }
.data-row.highlight { border-bottom: none; flex-direction: column; gap: 4px; padding-bottom: 0; }
.feat { font-size: 12px; color: var(--vp-c-text-2); line-height: 1.4; }
</style>