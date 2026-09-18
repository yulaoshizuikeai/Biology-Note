<script setup lang="ts">
import { withBase } from "vitepress";
import { computed, markRaw, ref } from "vue";

import ActionPotentialOscilloscope from "./ActionPotentialOscilloscope.vue";
import AuxinSensitivityProbe from "./AuxinSensitivityProbe.vue";
import BiochemicalStainingPalette from "./BiochemicalStainingPalette.vue";
import CellDivisionTimeline from "./CellDivisionTimeline.vue";
import EnergyFlowBalance from "./EnergyFlowBalance.vue";
import HardyWeinbergSimulator from "./HardyWeinbergSimulator.vue";
import MembraneTransportSimulator from "./MembraneTransportSimulator.vue";
import MeselsonStahlCentrifuge from "./MeselsonStahlCentrifuge.vue";
import PcrCycleVisualizer from "./PcrCycleVisualizer.vue";
import PedigreeAnalysisSolver from "./PedigreeAnalysisSolver.vue";
import PhotosynthesisSimulator from "./PhotosynthesisSimulator.vue";
import PopulationGrowthSandbox from "./PopulationGrowthSandbox.vue";
import ProteinCondensationCalc from "./ProteinCondensationCalc.vue";
import PunnettSquarePuzzle from "./PunnettSquarePuzzle.vue";
import RespirationRqDropletShift from "./RespirationRqDropletShift.vue";
import TissueEdemaDiagnoser from "./TissueEdemaDiagnoser.vue";

interface ModelInfo {
  key: string;
  title: string;
  category: "cell" | "metabolism" | "genetics" | "regulation" | "ecology" | "experiment";
  badge: string;
  desc: string;
  formula: string;
  thinking: string;
  chapterLink: string;
  chapterTitle: string;
  component: any;
}

const activeCategory = ref<string>("all");
const activeKey = ref<string>("photosynthesis");

const categories = [
  { key: "all", label: "全部模型 (16)" },
  { key: "metabolism", label: "代谢与能量 (2)" },
  { key: "genetics", label: "遗传与进化 (4)" },
  { key: "regulation", label: "稳态与调节 (3)" },
  { key: "cell", label: "分子与细胞 (3)" },
  { key: "ecology", label: "生态与工程 (3)" },
  { key: "experiment", label: "实验探究 (1)" },
];

