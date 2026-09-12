<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 10 · 植物激素</div>
      <h3 class="card-title">生长素两重性与不同器官敏感度三曲线探针</h3>
      <p class="card-desc">
        拖动浓度探针，即时查看根、芽、茎在不同生长素浓度下的促进/抑制响应，直观破解顶端优势与根向地性。
      </p>
    </div>

    <div class="slider-zone">
      <label
        >生长素摩尔浓度 (mol/L):
        <span class="val"
          >10<sup>{{ exp }}</sup> mol/L</span
        ></label
      >
      <input type="range" v-model.number="exp" min="-11" max="-2" step="1" />
    </div>

    <div class="organs-grid">
      <div class="organ-card" :class="rootClass">
        <div class="organ-name">根 (Root · 最敏感)</div>
        <div class="organ-status">{{ rootStatus }}</div>
        <div class="organ-rate">响应程度：{{ rootRate }}</div>
        <div class="organ-sub">最适浓度：10⁻¹⁰ mol/L</div>
      </div>
      <div class="organ-card" :class="shootClass">
        <div class="organ-name">芽 (Bud · 中度敏感)</div>
        <div class="organ-status">{{ shootStatus }}</div>
        <div class="organ-rate">响应程度：{{ shootRate }}</div>
        <div class="organ-sub">最适浓度：10⁻⁸ mol/L</div>
      </div>
      <div class="organ-card" :class="stemClass">
        <div class="organ-name">茎 (Stem · 最耐受)</div>
        <div class="organ-status">{{ stemStatus }}</div>
        <div class="organ-rate">响应程度：{{ stemRate }}</div>
        <div class="organ-sub">最适浓度：10⁻⁴ mol/L</div>
      </div>
    </div>

    <div class="probe-phenomenon">
      <strong>当前浓度生产现象与原理透析：</strong>
      <span>{{ phenomenonText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const exp = ref(-8);

const rootStatus = computed(() => {
  if (exp.value < -10) return "低浓度微弱促进";
  if (exp.value === -10) return "最适促进顶峰";
  if (exp.value === -9) return "促进减弱 (仍促进!)";
  if (exp.value === -8) return "生理临界点 (不促不抑)";
  return "高浓度抑制生长";
});
const rootRate = computed(() => {
  if (exp.value < -10) return "+40% (微弱促进)";
  if (exp.value === -10) return "+100% (最适促进)";
  if (exp.value === -9) return "+50% (促进减弱)";
  if (exp.value === -8) return "0% (与横轴交点)";
  if (exp.value === -7) return "-40% (开始抑制)";
  return "-85% (严重抑制)";
});
const rootClass = computed(() => {
  if (exp.value < -8) return "status-promote";
  if (exp.value === -8) return "status-neutral";
  return "status-inhibit";
});

const shootStatus = computed(() => {
  if (exp.value < -8) return "低浓度促进中";
  if (exp.value === -8) return "最适促进顶峰";
  if (exp.value === -7) return "促进减弱 (仍促进!)";
  if (exp.value === -6) return "生理临界点 (不促不抑)";
  return "受到高浓度抑制";
});
const shootRate = computed(() => {
  if (exp.value < -8) return "+40% (低浓度促进)";
  if (exp.value === -8) return "+100% (最适促进)";
  if (exp.value === -7) return "+50% (促进减弱)";
  if (exp.value === -6) return "0% (与横轴交点)";
  if (exp.value === -5) return "-40% (开始抑制)";
  return "-80% (严重抑制)";
});
const shootClass = computed(() => {
  if (exp.value < -6) return "status-promote";
  if (exp.value === -6) return "status-neutral";
  return "status-inhibit";
});

const stemStatus = computed(() => {
  if (exp.value <= -8) return "浓度过低，无明显作用";
  if (exp.value <= -5) return "中低浓度促进生长";
  if (exp.value === -4) return "最适促进顶峰";
  if (exp.value === -3) return "促进减弱 (仍促进!)";
  if (exp.value === -2) return "生理临界点 (不促不抑)";
  return "高浓度抑制生长";
});
const stemRate = computed(() => {
  if (exp.value <= -8) return "+5% (无明显促进)";
  if (exp.value === -7) return "+25% (微弱促进)";
  if (exp.value === -6) return "+55% (适度促进)";
  if (exp.value === -5) return "+80% (强烈促进)";
  if (exp.value === -4) return "+100% (最适促进)";
  if (exp.value === -3) return "+40% (高浓度促进)";
  return "0% (与横轴交点)";
});
const stemClass = computed(() => {
  if (exp.value < -2) return "status-promote";
  if (exp.value === -2) return "status-neutral";
  return "status-inhibit";
});

const phenomenonText = computed(() => {
  if (exp.value === -10) return "根生长的最适浓度（+100%）。对芽有微弱促进作用，对茎无明显作用。";
  if (exp.value === -9)
    return "★ 高考排雷必背：此浓度虽高于根的最适浓度，但仍处于【促进根生长】区间！最适浓度两侧均为促进作用，切勿与抑制混淆！";
  if (exp.value === -8)
    return "芽生长的最适浓度（+100%）；同时恰好为【根的生理临界点】（促进率为 0，既不促进也不抑制）！";
  if (exp.value === -7)
    return "芽仍受到促进生长作用；但根已跨入【高浓度抑制区间】（-40%），直观体现不同器官敏感度的悬殊差异（根 > 芽 > 茎）。";
  if (exp.value === -6)
    return "顶端优势典型状态：侧芽处生长素积累至该临界浓度附近或更高，生长受到强烈抑制；顶芽浓度更低维持优先生长！";
  if (exp.value === -4)
    return "茎生长的最适促进浓度（+100%）！此时根与侧芽均处于极度抑制状态，生产中可用此浓度作为插条生根的短时间沾蘸液。";
  if (exp.value === -3) return "茎生长的高浓度促进状态（+40%），虽比最适浓度效果弱但仍属促进。";
  if (exp.value === -2)
    return "茎的生理临界点（促进率降至 0）；高于此浓度的生长素类似物（如 2,4-D）可作为除草剂防除双子叶杂草。";
  return "极低浓度状态：对各器官促进作用均微弱或接近于零。";
});
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
.slider-zone {
  margin: 16px 0;
}
.slider-zone label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
}
.slider-zone .val {
  color: var(--vp-c-brand-1);
  font-family: monospace;
  font-size: 14px;
}
.organs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}
.organ-card {
  padding: 14px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
}
.organ-name {
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 4px;
}
.organ-status {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
}
.organ-rate {
  font-size: 12px;
  color: var(--vp-c-text-1);
  font-family: monospace;
}
.organ-sub {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-top: 4px;
}
.status-promote {
  border-left: 4px solid #10b981;
}
.status-promote .organ-status {
  color: #059669;
}
.status-neutral {
  border-left: 4px solid #64748b;
}
.status-neutral .organ-status {
  color: #475569;
}
.status-inhibit {
  border-left: 4px solid #ef4444;
}
.status-inhibit .organ-status {
  color: #dc2626;
}
.probe-phenomenon {
  padding: 12px 16px;
  border-radius: 8px;
  background: var(--vp-c-bg-alt);
  border-left: 3px solid var(--vp-c-brand-1);
  font-size: 12.5px;
  color: var(--vp-c-text-1);
  line-height: 1.5;
}
</style>
