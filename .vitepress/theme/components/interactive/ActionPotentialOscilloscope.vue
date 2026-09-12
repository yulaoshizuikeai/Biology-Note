<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 09 · 神经调节</div>
      <h3 class="card-title">神经元膜电位与示波器偏转动态模拟器</h3>
      <p class="card-desc">
        调节刺激强度与胞外 Na⁺ 浓度，观察离子通道启闭、去极化/复极化波形与示波器指针偏转。
      </p>
    </div>

    <div class="controls-deck">
      <button
        type="button"
        :class="['stimulate-btn', { firing: isFiring }]"
        :disabled="isFiring"
        aria-label="施加外界刺激激发冲动"
        @click="triggerStimulation"
      >
        ⚡ 施加外界刺激 (激发冲动)
      </button>

      <div class="ctrl-group">
        <label
          >胞外 Na⁺ 浓度水平: <span class="val">{{ naLevel }}%</span></label
        >
        <div class="pill-group">
          <button
            type="button"
            :class="['pill-btn', { active: naLevel === 70 }]"
            aria-label="低钠 70%"
            @click="naLevel = 70"
          >
            低钠 (70%)
          </button>
          <button
            type="button"
            :class="['pill-btn', { active: naLevel === 100 }]"
            aria-label="正常 100%"
            @click="naLevel = 100"
          >
            正常 (100%)
          </button>
          <button
            type="button"
            :class="['pill-btn', { active: naLevel === 130 }]"
            aria-label="高钠 130%"
            @click="naLevel = 130"
          >
            高钠 (130%)
          </button>
        </div>
      </div>
    </div>

    <div class="oscillo-panel">
      <div class="meter-view">
        <div class="dial-arc">
          <div class="needle" :style="{ transform: 'rotate(' + needleAngle + 'deg)' }"></div>
        </div>
        <div class="meter-readout">{{ currentVoltage }} mV</div>
        <div class="dial-labels"><span>左偏</span><span>0</span><span>右偏</span></div>
      </div>

      <div class="stage-info">
        <div class="stage-badge" :class="phaseBadgeClass">{{ phaseName }}</div>
        <div class="stage-desc">{{ phaseDescription }}</div>
        <div class="ion-transport-pill">
          <strong>离子运输方式：</strong>{{ phaseTransportType }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";

const isFiring = ref(false);
const naLevel = ref(100);
const currentVoltage = ref(-70);
const needleAngle = ref(0);
const phaseIndex = ref(0); // 0: 静息, 1: 刺激去极化, 2: 峰值, 3: 复极化, 4: 恢复
const timerIds: ReturnType<typeof setTimeout>[] = [];

const clearAllTimers = () => {
  timerIds.forEach((id) => clearTimeout(id));
  timerIds.length = 0;
};

onBeforeUnmount(() => {
  clearAllTimers();
});

const peakVoltage = computed(() => Math.round(30 * (naLevel.value / 100)));

const phaseName = computed(() => {
  switch (phaseIndex.value) {
    case 0:
      return "静息状态 (Resting)";
    case 1:
      return "去极化阶段 (Depolarization)";
    case 2:
      return "动作电位峰值 (Peak Action)";
    case 3:
      return "复极化与超极化 (Repolarization)";
    case 4:
      return "静息电位恢复 (Recovery)";
    default:
      return "静息状态";
  }
});

const phaseDescription = computed(() => {
  switch (phaseIndex.value) {
    case 0:
      return "膜对 K⁺ 通透性高，K⁺ 经通道蛋白外流，膜电位维持在【外正内负】(-70mV)。";
    case 1:
      return "受阈刺激激发，电压门控 Na⁺ 通道瞬间大开，Na⁺ 顺浓度差快速内流，膜电位倒转！";
    case 2:
      return `膜内电位冲至峰值 (+${peakVoltage.value}mV)，电表发生第一次偏转！胞外高钠峰值更高，低钠峰值降低。`;
    case 3:
      return "Na⁺ 通道失活关闭，电压门控 K⁺ 通道开放，K⁺ 快速外流，膜电位回归负值，电表发生第二次反向偏转！";
    case 4:
      return "Na⁺-K⁺ 泵主动运输消耗 ATP，逆浓度泵出 3 个 Na⁺、泵入 2 个 K⁺，彻底恢复原始离子浓度梯度的静态平衡。";
    default:
      return "";
  }
});

const phaseTransportType = computed(() => {
  switch (phaseIndex.value) {
    case 0:
      return "K⁺ 外流 ➔ 协助扩散 (不耗能)";
    case 1:
      return "Na⁺ 内流 ➔ 协助扩散 (不耗能)";
    case 2:
      return "通道关闭失活";
    case 3:
      return "K⁺ 外流 ➔ 协助扩散 (不耗能)";
    case 4:
      return "Na⁺-K⁺ 泵转运 ➔ 主动运输 (消耗 ATP)";
    default:
      return "协助扩散";
  }
});

const phaseBadgeClass = computed(() => {
  if (phaseIndex.value === 0) return "b-slate";
  if (phaseIndex.value === 1 || phaseIndex.value === 2) return "b-red";
  return "b-blue";
});

const triggerStimulation = () => {
  if (isFiring.value) return;
  clearAllTimers();
  isFiring.value = true;
  phaseIndex.value = 1;
  currentVoltage.value = -30;
  needleAngle.value = -35; // 偏转1

  timerIds.push(
    setTimeout(() => {
      phaseIndex.value = 2;
      currentVoltage.value = peakVoltage.value;
      needleAngle.value = -45;
    }, 400),
  );

  timerIds.push(
    setTimeout(() => {
      phaseIndex.value = 3;
      currentVoltage.value = -80;
      needleAngle.value = 40; // 反向偏转2
    }, 900),
  );

  timerIds.push(
    setTimeout(() => {
      phaseIndex.value = 4;
      currentVoltage.value = -70;
      needleAngle.value = 0;
    }, 1400),
  );

  timerIds.push(
    setTimeout(() => {
      phaseIndex.value = 0;
      isFiring.value = false;
      clearAllTimers();
    }, 1900),
  );
};
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
.controls-deck {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
  flex-wrap: wrap;
  gap: 12px;
}
.stimulate-btn {
  padding: 10px 20px;
  border-radius: 8px;
  background: #ef4444;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.stimulate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.pill-group {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}
.pill-btn {
  padding: 5px 12px;
  border-radius: 6px;
  font-size: 12px;
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
.ctrl-group label {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
.ctrl-group .val {
  color: var(--vp-c-brand-1);
  font-family: monospace;
}
.oscillo-panel {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 20px;
  align-items: center;
}
.meter-view {
  text-align: center;
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.dial-arc {
  width: 80px;
  height: 40px;
  margin: 0 auto 8px;
  border-top: 3px solid #94a3b8;
  border-radius: 40px 40px 0 0;
  position: relative;
}
.needle {
  width: 2px;
  height: 35px;
  background: #ef4444;
  position: absolute;
  bottom: 0;
  left: 39px;
  transform-origin: bottom center;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.meter-readout {
  font-size: 20px;
  font-weight: 700;
  font-family: monospace;
  color: var(--vp-c-text-1);
}
.dial-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}
.stage-info {
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.stage-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 6px;
}
.b-slate {
  background: #f1f5f9;
  color: #475569;
}
.b-red {
  background: #fee2e2;
  color: #b91c1c;
}
.b-blue {
  background: #dbeafe;
  color: #1e40af;
}
.stage-desc {
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
  margin-bottom: 8px;
}
.ion-transport-pill {
  font-size: 12px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 4px 10px;
  border-radius: 6px;
  display: inline-block;
}

@media (max-width: 640px) {
  .oscillo-panel {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
