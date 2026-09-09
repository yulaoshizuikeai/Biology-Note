<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

interface BiologyFlash {
  text: string;
  tag: string;
}

// 精选高中生物核心速记与解题模型（覆盖 16 大专题高频秒杀与易错判断）
const BIOLOGY_FLASHES: BiologyFlash[] = [
  { text: "自由水越多代谢越旺盛，结合水越多抗逆性（抗寒/抗旱）越强。", tag: "细胞分子" },
  { text: "核酸是遗传信息的携带者，蛋白质是生命活动的主要承担者与体现者。", tag: "生命基础" },
  { text: "生物膜系统的流动镶嵌模型：磷脂双分子层是骨架，蛋白质分子镶嵌其间。", tag: "细胞结构" },
  { text: "协助扩散不耗能但需转运蛋白，主动运输既耗能又逆浓度梯度。", tag: "跨膜运输" },
  { text: "酶具有高效性与专一性，只降低反应活化能，不改变平衡点。", tag: "酶的机理" },
  { text: "ATP 含有两个高能磷酸键，末端高能磷酸键水解快速释放能量。", tag: "能量货币" },
  { text: "有氧呼吸第三阶段释放能量最多，发生在线粒体内膜上。", tag: "细胞呼吸" },
  { text: "光反应在类囊体薄膜上产生 ATP 和 NADPH，为暗反应提供能量与还原剂。", tag: "光合作用" },
  { text: "突止光照时：C₃ 瞬时增加，C₅ 瞬时减少；突断 CO₂ 时：C₃ 骤降，C₅ 骤升。", tag: "动态模型" },
  { text: "有丝分裂后期着丝粒分裂，染色体数目加倍，DNA 数目不变。", tag: "细胞增殖" },
  { text: "减数第一次分裂后期：同源染色体分离，非同源染色体自由组合。", tag: "减数分裂" },
  { text: "细胞全能性的标志：已分化的细胞发育为完整个体。", tag: "细胞历程" },
  { text: "细胞衰老特征：水分减少、呼吸变慢、酶活性降低、色素沉积。", tag: "细胞衰老" },
  { text: "原癌基因负责调节细胞周期，抑癌基因阻止细胞不正常增殖。", tag: "细胞癌变" },
  { text: "假说-演绎法闭环：观察现象 ➔ 提出假说 ➔ 演绎推理 ➔ 测交验证 ➔ 得出结论。", tag: "科学方法" },
  { text: "连续自交 n 代：杂合子比例为 (1/2)ⁿ，纯合子比例为 1 - (1/2)ⁿ。", tag: "分离定律" },
  { text: "自由组合 9:3:3:1 变式中：9:7 为双显互补，15:1 为具显即显。", tag: "自由组合" },
  { text: "伴 X 隐性遗传特征：母病子必病，女病父必病；男性患者多于女性。", tag: "伴性遗传" },
  { text: "伴 X 显性遗传特征：父病女必病，子病母必病；女性患者多于男性。", tag: "伴性遗传" },
  { text: "肺炎链球菌体外转化实验运用减法原理，证明 DNA 是遗传物质。", tag: "经典实验" },
  { text: "³²P 标记噬菌体 DNA（沉淀放射高），³⁵S 标记噬菌体蛋白质外壳（上清放射高）。", tag: "同位素示踪" },
  { text: "DNA 双螺旋两条链反向平行，A-T 之间 2 个氢键，G-C 之间 3 个氢键。", tag: "DNA结构" },
  { text: "DNA 连续复制 n 次共产生 2ⁿ 个分子，含原亲代母链的分子恒为 2 个。", tag: "复制模型" },
  { text: "转录以 DNA 一条链为模板，翻译在核糖体上以 mRNA 为模板。", tag: "中心法则" },
  { text: "密码子在 mRNA 上（64种，61种编码氨基酸），反密码子在 tRNA 上。", tag: "基因表达" },
  { text: "DNA 甲基化不改变碱基序列，但可抑制基因转录，属于表观遗传。", tag: "表观遗传" },
  { text: "基因突变是产生新基因的根本途径，是生物变异的根本来源。", tag: "生物变异" },
  { text: "单倍体育种先花药离体培养再秋水仙素加倍，可明显缩短育种年限。", tag: "育种方案" },
  { text: "现代生物进化理论核心：种群是进化的基本单位，自然选择决定进化方向。", tag: "生物进化" },
  { text: "生殖隔离是新物种形成的标志，基因频率改变是进化的实质。", tag: "物种形成" },
  { text: "内环境是细胞赖以生存的液体环境，主要由血浆、组织液和淋巴液构成。", tag: "内环境" },
  { text: "细胞外液渗透压的 90% 以上由 Na⁺ 和 Cl⁻ 决定，血浆胶体渗透压取决于蛋白质。", tag: "渗透压" },
  { text: "组织水肿动力学本质：血浆胶体渗透压降低或组织液胶体渗透压升高。", tag: "稳态病理" },
  { text: "反射发生的必备前提：反射弧结构必须完整，且接受适宜强度的刺激。", tag: "神经调节" },
  { text: "静息电位为外正内负（K⁺ 外流），动作电位为外负内正（Na⁺ 内流）。", tag: "膜电位" },
  { text: "神经递质只由突触前膜胞吐释放，作用于突触后膜受体，故突触传递单向。", tag: "突触传递" },
  { text: "胰岛素是体内唯一降血糖的激素，胰高血糖素与肾上腺素协同升糖。", tag: "体液调节" },
  { text: "下丘脑是体温调节、水盐调节和血糖调节的核心神经中枢与内分泌枢纽。", tag: "调节枢纽" },
  { text: "B 细胞活化需要两个信号：抗原直接结合第一信号 + 辅助性 T 细胞第二信号。", tag: "免疫应答" },
  { text: "细胞毒性 T 细胞接触靶细胞裂解之，使病原体暴露后被抗体结合或吞噬消灭。", tag: "细胞免疫" },
  { text: "生长素在胚芽鞘中极性运输由形态学上端流向形态学下端，属于主动运输。", tag: "植物激素" },
  { text: "生长素作用具有两重性：低浓度促进生长，高浓度抑制生长（如顶端优势）。", tag: "生长素" },
  { text: "J 型增长无环境阻力，S 型增长受环境容纳量（K 值）限制。", tag: "种群动力学" },
  { text: "群落演替：初生演替起点无土壤，次生演替起点保留了土壤与植物繁殖体。", tag: "群落演替" },
  { text: "生态系统能量流动两大铁律：单向流动、逐级递减（传递效率 10%~20%）。", tag: "生态系统" },
  { text: "生物多样性三层次：基因多样性、物种多样性、生态系统多样性。", tag: "人与环境" },
  { text: "果酒发酵 18~30℃ 酵母菌无氧发酵，果醋发酵 30~35℃ 醋酸菌有氧发酵。", tag: "传统发酵" },
  { text: "植物组织培养需脱分化形成愈伤组织，再经再分化形成胚状体或丛芽。", tag: "细胞工程" },
  { text: "单克隆抗体制备：B 淋巴细胞与骨髓瘤细胞融合，经 HAT 筛选与专一抗体检测。", tag: "单抗技术" },
  { text: "PCR 反应循环三步曲：95℃ 变性解旋 ➔ 55℃ 复性引物结合 ➔ 72℃ 耐热 Taq 酶延伸。", tag: "基因工程" },
];

