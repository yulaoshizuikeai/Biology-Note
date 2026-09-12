<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 08 · 内环境与稳态</div>
      <h3 class="card-title">内环境体液各组分转化与组织水肿速诊仪</h3>
      <p class="card-desc">
        体液组分“双向渗透与单向循环”箭头秒判，组织水肿 5 大高频考查病因一键诊断排雷。
      </p>
    </div>

    <div class="mode-tabs">
      <button
        type="button"
        :class="['tab-btn', { active: activeMode === 'flow' }]"
        @click="activeMode = 'flow'"
      >
        ① 体液组分箭头判定与代号破译
      </button>
      <button
        type="button"
        :class="['tab-btn', { active: activeMode === 'edema' }]"
        @click="activeMode = 'edema'"
      >
        ② 组织水肿 5 大成因极速诊断
      </button>
    </div>

    <!-- 模式一：体液组分流向 -->
    <div v-if="activeMode === 'flow'" class="flow-panel">
      <div class="flow-diagram">
        <!-- 主干横向流动：血浆 <-> 组织液 <-> 细胞内液 -->
        <div class="flow-main-row">
          <!-- 节点 1：血浆 -->
          <div
            class="fluid-node node-plasma"
            :class="{ selected: selectedFluid === 'plasma' }"
            @click="selectedFluid = 'plasma'"
          >
            <div class="node-tag">内环境 (ECF)</div>
            <div class="node-title">血浆 (Plasma)</div>
            <div class="node-sub">含较多血浆蛋白</div>
          </div>

          <!-- 连接 1：双向渗透 -->
          <div class="connector-block">
            <span class="connector-arrow">⇄</span>
            <span class="connector-text">毛细血管壁<br />双向渗透</span>
          </div>

          <!-- 节点 2：组织液 -->
          <div
            class="fluid-node node-interstitial"
            :class="{ selected: selectedFluid === 'interstitial' }"
            @click="selectedFluid = 'interstitial'"
          >
            <div class="node-tag">内环境 (ECF)</div>
            <div class="node-title">组织液 (Interstitial)</div>
            <div class="node-sub">细胞直接生活的液体</div>
          </div>

          <!-- 连接 2：细胞膜双向物质交换 -->
          <div class="connector-block">
            <span class="connector-arrow">⇄</span>
            <span class="connector-text">细胞膜<br />双向交换</span>
          </div>

          <!-- 节点 3：细胞内液 -->
          <div
            class="fluid-node node-icf"
            :class="{ selected: selectedFluid === 'icf' }"
            @click="selectedFluid = 'icf'"
          >
            <div class="node-tag tag-icf">体液/非内环境</div>
            <div class="node-title">细胞内液 (ICF)</div>
            <div class="node-sub">占体液约 2/3</div>
          </div>
        </div>

        <!-- 下方淋巴循环支路：组织液 -> 淋巴液 -> 锁骨下静脉 -> 血浆 -->
        <div class="flow-lymph-loop">
          <div class="lymph-return-arrow">
            <span class="loop-arrow-symbol">⮤</span>
            <span class="loop-arrow-text">左右锁骨下静脉<br />单向汇入血浆</span>
          </div>

          <div
            class="fluid-node node-lymph"
            :class="{ selected: selectedFluid === 'lymph' }"
            @click="selectedFluid = 'lymph'"
          >
            <div class="node-tag">内环境 (ECF)</div>
            <div class="node-title">淋巴液 (Lymph)</div>
            <div class="node-sub">淋巴细胞与吞噬细胞</div>
          </div>

          <div class="lymph-intake-arrow">
            <span class="loop-arrow-symbol">⮡</span>
            <span class="loop-arrow-text">毛细淋巴管盲端<br />单向渗入形成淋巴</span>
          </div>
        </div>
      </div>

      <div class="fluid-detail-card">
        <div class="detail-header">
          <strong>【当前选中组分解析】{{ currentFluidData.title }}</strong>
        </div>
        <p class="detail-text">{{ currentFluidData.desc }}</p>
        <div class="code-breaker">
          <strong>★ 高考题型代号破译绝招：</strong>
          <span>{{ currentFluidData.rule }}</span>
        </div>
      </div>
    </div>

    <!-- 模式二：组织水肿成因 -->
    <div v-else class="edema-panel">
      <div class="causes-selector">
        <button
          v-for="cause in edemaCauses"
          :key="cause.id"
          type="button"
          :class="['cause-btn', { active: selectedCause === cause.id }]"
          @click="selectedCause = cause.id"
        >
          {{ cause.name }}
        </button>
      </div>

      <div class="edema-result-box">
        <div class="edema-pathway">
          <div class="step-badge">病因诱发</div>
          <span class="step-text">{{ currentCauseData.trigger }}</span>
          <span class="path-arrow">➔</span>
          <div class="step-badge step-mid">生理改变</div>
          <span class="step-text">{{ currentCauseData.change }}</span>
          <span class="path-arrow">➔</span>
          <div class="step-badge step-dest">最终结局</div>
          <span class="step-text text-danger">{{ currentCauseData.result }}</span>
        </div>

        <div class="edema-summary-banner">
          <strong>★ 考场规范答题统一结论归纳：</strong>
          <p>{{ currentCauseData.mechanism }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const activeMode = ref<"flow" | "edema">("flow");
const selectedFluid = ref<"plasma" | "interstitial" | "lymph" | "icf">("interstitial");
const selectedCause = ref<"malnutrition" | "allergy" | "nephritis" | "lymph" | "metabolism">(
  "malnutrition",
);

const fluidData = {
  plasma: {
    title: "血浆（血管内）",
    desc: "水、无机盐、血浆蛋白（如白蛋白、球蛋白、纤维蛋白原）。与组织液之间通过毛细血管壁双向交换物质（红细胞与大分子蛋白不可滤出）。",
    rule: "在带有箭头的网络图中：与组织液有【双向箭头】且接收淋巴液【单向箭头】汇入的，必定为血浆！",
  },
  interstitial: {
    title: "组织液（组织细胞间隙）",
    desc: "内环境中含量最丰富的组分，是绝大多数组织细胞直接生存的环境。与血浆双向交换，单向渗入毛细淋巴管盲端形成淋巴液。",
    rule: "在网络图中：既与血浆双向交换、又与细胞内液双向交换，且有【单向箭头指向淋巴液】的中心枢纽，必定为组织液！",
  },
  lymph: {
    title: "淋巴液（淋巴管内）",
    desc: "来源于组织液单向渗入，流经各级淋巴结过滤，最后经左右锁骨下静脉单向回流汇入血浆。淋巴循环受阻会引发严重组织水肿。",
    rule: "在网络图中：只进（来自组织液）只出（汇入血浆）的【单向管道】，两端均为单向箭头的必定为淋巴液！",
  },
  icf: {
    title: "细胞内液（细胞膜内）",
    desc: "占体液总量的约 2/3，不属于内环境！富含 K⁺、HPO₄²⁻ 与蛋白质。通过细胞膜与组织液进行水与溶质的双向跨膜交换。",
    rule: "若图中有结构代表细胞（如组织细胞、红细胞），与内环境某成分只有双向箭头的端点即为细胞内液！",
  },
};

const currentFluidData = computed(() => fluidData[selectedFluid.value]);

const edemaCauses = [
  { id: "malnutrition", name: "① 长期营养不良" },
  { id: "allergy", name: "② 花粉等过敏反应" },
  { id: "nephritis", name: "③ 肾小球肾炎" },
  { id: "lymph", name: "④ 丝虫病/淋巴管堵塞" },
  { id: "metabolism", name: "⑤ 剧烈运动代谢旺盛" },
];

const edemaData = {
  malnutrition: {
    trigger: "摄入蛋白质不足",
    change: "血浆蛋白减少 ➔ 血浆胶体渗透压显著下降",
    result: "水分由血浆渗出到组织液增多，组织液回流受阻，出现全身性浮肿",
    mechanism: "血浆蛋白合成不足 ➔ 血浆渗透压下降 ➔ 组织液水分吸收减少且向外渗出增加 ➔ 组织水肿。",
  },
  allergy: {
    trigger: "过敏原刺激肥大细胞释放组胺",
    change: "毛细血管壁通透性急剧增大 ➔ 血浆蛋白渗漏入组织液",
    result: "组织液渗透压相对升高，吸水膨胀，局部皮肤红肿荨麻疹",
    mechanism:
      "毛细血管壁通透性增大 ➔ 血浆蛋白进入组织液 ➔ 组织液渗透压升高 ➔ 吸水导致局部组织水肿。",
  },
  nephritis: {
    trigger: "肾小球滤过膜受损发生病变",
    change: "血浆蛋白随尿液流失形成蛋白尿 ➔ 血浆渗透压降低",
    result: "大量水分自血管渗向组织间隙，清晨眼睑或下肢浮肿",
    mechanism: "蛋白尿导致血浆蛋白流失 ➔ 血浆胶体渗透压下降 ➔ 水分滞留组织间隙形成水肿。",
  },
  lymph: {
    trigger: "丝虫寄生或肿瘤压迫淋巴结",
    change: "淋巴循环受阻 ➔ 组织液中原本通过淋巴回收的蛋白质滞留",
    result: "组织液蛋白质浓度与渗透压持续攀升，造成严重象皮肿",
    mechanism: "淋巴回流受阻 ➔ 组织液大分子蛋白质无法回收 ➔ 组织液渗透压升高 ➔ 持续滞水水肿。",
  },
  metabolism: {
    trigger: "剧烈无氧运动产生大量乳酸",
    change: "无氧呼吸产物乳酸及代谢废物短时间内大量堆积在组织液中",
    result: "组织液局部渗透压升高吸水，肌肉酸胀甚至水肿",
    mechanism:
      "组织液代谢产物积累 ➔ 局部渗透压相对升高 ➔ 吸水导致肌肉短暂酸胀水肿（经血液循环可自行消退）。",
  },
};

const currentCauseData = computed(() => edemaData[selectedCause.value]);
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
.mode-tabs {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
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
.flow-diagram {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 16px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px;
}
.flow-main-row {
  display: grid;
  grid-template-columns: 1.2fr auto 1.2fr auto 1.2fr;
  align-items: center;
  gap: 8px;
}
.connector-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.connector-arrow {
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  line-height: 1;
}
.connector-text {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
  line-height: 1.2;
  margin-top: 3px;
}
.flow-lymph-loop {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr 1.2fr;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
}
.lymph-return-arrow,
.lymph-intake-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 3px;
}
.loop-arrow-symbol {
  font-size: 18px;
  font-weight: bold;
  color: var(--vp-c-brand-1);
}
.loop-arrow-text {
  font-size: 10.5px;
  color: var(--vp-c-text-3);
  line-height: 1.2;
}
.node-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  margin-bottom: 4px;
}
.tag-icf {
  background: #f1f5f9;
  color: #64748b;
}
.fluid-node {
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  cursor: pointer;
  transition: all 0.2s;
}
.fluid-node:hover {
  border-color: var(--vp-c-brand-1);
}
.fluid-node.selected {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.node-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.node-sub {
  font-size: 11px;
  color: var(--vp-c-text-2);
  margin-top: 2px;
}
@media (max-width: 640px) {
  .flow-main-row {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .flow-lymph-loop {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
.fluid-detail-card {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border-left: 4px solid var(--vp-c-brand-1);
}
.detail-header {
  font-size: 13px;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}
.detail-text {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 0 0 8px;
}
.code-breaker {
  padding: 8px 12px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  font-size: 12px;
  color: var(--vp-c-text-1);
  border: 1px dashed var(--vp-c-divider);
}
.code-breaker strong {
  color: var(--vp-c-brand-1);
}
.causes-selector {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
.cause-btn {
  padding: 7px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s;
}
.cause-btn.active {
  background: #ef4444;
  color: #fff;
  border-color: #ef4444;
}
.edema-result-box {
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.edema-pathway {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}
.step-badge {
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 700;
  background: #f1f5f9;
  color: #475569;
}
.step-mid {
  background: #fef3c7;
  color: #b45309;
}
.step-dest {
  background: #fee2e2;
  color: #b91c1c;
}
.step-text {
  font-size: 12.5px;
  color: var(--vp-c-text-1);
}
.path-arrow {
  color: var(--vp-c-text-3);
  font-weight: 700;
}
.text-danger {
  color: #dc2626;
  font-weight: 600;
}
.edema-summary-banner {
  padding: 12px 14px;
  border-radius: 6px;
  background: var(--vp-c-bg-alt);
  border-left: 3px solid #ef4444;
  font-size: 12px;
}
.edema-summary-banner strong {
  color: #b91c1c;
}
.edema-summary-banner p {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
</style>
