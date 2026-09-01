// One-off: pull the approved source art from "JtB Images" into public/images.
// Paintings -> WebP at 1456 + 768 (and 2000 for the hero); wordmarks keep alpha.
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const SRC = "/Users/rmg_tx/FPMini/JtBNEW/JtB Images";
const OUT = "public/images/brand";
mkdirSync(OUT, { recursive: true });

const paintings = [
  ["JtB primary.png", "hero-painting", [2000, 1456, 768]],
  ["3 wise men.png", "wise-men", [1456, 768]],
  ["sleepy-bethlehem.png", "sleepy-bethlehem", [1456, 768]],
  ["hebrew-shepherd-lamb.png", "shepherd-lamb", [1456, 768]],
  ["child-shepherd-christmas-night.png", "child-candle", [1456, 768]],
  ["tiny-stars-1.png", "shepherd-field", [1456, 768]],
  ["night-sky-clouds-2.png", "comet-sky", [1456, 768]],
  ["camels-oasis-1.png", "camels-oasis", [1456, 768]],
];

for (const [file, name, widths] of paintings) {
  for (const w of widths) {
    const suffix = w === widths[0] ? "" : `-${w}`;
    const info = await sharp(`${SRC}/${file}`).resize({ width: w }).webp({ quality: 80 }).toFile(`${OUT}/${name}${suffix}.webp`);
    console.log(`${name}${suffix}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
  }
}

// Wordmarks: trim transparent padding, keep alpha.
const marks = [
  ["Wordmark/Frame 2 (2).png", "wordmark-clean", 1200],
  ["Wordmark/Journey through Bethlehem Logo - 1-2.png", "wordmark-presented", 1600],
];
for (const [file, name, w] of marks) {
  const info = await sharp(`${SRC}/${file}`).trim().resize({ width: w }).webp({ quality: 90, alphaQuality: 100 }).toFile(`${OUT}/${name}.webp`);
  console.log(`${name}.webp ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`);
  const meta = await sharp(`${OUT}/${name}.webp`).metadata();
  console.log(`  aspect ${(meta.width / meta.height).toFixed(3)}`);
}

// Favicon + touch icon from the approved star mark.
await sharp(`${SRC}/Journey through Bethlehem favicon.png`).resize(180, 180, { fit: "cover" }).png().toFile("public/apple-touch-icon.png");
await sharp(`${SRC}/Journey through Bethlehem favicon.png`).resize(32, 32, { fit: "cover" }).png().toFile("public/favicon-32.png");
await sharp(`${SRC}/Journey through Bethlehem favicon.png`).resize(64, 64, { fit: "cover" }).webp({ quality: 90 }).toFile(`${OUT}/star-mark.webp`);
console.log("icons done");
