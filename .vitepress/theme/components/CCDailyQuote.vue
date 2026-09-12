<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

interface FlashcardGroup {
  id: string;
  module: string;
  topic: string;
  points: string[];
}

// 精选高中生物 16 大核心专题速记卡片（每组 3 条高频考点/秒杀结论，核心术语已标重点）
const FLASHCARD_GROUPS: FlashcardGroup[] = [
  {
    id: "01-water-salts",
    module: "必修1 · 细胞的分子组成",
    topic: "水与无机盐生理功能判别",
    points: [
      "**自由水**越多，细胞代谢越旺盛；**结合水**比例越高，细胞抗逆性（**抗寒/抗旱/抗盐碱**）越强。",
      "**无机盐**多数以**离子**形式存在，维持渗透压与酸碱平衡（如 **Na⁺/Cl⁻** 维持细胞外液渗透压，**HCO₃⁻/HPO₄²⁻** 维持酸碱缓冲）。",
      "**Mg²⁺** 是叶绿素合成必需元素，**Fe²⁺** 构成血红蛋白，**I⁻** 参与甲状腺激素合成，**Ca²⁺** 过低引起肌肉抽搐。",
    ],
  },
  {
    id: "02-protein-nucleic",
    module: "必修1 · 细胞的分子组成",
    topic: "蛋白质与核酸的结构与功能",
    points: [
      "**蛋白质**是生命活动的主要**承担者与体现者**；氨基酸脱水缩合形成**肽键（-CO-NH-）**，空间构象决定其生物活性。",
      "**核酸**是遗传信息的携带者；**DNA** 含有脱氧核糖和胸腺嘧啶（**T**），**RNA** 含有核糖和尿嘧啶（**U**）。",
      "高温、强酸使蛋白质**变性**，破坏的是**空间构象与氢键**，但**肽键未断裂**，仍能与双缩脲试剂发生紫色反应。",
    ],
  },
  {
    id: "03-membrane-system",
    module: "必修1 · 细胞的基本结构",
    topic: "流动镶嵌模型与生物膜系统",
    points: [
      "**磷脂双分子层**构成膜的基本支架，亲水头部在外，疏水尾部在内；蛋白质分子**镶嵌、贯穿或覆盖**其间。",
      "生物膜的结构特性是**具有流动性**（受温度影响），功能特性是**选择透过性**（由转运蛋白的种类决定）。",
      "**生物膜系统**包括细胞膜、核膜与细胞器膜（注意：**核糖体、中心体无膜结构**，不属于生物膜系统）。",
    ],
  },
  {
    id: "04-transport",
    module: "必修1 · 细胞的物质输入输出",
    topic: "物质跨膜运输方式深度辨析",
    points: [
      "**自由扩散**：顺浓度梯度，不消耗能量，无需转运蛋白（如 **O₂、CO₂、甘油、乙醇、苯、脂溶性小分子**）。",
      "**协助扩散**：顺浓度梯度，不消耗能量，需要**转运蛋白**（通道蛋白或载体蛋白，如**葡萄糖进入红细胞**）。",
      "**主动运输**：逆浓度梯度，消耗 **ATP**，必须依赖**载体蛋白**（如 **Na⁺-K⁺ 泵、小肠上皮细胞吸收葡萄糖**）。",
    ],
  },
  {
    id: "05-enzymes-atp",
    module: "必修1 · 细胞的能量供应",
    topic: "酶的催化机理与 ATP 能量货币",
    points: [
      "酶的作用机理是**显著降低化学反应的活化能**，只提高反应速率，**不改变反应平衡点**与终产物生成量。",
      "酶具有**高效性**与**专一性**，绝大多数酶是蛋白质，少数是 **RNA（核酶）**；低温抑制酶活性但**不破坏**空间结构。",
      "**ATP** 含有两个特殊的**高能磷酸键**（末端易水解），水解脱下末端磷酸基团释放能量，驱动细胞内**吸能反应**。",
    ],
  },
  {
    id: "06-photosynthesis-respiration",
    module: "必修1 · 光合与细胞呼吸",
    topic: "光合与细胞呼吸动态转换模型",
    points: [
      "**光反应**在**类囊体薄膜**进行：水光解产生 **O₂、NADPH 与 ATP**；**暗反应**在**叶绿体基质**进行 **CO₂ 固定与 C₃ 还原**。",
      "**突止光照**时：光反应骤停，**C₃ 瞬时增加，C₅ 瞬时减少**；**突断 CO₂** 时：CO₂ 固定受阻，**C₃ 骤降，C₅ 骤升**。",
      "**有氧呼吸第三阶段**在线粒体内膜上 **[H] 与 O₂ 结合生成 H₂O**，释放**大量能量**；无氧呼吸只在**第一阶段**释放少量能量。",
    ],
  },
  {
    id: "07-mitosis-meiosis",
    module: "必修1/2 · 细胞增殖与减数分裂",
    topic: "染色体行为与减数分裂关键判据",
    points: [
      "**有丝分裂后期**：**着丝粒分裂**，姐妹染色单体分开，**染色体数目瞬时加倍**，核 DNA 分子数目不变。",
      "**减数第一次分裂后期**：**同源染色体分离**，非同源染色体自由组合，是**孟德尔两大遗传定律**的细胞学物理基础。",
      "**减数第二次分裂后期**：**着丝粒分裂**，姐妹染色单体分离，细胞内**不存在同源染色体**。",
    ],
  },
  {
    id: "08-differentiation-aging",
    module: "必修1 · 细胞的生命历程",
    topic: "分化、全能性、衰老与凋亡",
    points: [
      "**细胞分化**的实质是**基因的选择性表达**，遗传物质未变，核内转录的 mRNA 和合成的蛋白质种类发生改变。",
      "**细胞全能性**的标志：高度分化的细胞**发育为完整个体**（植物组织培养、克隆动物体现动物细胞核全能性）。",
      "**细胞衰老**特征：**水分减少、呼吸变慢、多种酶活性降低、色素积累、核体积增大**；**细胞凋亡**是基因决定的程序性死亡。",
    ],
  },
  {
    id: "09-mendel-genetics",
    module: "必修2 · 遗传的基本规律",
    topic: "假说-演绎法与基因分离定律",
    points: [
      "**假说-演绎法闭环**：观察现象提出问题 ➔ **提出假说**（解释现象）➔ **演绎推理**（设计测交方案）➔ **测交实验验证** ➔ 得出结论。",
      "杂合子 **Aa** 连续自交 **n** 代：纯合子比例为 **1 - (1/2)ⁿ**，杂合子比例为 **(1/2)ⁿ**，显隐性纯合子各占一半。",
      "验证基因分离定律最直接有效的方法是**测交实验（Aa × aa）**，后代显隐性性状分离比理论值为 **1 : 1**。",
    ],
  },
  {
    id: "10-dihybrid-variations",
    module: "必修2 · 自由组合定律",
    topic: "自由组合 9:3:3:1 变式秒杀口诀",
    points: [
      "双杂合子 **AaBb** 自交产生 **9:3:3:1**，若出现变式：**9:7** 为双显互补；**15:1** 为具显即显（单显与双显同表型）。",
      "**9:6:1** 为单显同一表型；**9:3:4** 为隐性上位（双隐性与某一单隐性表型重叠）；**13:3** 为显性上位/抑制基因效应。",
      "致死模型：若显性纯合致死（**AA/BB 胚胎致死**），自交后代表型比变为 **(2:1)(2:1) = 4:2:2:1**。",
    ],
  },
  {
    id: "11-sex-linked-inheritance",
    module: "必修2 · 伴性遗传与人类遗传病",
    topic: "伴性遗传典型特征与系谱图判定",
    points: [
      "**伴 X 染色体隐性遗传**（如红绿色盲、血友病）：**女病父必病，母病子必病**，男性患者发病率显著高于女性。",
      "**伴 X 染色体显性遗传**（如抗维生素D佝偻病）：**父病女必病，子病母必病**，女性患者多于男性，代代连续遗传。",
      "系谱图判定黄金口诀：**无中生有为隐性**（生女患病为常隐），**有中生无为显性**（生女正常为常显）。",
    ],
  },
  {
    id: "12-central-dogma",
    module: "必修2 · 基因的本质与表达",
    topic: "同位素标记与中心法则信息传递",
    points: [
      "噬菌体侵染细菌实验：**³²P 标记 DNA**（放射性主要在沉淀物），**³⁵S 标记蛋白质外壳**（放射性主要在上清液）。",
      "**DNA 复制**为**半保留复制、边解旋边双向复制**；连续复制 **n** 次产生 **2ⁿ** 个分子，含亲代母链的分子恒为 **2** 个。",
      "**密码子**位于 **mRNA** 上（共 64 种，61 种编码氨基酸，3 种终止密码子），**反密码子**位于 **tRNA** 上。",
    ],
  },
  {
    id: "13-internal-environment",
    module: "选择性必修1 · 稳态与调节",
    topic: "内环境稳态与组织水肿成因模型",
    points: [
      "**内环境**即细胞外液，主要由**血浆、组织液和淋巴液**构成；细胞内液、消化液、泪液、尿液**不属于内环境**。",
      "细胞外液渗透压的 **90% 以上由 Na⁺ 和 Cl⁻ 决定**；血浆胶体渗透压主要由**血浆蛋白**维持。",
      "**组织水肿动力学机制**：血浆蛋白减少（营养不良/肾炎）导致**血浆胶体渗透压降低**，或过敏反应导致毛细血管通透性增大。",
    ],
  },
  {
    id: "14-neural-regulation",
    module: "选择性必修1 · 神经调节",
    topic: "静息电位、动作电位与突触传递",
    points: [
      "**静息电位**：膜主要对 **K⁺ 有通透性**，表现为**外正内负**；膜外高 Na⁺、膜内高 K⁺ 依赖 **Na⁺-K⁺ 泵主动运输维持**。",
      "**动作电位**：受到适宜刺激后 **Na⁺ 通道开放，Na⁺ 顺浓度内流**，膜电位逆转为**外负内正**（属于协助扩散）。",
      "**突触传递单向性**：神经递质仅由**突触前膜以胞吐方式释放**，经突触间隙扩散，特异性结合于**突触后膜受体**。",
    ],
  },
  {
    id: "15-humoral-immunity",
    module: "选择性必修1 · 体液与免疫调节",
    topic: "血糖调节枢纽与特异性免疫双重网络",
    points: [
      "**胰岛素**是体内**唯一降低血糖**的激素；**胰高血糖素与肾上腺素**协同升高血糖；**下丘脑**是血糖、体温、水盐调节中枢。",
      "**体液免疫**：**B 细胞活化**需要抗原呈递与辅助性 T 细胞分泌的细胞因子；**浆细胞**产生抗体，浆细胞不能识别抗原。",
      "**细胞免疫**：**细胞毒性 T 细胞**特异性识别并紧密接触靶细胞，使其裂解死亡，病原体暴露后被体液免疫或吞噬细胞清除。",
    ],
  },
  {
    id: "16-engineering-ecology",
    module: "选择性必修2/3 · 生态与生物工程",
    topic: "生态能量流动与基因工程核心技术",
    points: [
      "生态系统**能量流动**两大铁律：**单向流动、逐级递减**；相邻两个营养级间的能量传递效率约为 **10%~20%**。",
      "**PCR 反应循环三步曲**：**95℃ 变性解旋** ➔ **55℃ 复性引物结合** ➔ **72℃ 耐热 Taq DNA 聚合酶延伸**。",
      "**限制酶**能特异性识别双链 DNA 的特定核苷酸序列并切割磷酸二酯键；**DNA 连接酶**催化缝合磷酸二酯键缺口。",
    ],
  },
];