const models: ModelInfo[] = [
  {
    key: "photosynthesis",
    title: "光合微观机理与瞬时突变模拟器",
    category: "metabolism",
    badge: "03 细胞代谢与能量供应",
    desc: "模拟光照突变（如撤去光照/增强光照）或 CO₂ 浓度突变时，类囊体膜与叶绿体基质中 ATP、NADPH、C₃ 与 C₅ 化合物浓度的瞬时动力学消长。深入剖析暗反应动态平衡与光反应能量耦合机制。",
    formula: "光反应: H₂O + NADP⁺ + ADP ➔ ½O₂ + NADPH + ATP; 暗反应: CO₂ + C₅ ➔ 2C₃",
    thinking: "动态平衡移动原理、源库能量流耦合、环境因子瞬时阻断分析",
    chapterLink:
      "/03%20细胞代谢与能量供应（酶、ATP与呼吸光合）/04%20光合作用微观机理与瞬时突变动态模型",
    chapterTitle: "专题 03 · 光合作用微观机理与瞬时突变动态模型",
    component: markRaw(PhotosynthesisSimulator),
  },
  {
    key: "respiration",
    title: "呼吸熵与液滴移动定量测定仪",
    category: "metabolism",
    badge: "03 细胞代谢与能量供应",
    desc: "通过配置 NaOH 溶液（吸收 CO₂）与清水对照装置，实时模拟酵母菌或萌发种子在不同底物（糖类、脂肪）呼吸时的红色液滴移动方向与物理位移量，直观计算呼吸熵 RQ = V(CO₂)/V(O₂)。",
    formula: "糖类彻底氧化 RQ = 1.0; 脂肪富含氢氧化 RQ < 1.0; 无氧呼吸不耗氧 RQ > 1.0",
    thinking: "守恒定律与理想气体物态方程、多装置物理对照排除气压误差",
    chapterLink:
      "/03%20细胞代谢与能量供应（酶、ATP与呼吸光合）/03%20细胞呼吸微观机理与呼吸熵定量模型",
    chapterTitle: "专题 03 · 细胞呼吸微观机理与呼吸熵定量模型",
    component: markRaw(RespirationRqDropletShift),
  },
  {
    key: "pedigree",
    title: "遗传系谱图判定决策树与概率求解器",
    category: "genetics",
    badge: "05 孟德尔遗传规律与伴性遗传",
    desc: "交互式三步排查法：第一步判定显隐性（无中生有为隐性，有中生无为显性）；第二步排除伴性遗传冲突（隐性看女病，父子皆病为伴隐）；第三步应用配子概率法与哈温平衡精准计算后代患病风险。",
    formula: "配子概率法: P(aa) = P(a配子) × P(a配子); 哈温平衡: p² + 2pq + q² = 1",
    thinking: "逻辑排除法、假说演绎法与独立事件概率乘法定理",
    chapterLink: "/05%20孟德尔遗传规律与伴性遗传/03%20伴性遗传与遗传系谱图三步排查法",
    chapterTitle: "专题 05 · 伴性遗传与遗传系谱图三步排查法",
    component: markRaw(PedigreeAnalysisSolver),
  },
  {
    key: "punnett",
    title: "自由组合 9:3:3:1 变式与棋盘拼图",
    category: "genetics",
    badge: "05 孟德尔遗传规律与伴性遗传",
    desc: "系统拆解两对等位基因自由组合 16 组合棋盘。动态演示双显性互补、重复效应、显性上位、隐性上位等多种致死与表型合并变形（9:7, 9:6:1, 9:3:4, 15:1, 13:3, 12:3:1）的微观基因型对应关系。",
    formula: "F₂ 表型比: (A_B_) : (A_bb) : (aaB_) : (aabb) = 9 : 3 : 3 : 1 之变式重组",
    thinking: "组合数学拆分法、离散因子独立分配与基因互作模型",
    chapterLink:
      "/05%20孟德尔遗传规律与伴性遗传/02%20两对相对性状杂交实验与9331变式全景矩阵（自由组合定律）",
    chapterTitle: "专题 05 · 自由组合定律与 9331 变式全景矩阵",
    component: markRaw(PunnettSquarePuzzle),
  },
  {
    key: "centrifuge",
    title: "DNA 半保留复制同位素离心推演器",
    category: "genetics",
    badge: "06 基因的本质与中心法则",
    desc: "动态复现 Meselson-Stahl 经典实验：利用 ¹⁵N 与 ¹⁴N 同位素标记大肠杆菌，通过氯化铯密度梯度离心，直观展现经过 n 代连续复制后全重带（¹⁵N/¹⁵N）、杂合带（¹⁵N/¹⁴N）与轻带（¹⁴N/¹⁴N）的比例演化。",
    formula: "第 n 代总分子数 2ⁿ; 杂合分子数始终为 2 (占比 2/2ⁿ); 含原模板链的 DNA 占 1/2ⁿ⁻¹",
    thinking: "同位素示踪法、几何级数倍增与原子守恒定律",
    chapterLink:
      "/06%20基因的本质与中心法则（复制、转录与翻译）/02%20DNA%20的双螺旋结构与半保留复制计算模型",
    chapterTitle: "专题 06 · DNA 双螺旋结构与半保留复制计算模型",
    component: markRaw(MeselsonStahlCentrifuge),
  },
  {
    key: "hardy_weinberg",
    title: "哈代-温伯格平衡与基因频率沙盒",
    category: "genetics",
    badge: "07 生物的变异、育种与进化",
    desc: "调控突变率、自然选择淘汰系数、迁入迁出与种群规模，实时观察种群常染色体与伴性遗传等位基因频率（p, q）的代际演化。验证理想状态下五大前提条件满足时的代际不变性与选择压力下的进化轨迹。",
    formula: "常染色体: (p+q)² = p²(AA) + 2pq(Aa) + q²(aa) = 1; 伴X遗传: 雄性 p(Xᴬ) + q(Xᵃ)",
    thinking: "概率代数平衡、种群微观进化动力学与自然选择本质",
    chapterLink: "/07%20生物的变异、育种与现代生物进化理论/03%20现代生物进化理论与基因频率定量计算",
    chapterTitle: "专题 07 · 现代生物进化理论与基因频率定量计算",
    component: markRaw(HardyWeinbergSimulator),
  },
  {
    key: "oscilloscope",
    title: "神经元动作电位与双极电流计示波器",
    category: "regulation",
    badge: "09 动物生命活动的调节",
    desc: "模拟神经纤维上单点刺激引发的膜电位极化、去极化、反极化（超射）与复极化全过程。实时展示细胞膜内外 Na⁺/K⁺ 通道状态，以及双极电流计在同侧刺激与双极间不同间距时的两次偏转方向和示波曲线。",
    formula: "静息电位: K⁺ 外流维持外正内负; 动作电位峰值: Na⁺ 顺浓度梯度大量内流",
    thinking: "电化学势能梯度驱动离子跨膜、时间差导致电流计双向偏转",
    chapterLink: "/09%20动物生命活动的神经、体液与免疫调节/01%20神经调节微观机理与膜电位分析模型",
    chapterTitle: "专题 09 · 神经调节微观机理与膜电位分析模型",
    component: markRaw(ActionPotentialOscilloscope),
  },
  {
    key: "auxin",
    title: "生长素极性运输与根芽茎敏感度探针",
    category: "regulation",
    badge: "10 植物生命活动的激素调节",
    desc: "交互式探究生长素对植物不同器官（根、芽、茎）生长的“两重性”促进与抑制效应。直观拖拽调节生长素浓度，观察最适浓度与促进转抑制浓度的敏感度阶梯，并动态推演根向重力性与茎背地性微观机理。",
    formula: "敏感度顺序: 根 > 芽 > 茎; 两重性本质: 低浓度促进细胞伸长，高浓度促进乙烯生成抑制生长",
    thinking: "非对称分布机理、量变质变阈值效应与器官特异性反馈",
    chapterLink: "/10%20植物生命活动的激素调节/01%20生长素的发现、极性运输与两重性作用模型",
    chapterTitle: "专题 10 · 生长素发现、极性运输与两重性模型",
    component: markRaw(AuxinSensitivityProbe),
  },
  {
    key: "tissue_edema",
    title: "内环境稳态与组织水肿病理诊断器",
    category: "regulation",
    badge: "08 人体内环境与稳态",
    desc: "深度解构组织液生成与回流动态平衡（Starling 水动力学方程）。模拟营养不良、肾小球肾炎、局部过敏、淋巴回流受阻及丝虫病感染等五大病理情景，观察血浆胶体渗透压与组织液渗透压的动态偏移与水肿成因。",
    formula: "净滤过压 = (毛细血管血压 + 组织液胶体渗透压) - (血浆胶体渗透压 + 组织液静水压)",
    thinking: "体液动态水平衡机制、稳态破缺与渗透压梯度模型",
    chapterLink: "/08%20人体内环境与稳态/02%20内环境稳态的调节机制与组织水肿成因全景",
    chapterTitle: "专题 08 · 内环境稳态调节机制与组织水肿成因全景",
    component: markRaw(TissueEdemaDiagnoser),
  },
  {
    key: "protein",
    title: "蛋白质脱水缩合与原子守恒计算器",
    category: "cell",
    badge: "01 走进细胞与组成细胞的分子",
    desc: "输入氨基酸总数与肽链条数，实时计算脱去水分子数、肽键数、多肽相对分子质量，并精确统计游离羧基/氨基最少数量及 N、O、H 原子守恒数量关系，支持环肽、二硫键（-S-S-）失重等高考压轴变形拓展。",
    formula: "肽键数 = 脱去水分子数 = 氨基酸数(m) - 肽链数(n); 蛋白质分子量 = m·a - 18(m-n) - 2·d",
    thinking: "质量守恒定律、化学键合拓扑方程与高维代数递推",
    chapterLink: "/01%20走进细胞与组成细胞的分子/05%20蛋白质是生命活动的主要承担者",
    chapterTitle: "专题 01 · 蛋白质是生命活动的主要承担者",
    component: markRaw(ProteinCondensationCalc),
  },
  {
    key: "membrane",
    title: "物质跨膜运输动力学曲线模拟器",
    category: "cell",
    badge: "02 细胞的基本结构与物质跨膜运输",
    desc: "对比自由扩散、协助扩散与主动运输三种方式。实时调控细胞外底物浓度与细胞内能量供应（ATP/O₂ 浓度），动态绘制转运速率曲线，直观观察载体蛋白饱和点（Vmax）与呼吸抑制剂（如呼吸毒素）对运输速率的截断效应。",
    formula: "自由扩散: 速率 ∝ 浓度差; 协助扩散: 饱和受载体数量限制; 主动运输: 需消耗 ATP 逆浓度梯",
    thinking: "动力学酶学饱和曲线、能量偶联与载体蛋白空间构象转变",
    chapterLink:
      "/02%20细胞的基本结构与物质跨膜运输/04%20物质跨膜运输的实例与方式（被动与主动运输）",
    chapterTitle: "专题 02 · 物质跨膜运输的实例与方式",
    component: markRaw(MembraneTransportSimulator),
  },
  {
    key: "cell_division",
    title: "细胞周期与有丝/减数分裂时间轴",
    category: "cell",
    badge: "04 细胞的生命历程",
    desc: "全景对比动植物有丝分裂与精卵减数分裂各时期（前、中、后、末）。动态展示染色体形态变化、同源染色体联会与分离、姐妹染色单体断裂，联动生成染色体、染色单体与核 DNA 分子含量的连续折线图。",
    formula: "有丝分裂后染色体加倍(4N); 减Ⅰ后同源染色体分离核DNA减半; 减Ⅱ后着丝粒分裂染色单体归零",
    thinking: "离散时序模型、三看识别决策树（有无同源、有无联会、着丝粒位置）",
    chapterLink: "/04%20细胞的生命历程（增殖、分化、衰老与凋亡）/01%20细胞增殖与有丝分裂",
    chapterTitle: "专题 04 · 细胞增殖与有丝分裂",
    component: markRaw(CellDivisionTimeline),
  },
  {
    key: "population",
    title: "种群增长 J/S 型增长曲线沙盒",
    category: "ecology",
    badge: "11 种群、群落与生态系统",
    desc: "模拟无限资源下的 J 型指数增长模型（λ 值倍增）与有限环境下的 S 型逻辑斯蒂增长模型。实时调控初始种群 N₀、增长率 r 与环境容纳量 K 值，动态标注 K/2 最大增长速率点在渔业捕捞与害虫防治中的关键实践决策。",
    formula: "J型增长: Nₜ = N₀·λᵗ; S型增长: dN/dt = r·N·(1 - N/K); K/2 时增长速率 dN/dt 最大",
    thinking: "微分方程动力学、资源阻滞系数与生态最值决策",
    chapterLink: "/11%20种群、群落与生态系统结构功能/01%20种群数量特征、增长模型与K值实践应用",
    chapterTitle: "专题 11 · 种群数量特征、增长模型与 K 值实践应用",
    component: markRaw(PopulationGrowthSandbox),
  },
  {
    key: "energy_flow",
    title: "生态系统能量流动收支天平",
    category: "ecology",
    badge: "11 种群、群落与生态系统",
    desc: "直观拆解某一营养级能量摄入量、粪便量（未同化量）与同化量的金三角关系。演示同化能量流向呼吸散失、分解者利用与下一营养级摄入的分配比例，定量求解 10%~20% 传递效率下的最多与最少能量消耗最值问题。",
    formula: "摄入量 = 同化量 + 粪便量; 同化量 = 呼吸消耗(热能) + 用于生长发育和繁殖的能量",
    thinking: "热力学第一/第二定律、生态守恒天平与最优化路径求解",
    chapterLink: "/11%20种群、群落与生态系统结构功能/03%20生态系统结构、能量流动与物质循环定量模型",
    chapterTitle: "专题 11 · 生态系统能量流动与物质循环定量模型",
    component: markRaw(EnergyFlowBalance),
  },
  {
    key: "pcr",
    title: "PCR 热循环与分子扩增倍数可视化器",
    category: "ecology",
    badge: "15 基因工程与生物技术安全",
    desc: "分步展示 PCR 反应三步曲：95℃ 变性解旋、55℃ 复性引物结合、72℃ Taq DNA 聚合酶延伸。直观演示第 1 代至第 5 代产物结构，清晰区分两端含有非特异性延伸片段的中间过渡分子与两条链均具有确定长度的标准目的基因片段。",
    formula:
      "第 n 代扩增总片段数 2ⁿ; 第 3 轮热循环首次产生等长目的基因; 第 n 轮等长目的片段数 = 2ⁿ - 2n",
    thinking: "热力学控温变性复性、引物特异性退火与非对称延伸极限收敛",
    chapterLink:
      "/15%20基因工程与生物技术安全性与伦理/01%20基因工程工具、PCR%20定量模型与表达载体构建",
    chapterTitle: "专题 15 · 基因工程工具与 PCR 定量模型",
    component: markRaw(PcrCycleVisualizer),
  },
  {
    key: "staining",
    title: "四大显色反应与试剂鉴定矩阵调色板",
    category: "experiment",
    badge: "16 高中生物经典实验专题",
    desc: "交互式试剂鉴定调色板：涵盖斐林试剂测还原糖（水浴加热砖红沉淀）、双缩脲试剂测蛋白质（碱性条件紫色络合物）、苏丹Ⅲ测脂肪（50%酒精洗浮色橘黄脂肪滴）、二苯胺测DNA（沸水浴蓝色）等实验细节与高频操作避坑点。",
    formula: "还原糖 + Cu²⁺ ➔ Cu₂O↓(砖红); 肽键(-CO-NH-) + Cu²⁺ ➔ 紫色络合物; DNA + 二苯胺 ➔ 蓝色",
    thinking: "有机官能团特征显色、化学反应热力学条件控制与空白对照排雷",
    chapterLink:
      "/16%20高中生物经典实验专题与科学探究方法/01%20高中生物教材必做实验全景速查与试剂显色矩阵",
    chapterTitle: "专题 16 · 高中生物教材必做实验全景速查与试剂显色矩阵",
    component: markRaw(BiochemicalStainingPalette),
  },
];

