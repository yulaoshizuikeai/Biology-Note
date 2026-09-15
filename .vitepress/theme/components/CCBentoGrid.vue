<script setup lang="ts">
import { withBase } from "vitepress";

interface FeaturedCard {
  title: string;
  tag: string;
  tagClass: string;
  desc: string;
  link: string;
  cta: string;
}

interface QuadrantTopic {
  id: string;
  title: string;
  link: string;
  summary: string;
}

interface Quadrant {
  key: string;
  quadrantName: string;
  tag: string;
  desc: string;
  topics: QuadrantTopic[];
}

const featuredCards: FeaturedCard[] = [
  {
    title: "50 大黄金结论与遗传核心计算",
    tag: "速查必背",
    tagClass: "tag-amber",
    desc: "高频必考分离比与自由组合变式、中心法则数量关系、光合呼吸净量毛量代换与秒杀定理速查。",
    link: "/golden-conclusions",
    cta: "速查核心结论",
  },
  {
    title: "全专题防踩坑排雷白皮书",
    tag: "临考排雷",
    tagClass: "tag-red",
    desc: "聚合 16 大专题高频概念陷阱、实验单一变量漏洞、内环境管腔混淆与考场长句答题雷区。",
    link: "/warning-cheatsheet",
    cta: "进入排雷手册",
  },
  {
    title: "16 款微观生命动态仿真模型",
    tag: "交互探究",
    tagClass: "tag-green",
    desc: "覆盖光合碳反应动力学、呼吸熵液滴移动、动作电位示波器、减数分裂与遗传系谱分析器。",
    link: "/03%20细胞代谢与能量供应（酶、ATP与呼吸光合）/04%20光合作用微观机理与瞬时突变动态模型",
    cta: "探索动态模型",
  },
];

const quadrants: Quadrant[] = [
  {
    key: "q1",
    quadrantName: "第一象限 · 分子与细胞",
    tag: "必修 1 · 分子与细胞",
    desc: "奠定生命大厦的微观物质基础与细胞生命系统基本逻辑。",
    topics: [
      {
        id: "01",
        title: "走进细胞与组成细胞的分子",
        link: "/01%20走进细胞与组成细胞的分子/index",
        summary: "细胞学说 · 水与无机盐 · 糖脂结构 · 蛋白质与核酸计算",
      },
      {
        id: "02",
        title: "细胞基本结构与物质跨膜运输",
        link: "/02%20细胞的基本结构与物质跨膜运输/index",
        summary: "流动镶嵌模型 · 生物膜系统 · 协助扩散 · 主动运输 · 胞吞胞吐",
      },
      {
        id: "03",
        title: "细胞代谢与能量供应",
        link: "/03%20细胞代谢与能量供应（酶、ATP与呼吸光合）/index",
        summary: "酶降低活化能 · ATP 转化 · 有氧呼吸 · 光合微观机理与综合曲线",
      },
      {
        id: "04",
        title: "细胞的生命历程",
        link: "/04%20细胞的生命历程（增殖、分化、衰老与凋亡）/index",
        summary: "有丝分裂模型 · 减数分裂与受精 · 细胞全能性 · 衰老与凋亡机理",
      },
    ],
  },
  {
    key: "q2",
    quadrantName: "第二象限 · 遗传与变异",
    tag: "必修 2 · 遗传与进化",
    desc: "探究遗传因子的分离与自由组合，解析中心法则微观表达与演化。",
    topics: [
      {
        id: "05",
        title: "孟德尔遗传规律与伴性遗传",
        link: "/05%20孟德尔遗传规律与伴性遗传/index",
        summary: "分离定律 · 9:3:3:1 变式矩阵 · 伴性遗传特征 · 系谱图推导",
      },
      {
        id: "06",
        title: "基因的本质与中心法则",
        link: "/06%20基因的本质与中心法则（复制、转录与翻译）/index",
        summary: "经典探索实验 · DNA 双螺旋半保留复制 · 转录翻译 · 表观遗传",
      },
      {
        id: "07",
        title: "生物变异、育种与现代进化理论",
        link: "/07%20生物的变异、育种与现代生物进化理论/index",
        summary: "基因突变重组 · 染色体变异 · 五大育种全景 · 基因频率计算",
      },
    ],
  },
  {
    key: "q3",
    quadrantName: "第三象限 · 稳态与调节",
    tag: "选择性必修 1 · 稳态与调节",
    desc: "解析多细胞生物体内环境动态平衡及神经-体液-免疫调节网络。",
    topics: [
      {
        id: "08",
        title: "人体内环境与稳态",
        link: "/08%20人体内环境与稳态/index",
        summary: "血浆/组织液/淋巴组分 · 渗透压与酸碱缓冲 · 组织水肿成因全景",
      },
      {
        id: "09",
        title: "动物生命活动的神经、体液与免疫调节",
        link: "/09%20动物生命活动的神经、体液与免疫调节/index",
        summary: "反射弧与膜电位 · 激素分级与反馈 · 体液免疫与细胞免疫防线",
      },
      {
        id: "10",
        title: "植物生命活动的激素调节",
        link: "/10%20植物生命活动的激素调节/index",
        summary: "生长素极性运输与两重性 · 五大植物激素协同 · 光敏色素调控",
      },
    ],
  },
  {
    key: "q4",
    quadrantName: "第四象限 · 生态与生物工程",
    tag: "选择性必修 2 与 3",
    desc: "从宏观生态系统的能量物质流动，延伸至现代生物工程前沿工艺。",
    topics: [
      {
        id: "11",
        title: "种群、群落与生态系统结构功能",
        link: "/11%20种群、群落与生态系统结构功能/index",
        summary: "J/S 增长模型 · 群落演替 · 能量单向流动 · 碳循环平衡",
      },
      {
        id: "12",
        title: "人与环境及生态工程",
        link: "/12%20人与环境及生态工程/index",
        summary: "生态足迹 · 生物多样性保护 · 自生/循环/协调/整体原理",
      },
      {
        id: "13",
        title: "传统发酵技术与微生物培养",
        link: "/13%20传统发酵技术与微生物培养应用/index",
        summary: "果酒果醋泡菜发酵 · 无菌操作规范 · 平板划线法与稀释涂布法",
      },
      {
        id: "14",
        title: "细胞工程（植物与动物细胞工程）",
        link: "/14%20细胞工程（植物与动物细胞工程）/index",
        summary: "植物组培与体细胞杂交 · 动物细胞培养 · 单克隆抗体制备工艺",
      },
      {
        id: "15",
        title: "基因工程与生物技术安全性与伦理",
        link: "/15%20基因工程与生物技术安全性与伦理/index",
        summary: "限制酶与连接酶 · 质粒载体构建 · PCR 扩增循环 · 转基因安全",
      },
      {
        id: "16",
        title: "高中生物经典实验专题与科学探究",
        link: "/16%20高中生物经典实验专题与科学探究方法/index",
        summary: "必做实验试剂显色矩阵 · 对照实验设计四步法 · 考场长句模板",
      },
    ],
  },
];
</script>

