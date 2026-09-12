<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 02 · 跨膜运输</div>
      <h3 class="card-title">跨膜运输动力学曲线与质壁分离模拟器</h3>
      <p class="card-desc">
        直观对比自由扩散、协助扩散与主动运输在浓度差及能量限制下的转运速率动力学。
      </p>
    </div>

    <div class="tabs">
      <button
        :class="['tab-btn', { active: activeTab === 'kinetics' }]"
        @click="activeTab = 'kinetics'"
      >
        运输动力学曲线对比
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'plasmolysis' }]"
        @click="activeTab = 'plasmolysis'"
      >
        质壁分离与自动复原
      </button>
    </div>

    <div v-if="activeTab === 'kinetics'" class="tab-content">
      <div class="slider-row">
        <label
          >膜外物质浓度差: <span class="val">{{ conc }}</span> mM</label
        >
        <input type="range" v-model.number="conc" min="0" max="100" step="1" />
      </div>

      <div class="rates-display">
        <div class="rate-card simple">
          <div class="rate-title">自由扩散 (Simple)</div>
          <div class="rate-bar-bg">
            <div class="rate-bar" :style="{ width: simpleRate + '%' }"></div>
          </div>
          <div class="rate-val">{{ simpleRate }}%</div>
          <div class="rate-desc">顺浓度无载体，速率随浓度线性上升，无饱和点</div>
        </div>
        <div class="rate-card facilitated">
          <div class="rate-title">协助扩散 (Facilitated)</div>
          <div class="rate-bar-bg">
            <div class="rate-bar" :style="{ width: facilitatedRate + '%' }"></div>
          </div>
          <div class="rate-val">{{ facilitatedRate }}%</div>
          <div class="rate-desc">受转运蛋白数量限制，高浓度下出现【载体饱和】</div>
        </div>
        <div class="rate-card active-trans">
          <div class="rate-title">主动运输 (Active)</div>
          <div class="rate-bar-bg">
            <div class="rate-bar" :style="{ width: activeRate + '%' }"></div>
          </div>
          <div class="rate-val">{{ activeRate }}%</div>
          <div class="rate-desc">消耗 ATP 逆浓度泵送，受载体数量与呼吸供能速率双重限制</div>
        </div>
      </div>
    </div>

    <div v-else class="tab-content">
      <div class="plasmolysis-ctrl">
        <label>选择外界溶液浸润植物细胞：</label>
        <div class="pill-group">
          <button
            :class="['pill-btn', { active: solution === 'sucrose' }]"
            @click="setSolution('sucrose')"
          >
            0.3g/mL 蔗糖溶液
          </button>
          <button
            :class="['pill-btn', { active: solution === 'kno3' }]"
            @click="setSolution('kno3')"
          >
            适宜浓度 KNO₃ 溶液
          </button>
          <button
            :class="['pill-btn', { active: solution === 'lethal' }]"
            @click="setSolution('lethal')"
          >
            0.5g/mL 过高浓度蔗糖
          </button>
        </div>
      </div>

      <div class="plasmolysis-state-box">
        <div class="state-badge" :class="solutionClass">{{ solutionStateTitle }}</div>
        <p class="state-explanation">{{ solutionStateDesc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const activeTab = ref("kinetics");
const conc = ref(40);
const solution = ref("sucrose");

const simpleRate = computed(() => Math.min(100, Math.round(conc.value * 1.0)));
const facilitatedRate = computed(() => Math.round((conc.value / (conc.value + 20)) * 100));
const activeRate = computed(() =>
  Math.min(100, Math.round((conc.value / (conc.value + 15)) * 100)),
);

const setSolution = (type: string) => {
  solution.value = type;
};

const solutionStateTitle = computed(() => {
  if (solution.value === "sucrose") return "质壁分离状态（不自动复原）";
  if (solution.value === "kno3") return "先质壁分离 ➔ 随后【自动复原】";
  return "过度失水死亡（滴加清水无法复原）";
});

const solutionStateDesc = computed(() => {
  if (solution.value === "sucrose")
    return "蔗糖分子不能跨过原生质层，外界渗透压持续高于细胞液，细胞维持质壁分离；滴加清水后可复原。";
  if (solution.value === "kno3")
    return "细胞先渗透失水发生分离；随后 K+ 和 NO3- 经主动运输被细胞吸收，细胞液渗透压反超外界，吸水自动复原！";
  return "外界渗透压过高，细胞极度失水迅速死亡，原生质层失去选择透过性，再加清水无法复原。";
});

const solutionClass = computed(() => {
  if (solution.value === "sucrose") return "state-amber";
  if (solution.value === "kno3") return "state-green";
  return "state-red";
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
.tabs {
  display: flex;
  gap: 8px;
  margin: 16px 0;
}
.tab-btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.slider-row {
  margin-bottom: 16px;
}
.slider-row label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}
.slider-row .val {
  color: var(--vp-c-brand-1);
  font-family: monospace;
}
.rates-display {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}
.rate-card {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.rate-title {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 8px;
}
.rate-bar-bg {
  height: 8px;
  background: var(--vp-c-bg-alt);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 6px;
}
.rate-bar {
  height: 100%;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 4px;
}
.simple .rate-bar {
  background: #3b82f6;
}
.facilitated .rate-bar {
  background: #10b981;
}
.active-trans .rate-bar {
  background: #8b5cf6;
}
.rate-val {
  font-size: 16px;
  font-weight: 700;
  font-family: monospace;
  margin-bottom: 4px;
}
.rate-desc {
  font-size: 11px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
.pill-group {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}
.pill-btn {
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
}
.pill-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.plasmolysis-state-box {
  margin-top: 16px;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.state-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 8px;
}
.state-amber {
  background: #fef3c7;
  color: #b45309;
}
.state-green {
  background: #d1fae5;
  color: #065f46;
}
.state-red {
  background: #fee2e2;
  color: #b91c1c;
}
.state-explanation {
  margin: 0;
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}
</style>
