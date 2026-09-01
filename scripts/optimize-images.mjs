import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/images");

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

async function optimize(file) {
  const buf = await fs.readFile(file);
  const img = sharp(buf, { failOn: "none" });
  const meta = await img.metadata();
  const rel = path.relative(root, file);
  const isPhoto = rel.startsWith("photos/");
  const isBrandArt = /tt-header|og-wordmark|wordmark-on-art/.test(rel);
  // Painterly artwork has no flat regions — lossless PNG is ~22x heavier for no
  // visible gain. Route paintings to WebP (full + 768w variant for srcset).
  const isPainting = /nativity-hero|night-sky|nativity-scene-2/.test(rel);

  if (isPainting) {
    const base = file.replace(/\.(png|jpg|jpeg|webp)$/i, "");
    for (const width of [1456, 768]) {
      const out = width === 1456 ? `${base}.webp` : `${base}-768.webp`;
      await sharp(buf, { failOn: "none" })
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out + ".tmp");
      await fs.rename(out + ".tmp", out);
      const stat = await fs.stat(out);
      console.log(`webp ${rel} → ${path.basename(out)} (${(stat.size / 1024).toFixed(0)}kb)`);
    }
    return base + ".webp";
  }

  if (isPhoto || isBrandArt) {
    const out = file.replace(/\.(png|jpg|jpeg|webp)$/i, ".jpg");
    const pipeline = sharp(buf, { failOn: "none" }).rotate().resize({
      width: isBrandArt ? 2000 : 1800,
      withoutEnlargement: true,
    });
    await pipeline.jpeg({ quality: 80, progressive: true, mozjpeg: true }).toFile(out + ".tmp");
    await fs.rename(out + ".tmp", out);
    if (out !== file) await fs.unlink(file).catch(() => {});
    if (isPhoto && !/-720\.jpg$/.test(out)) {
      const small = out.replace(/\.jpg$/, "-720.jpg");
      await sharp(buf, { failOn: "none" })
        .rotate()
        .resize({ width: 720, withoutEnlargement: true })
        .jpeg({ quality: 78, progressive: true, mozjpeg: true })
        .toFile(small + ".tmp");
      await fs.rename(small + ".tmp", small);
    }
    const stat = await fs.stat(out);
    console.log(`jpg  ${rel} → ${path.basename(out)} (${meta.format} ${meta.width}x${meta.height} → ${(stat.size / 1024).toFixed(0)}kb)`);
    return out;
  }

  const out = file.replace(/\.(png|jpg|jpeg|webp)$/i, ".png");
  await sharp(buf, { failOn: "none" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(out + ".tmp");
  await fs.rename(out + ".tmp", out);
  if (out !== file) await fs.unlink(file).catch(() => {});
  const stat = await fs.stat(out);
  console.log(`png  ${rel} → ${path.basename(out)} (${meta.format} ${meta.width}x${meta.height} → ${(stat.size / 1024).toFixed(0)}kb)`);
  return out;
}

const files = (await walk(root)).filter(
  (f) =>
    /\.(png|jpg|jpeg|webp|ico)$/i.test(f) &&
    // never reprocess generated variants or already-encoded WebP
    !/(-720\.jpg|-768\.webp|\.webp)$/i.test(f),
);
for (const file of files) {
  try {
    await optimize(file);
  } catch (err) {
    console.error("skip", file, err.message);
  }
}

const mark = path.join(root, "brand/mark.png");
const markBuf = await fs.readFile(mark);
await sharp(markBuf).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(markBuf).resize(32, 32).png().toFile("public/favicon-32.png");
await sharp(markBuf).resize(48, 48).png().toFile("public/favicon.ico");
console.log("wrote favicons from circular mark");