<template>
  <div class="cc-bento-container">
    <!-- 顶部特色三联卡片 (Featured Trinity) -->
    <section class="featured-section" aria-label="核心特色入口">
      <div class="featured-grid">
        <a
          v-for="item in featuredCards"
          :key="item.title"
          :href="withBase(item.link)"
          class="featured-card"
        >
          <div class="card-header">
            <span class="card-tag" :class="item.tagClass">{{ item.tag }}</span>
            <span class="card-arrow" aria-hidden="true">→</span>
          </div>
          <h2 class="card-title">{{ item.title }}</h2>
          <p class="card-desc">{{ item.desc }}</p>
          <div class="card-cta">
            <span>{{ item.cta }}</span>
          </div>
        </a>
      </div>
    </section>

    <!-- 四象限知识体系矩阵 (Quadrants Architecture) -->
    <section class="quadrants-section" aria-label="高中生物四象限知识体系">
      <div class="section-intro">
        <div class="section-badge">学 科 矩 阵</div>
        <h2 class="section-heading">高中生物 16 大核心专题知识图谱</h2>
        <p class="section-subtitle">
          严格依循普通高中生物学课程标准，依照生命的物质基础、遗传法则、调控平衡及宏观工程逻辑系统编排。
        </p>
      </div>

      <div class="quadrants-grid">
        <div
          v-for="quad in quadrants"
          :key="quad.key"
          class="quadrant-card"
          :class="`quadrant-${quad.key}`"
        >
          <div class="quadrant-header">
            <div class="quadrant-meta">
              <span class="quadrant-tag">{{ quad.tag }}</span>
              <h3 class="quadrant-name">{{ quad.quadrantName }}</h3>
            </div>
            <p class="quadrant-desc">{{ quad.desc }}</p>
          </div>

          <div class="topics-list">
            <a
              v-for="topic in quad.topics"
              :key="topic.id"
              :href="withBase(topic.link)"
              class="topic-row"
            >
              <span class="topic-id">{{ topic.id }}</span>
              <div class="topic-content">
                <span class="topic-title">{{ topic.title }}</span>
                <span class="topic-summary">{{ topic.summary }}</span>
              </div>
              <span class="topic-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cc-bento-container {
  max-width: 1152px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 4rem;
}

/* ============================================================
   1. Featured Trinity Cards
   ============================================================ */
.featured-section {
  margin-bottom: 3.5rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.25rem;
}

.featured-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.6rem 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  box-shadow: none;
  transition:
    transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.22s ease,
    background-color 0.22s ease,
    box-shadow 0.22s ease;
}