const filteredModels = computed(() => {
  if (activeCategory.value === "all") return models;
  return models.filter((m) => m.category === activeCategory.value);
});

const currentModel = computed<ModelInfo>(() => {
  const found = models.find((m) => m.key === activeKey.value);
  return found ?? (models[0] as ModelInfo);
});

const selectCategory = (catKey: string) => {
  activeCategory.value = catKey;
  const firstInCat = models.find((m) => catKey === "all" || m.category === catKey);
  if (firstInCat) {
    activeKey.value = firstInCat.key;
  }
};
</script>

<template>
  <div class="cc-interactive-lab">
    <!-- 领域分类过滤胶囊栏 -->
    <div class="lab-categories">
      <button
        v-for="cat in categories"
        :key="cat.key"
        type="button"
        class="cat-pill"
        :class="{ active: activeCategory === cat.key }"
        @click="selectCategory(cat.key)"
      >
        {{ cat.label }}
      </button>
    </div>

    <!-- 模型导航水平滚动选项卡 -->
    <div class="lab-tabs-scroll">
      <div class="lab-tabs">
        <button
          v-for="m in filteredModels"
          :key="m.key"
          type="button"
          class="tab-btn"
          :class="{ active: activeKey === m.key }"
          @click="activeKey = m.key"
        >
          <span class="tab-title">{{ m.title }}</span>
        </button>
      </div>
    </div>

    <!-- 动态生命仿真画布容器 -->
    <div class="lab-simulator-card">
      <component :is="currentModel.component" :key="activeKey" />
    </div>

    <!-- 知识体系与考点剖析卡片 -->
    <div class="lab-info-card">
      <div class="info-header">
        <div class="info-title-wrap">
          <span class="info-badge">{{ currentModel.badge }}</span>
          <h3 class="info-title">{{ currentModel.title }}</h3>
        </div>
        <a :href="withBase(currentModel.chapterLink)" class="chapter-jump-btn">
          <span>深度研读本章考点</span>
          <span class="btn-arrow">→</span>
        </a>
      </div>

      <p class="info-desc">{{ currentModel.desc }}</p>

      <div class="info-meta-grid">
        <div class="meta-item">
          <span class="meta-label">定量规律：</span>
          <code class="meta-code">{{ currentModel.formula }}</code>
        </div>
        <div class="meta-item">
          <span class="meta-label">生命观念：</span>
          <span class="meta-val">{{ currentModel.thinking }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cc-interactive-lab {
  margin: 1.5rem 0 2.5rem;
}

/* 分类胶囊 */
.lab-categories {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 0.85rem;
}

.cat-pill {
  padding: 4px 12px;
  font-size: 0.8rem;
  font-weight: 500;
  border-radius: 9999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.16s ease;
}

.cat-pill:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.cat-pill.active {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 6px rgba(45, 106, 79, 0.25);
}

/* 模型横向切换条 */
.lab-tabs-scroll {
  overflow-x: auto;
  padding-bottom: 0.6rem;
  margin-bottom: 1rem;
  scrollbar-width: thin;
}

.lab-tabs {
  display: flex;
  gap: 0.5rem;
  min-width: max-content;
}

.tab-btn {
  min-height: 40px;
  padding: 0.45rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.18s ease;
}

.tab-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #ffffff;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 8px rgba(45, 106, 79, 0.28);
}

