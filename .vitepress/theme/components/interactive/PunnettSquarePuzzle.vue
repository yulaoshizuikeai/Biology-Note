<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 05 · 遗传定律</div>
      <h3 class="card-title">孟德尔 9:3:3:1 变式全景棋盘矩阵仪</h3>
      <p class="card-desc">
        下拉切换 7 大经典变式，4×4 棋盘 16 格平滑聚类变色合并，一秒推导表型比与测交比。
      </p>
    </div>

    <div class="ctrl-bar">
      <label>选择 9:3:3:1 经典变式类型：</label>
      <select v-model="selectedVariation" class="select-box">
        <option value="classic">经典自由组合 (9:3:3:1)</option>
        <option value="complementary">两对基因互补显性 (9:7)</option>
        <option value="duplicate_additive">单显相同 / 基因叠加 (9:6:1)</option>
        <option value="duplicate_dominant">双重显性重叠 (15:1)</option>
        <option value="recessive_epistasis">隐性上位效应 (9:3:4)</option>
        <option value="dominant_epistasis">显性上位效应 (12:3:1)</option>
        <option value="dominant_inhibition">显性抑制效应 (13:3)</option>
      </select>
    </div>

    <div class="grid-container">
      <div class="grid-4x4">
        <div
          v-for="(cell, i) in gridCells"
          :key="i"
          class="punnett-cell"
          :class="getCellColorClass(cell)"
        >
          <div class="geno">{{ cell.geno }}</div>
          <div class="pheno-tag">{{ getPhenoName(cell) }}</div>
        </div>
      </div>

      <div class="summary-panel">
        <div class="result-row">
          <span>F₂ 表现型比例：</span>
          <strong class="text-brand">{{ curVarData.ratio }}</strong>
        </div>
        <div class="result-row">
          <span>测交后代比例：</span>
          <strong class="text-amber">{{ curVarData.testcross }}</strong>
        </div>
        <div class="result-desc">
          <strong>原理与经典情境：</strong>
          <p>{{ curVarData.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

type VariationKey =
  | "classic"
  | "complementary"
  | "duplicate_additive"
  | "duplicate_dominant"
  | "recessive_epistasis"
  | "dominant_epistasis"
  | "dominant_inhibition";

const selectedVariation = ref<VariationKey>("classic");

interface Cell {
  geno: string;
  hasA: boolean;
  hasB: boolean;
}

const gridCells: Cell[] = [
  { geno: "AABB", hasA: true, hasB: true },
  { geno: "AaBB", hasA: true, hasB: true },
  { geno: "AABb", hasA: true, hasB: true },
  { geno: "AaBb", hasA: true, hasB: true },
  { geno: "AaBB", hasA: true, hasB: true },
  { geno: "aaBB", hasA: false, hasB: true },
  { geno: "AaBb", hasA: true, hasB: true },
  { geno: "aaBb", hasA: false, hasB: true },
  { geno: "AABb", hasA: true, hasB: true },
  { geno: "AaBb", hasA: true, hasB: true },
  { geno: "AAbb", hasA: true, hasB: false },
  { geno: "Aabb", hasA: true, hasB: false },
  { geno: "AaBb", hasA: true, hasB: true },
  { geno: "aaBb", hasA: false, hasB: true },
  { geno: "Aabb", hasA: true, hasB: false },
  { geno: "aabb", hasA: false, hasB: false },
];

const variations = {
  classic: {
    ratio: "9 : 3 : 3 : 1",
    testcross: "1 : 1 : 1 : 1",
    desc: "孟德尔两对相对性状杂交实验基准：双显(A_B_)占 9，单显A(A_bb)占 3，单显B(aaB_)占 3，双隐(aabb)占 1。",
  },
  complementary: {
    ratio: "9 : 7",
    testcross: "1 : 3",
    desc: "互补显性：两对基因同时含有显性(A_B_)才表现出特定显性性状；单显与双隐均表现为同一种隐性(3+3+1=7)。如香豌豆花色。",
  },
  duplicate_additive: {
    ratio: "9 : 6 : 1",
    testcross: "1 : 2 : 1",
    desc: "单显相同：同时有A和B表现一种性状(9)；只有A或只有B表型相同(3+3=6)；无显性基因表现第三种表型(1)。如南瓜果形。",
  },
  duplicate_dominant: {
    ratio: "15 : 1",
    testcross: "3 : 1",
    desc: "显性重叠：只要含有任意一个显性基因(A_B_、A_bb、aaB_)即表现为同一种显性性状(9+3+3=15)；双隐性表现隐性(1)。如荠菜蒴果。",
  },
  recessive_epistasis: {
    ratio: "9 : 3 : 4",
    testcross: "1 : 1 : 2",
    desc: "隐性上位：隐性纯合基因(如 bb)会掩盖另一对基因的显性表现，导致 aaB_ 和 aabb 或 A_bb 归为一种表型。如小鼠毛色。",
  },
  dominant_epistasis: {
    ratio: "12 : 3 : 1",
    testcross: "2 : 1 : 1",
    desc: "显性上位：显性基因(如 A)存在时即阻断另一对基因的表现，A_B_ 与 A_bb 归为一类(9+3=12)；aaB_ 占 3；aabb 占 1。如西葫芦皮色。",
  },
  dominant_inhibition: {
    ratio: "13 : 3",
    testcross: "3 : 1",
    desc: "显性抑制：显性基因(如 I)抑制另一对显性基因(如 C)的表达，导致只有 cc 基因型的特定组合才能显色。",
  },
};

const curVarData = computed(() => variations[selectedVariation.value]);

const getCellColorClass = (cell: Cell) => {
  const v = selectedVariation.value;
  if (v === "classic") {
    if (cell.hasA && cell.hasB) return "c-blue";
    if (cell.hasA && !cell.hasB) return "c-green";
    if (!cell.hasA && cell.hasB) return "c-amber";
    return "c-gray";
  }
  if (v === "complementary") {
    return cell.hasA && cell.hasB ? "c-purple" : "c-gray";
  }
  if (v === "duplicate_additive") {
    if (cell.hasA && cell.hasB) return "c-blue";
    if (cell.hasA || cell.hasB) return "c-green";
    return "c-gray";
  }
  if (v === "duplicate_dominant") {
    return cell.hasA || cell.hasB ? "c-blue" : "c-gray";
  }
  if (v === "recessive_epistasis") {
    if (cell.hasA && cell.hasB) return "c-blue";
    if (!cell.hasA && cell.hasB) return "c-green";
    return "c-gray"; // A_bb + aabb 合并
  }
  if (v === "dominant_epistasis") {
    if (cell.hasA) return "c-blue"; // A_B_ + A_bb 合并
    if (cell.hasB) return "c-green";
    return "c-gray";
  }
  if (v === "dominant_inhibition") {
    if (cell.hasA && !cell.hasB) return "c-blue";
    return "c-gray";
  }
  return "c-blue";
};

const getPhenoName = (cell: Cell) => {
  const v = selectedVariation.value;
  if (v === "classic") {
    if (cell.hasA && cell.hasB) return "双显";
    if (cell.hasA) return "A单显";
    if (cell.hasB) return "B单显";
    return "双隐";
  }
  if (v === "complementary") {
    return cell.hasA && cell.hasB ? "显性(9)" : "隐性(7)";
  }
  if (v === "duplicate_additive") {
    if (cell.hasA && cell.hasB) return "双显(9)";
    if (cell.hasA || cell.hasB) return "单显(6)";
    return "双隐(1)";
  }
  if (v === "duplicate_dominant") {
    return cell.hasA || cell.hasB ? "显性(15)" : "隐性(1)";
  }
  if (v === "recessive_epistasis") {
    if (cell.hasA && cell.hasB) return "双显(9)";
    if (!cell.hasA && cell.hasB) return "B单显(3)";
    return "隐性上位(4)";
  }
  if (v === "dominant_epistasis") {
    if (cell.hasA) return "显性上位(12)";
    if (cell.hasB) return "B单显(3)";
    return "双隐(1)";
  }
  if (v === "dominant_inhibition") {
    if (cell.hasA && !cell.hasB) return "显色(3)";
    return "抑制白(13)";
  }
  return "双显";
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
.ctrl-bar {
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.select-box {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 13px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.grid-4x4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  max-width: 320px;
}
.punnett-cell {
  aspect-ratio: 1;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.geno {
  font-size: 11px;
  font-weight: 700;
  font-family: monospace;
}
.pheno-tag {
  font-size: 11px;
  opacity: 0.8;
}
.c-blue {
  background: #dbeafe;
  color: #1e40af;
  border-color: #93c5fd;
}
.c-green {
  background: #dcfce7;
  color: #166534;
  border-color: #86efac;
}
.c-amber {
  background: #fef3c7;
  color: #92400e;
  border-color: #fde68a;
}
.c-purple {
  background: #f3e8ff;
  color: #6b21a8;
  border-color: #d8b4fe;
}
.c-gray {
  background: #f1f5f9;
  color: #475569;
  border-color: #cbd5e1;
}
.summary-panel {
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.result-row {
  font-size: 14px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}
.text-brand {
  color: var(--vp-c-brand-1);
  font-size: 18px;
  font-family: monospace;
}
.text-amber {
  color: #d97706;
  font-size: 16px;
  font-family: monospace;
}
.result-desc strong {
  font-size: 12.5px;
  color: var(--vp-c-text-1);
}
.result-desc p {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.5;
  margin: 4px 0 0;
}
</style>