const currentIndex = ref<number>(0);
const isChanging = ref<boolean>(false);
const copied = ref<boolean>(false);

onMounted(() => {
  currentIndex.value = Math.floor(Math.random() * FLASHCARD_GROUPS.length);
});

const currentCard = computed<FlashcardGroup>(() => {
  return FLASHCARD_GROUPS[currentIndex.value] || FLASHCARD_GROUPS[0];
});

// 解析 **重点词汇** 为高亮标签
const formatHighlighted = (text: string): string => {
  return text.replace(/\*\*(.+?)\*\*/g, '<span class="flash-kw">$1</span>');
};

// 切换下一组卡片
const handleNext = () => {
  if (isChanging.value) return;
  isChanging.value = true;
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % FLASHCARD_GROUPS.length;
    isChanging.value = false;
  }, 150);
};

// 切换上一组卡片
const handlePrev = (event: MouseEvent) => {
  event.stopPropagation();
  if (isChanging.value) return;
  isChanging.value = true;
  setTimeout(() => {
    currentIndex.value =
      (currentIndex.value - 1 + FLASHCARD_GROUPS.length) % FLASHCARD_GROUPS.length;
    isChanging.value = false;
  }, 150);
};

// 点击卡片换一组（若用户正在划选文字，则不触发切换）
const onCardClick = (event: MouseEvent) => {
  const selection = window.getSelection();
  if (selection && selection.toString().trim().length > 0) return;
  if ((event.target as HTMLElement)?.closest(".flash-actions, button, a")) return;
  handleNext();
};