/* 仿真画布容器 */
.lab-simulator-card {
  margin-top: 0.5rem;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-elv);
}

/* 考点剖析卡片 */
.lab-info-card {
  margin-top: 1.25rem;
  padding: 1.35rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-elv);
  box-shadow: var(--vp-shadow-card, 0 1px 3px rgba(0, 0, 0, 0.04));
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.85rem;
}

.info-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.info-badge {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 650;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.02em;
}

.info-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.01em;
}

.chapter-jump-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.95rem;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 6px;
  background: var(--vp-c-brand-1);
  color: #ffffff !important;
  text-decoration: none !important;
  transition: all 0.18s ease;
}

.chapter-jump-btn:hover {
  background: var(--vp-c-brand-2, #1b4332);
  transform: translateY(-1px);
}

.btn-arrow {
  transition: transform 0.18s ease;
}

.chapter-jump-btn:hover .btn-arrow {
  transform: translateX(3px);
}

.info-desc {
  margin: 0 0 1rem;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.info-meta-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
  padding-top: 0.95rem;
  border-top: 1px dashed var(--vp-c-divider);
}

.meta-item {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  font-size: 0.85rem;
  line-height: 1.5;
}

.meta-label {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
  font-weight: 600;
}

.meta-code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  color: var(--vp-c-brand-1);
  background: var(--vp-code-bg);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.meta-val {
  color: var(--vp-c-text-1);
  font-weight: 500;
}

@media (max-width: 640px) {
  .info-meta-grid {
    grid-template-columns: 1fr;
  }
}
</style>
