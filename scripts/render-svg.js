import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

export async function renderSvg(svgContent, outputPath, width = 780, height = 370) {
  const browser = await chromium.launch({ executablePath: chromePath });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body, html { margin: 0; padding: 0; background: #ffffff; display: flex; align-items: center; justify-content: center; }
    svg { width: ${width}px; height: ${height}px; display: block; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

  await page.setContent(html, { waitUntil: "networkidle" });
  await page.screenshot({ path: outputPath, fullPage: false });
  await browser.close();
  console.log(`Saved screenshot to: ${outputPath}`);
}

// CLI usage: node scripts/render-svg.js <svg-file-or-md-file> <output-png>
if (process.argv[1] && process.argv[1].endsWith("render-svg.js")) {
  const inputArg = process.argv[2];
  const outputArg = process.argv[3] || "temp_render.png";

  if (!inputArg) {
    console.error("Usage: node scripts/render-svg.js <file> [output.png]");
    process.exit(1);
  }

  const content = fs.readFileSync(inputArg, "utf-8");
  let svg = content;
  if (inputArg.endsWith(".md")) {
    const match = content.match(/<svg[\s\S]*?<\/svg>/);
    if (!match) {
      console.error("No <svg> tag found in markdown file.");
      process.exit(1);
    }
    svg = match[0];
  }

  await renderSvg(svg, outputArg);
}
