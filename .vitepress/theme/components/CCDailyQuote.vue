<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

interface BiologyFlash {
  text: string;
  tag: string;
}

// 精选高中生物 50 大高频秒杀考点与核心金句（每条控制在短句，2~3 秒读完，专攻高频得分点）
const BIOLOGY_FLASHES: BiologyFlash[] = [
  { text: "自由水越多细胞代谢越旺盛，结合水越多细胞抗逆性越强。", tag: "水分生理" },
  { text: "无机盐多数以离子形式存在，维持渗透压与酸碱缓冲动态平衡。", tag: "无机盐" },
  { text: "Mg²⁺是叶绿素合成必需元素，Fe²⁺构成血红蛋白，I⁻参与甲状腺激素合成。", tag: "微量元素" },
  { text: "蛋白质是生命活动的主要承担者，氨基酸脱水缩合形成肽键(-CO-NH-)。", tag: "蛋白质" },
  { text: "高温强酸破坏蛋白质空间构象与氢键，但肽键未断裂仍显双缩脲紫色反应。", tag: "蛋白质变性" },
  { text: "DNA含脱氧核糖和胸腺嘧啶(T)，RNA含核糖和尿嘧啶(U)。", tag: "核酸分子" },
  {
    text: "磷脂双分子层构成膜基本支架，亲水头在外疏水尾在内，具流动性与选择透过性。",
    tag: "生物膜",
  },
  { text: "核糖体与中心体无膜结构，不属于真核细胞生物膜系统。", tag: "细胞器" },
  { text: "协助扩散顺浓度不耗能需转运蛋白，主动运输逆浓度耗能需载体蛋白。", tag: "跨膜运输" },
  { text: "酶的催化机理是显著降低反应活化能，只加快反应速率，不改变反应平衡点。", tag: "酶机理" },
  { text: "绝大多数酶是蛋白质，少数是RNA（核酶）；低温抑制活性但不破坏空间构象。", tag: "酶特性" },
  { text: "ATP水解脱下末端磷酸基团释放能量，直接驱动细胞吸能反应。", tag: "能量货币" },
  {
    text: "光反应在类囊体薄膜产生O₂、NADPH与ATP；暗反应在叶绿体基质固定CO₂与还原C₃。",
    tag: "光合作用",
  },
  { text: "突止光照：光反应骤停，ATP与[H]耗尽，C₃瞬时增加，C₅瞬时减少。", tag: "光合突变" },
  { text: "突断CO₂：暗反应CO₂固定受阻，C₃瞬时骤降，C₅瞬时骤升。", tag: "光合突变" },
  { text: "有氧呼吸第三阶段在线粒体内膜[H]与O₂结合生成水，释放大量ATP能量。", tag: "细胞呼吸" },
  { text: "无氧呼吸只在第一阶段释放少量能量，第二阶段丙酮酸还原不产生ATP。", tag: "无氧呼吸" },
  { text: "有丝分裂后期着丝粒分裂姐妹单体分开，细胞内染色体数目瞬时加倍。", tag: "有丝分裂" },
  { text: "减数第一次分裂后期同源染色体分离，是孟德尔两大遗传定律的细胞学基础。", tag: "减数分裂" },
  { text: "减数第二次分裂后期着丝粒分裂，细胞内不存在同源染色体。", tag: "减数分裂" },
  { text: "细胞分化的实质是基因的选择性表达，遗传物质未变而mRNA和蛋白质改变。", tag: "细胞分化" },
  { text: "细胞全能性的标志是高度分化的细胞发育为完整个体。", tag: "细胞全能性" },
  {
    text: "衰老细胞水分减少、呼吸变慢、多种酶活性降低、色素积累、细胞核体积增大。",
    tag: "细胞衰老",
  },
  { text: "细胞凋亡是由基因决定的程序性死亡，有利于多细胞生物体正常发育与稳态。", tag: "细胞凋亡" },
  { text: "杂合子Aa连续自交n代，纯合子比例为1-(1/2)ⁿ，显隐纯合子各占一半。", tag: "分离定律" },
  {
    text: "测交实验(Aa×aa)后代显隐性分离比为1:1，是验证分离定律最直接有效的方法。",
    tag: "假说演绎",
  },
  {
    text: "非同源染色体自由组合产生9:3:3:1，双杂合自交出现变式表明基因互作或致死。",
    tag: "自由组合",
  },
  { text: "伴X隐性遗传病：交叉遗传、男性患者多于女性、母病子必病、女病父必病。", tag: "伴性遗传" },
  { text: "伴X显性遗传病：连续遗传、女性患者多于男性、父病女必病、子病母必病。", tag: "伴性遗传" },
  { text: "格里菲思证明S型菌有转化因子，艾弗里证实转化因子本质是DNA。", tag: "转化实验" },
  { text: "赫尔希和蔡斯用³⁵S标记蛋白质外壳，³²P标记DNA，证明DNA是遗传物质。", tag: "噬菌体侵染" },
  { text: "DNA双螺旋结构：脱氧核糖与磷酸交替排列在外侧，碱基互补配对排在内侧。", tag: "DNA结构" },
  { text: "DNA分子复制方式是半保留复制，边解旋边复制，需要解旋酶和DNA聚合酶。", tag: "DNA复制" },
  { text: "转录以DNA一条链为模板合成RNA，翻译以mRNA为模板在核糖体合成肽链。", tag: "中心法则" },
  { text: "tRNA的反密码子与mRNA上的密码子互补配对，密码子具有简并性与通用性。", tag: "遗传密码" },
  { text: "基因突变是新基因的产生途径，生物变异的根本来源，发生在DNA复制期。", tag: "基因突变" },
  {
    text: "染色体结构变异包括缺失、重复、倒位、易位（非同源染色体间片段互换）。",
    tag: "染色体变异",
  },
  { text: "单倍体育种用花药离体培养获得单倍体，秋水仙素加倍，显著缩短育种年限。", tag: "生物育种" },
  {
    text: "现代生物进化理论：种群是进化的基本单位，突变和基因重组产生进化的原材料。",
    tag: "现代进化论",
  },
  { text: "自然选择决定生物进化的方向，进化的实质是种群基因频率的定向改变。", tag: "物种形成" },
  { text: "内环境是细胞外液，包括血浆、组织液与淋巴液；消化道与呼吸道腔属外界。", tag: "内环境" },
  {
    text: "静息电位主要表现为K⁺外流（内负外正），动作电位是Na⁺顺浓度内流（内正外负）。",
    tag: "神经调节",
  },
  {
    text: "神经递质只存在于突触小泡中，只能由突触前膜释放作用于突触后膜，单向传递。",
    tag: "突触传导",
  },
  {
    text: "甲状腺激素分泌存在下丘脑-垂体-甲状腺分级调节与反馈调节，维持内环境稳定。",
    tag: "体液调节",
  },
  {
    text: "胰岛素是唯一降血糖的激素，促进组织细胞摄取利用储存葡萄糖，抑制糖原分解。",
    tag: "血糖调节",
  },
  { text: "体液免疫中B细胞活化需抗原和辅助性T细胞双信号，浆细胞产生特异性抗体。", tag: "体液免疫" },
  { text: "细胞免疫中细胞毒性T细胞特异性识别靶细胞并使其裂解死亡，暴露病原体。", tag: "细胞免疫" },
  {
    text: "生长素生理作用具两重性：低浓度促进生长，高浓度抑制生长（如顶端优势）。",
    tag: "植物激素",
  },
  { text: "种群最基本的数量特征是种群密度，出生率和死亡率是决定密度的核心因素。", tag: "种群生态" },
  {
    text: "生态系统能量流动特点：单向流动、逐级递减，相邻营养级传递效率为10%~20%。",
    tag: "生态系统",
  },
  {
    text: "生态系统抵抗力稳定性与物种丰富度呈正相关，营养结构越复杂自我调节能力越强。",
    tag: "生态平衡",
  },
];

