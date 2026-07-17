import sharp from "sharp";
import { readdir, rename, mkdir } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), "public", "img", "jobs-done");
const backupRoot = path.join(process.cwd(), "originals-backup", "jobs-done");

const pairs = {
  "Building-Side": { before: "Siding-Start.png", after: "Siding-Finished.png" },
  "Roof": { before: "Roof-Start.JPG", after: "Roof-Done.JPG" },
  "Wall-Constructing": { before: "DrywallFraming-Start.jpg", after: "DrywallFraming-Finished.jpg" },
  "Yard-Clean": { before: "Messy-Yard.jpg", after: "Clean-Yard.jpg" },
};

const MAX_WIDTH = 1600;
const QUALITY = 75;

for (const [category, { before, after }] of Object.entries(pairs)) {
  const dir = path.join(root, category);

  for (const [label, filename] of [["before", before], ["after", after]]) {
    const inputPath = path.join(dir, filename);
    const outputPath = path.join(dir, `${label}.webp`);

    const img = sharp(inputPath).rotate();
    const meta = await img.metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      img.resize({ width: MAX_WIDTH });
    }
    await img.webp({ quality: QUALITY }).toFile(outputPath);
    console.log(`${category}/${label}: ${filename} -> ${label}.webp`);
  }

  const backupDir = path.join(backupRoot, category);
  await mkdir(backupDir, { recursive: true });

  const files = await readdir(dir);
  for (const f of files) {
    if (f === "before.webp" || f === "after.webp") continue;
    await rename(path.join(dir, f), path.join(backupDir, f));
    console.log(`moved ${category}/${f} -> originals-backup/jobs-done/${category}/${f}`);
  }
}

console.log("done");