.featured-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 38%, var(--vp-c-border));
  background-color: color-mix(in srgb, var(--vp-c-brand-1) 2.5%, var(--vp-c-bg-soft));
  box-shadow: var(--vp-shadow-2);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.tag-amber {
  background-color: var(--bio-q2-bg);
  color: var(--bio-q2-text);
  border: 1px solid var(--bio-q2-border);
}

.tag-red {
  background-color: var(--bio-q3-bg);
  color: var(--bio-q3-text);
  border: 1px solid var(--bio-q3-border);
}

.tag-green {
  background-color: var(--bio-q1-bg);
  color: var(--bio-q1-text);
  border: 1px solid var(--bio-q1-border);
}

.card-arrow {
  color: var(--vp-c-text-3);
  font-size: 1.05rem;
  transition:
    transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.2s ease;
}

.featured-card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--vp-c-brand-1);
}

.card-title {
  margin: 0 0 0.65rem;
  font-family: var(--vp-font-family-serif);
  font-size: 1.28rem;
  font-weight: 650;
  line-height: 1.32;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
}

.card-desc {
  margin: 0 0 1.25rem;
  font-size: 0.88rem;
  line-height: 1.62;
  color: var(--vp-c-text-2);
  flex-grow: 1;
}

.card-cta {
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  display: inline-flex;
  align-items: center;
}

/* ============================================================
   2. Quadrants Matrix Section
   ============================================================ */
.section-intro {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 650;
  letter-spacing: 0.12em;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background-color: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  border: 1px solid var(--vp-c-border);
}

.section-heading {
  margin: 0 0 0.6rem;
  font-family: var(--vp-font-family-serif);
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--vp-c-text-1);
}

.section-subtitle {
  margin: 0 auto;
  max-width: 680px;
  font-size: 0.94rem;
  line-height: 1.68;
  color: var(--vp-c-text-2);
}

.quadrants-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}

.quadrant-card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid var(--vp-c-border);
  background-color: var(--vp-c-bg-soft);
  padding: 1.6rem 1.6rem 1.3rem;
  box-shadow: none;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.quadrant-card:hover {
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 35%, var(--vp-c-border));
  box-shadow: var(--vp-shadow-1);
}

.quadrant-header {
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.quadrant-meta {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.35rem;
}

.quadrant-tag {
  font-size: 0.74rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
}

.quadrant-q1 .quadrant-tag {
  background-color: var(--bio-q1-bg);
  color: var(--bio-q1-text);
  border: 1px solid var(--bio-q1-border);
}

.quadrant-q2 .quadrant-tag {
  background-color: var(--bio-q2-bg);
  color: var(--bio-q2-text);
  border: 1px solid var(--bio-q2-border);
}

.quadrant-q3 .quadrant-tag {
  background-color: var(--bio-q3-bg);
  color: var(--bio-q3-text);
  border: 1px solid var(--bio-q3-border);
}

.quadrant-q4 .quadrant-tag {
  background-color: var(--bio-q4-bg);
  color: var(--bio-q4-text);
  border: 1px solid var(--bio-q4-border);
}

.quadrant-name {
  margin: 0;
  font-family: var(--vp-font-family-serif);
  font-size: 1.22rem;
  font-weight: 650;
  letter-spacing: -0.018em;
  color: var(--vp-c-text-1);
}

.quadrant-desc {
  margin: 0.35rem 0 0;
  font-size: 0.86rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

/* Topics list inside quadrant */
.topics-list {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.topic-row {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.65rem 0.85rem;
  border-radius: 6px;
  border: 1px solid transparent;
  text-decoration: none !important;
  color: var(--vp-c-text-1) !important;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

.topic-row:hover {
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-border);
  transform: translateX(3px);
}

.topic-id {
  font-family: var(--vp-font-family-mono);
  font-size: 0.84rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-alt);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  flex-shrink: 0;
}

.topic-content {
  display: flex;
  flex-direction: column;
  gap: 0.12rem;
  flex-grow: 1;
  min-width: 0;
}

.topic-title {
  font-size: 0.93rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.topic-summary {
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topic-arrow {
  color: var(--vp-c-text-3);
  font-size: 0.95rem;
  flex-shrink: 0;
  transition:
    transform 0.18s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.18s ease;
}

.topic-row:hover .topic-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(3px);
}

/* ============================================================
   3. Responsive Rules
   ============================================================ */
@media (max-width: 960px) {
  .featured-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .quadrants-grid {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
}

@media (max-width: 640px) {
  .cc-bento-container {
    padding: 1rem 0.75rem 3rem;
  }

  .quadrant-card {
    padding: 1.25rem 1.1rem;
  }

  .topic-summary {
    white-space: normal;
  }
}
</style>