// 每次刷新随机抽取一条（SSR 保底第一条）
const currentIndex = ref<number>(0);
const isChanging = ref<boolean>(false);
const copied = ref<boolean>(false);
let nextTimer: ReturnType<typeof setTimeout> | null = null;
let copyTimer: ReturnType<typeof setTimeout> | null = null;

onBeforeUnmount(() => {
  if (nextTimer) clearTimeout(nextTimer);
  if (copyTimer) clearTimeout(copyTimer);
  nextTimer = copyTimer = null;
});

onMounted(() => {
  // 每次页面刷新或载入时随机选择一条
  currentIndex.value = Math.floor(Math.random() * BIOLOGY_FLASHES.length);
});

const currentItem = computed<BiologyFlash>(() => {
  return BIOLOGY_FLASHES[currentIndex.value] || BIOLOGY_FLASHES[0];
});

// 点击换一条
const handleNext = () => {
  if (isChanging.value) return;
  isChanging.value = true;
  if (nextTimer) clearTimeout(nextTimer);
  nextTimer = setTimeout(() => {
    let nextIdx = Math.floor(Math.random() * BIOLOGY_FLASHES.length);
    if (nextIdx === currentIndex.value) {
      nextIdx = (nextIdx + 1) % BIOLOGY_FLASHES.length;
    }
    currentIndex.value = nextIdx;
    isChanging.value = false;
    nextTimer = null;
  }, 160);
};