// 复制当前整组速记
const handleCopy = async (event: MouseEvent) => {
  event.stopPropagation();
  const card = currentCard.value;
  const formattedPoints = card.points
    .map((pt, i) => `${String(i + 1).padStart(2, "0")}. ${pt.replace(/\*\*/g, "")}`)
    .join("\n");
  const copyText = `【高中生物核心速记】${card.module} · ${card.topic}\n${formattedPoints}\n—— 来源：高考生物知识库`;

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(copyText);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = copyText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1800);
  } catch (e) {
    console.warn("Copy failed:", e);
  }
};
</script>

<template>
  <div class="cc-biology-flash-wrap">
    <div
      class="cc-biology-flash-card"
      role="region"
      tabindex="0"
      aria-label="高中生物每日核心速记卡片"
      @click="onCardClick"
      @keydown.enter="handleNext"
      @keydown.space.prevent="handleNext"
    >
      <!-- 卡片头部栏：分类徽标 + 专题名称 + 交互工具条 -->
      <div class="flash-card-header">
        <div class="flash-header-left">
          <span class="flash-badge">
            <svg
              class="flash-badge-icon"
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path
                d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
              />
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
            <span class="flash-badge-text">考点速记</span>
          </span>
          <span class="flash-module">{{ currentCard.module }}</span>
          <span class="flash-topic-title">{{ currentCard.topic }}</span>
        </div>

        <div class="flash-actions" @click.stop>
          <span class="flash-counter" title="卡片编号">
            {{ String(currentIndex + 1).padStart(2, "0") }} /
            {{ String(FLASHCARD_GROUPS.length).padStart(2, "0") }}
          </span>

          <button
            type="button"
            class="flash-action-btn"
            title="上一组"
            aria-label="查看上一组速记卡片"
            :disabled="isChanging"
            @click="handlePrev"
          >
            <svg
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            type="button"
            class="flash-action-btn"
            title="换一组 (点击或按空格)"
            aria-label="切换下一组速记卡片"
            :disabled="isChanging"
            @click="handleNext"
          >
            <svg
              class="action-svg"
              :class="{ 'is-spinning': isChanging }"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span class="flash-btn-label">换一组</span>
          </button>

          <button
            type="button"
            class="flash-action-btn flash-copy-btn"
            :class="{ 'is-copied': copied }"
            :title="copied ? '已复制本组考点' : '复制整组考点'"
            aria-label="复制当前整组速记要点"
            @click="handleCopy"
          >
            <svg
              v-if="!copied"
              class="action-svg"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg
              v-else
              class="action-svg is-check"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="flash-btn-label">{{ copied ? "已复制" : "复制" }}</span>
          </button>
        </div>
      </div>

      <!-- 卡片主体：完整多条高频考点列表，重点词汇高亮 -->
      <div class="flash-card-body" :class="{ 'is-swapping': isChanging }">
        <div
          v-for="(point, idx) in currentCard.points"
          :key="`${currentCard.id}-${idx}`"
          class="flash-item-row"
        >
          <span class="flash-item-index">{{ String(idx + 1).padStart(2, "0") }}</span>
          <div class="flash-item-text" v-html="formatHighlighted(point)"></div>
        </div>
      </div>

      <!-- 卡片底部极简辅助提示条 -->
      <div class="flash-card-footer">
        <span class="flash-footer-tip"> 点击卡片或快捷按钮切换 · 高亮词为高考核心得分关键词 </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cc-biology-flash-wrap {
  margin-top: 24px;
  width: 100%;
}