// 每次刷新随机抽取一条（SSR 保底第一条）
const currentIndex = ref<number>(0);
const isChanging = ref<boolean>(false);
const copied = ref<boolean>(false);

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
  setTimeout(() => {
    let nextIdx = Math.floor(Math.random() * BIOLOGY_FLASHES.length);
    if (nextIdx === currentIndex.value) {
      nextIdx = (nextIdx + 1) % BIOLOGY_FLASHES.length;
    }
    currentIndex.value = nextIdx;
    isChanging.value = false;
  }, 160);
};

// 复制速记
const handleCopy = async (event: MouseEvent) => {
  event.stopPropagation();
  const text = `【高中生物速记】${currentItem.value.text}（#${currentItem.value.tag}）`;
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
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
      role="button"
      tabindex="0"
      title="点击换一条高中生物速记"
      @click="handleNext"
      @keydown.enter="handleNext"
      @keydown.space.prevent="handleNext"
    >
      <!-- 左侧极简徽章 -->
      <div class="flash-badge">
        <span class="flash-badge-icon">🌿</span>
        <span class="flash-badge-text">每日速记</span>
        <span class="flash-tag">{{ currentItem.tag }}</span>
      </div>

      <!-- 中间核心简短金句 -->
      <div class="flash-text-box" :class="{ 'is-swapping': isChanging }">
        <span class="flash-quote-mark">“</span><span class="flash-content">{{ currentItem.text }}</span><span class="flash-quote-mark">”</span>
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
  margin-top: 22px;
  width: 100%;
}

.cc-biology-flash-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 680px;
  width: 100%;
  padding: 8px 14px;
  background: color-mix(in srgb, var(--vp-c-brand-1, #10B981) 5%, var(--vp-c-bg-soft));
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #10B981) 18%, transparent);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 18px -4px rgba(16, 185, 129, 0.12);
  cursor: pointer;
  user-select: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.cc-biology-flash-card:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1, #10B981) 9%, var(--vp-c-bg-soft));
  border-color: color-mix(in srgb, var(--vp-c-brand-1, #10B981) 35%, transparent);
  box-shadow: 0 6px 24px -4px rgba(16, 185, 129, 0.2);
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
  background: color-mix(in srgb, var(--vp-c-brand-1, #10B981) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1, #10B981) 24%, transparent);
}

.flash-badge-icon {
  font-size: 11px;
  line-height: 1;
}

.flash-badge-text {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  letter-spacing: 0.02em;
}

.flash-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--vp-c-brand-1, #10B981) 16%, transparent);
  color: var(--vp-c-brand-1);
}

/* 核心内容文本 */
.flash-text-box {
  flex: 1;
  min-width: 0;
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--vp-c-text-1);
  letter-spacing: 0.01em;
  transition: opacity 0.16s ease, transform 0.16s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.flash-text-box.is-swapping {
  opacity: 0;
  transform: translateY(4px);
}

.flash-quote-mark {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  opacity: 0.8;
  margin: 0 1px;
}

.flash-content {
  font-weight: 500;
}

/* 右侧操作按钮 */
.flash-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.flash-action-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.flash-action-icon-btn:hover {
  background: color-mix(in srgb, var(--vp-c-brand-1, #5672CD) 10%, transparent);
  border-color: color-mix(in srgb, var(--vp-c-brand-1, #5672CD) 20%, transparent);
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
  .cc-physics-flash-card {
    align-items: flex-start;
    padding: 10px 12px;
  }

  .flash-badge {
    margin-top: 2px;
  }

  .flash-text-box {
    font-size: 13px;
    line-height: 1.5;
  }
}
</style>
