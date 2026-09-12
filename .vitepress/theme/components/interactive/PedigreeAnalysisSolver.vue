<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 05 · 伴性遗传</div>
      <h3 class="card-title">遗传系谱图四步排查口诀判定仪</h3>
      <p class="card-desc">
        切换典型家族婚配图谱，动态推导“确定显隐性 ➔ 排除伴性 ➔ 写基因型 ➔
        算概率”的高考大题秒杀逻辑链。
      </p>
    </div>

    <div class="case-selector">
      <button
        v-for="c in cases"
        :key="c.id"
        type="button"
        :class="['case-btn', { active: selectedCase === c.id }]"
        @click="selectedCase = c.id"
      >
        {{ c.name }}
      </button>
    </div>

    <div class="solver-stage">
      <!-- 微型系谱图可视化 -->
      <div class="pedigree-visual-box">
        <div class="tree-title">微型家系图谱</div>
        <div class="family-tree">
          <div class="parents-row">
            <div class="member">
              <div class="shape square" :class="{ affected: curCaseData.fatherAffected }"></div>
              <span>父亲</span>
            </div>
            <div class="marriage-line"></div>
            <div class="member">
              <div class="shape circle" :class="{ affected: curCaseData.motherAffected }"></div>
              <span>母亲</span>
            </div>
          </div>
          <div class="offspring-link"></div>
          <div class="offspring-row">
            <div v-for="(child, idx) in curCaseData.children" :key="idx" class="member">
              <div
                class="shape"
                :class="[
                  child.gender === 'male' ? 'square' : 'circle',
                  { affected: child.affected },
                ]"
              ></div>
              <span>{{ child.label }}</span>
            </div>
          </div>
        </div>
        <div class="legend-row">
          <span><i class="shape-mini square"></i> 男正常</span>
          <span><i class="shape-mini square affected"></i> 男患病</span>
          <span><i class="shape-mini circle"></i> 女正常</span>
          <span><i class="shape-mini circle affected"></i> 女患病</span>
        </div>
      </div>

      <!-- 四步推导逻辑链 -->
      <div class="deduction-steps-box">
        <div class="step-card highlight">
          <div class="s-title">第 1 步：定显隐性（依据子代性状分离）</div>
          <div class="s-val text-brand">{{ curCaseData.step1Verdict }}</div>
          <div class="s-rule">口诀：{{ curCaseData.step1Mnemonic }}</div>
        </div>

        <div class="step-card">
          <div class="s-title">第 2 步：定常/伴染色体（反证排除法）</div>
          <div class="s-val text-purple">{{ curCaseData.step2Verdict }}</div>
          <div class="s-rule">证明链：{{ curCaseData.step2Proof }}</div>
        </div>

        <div class="step-card">
          <div class="s-title">第 3 步：推导亲代基因型</div>
          <div class="s-val text-emerald">{{ curCaseData.parentGenotypes }}</div>
        </div>

        <div class="step-card">
          <div class="s-title">第 4 步：再生患病孩子概率</div>
          <div class="s-val text-amber">{{ curCaseData.diseaseProbability }}</div>
        </div>
      </div>
    </div>

    <div class="mnemonic-banner">
      <strong>★ 高考系谱图终极定性口诀：</strong>
      <span
        >无中生有为隐性，隐性遗传看女病，父子皆病为伴隐，<strong>女病父正必常隐</strong>；<br />
        有中生无为显性，显性遗传看男病，母女皆病为伴显，<strong>父病女正必常显</strong>！</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

type CaseId = "auto_recessive" | "auto_dominant" | "x_recessive" | "x_dominant";

const selectedCase = ref<CaseId>("auto_recessive");

interface Child {
  gender: "male" | "female";
  affected: boolean;
  label: string;
}

interface CaseInfo {
  name: string;
  fatherAffected: boolean;
  motherAffected: boolean;
  children: Child[];
  step1Verdict: string;
  step1Mnemonic: string;
  step2Verdict: string;
  step2Proof: string;
  parentGenotypes: string;
  diseaseProbability: string;
}

const cases: { id: CaseId; name: string }[] = [
  { id: "auto_recessive", name: "图谱①：双亲正常生病女（最典型常隐）" },
  { id: "auto_dominant", name: "图谱②：双亲患病生健康女（最典型常显）" },
  { id: "x_recessive", name: "图谱③：双亲正常生病男（伴X隐性/常隐）" },
  { id: "x_dominant", name: "图谱④：父病母正，女儿全患病儿子全正常" },
];