.cc-biology-flash-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 680px;
  width: 100%;
  padding: 14px 16px 12px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--vp-shadow-1);
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.cc-biology-flash-card:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 2.5%, var(--vp-c-bg-soft));
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  box-shadow: var(--vp-shadow-2);
}

:global(html.dark) .cc-biology-flash-card {
  box-shadow: var(--vp-shadow-1);
}

:global(html.dark) .cc-biology-flash-card:hover {
  box-shadow: var(--vp-shadow-2);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 40%, transparent);
}

.cc-biology-flash-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* 顶部头部栏 */
.flash-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.flash-header-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-width: 0;
}

/* 速记小徽章 */
.flash-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 2px 7px;
  border-radius: 5px;
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 24%, transparent);
}

.flash-badge-icon {
  font-size: 11px;
  line-height: 1;
}

.flash-badge-text {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.02em;
}

/* 模块分类 */
.flash-module {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  padding: 2px 6px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vp-c-text-3) 12%, transparent);
}

/* 专题名称 */
.flash-topic-title {
  font-size: 12.5px;
  font-weight: 650;
  color: var(--vp-c-text-1);
  letter-spacing: 0.01em;
}

/* 右侧操作工具条 */
.flash-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.flash-counter {
  font-size: 11px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
  padding: 0 4px;
  user-select: none;
}

