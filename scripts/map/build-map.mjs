import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:)/, "$1");
const OUTPUT = path.resolve(SCRIPT_DIR, "..", "..", "src", "content", "generated", "map.json");

const STATES = [
  { name: "Himachal Pradesh", key: "himachal", focus: true },
  { name: "Uttarakhand", key: "uttarakhand", focus: true },
  { name: "Punjab", key: "punjab", focus: false },
];

const BOUNDS = { minLon: 73.75, maxLon: 81.2, minLat: 28.65, maxLat: 33.35 };
const WIDTH = 1000;
const TOLERANCE = 0.9;

const midLat = ((BOUNDS.minLat + BOUNDS.maxLat) / 2) * (Math.PI / 180);
const scale = WIDTH / ((BOUNDS.maxLon - BOUNDS.minLon) * Math.cos(midLat));
const HEIGHT = Math.round((BOUNDS.maxLat - BOUNDS.minLat) * scale);

const project = ([lon, lat]) => [
  (lon - BOUNDS.minLon) * Math.cos(midLat) * scale,
  (BOUNDS.maxLat - lat) * scale,
];

function perpendicularDistance([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay);
  return Math.abs(dy * px - dx * py + bx * ay - by * ax) / Math.hypot(dx, dy);
}

function simplify(points) {
  if (points.length < 3) return points;
  let maxDistance = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const distance = perpendicularDistance(points[i], points[0], points.at(-1));
    if (distance > maxDistance) {
      maxDistance = distance;
      index = i;
    }
  }
  if (maxDistance <= TOLERANCE) return [points[0], points.at(-1)];
  return [...simplify(points.slice(0, index + 1)).slice(0, -1), ...simplify(points.slice(index))];
}

const ringToPath = (ring) => {
  const points = simplify(ring.map(project));
  if (points.length < 3) return "";
  const xs = points.map(([x]) => x);
  const ys = points.map(([, y]) => y);
  if (Math.max(...xs) - Math.min(...xs) < 4 && Math.max(...ys) - Math.min(...ys) < 4) return "";
  return `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}Z`;
};

function geometryToPath(geometry) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.flatMap((polygon) => polygon.map(ringToPath)).join("");
}

async function main() {
  const source = process.argv[2];
  if (!source) throw new Error("Usage: node scripts/map/build-map.mjs <states.geojson>");
  const geojson = JSON.parse(await readFile(source, "utf8"));

  const states = STATES.map((state) => {
    const features = geojson.features.filter((feature) => feature.properties.ST_NM === state.name);
    if (!features.length) throw new Error(`State not found: ${state.name}`);
    return {
      key: state.key,
      name: state.name,
      focus: state.focus,
      path: features.map((feature) => geometryToPath(feature.geometry)).join(""),
    };
  });

  const output = {
    width: WIDTH,
    height: HEIGHT,
    projection: { ...BOUNDS, scale, cosMidLat: Math.cos(midLat) },
    source: "DataMeet India state boundaries (CC BY 2.5 IN)",
    states,
  };
  await writeFile(OUTPUT, JSON.stringify(output));
  console.log(`map.json written: ${WIDTH}x${HEIGHT}, ${(JSON.stringify(output).length / 1024).toFixed(1)} KB`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
