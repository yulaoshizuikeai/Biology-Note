<template>
  <div class="interactive-card">
    <div class="card-header">
      <div class="badge">专题 11 · 种群生态</div>
      <h3 class="card-title">种群增长模型与 K/2 渔业捕捞决策沙盘</h3>
      <p class="card-desc">调节初始种群 N₀、增长倍数 λ 与环境容纳量 K，对比 J/S 曲线，直观理解 K/2 点增长速率最大值。</p>
    </div>

    <div class="control-grid">
      <div class="control-item">
        <label>初始种群 (N₀): <span class="val">{{ n0 }}</span></label>
        <input type="range" v-model.number="n0" min="10" max="100" step="5" />
      </div>
      <div class="control-item">
        <label>年增长倍数 (λ): <span class="val">{{ lambdaVal.toFixed(2) }}</span></label>
        <input type="range" v-model.number="lambdaVal" min="1.1" max="1.8" step="0.05" />
      </div>
      <div class="control-item">
        <label>环境容纳量 (K 值): <span class="val">{{ kVal }}</span></label>
        <input type="range" v-model.number="kVal" min="500" max="2000" step="100" />
      </div>
    </div>

    <div class="k-decision-deck">
      <div class="k-box">
        <div class="k-title">环境容纳量 (K)</div>
        <div class="k-val">{{ kVal }}</div>
        <div class="k-tip">种群达到 K 时增长速率降为 0</div>
      </div>
      <div class="k-box highlight">
        <div class="k-title">最大再生产点 (K/2)</div>
        <div class="k-val text-brand">{{ Math.round(kVal / 2) }}</div>
        <div class="k-tip">★ 增长速率最大！渔业捕后维持量</div>
      </div>
      <div class="k-box">
        <div class="k-title">每年最大持续捕捞量</div>
        <div class="k-val text-emerald">{{ Math.round(kVal / 2) }}</div>
        <div class="k-tip">超过 K/2 开捕，捕后剩余量为 K/2</div>
      </div>
    </div>

    <div class="decision-guide">
      <div class="guide-item">
        <strong>1. 渔业捕捞资源利用准则：</strong>
        <span>严禁在低于 K/2 时过度捕捞；开捕时机必须在种群显著大于 K/2，每次捕捞后的<strong>存活剩余量严格控制在 K/2</strong>，以确保来年以最高速率再生恢复！</span>
      </div>
      <div class="guide-item">
        <strong>2. 农田害虫/鼠害防控准则：</strong>
        <span>仅靠喷洒化学农药只是暂时减少数量，残存个体处于 K/2 附近繁殖速度最快易报复性反弹；<strong>治本之策必须是降低其环境容纳量 K 值</strong>（硬化地面、密封粮食、天敌生物防治）。</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const n0 = ref(30);
const lambdaVal = ref(1.3);
const kVal = ref(1000);
</script>

<style scoped>
.interactive-card { margin: 24px 0; padding: 24px; border-radius: 12px; background: var(--vp-c-bg-soft); border: 1px solid var(--vp-c-divider); }
.badge { display: inline-block; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); margin-bottom: 8px; }
.card-title { margin: 0 0 6px; font-size: 18px; font-weight: 700; color: var(--vp-c-text-1); }
.card-desc { margin: 0; font-size: 13px; color: var(--vp-c-text-2); }
.control-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin: 16px 0; }
.control-item label { display: flex; justify-content: space-between; font-size: 12.5px; font-weight: 600; margin-bottom: 6px; }
.control-item .val { color: var(--vp-c-brand-1); font-family: monospace; }
.k-decision-deck { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 16px; }
.k-box { padding: 14px; border-radius: 8px; background: var(--vp-c-bg); border: 1px solid var(--vp-c-divider); text-align: center; }
.k-box.highlight { border-color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.k-title { font-size: 12px; color: var(--vp-c-text-2); margin-bottom: 4px; }
.k-val { font-size: 22px; font-weight: 700; font-family: monospace; }
.k-tip { font-size: 11px; color: var(--vp-c-text-3); margin-top: 4px; }
.text-brand { color: var(--vp-c-brand-1); }
.text-emerald { color: #059669; }
.decision-guide { display: flex; flex-direction: column; gap: 8px; padding: 14px; border-radius: 8px; background: var(--vp-c-bg-alt); border-left: 3px solid var(--vp-c-brand-1); font-size: 12px; line-height: 1.5; }
.guide-item strong { color: var(--vp-c-text-1); }
.guide-item span { color: var(--vp-c-text-2); }

/* 移动端：滑块占满控件宽度并扩大触控热区 */
@media (max-width: 767px) {
  .control-item input[type="range"] {
    width: 100%;
    min-height: 44px;
  }
}
</style>