// 复制速记
const handleCopy = async (event: MouseEvent) => {
  event.stopPropagation();
  const text = `【高中生物速记】${currentItem.value.text}（#${currentItem.value.tag}）`;
  try {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(text);
    } else if (typeof document !== "undefined") {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    copied.value = true;
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied.value = false;
      copyTimer = null;
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
      role="button"
      tabindex="0"
      title="点击换一条高中生物速记"
      @click="handleNext"
      @keydown.enter="handleNext"
      @keydown.space.prevent="handleNext"
    >
      <!-- 左侧极简徽章 -->
      <div class="flash-badge">
        <span class="flash-badge-icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </span>
        <span class="flash-badge-text">每日速记</span>
        <span class="flash-tag">{{ currentItem.tag }}</span>
      </div>

      <!-- 中间核心简短金句 -->
      <div class="flash-text-box" :class="{ 'is-swapping': isChanging }">
        <span class="flash-quote-mark">“</span
        ><span class="flash-content">{{ currentItem.text }}</span
        ><span class="flash-quote-mark">”</span>
      </div>

      <!-- 右侧轻量操作：换一条 & 复制 -->
      <div class="flash-actions" @click.stop>
        <button
          type="button"
          class="flash-action-icon-btn"
          title="换一条"
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
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>

        <button
          type="button"
          class="flash-action-icon-btn"
          :title="copied ? '已复制' : '复制速记'"
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
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cc-biology-flash-wrap {
  margin-top: 14px;
  width: 100%;
}

.cc-biology-flash-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 720px;
  width: 100%;
  padding: 8px 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 6%, var(--vp-c-bg-soft));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 18%, transparent);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--vp-shadow-1);
  cursor: pointer;
  user-select: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  margin: 0 auto;
}

.cc-biology-flash-card:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 10%, var(--vp-c-bg-soft));
  border-color: color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 35%, transparent);
  box-shadow: var(--vp-shadow-2);
  transform: translateY(-1px);
}

.cc-biology-flash-card:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

/* 左侧徽章 */
.flash-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  padding: 2.5px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 22%, transparent);
}

.flash-badge-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-brand-1, #2d6a4f);
}

.flash-badge-text {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-brand-1, #2d6a4f);
  letter-spacing: 0.2px;
  white-space: nowrap;
}

.flash-tag {
  font-size: 10.5px;
  color: var(--vp-c-text-2);
  padding-left: 5px;
  border-left: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 24%, transparent);
  white-space: nowrap;
}

/* 中间速记正文 */
.flash-text-box {
  flex: 1;
  min-width: 0;
  display: block;
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  font-weight: 500;
  word-break: break-word;
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}

.flash-text-box.is-swapping {
  opacity: 0;
  transform: translateY(3px);
}

.flash-quote-mark {
  color: var(--vp-c-brand-1, #2d6a4f);
  font-weight: 700;
  font-size: 14px;
}

.flash-content {
  letter-spacing: 0.15px;
}

/* 右侧按钮 */
.flash-actions {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.flash-action-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--vp-c-text-3);
  cursor: pointer;
  transition: all 0.2s ease;
}

.flash-action-icon-btn:hover {
  color: var(--vp-c-brand-1, #2d6a4f);
  background: color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 10%, transparent);
  border-color: color-mix(in srgb, var(--vp-c-brand-1, #2d6a4f) 20%, transparent);
}

.action-svg.is-spinning {
  animation: spin-once 0.4s linear infinite;
}

.action-svg.is-check {
  color: #10b981;
}

@keyframes spin-once {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .cc-biology-flash-card {
    align-items: flex-start;
    padding: 10px 12px;
  }

  .flash-badge {
    margin-top: 2px;
  }
}
</style>
