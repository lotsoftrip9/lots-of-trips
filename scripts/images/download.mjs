import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fetchWithRetry, sleep } from "./commons.mjs";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1");
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "images", "destinations");
const MANIFEST_PATH = path.join(PROJECT_ROOT, "src", "content", "generated", "images.json");
const MAX_WIDTH = 2560;
const SOURCE_WIDTH = 3840;

const readJson = async (file, fallback) =>
  JSON.parse(await readFile(file, "utf8").catch(() => JSON.stringify(fallback)));

function sourceUrl(candidate) {
  if (candidate.width >= SOURCE_WIDTH && candidate.thumb) {
    return candidate.thumb.replace(/\/\d+px-/, `/${SOURCE_WIDTH}px-`);
  }
  return candidate.original;
}

async function processImage(candidate, outputFile) {
  const response = await fetchWithRetry(sourceUrl(candidate));
  const buffer = Buffer.from(await response.arrayBuffer());
  const image = sharp(buffer).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const info = await image.webp({ quality: 78 }).toFile(outputFile);
  const blur = await sharp(buffer).resize(16).webp({ quality: 40 }).toBuffer();
  return {
    width: info.width,
    height: info.height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
}

async function main() {
  const candidates = await readJson(path.join(SCRIPT_DIR, "candidates.json"), {});
  const selection = await readJson(path.join(SCRIPT_DIR, "selection.json"), {});
  const manifest = await readJson(MANIFEST_PATH, {});
  const onlySlugs = process.argv.slice(2);
  const slugs = onlySlugs.length ? onlySlugs : Object.keys(selection);

  for (const slug of slugs) {
    const dir = path.join(OUTPUT_DIR, slug);
    await mkdir(dir, { recursive: true });
    const entries = [];

    for (const [order, index] of selection[slug].entries()) {
      const candidate = candidates[slug][index];
      const fileName = `${String(order + 1).padStart(2, "0")}.webp`;
      const meta = await processImage(candidate, path.join(dir, fileName));
      entries.push({
        src: `/images/destinations/${slug}/${fileName}`,
        ...meta,
        credit: {
          title: candidate.title.replace(/^File:/, "").replace(/\.[a-z]+$/i, ""),
          artist: candidate.artist || "Unknown",
          license: candidate.license,
          licenseUrl: candidate.licenseUrl,
          sourceUrl: candidate.pageUrl,
        },
      });
      await sleep(300);
    }

    manifest[slug] = entries;
    console.log(`${slug}: ${entries.length} images`);
  }

  await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
