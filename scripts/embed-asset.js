import fs from "node:fs";
import path from "node:path";

const imgPath = path.resolve("public/images/organic_chrome_asset.jpg");
const svgPath = path.resolve("public/images/poster-neo-minimalism.svg");

const imgBuf = fs.readFileSync(imgPath);
const base64Data = "data:image/jpeg;base64," + imgBuf.toString("base64");

let svg = fs.readFileSync(svgPath, "utf-8");
svg = svg.replace(/href=["'][^"']*organic_chrome_asset\.jpg["']/, `href="${base64Data}"`);
fs.writeFileSync(svgPath, svg, "utf-8");

console.log("Successfully embedded base64 image into SVG. Base64 length:", base64Data.length);
