import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const chromePath =
  process.env.PLAYWRIGHT_CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

export async function renderSvg(
  svgContent,
  outputPath,
  width = 780,
  height = 370,
  baseDir = process.cwd(),
) {
  const launchOptions = {};
  if (process.env.PLAYWRIGHT_CHROME_PATH) {
    launchOptions.executablePath = process.env.PLAYWRIGHT_CHROME_PATH;
  } else if (process.platform === "win32" && fs.existsSync(chromePath)) {
    launchOptions.executablePath = chromePath;
  } else {
    launchOptions.channel = "chrome";
  }
  let browser;
  try {
    browser = await chromium.launch(launchOptions);
  } catch {
    browser = await chromium.launch();
  }
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: 2,
  });

  const baseHref = "file:///" + path.resolve(baseDir).replace(/\\/g, "/") + "/";

  const html = `
<!DOCTYPE html>
<html>
<head>
  <base href="${baseHref}">
  <style>
    body, html { margin: 0; padding: 0; background: #ffffff; display: flex; align-items: center; justify-content: center; }
    svg { width: ${width}px; height: ${height}px; display: block; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

  try {
    await page.setContent(html, { waitUntil: "load", timeout: 15000 });
    await page.screenshot({ path: outputPath, fullPage: false });
    console.log(`Saved screenshot to: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

// CLI usage: node scripts/render-svg.js <svg-file-or-md-file> <output-png>
if (process.argv[1] && process.argv[1].endsWith("render-svg.js")) {
  const inputArg = process.argv[2];
  const outputArg = process.argv[3] || "temp_render.png";
  const widthArg = process.argv[4] ? parseInt(process.argv[4]) : null;
  const heightArg = process.argv[5] ? parseInt(process.argv[5]) : null;

  if (!inputArg) {
    console.error("Usage: node scripts/render-svg.js <file> [output.png] [width] [height]");
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

  let width = widthArg || 780;
  let height = heightArg || 370;

  if (!widthArg || !heightArg) {
    const vbMatch = svg.match(/viewBox=["']([0-9.\s-]+)["']/);
    if (vbMatch) {
      const parts = vbMatch[1].trim().split(/\s+/);
      if (parts.length === 4) {
        width = parseFloat(parts[2]);
        height = parseFloat(parts[3]);
      }
    }
  }

  const baseDir = path.dirname(path.resolve(inputArg));
  await renderSvg(svg, outputArg, width, height, baseDir);
}
