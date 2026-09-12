<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 16 · 经典实验</div>
      <h3 class="card-title">高中生物显色反应试管调色盘</h3>
      <p class="card-desc">
        点击选择待测物质与检测试剂，即时模拟化学显色反应、反应条件与考场排雷要诀。
      </p>
    </div>

    <div class="reagent-pills">
      <button
        v-for="r in reagents"
        :key="r.id"
        type="button"
        :class="['r-btn', { active: currentReagent === r.id }]"
        :aria-label="r.name"
        @click="currentReagent = r.id"
      >
        {{ r.name }}
      </button>
    </div>

    <div class="test-tube-stage">
      <div class="tube-container">
        <div class="glass-tube">
          <div class="liquid" :style="{ background: curData.color }">
            <div class="precipitate" v-if="curData.hasPrecipitate"></div>
          </div>
        </div>
        <div class="tube-label">{{ curData.colorName }}</div>
      </div>

      <div class="reagent-details">
        <div class="detail-row">
          <span>待测生物物质：</span><strong>{{ curData.substance }}</strong>
        </div>
        <div class="detail-row">
          <span>使用试剂：</span><strong>{{ curData.reagentName }}</strong>
        </div>
        <div class="detail-row">
          <span>反应条件：</span><span class="cond-tag">{{ curData.condition }}</span>
        </div>
        <div class="detail-warning">
          <strong>★ 考场操作禁忌与避坑要诀：</strong>
          <p>{{ curData.warning }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const currentReagent = ref("fehling");

const reagents = [
  { id: "fehling", name: "还原糖 · 斐林试剂" },
  { id: "biuret", name: "蛋白质 · 双缩脲试剂" },
  { id: "sudan", name: "脂肪 · 苏丹 Ⅲ" },
  { id: "alcohol", name: "酒精 · 酸性重铬酸钾" },
  { id: "diphenylamine", name: "DNA · 二苯胺试剂" },
];

const reagentData = {
  fehling: {
    substance: "还原糖 (葡萄糖、果糖、麦芽糖等)",
    reagentName: "斐林试剂 (甲液 0.1g/mL NaOH + 乙液 0.05g/mL CuSO₄)",
    condition: "50~65℃ 温水浴加热",
    color: "linear-gradient(to bottom, #f87171, #b91c1c)",
    colorName: "砖红色沉淀 (Cu₂O)",
    hasPrecipitate: true,
    warning: "必须【等量混匀现配现用】；严禁选用西瓜等有色材料；蔗糖为非还原糖不反应！",
  },
  biuret: {
    substance: "蛋白质 (含两个以上肽键的多肽/蛋白质)",
    reagentName: "双缩脲试剂 (A液 0.1g/mL NaOH + B液 0.01g/mL CuSO₄)",
    condition: "常温反应，无需加热",
    color: "linear-gradient(to bottom, #c084fc, #7e22ce)",
    colorName: "紫色络合物",
    hasPrecipitate: false,
    warning:
      "必须【先后加入】：先加 A 液 1mL 营造碱性环境，再滴入 B 液 4 滴；B 液严禁过量（否则铜离子蓝色掩盖紫色）。",
  },
  sudan: {
    substance: "脂肪 (甘油三酯)",
    reagentName: "苏丹 Ⅲ 染液 (或苏丹 Ⅳ)",
    condition: "显微镜观察",
    color: "linear-gradient(to bottom, #fdba74, #ea580c)",
    colorName: "橘黄色脂肪滴 (苏丹Ⅳ呈红色)",
    hasPrecipitate: false,
    warning:
      "花生子叶染色后必须滴加【体积分数 50% 的酒精溶液洗去浮色】，因为苏丹染料易溶于有机溶剂酒精。",
  },
  alcohol: {
    substance: "酒精 (乙醇)",
    reagentName: "重铬酸钾溶液",
    condition: "浓硫酸酸性环境",
    color: "linear-gradient(to bottom, #6ee7b7, #047857)",
    colorName: "橙色 ➔ 灰绿色",
    hasPrecipitate: false,
    warning: "检测酵母菌无氧呼吸产物时，需先保证反应时间充分，避免葡萄糖未耗尽产生颜色干扰。",
  },
  diphenylamine: {
    substance: "DNA 分子",
    reagentName: "二苯胺试剂",
    condition: "沸水浴加热",
    color: "linear-gradient(to bottom, #60a5fa, #1d4ed8)",
    colorName: "蓝色",
    hasPrecipitate: false,
    warning:
      "粗提取 DNA 时利用在 0.14 mol/L NaCl 中溶解度最低析出，并在 95% 预冷酒精中沉淀；二苯胺必须沸水浴变蓝。",
  },
};

const curData = computed(() => reagentData[currentReagent.value]);
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
.reagent-pills {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
}
.r-btn {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.r-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.test-tube-stage {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  align-items: center;
}
.tube-container {
  text-align: center;
}
.glass-tube {
  width: 36px;
  height: 140px;
  margin: 0 auto;
  border: 2px solid #94a3b8;
  border-top: none;
  border-radius: 0 0 18px 18px;
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.4);
}
.liquid {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
  transition: background 0.4s ease;
}
.precipitate {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background: rgba(185, 28, 28, 0.9);
}
.tube-label {
  font-size: 12px;
  font-weight: 700;
  margin-top: 8px;
  color: var(--vp-c-text-1);
}
.reagent-details {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.detail-row {
  font-size: 12.5px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
}
.detail-row strong {
  color: var(--vp-c-text-1);
}
.cond-tag {
  background: #fef3c7;
  color: #b45309;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
}
.detail-warning {
  margin-top: 8px;
  padding: 10px;
  border-radius: 6px;
  background: #fef2f2;
  border-left: 3px solid #ef4444;
  font-size: 12px;
  line-height: 1.4;
  color: #991b1b;
}
.detail-warning p {
  margin: 4px 0 0;
}

@media (max-width: 640px) {
  .test-tube-stage {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
