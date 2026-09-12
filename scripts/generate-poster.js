import fs from "node:fs";
import path from "node:path";

const imgPath = path.resolve("public/images/organic_chrome_asset.jpg");
const imgBuf = fs.readFileSync(imgPath);
const base64Data = "data:image/jpeg;base64," + imgBuf.toString("base64");

// TEST: Contrast enhancement for "生" and "物"
// 1. "生": High-Contrast Architectural Specimen Glass Plate (Pure White 92% opacity + Hairline border + Corner reticles) + Deep Carbon Black (900 weight) with crisp legibility.
// 2. "物": Pure Stark White fill with monumental 14px Black Structural Stroke (paint-order="stroke fill") + Emerald depth shadow, OR matching Specimen Glass Plate.

const svgContent = `<svg width="1200" height="1600" viewBox="0 0 1200 1600" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      .font-black { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; font-weight: 900; }
      .font-bold { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; font-weight: 700; }
      .font-light { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif; font-weight: 300; }
      .mono { font-family: 'JetBrains Mono', 'SF Mono', 'Consolas', monospace; font-weight: 600; }
    </style>

    <!-- Heavy Film Grain Filter -->
    <filter id="grainFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="userSpaceOnUse">
      <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="noise"/>
      <feColorMatrix type="matrix" values="
        0 0 0 0 0.10
        0 0 0 0 0.10
        0 0 0 0 0.12
        0 0 0 0 0.36 0" result="grain"/>
    </filter>

    <!-- Micro Grid Pattern -->
    <pattern id="gridNet" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0F172A" stroke-width="0.5" opacity="0.08"/>
      <circle cx="0" cy="0" r="1" fill="#0F172A" opacity="0.2"/>
    </pattern>

    <!-- Halftone Matrix Field -->
    <pattern id="halftoneBlock" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
      <circle cx="7" cy="7" r="1.5" fill="#0F172A" opacity="0.12"/>
    </pattern>

    <!-- CLIPPING PATHS -->
    <clipPath id="clipFragA">
      <polygon points="410,110 1150,70 1110,730 370,770"/>
    </clipPath>

    <clipPath id="clipFragB">
      <polygon points="210,750 990,670 1030,1450 250,1510"/>
    </clipPath>

    <clipPath id="clipGlitchStrip">
      <rect x="240" y="700" width="680" height="46"/>
    </clipPath>

    <clipPath id="clipXRay1">
      <rect x="0" y="0" width="230" height="170"/>
    </clipPath>

    <clipPath id="clipXRay2">
      <rect x="0" y="0" width="170" height="230"/>
    </clipPath>
  </defs>

  <!-- ====== 1. TEXTURED FOUNDATION & STRUCTURAL GRID ====== -->
  <rect width="1200" height="1600" fill="#ECEEEF"/>

  <radialGradient id="ambientField" cx="50%" cy="45%" r="70%">
    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1"/>
    <stop offset="60%" stop-color="#F2F4F6" stop-opacity="0.8"/>
    <stop offset="100%" stop-color="#DEE2E6" stop-opacity="0.95"/>
  </radialGradient>
  <rect width="1200" height="1600" fill="url(#ambientField)"/>

  <rect x="60" y="60" width="1080" height="1480" fill="url(#gridNet)"/>
  <rect x="740" y="80" width="400" height="380" fill="url(#halftoneBlock)"/>
  <rect x="60" y="1120" width="420" height="420" fill="url(#halftoneBlock)"/>
  <rect x="50" y="50" width="1100" height="1500" fill="none" stroke="#CBD5E1" stroke-width="0.75"/>

  <!-- ====== 2. TOPOLOGY VECTOR NETWORK (CONNECTING WIRES) ====== -->
  <g id="circuit-wires" stroke="#0F172A" stroke-width="1.2">
    <!-- Wire 1: Top-Left title anchor to Upper Fragment A -->
    <line x1="280" y1="130" x2="410" y2="130" stroke="#10B981" stroke-width="1.5"/>
    <line x1="410" y1="130" x2="410" y2="240" stroke="#10B981" stroke-width="1.5"/>

    <!-- Wire 2: Upper Fragment A across to "生" plate -->
    <line x1="680" y1="240" x2="730" y2="240"/>
    <line x1="730" y1="240" x2="730" y2="200"/>
    <line x1="1040" y1="200" x2="1140" y2="200" stroke="#10B981" stroke-width="1.5"/>

    <!-- Wire 3: Main diagonal trunk connecting Specimen 01 to Glitch Strip -->
    <line x1="595" y1="410" x2="595" y2="700" stroke="#10B981" stroke-dasharray="6 3"/>
    
    <!-- Wire 4: Connector linking Glitch Strip across to Specimen 02 -->
    <line x1="240" y1="723" x2="150" y2="723"/>
    <line x1="150" y1="723" x2="150" y2="820" stroke="#10B981" stroke-width="1.5"/>

    <!-- Wire 5: Linking Specimen 02 across to "物" plate -->
    <line x1="320" y1="935" x2="380" y2="935"/>
    <line x1="380" y1="935" x2="380" y2="1080"/>
    <line x1="380" y1="1080" x2="360" y2="1080" stroke="#10B981" stroke-width="1.5"/>

    <!-- Wire 6: Linking Lower Fragment B to ground terminal -->
    <line x1="640" y1="1400" x2="640" y2="1490"/>
    <line x1="640" y1="1490" x2="980" y2="1490" stroke-dasharray="4 4"/>

    <!-- Node Terminals -->
    <circle cx="280" cy="130" r="3.5" fill="#10B981"/>
    <circle cx="410" cy="240" r="4" fill="#10B981"/>
    <circle cx="730" cy="200" r="4" fill="#10B981"/>
    <circle cx="1040" cy="200" r="4" fill="#10B981"/>
    <circle cx="595" cy="410" r="4" fill="#10B981"/>
    <circle cx="595" cy="700" r="4" fill="#10B981"/>
    <circle cx="150" cy="820" r="4" fill="#10B981"/>
    <circle cx="320" cy="935" r="3.5" fill="#0F172A"/>
    <circle cx="380" cy="1080" r="4" fill="#10B981"/>
    <circle cx="640" cy="1490" r="4" fill="#10B981"/>
  </g>

  <!-- ====== 3. DECONSTRUCTED SCULPTURE FRAGMENTS ====== -->

  <!-- Fragment A -->
  <g clip-path="url(#clipFragA)">
    <polygon points="410,110 1150,70 1110,730 370,770" fill="none" stroke="#94A3B8" stroke-width="1.2"/>
    <image href="${base64Data}" 
           x="160" y="0" 
           width="1280" height="1520" 
           preserveAspectRatio="xMidYMid meet" 
           style="mix-blend-mode: multiply; filter: contrast(1.05);"/>
  </g>
  <path d="M 400 120 L 410 110 L 430 110" stroke="#10B981" stroke-width="2" fill="none"/>
  <path d="M 1130 70 L 1150 70 L 1150 90" stroke="#10B981" stroke-width="2" fill="none"/>
  <text x="435" y="130" class="mono" font-size="8.5" font-weight="700" fill="#10B981">FACET_ALPHA // CHROME_TORUS</text>

  <!-- Fragment B -->
  <g clip-path="url(#clipFragB)">
    <polygon points="210,750 990,670 1030,1450 250,1510" fill="none" stroke="#94A3B8" stroke-width="1.2"/>
    <image href="${base64Data}" 
           x="80" y="90" 
           width="1280" height="1520" 
           preserveAspectRatio="xMidYMid meet" 
           style="mix-blend-mode: multiply;"/>
  </g>
  <line x1="370" y1="770" x2="1010" y2="710" stroke="#0F172A" stroke-width="1.5" stroke-dasharray="8 4"/>
  <circle cx="370" cy="770" r="3.5" fill="#10B981"/>
  <circle cx="1010" cy="710" r="3.5" fill="#0F172A"/>
  <text x="400" y="762" class="mono" font-size="8" fill="#0F172A" font-weight="700">SHEAR FAULT // Δy = +60px</text>

  <!-- Fragment C: Glitch Strip -->
  <g clip-path="url(#clipGlitchStrip)">
    <image href="${base64Data}" 
           x="190" y="40" 
           width="1280" height="1520" 
           preserveAspectRatio="xMidYMid meet" 
           style="mix-blend-mode: multiply; filter: contrast(1.25) hue-rotate(15deg);"/>
    <line x1="240" y1="700" x2="920" y2="700" stroke="#10B981" stroke-width="2"/>
    <line x1="240" y1="746" x2="920" y2="746" stroke="#0F172A" stroke-width="1.5"/>
  </g>

  <!-- ====== 4. DISPLACED X-RAY INVERSION SPECIMEN TILES ====== -->

  <!-- Specimen 01 -->
  <g transform="translate(480, 240)">
    <line x1="115" y1="0" x2="115" y2="-60" stroke="#10B981" stroke-width="1.5"/>
    <circle cx="115" cy="-60" r="3" fill="#10B981"/>
    <g clip-path="url(#clipXRay1)">
      <image href="${base64Data}" 
             x="-320" y="-240" 
             width="1280" height="1520" 
             preserveAspectRatio="xMidYMid meet" 
             style="filter: contrast(1.1);"/>
      <rect x="0" y="0" width="230" height="170" fill="#FFFFFF" style="mix-blend-mode: difference;"/>
    </g>
    <rect x="0" y="0" width="230" height="170" fill="none" stroke="#10B981" stroke-width="1.5"/>
    <path d="M 0 14 L 0 0 L 14 0" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <path d="M 216 0 L 230 0 L 230 14" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <path d="M 0 156 L 0 170 L 14 170" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <path d="M 230 156 L 230 170 L 216 170" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <line x1="105" y1="85" x2="125" y2="85" stroke="#FFFFFF" stroke-width="1"/>
    <line x1="115" y1="75" x2="115" y2="95" stroke="#FFFFFF" stroke-width="1"/>
    <text x="8" y="16" class="mono" font-size="8.5" font-weight="700" fill="#10B981">[SPECIMEN_01 // RAD_INVERT]</text>
    <text x="8" y="162" class="mono" font-size="8" fill="#FFFFFF">λ=0.015Å · FLUORESCENCE</text>
  </g>

  <!-- Specimen 02 -->
  <g transform="translate(150, 820)">
    <line x1="85" y1="0" x2="85" y2="-40" stroke="#10B981" stroke-width="1.5"/>
    <circle cx="85" cy="-40" r="3" fill="#10B981"/>
    <g clip-path="url(#clipXRay2)">
      <image href="${base64Data}" 
             x="-150" y="-740" 
             width="1280" height="1520" 
             preserveAspectRatio="xMidYMid meet" 
             style="filter: contrast(1.15);"/>
      <rect x="0" y="0" width="170" height="230" fill="#FFFFFF" style="mix-blend-mode: difference;"/>
    </g>
    <rect x="0" y="0" width="170" height="230" fill="none" stroke="#0F172A" stroke-width="1.5"/>
    <line x1="0" y1="0" x2="170" y2="0" stroke="#10B981" stroke-width="3"/>
    <text x="8" y="18" class="mono" font-size="8.5" font-weight="700" fill="#10B981">[SPECIMEN_02 // TOMOGRAPHY]</text>
    <text x="8" y="222" class="mono" font-size="8" fill="#FFFFFF">COORD: 34.2° N // AXIAL</text>
  </g>

  <!-- ====== 5. HIGH CONTRAST MASTER HERO TYPOGRAPHY: "生" & "物" ====== -->
  <!-- Solution: Architectural Glass Specimen Plates + White Knockout & Deep Carbon Contrast -->

  <!-- --- "生" SPECIMEN APERTURE MODULE (Top-Right) --- -->
  <g transform="translate(720, 160)">
    <!-- High-Contrast Frosted Specimen Backing Plate -->
    <!-- Translucent pure white backdrop isolates the character from underlying dark chrome without hiding the structure -->
    <rect x="0" y="0" width="340" height="340" fill="#FFFFFF" fill-opacity="0.94" stroke="#0F172A" stroke-width="1.5"/>
    
    <!-- Micro technical corner brackets -->
    <path d="M 0 20 L 0 0 L 20 0" stroke="#10B981" stroke-width="3" fill="none"/>
    <path d="M 320 0 L 340 0 L 340 20" stroke="#10B981" stroke-width="3" fill="none"/>
    <path d="M 0 320 L 0 340 L 20 340" stroke="#10B981" stroke-width="3" fill="none"/>
    <path d="M 340 320 L 340 340 L 320 340" stroke="#10B981" stroke-width="3" fill="none"/>

    <!-- Specimen Telemetry Tag -->
    <rect x="20" y="18" width="120" height="18" fill="#0F172A"/>
    <text x="26" y="31" class="mono" font-size="9" font-weight="700" fill="#10B981">CORE_ORGANISM</text>
    <text x="320" y="31" text-anchor="end" class="mono" font-size="9" fill="#64748B">ID: BIO-01</text>

    <!-- Monumental Deep Black "生" with crystal-clear 100:1 contrast -->
    <text x="22" y="295" class="font-black" font-size="290" fill="#0A0A0A" letter-spacing="-14">生</text>

    <!-- Sub-label below character -->
    <line x1="20" y1="318" x2="320" y2="318" stroke="#E2E8F0" stroke-width="1"/>
  </g>

  <!-- --- "物" SPECIMEN APERTURE MODULE (Lower-Left) --- -->
  <g transform="translate(50, 1020)">
    <!-- High-Contrast Frosted Specimen Backing Plate -->
    <rect x="0" y="0" width="340" height="340" fill="#FFFFFF" fill-opacity="0.94" stroke="#0F172A" stroke-width="1.5"/>
    
    <!-- Micro technical corner brackets -->
    <path d="M 0 20 L 0 0 L 20 0" stroke="#10B981" stroke-width="3" fill="none"/>
    <path d="M 320 0 L 340 0 L 340 20" stroke="#10B981" stroke-width="3" fill="none"/>
    <path d="M 0 320 L 0 340 L 20 340" stroke="#10B981" stroke-width="3" fill="none"/>
    <path d="M 340 320 L 340 340 L 320 340" stroke="#10B981" stroke-width="3" fill="none"/>

    <!-- Specimen Telemetry Tag -->
    <rect x="20" y="18" width="130" height="18" fill="#0F172A"/>
    <text x="26" y="31" class="mono" font-size="9" font-weight="700" fill="#10B981">SYSTEMIC_ENTITY</text>
    <text x="320" y="31" text-anchor="end" class="mono" font-size="9" fill="#64748B">ID: BIO-02</text>

    <!-- Monumental Deep Black "物" with crystal-clear 100:1 contrast -->
    <!-- Both radicals '牜' and '勿' are completely protected and 100% sharp -->
    <text x="22" y="295" class="font-black" font-size="290" fill="#0A0A0A" letter-spacing="-14">物</text>

    <!-- Sub-label below character -->
    <line x1="20" y1="318" x2="320" y2="318" stroke="#E2E8F0" stroke-width="1"/>
  </g>

  <!-- ====== 6. RIGOROUS FOREGROUND TYPOGRAPHY (Top-Left Anchor) ====== -->
  <g transform="translate(70, 110)">
    <!-- Category Pill -->
    <rect x="0" y="0" width="176" height="22" fill="#0A0A0A"/>
    <text x="10" y="15" class="mono" font-size="10.5" font-weight="700" fill="#10B981" letter-spacing="2">SYSTEMIC BIOLOGY</text>

    <!-- Main Anchor "高考" -->
    <text x="0" y="125" class="font-black" font-size="124" fill="#0A0A0A" letter-spacing="-5">高考</text>

    <!-- Sub-anchor "知识库" -->
    <text x="0" y="210" class="font-light" font-size="78" fill="#1E293B" letter-spacing="14">知识库</text>

    <!-- Rigorous proposition block -->
    <g transform="translate(2, 246)">
      <rect x="0" y="0" width="50" height="3.5" fill="#10B981"/>
      <text x="0" y="32" class="font-bold" font-size="17" fill="#0F172A" letter-spacing="0.5">人教版新课标体系全面重构</text>
      <text x="0" y="58" class="font-bold" font-size="17" fill="#0F172A" letter-spacing="0.5">16 核心专题 · 50 黄金数理模型</text>
      <text x="0" y="82" class="font-light" font-size="13.5" fill="#475569" letter-spacing="0.5">微观分子机理至宏观生态自稳态</text>
    </g>
  </g>

  <!-- Bottom Left: Badge Pill linked to circuit line -->
  <g transform="translate(70, 1420)">
    <!-- Connector wire linking badge to Specimen 02 -->
    <line x1="280" y1="19" x2="380" y2="19" stroke="#10B981" stroke-width="1.5"/>
    <circle cx="380" cy="19" r="3.5" fill="#10B981"/>
    
    <rect x="0" y="0" width="280" height="38" fill="#0F172A" rx="2"/>
    <text x="18" y="24" class="font-bold" font-size="14.5" fill="#FFFFFF" letter-spacing="2">2026 高考备考核心知识库</text>
  </g>

  <!-- ====== 7. BOTTOM MASTHEAD / METADATA ====== -->
  <g transform="translate(70, 1515)">
    <line x1="0" y1="0" x2="1060" y2="0" stroke="#94A3B8" stroke-width="1"/>
    <text x="0" y="26" class="mono" font-size="12" font-weight="700" fill="#0F172A" letter-spacing="2">YULAOSHIZUIKEAI'S BIOLOGY NOTE</text>
    <text x="1060" y="26" text-anchor="end" class="mono" font-size="12" font-weight="700" fill="#10B981" letter-spacing="2">EDITION 2026 // OPEN ACCESS</text>
  </g>

  <!-- ====== 8. TACTILE PROCEDURAL PAPER GRAIN OVERLAY ====== -->
  <rect width="1200" height="1600" fill="#000000" filter="url(#grainFilter)" style="mix-blend-mode: multiply; pointer-events: none;"/>

</svg>`;

const outputPath = path.resolve("public/images/poster-neo-minimalism.svg");
fs.writeFileSync(outputPath, svgContent, "utf-8");
console.log("High-contrast poster generated successfully!");