const caseDetails: Record<CaseId, CaseInfo> = {
  auto_recessive: {
    name: "双亲正常，生出患病女儿",
    fatherAffected: false,
    motherAffected: false,
    children: [
      { gender: "female", affected: true, label: "患病女儿" },
      { gender: "male", affected: false, label: "健康儿子" },
    ],
    step1Verdict: "必定为【隐性遗传病】",
    step1Mnemonic: "“无中生有为隐性”（双亲未患病，后代出现患者）",
    step2Verdict: "必定位于【常染色体】上（绝对排除伴 X 隐性！）",
    step2Proof:
      "反证：若为伴 X 隐性，则患病女儿基因型为 XᵃXᵃ，其两个 Xᵃ 必分别来自父母，则父亲必为 XᵃY（必患病）；而现实中父亲表现正常，故绝对排除了伴 X，必为常染色体隐性！",
    parentGenotypes: "父亲 Aa × 母亲 Aa",
    diseaseProbability: "下胎患病概率 = 1/4 (aa)；若问生患病女儿概率 = 1/4 × 1/2 = 1/8",
  },
  auto_dominant: {
    name: "双亲患病，生出健康女儿",
    fatherAffected: true,
    motherAffected: true,
    children: [
      { gender: "female", affected: false, label: "正常女儿" },
      { gender: "male", affected: true, label: "患病儿子" },
    ],
    step1Verdict: "必定为【显性遗传病】",
    step1Mnemonic: "“有中生无为显性”（双亲患病，后代出现正常个体）",
    step2Verdict: "必定位于【常染色体】上（绝对排除伴 X 显性！）",
    step2Proof:
      "反证：若为伴 X 显性，则患病父亲基因型为 XᴬY，其必定将 Xᴬ 传给所有女儿，女儿必全患病；而现实中女儿表现正常，故必定为常染色体显性！",
    parentGenotypes: "父亲 Aa × 母亲 Aa",
    diseaseProbability: "下胎患病概率 = 3/4 (A_)；生健康孩子概率 = 1/4 (aa)",
  },
  x_recessive: {
    name: "双亲正常，母亲为携带者，生出患病儿子",
    fatherAffected: false,
    motherAffected: false,
    children: [
      { gender: "male", affected: true, label: "患病儿子" },
      { gender: "female", affected: false, label: "正常女儿" },
    ],
    step1Verdict: "必定为【隐性遗传病】",
    step1Mnemonic: "“无中生有为隐性”",
    step2Verdict: "最可能为【伴 X 染色体隐性】（亦不能排除常隐）",
    step2Proof:
      "患病儿子 XᵇY 的致病基因 Xᵇ 必定来自母亲；若家系中男性患者显著多于女性，或表现出隔代交叉遗传，则优先确认为伴 X 隐性（如红绿色盲、血友病）。",
    parentGenotypes: "父亲 XᴮY × 母亲 XᴮXᵇ",
    diseaseProbability: "再生男孩患病率 = 1/2 (XᵇY)；全部后代患病率 = 1/4",
  },
  x_dominant: {
    name: "父亲患病、母亲正常，女儿全患病儿子全正常",
    fatherAffected: true,
    motherAffected: false,
    children: [
      { gender: "female", affected: true, label: "患病女儿" },
      { gender: "male", affected: false, label: "正常儿子" },
    ],
    step1Verdict: "极大可能为【显性遗传病】",
    step1Mnemonic: "代代相传，患病父亲的女儿 100% 患病",
    step2Verdict: "极大可能为【伴 X 染色体显性】（如抗维生素D佝偻病）",
    step2Proof:
      "父亲的 X 染色体只传给女儿，不传给儿子；父患女必患，女性患者多于男性，符合伴 X 显性遗传特征。",
    parentGenotypes: "父亲 XᴰY × 母亲 XᵈXᵈ",
    diseaseProbability: "再生女孩 100% 患病 (XᴰXᵈ)；再生男孩 100% 正常 (XᵈY)",
  },
};

const curCaseData = computed(() => caseDetails[selectedCase.value]);
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
.case-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 8px;
  margin: 16px 0;
}
.case-btn {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}
.case-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}
.solver-stage {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.pedigree-visual-box {
  padding: 16px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tree-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  margin-bottom: 14px;
}
.family-tree {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.parents-row {
  display: flex;
  align-items: center;
  gap: 16px;
}
.marriage-line {
  width: 20px;
  height: 2px;
  background: #94a3b8;
}
.offspring-link {
  width: 2px;
  height: 12px;
  background: #94a3b8;
}
.offspring-row {
  display: flex;
  gap: 20px;
}
.member {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.member span {
  font-size: 10.5px;
  color: var(--vp-c-text-2);
}
.shape {
  width: 26px;
  height: 26px;
  border: 2px solid #334155;
  background: #ffffff;
  transition: all 0.3s;
}
.square {
  border-radius: 2px;
}
.circle {
  border-radius: 50%;
}
.shape.affected {
  background: #ef4444;
  border-color: #b91c1c;
}
.legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 10px;
  color: var(--vp-c-text-3);
  margin-top: 16px;
  justify-content: center;
}
.legend-row span {
  display: flex;
  align-items: center;
  gap: 3px;
}
.shape-mini {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 1px solid #334155;
  background: #fff;
}
.shape-mini.affected {
  background: #ef4444;
  border-color: #b91c1c;
}
.deduction-steps-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.step-card {
  padding: 12px 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.step-card.highlight {
  border-left: 4px solid var(--vp-c-brand-1);
}
.s-title {
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  margin-bottom: 2px;
}
.s-val {
  font-size: 13.5px;
  font-weight: 700;
  margin-bottom: 4px;
}
.s-rule {
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}
.text-brand {
  color: var(--vp-c-brand-1);
}
.text-purple {
  color: #7c3aed;
}
.text-emerald {
  color: #059669;
}
.text-amber {
  color: #d97706;
}
.mnemonic-banner {
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border-left: 3px solid var(--vp-c-brand-1);
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}
.mnemonic-banner strong {
  color: var(--vp-c-brand-1);
}

@media (max-width: 640px) {
  .solver-stage {
    grid-template-columns: 1fr;
  }
}
</style>
