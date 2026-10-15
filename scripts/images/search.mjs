import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { fetchWithRetry, isUsable, searchCommons, sleep } from "./commons.mjs";

const ROOT = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1");
const MAX_CANDIDATES = 12;
const TILE = { width: 480, height: 300 };
const COLUMNS = 4;

const sheetDir = process.argv[2] ?? path.join(ROOT, ".sheets");
const onlySlugs = process.argv.slice(3);

async function collectCandidates(queries) {
  const seen = new Set();
  const candidates = [];
  for (const query of queries) {
    const results = await searchCommons(query, 500);
    for (const result of results) {
      if (seen.has(result.title) || !isUsable(result)) continue;
      seen.add(result.title);
      candidates.push(result);
    }
    await sleep(400);
  }
  return candidates.slice(0, MAX_CANDIDATES);
}

async function buildContactSheet(slug, candidates) {
  const tiles = await Promise.all(
    candidates.map(async (candidate, index) => {
      const response = await fetchWithRetry(candidate.thumb);
      const buffer = Buffer.from(await response.arrayBuffer());
      const label = Buffer.from(
        `<svg width="${TILE.width}" height="${TILE.height}"><rect width="56" height="40" fill="black"/><text x="10" y="29" font-size="26" font-family="Arial" fill="white">${index}</text></svg>`,
      );
      const tile = await sharp(buffer)
        .resize(TILE.width, TILE.height, { fit: "cover" })
        .composite([{ input: label }])
        .jpeg()
        .toBuffer();
      return {
        input: tile,
        left: (index % COLUMNS) * TILE.width,
        top: Math.floor(index / COLUMNS) * TILE.height,
      };
    }),
  );

  const rows = Math.ceil(candidates.length / COLUMNS);
  await sharp({
    create: {
      width: COLUMNS * TILE.width,
      height: rows * TILE.height,
      channels: 3,
      background: "#222",
    },
  })
    .composite(tiles)
    .jpeg({ quality: 70 })
    .toFile(path.join(sheetDir, `${slug}.jpg`));
}

async function main() {
  const queries = JSON.parse(await readFile(path.join(ROOT, "queries.json"), "utf8"));
  const candidatesPath = path.join(ROOT, "candidates.json");
  const existing = JSON.parse(await readFile(candidatesPath, "utf8").catch(() => "{}"));
  await mkdir(sheetDir, { recursive: true });

  const slugs = onlySlugs.length ? onlySlugs : Object.keys(queries);
  for (const slug of slugs) {
    const candidates = await collectCandidates(queries[slug]);
    existing[slug] = candidates;
    if (candidates.length) await buildContactSheet(slug, candidates);
    console.log(`${slug}: ${candidates.length} candidates`);
  }

  await writeFile(candidatesPath, JSON.stringify(existing, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