.flash-action-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 7px;
  border-radius: 6px;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 80%, transparent);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.flash-action-btn:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-bg));
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  color: var(--vp-c-brand-1);
}

/* 触屏设备：操作按钮扩大至 44px 触控目标 */
@media (hover: none) and (pointer: coarse) {
  .flash-action-btn {
    min-width: 44px;
    min-height: 44px;
    justify-content: center;
    padding: 6px 12px;
  }
}

.flash-action-btn.is-copied {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.action-svg.is-spinning {
  animation: spin-once 0.4s linear infinite;
}

.action-svg.is-check {
  color: var(--vp-c-brand-1);
}

@keyframes spin-once {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 卡片主体：列表 */
.flash-card-body {
  display: flex;
  flex-direction: column;
  gap: 7px;
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}

.flash-card-body.is-swapping {
  opacity: 0;
  transform: translateY(4px);
}

.flash-item-row {
  display: flex;
  align-items: baseline;
  gap: 9px;
  line-height: 1.6;
}

.flash-item-index {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  background: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  padding: 1px 5px;
  border-radius: 4px;
  line-height: 1.3;
}

.flash-item-text {
  font-size: 13.5px;
  color: var(--vp-c-text-1);
  line-height: 1.65;
  letter-spacing: 0.01em;
  word-break: break-word;
  white-space: normal;
}

/* 重点核心词汇高亮样式 */
:deep(.flash-kw) {
  color: var(--vp-c-brand-1);
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 12%, transparent);
  padding: 1px 4px;
  margin: 0 1px;
  border-radius: 4px;
  font-weight: 650;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}

:global(html.dark) :deep(.flash-kw) {
  color: #74c69d;
  background-color: color-mix(in srgb, #52b788 18%, transparent);
}

/* 底部提示条 */
.flash-card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 4px;
  border-top: 1px dashed var(--vp-c-divider);
}

.flash-footer-tip {
  font-size: 11px;
  color: var(--vp-c-text-3);
  letter-spacing: 0.01em;
  user-select: none;
}

@media (max-width: 640px) {
  .cc-biology-flash-card {
    padding: 12px 14px;
  }

  .flash-card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .flash-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .flash-topic-title {
    font-size: 12px;
  }

  .flash-item-text {
    font-size: 13px;
    line-height: 1.6;
  }

  .flash-footer-tip {
    font-size: 11px;
  }
}
</style>
