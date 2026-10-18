import { readFile, writeFile } from "node:fs/promises";
import { siteConfig } from "../../src/content/site.ts";

const MANIFEST = ".next/prerender-manifest.json";
const OUTPUT = "public/sitemap.xml";

const EXCLUDE = [/^\/_/, /\.[a-z0-9]+$/i, /^\/destinations\/[^/]+\/map$/];

const RULES = [
  { test: /^\/$/, priority: 1, changefreq: "weekly" },
  { test: /^\/policies\//, priority: 0.2, changefreq: "yearly" },
  { test: /^\/credits$/, priority: 0.3, changefreq: "monthly" },
  { test: /^\/(about|contact)$/, priority: 0.6, changefreq: "monthly" },
  { test: /^\/[^/]+$/, priority: 0.9, changefreq: "weekly" },
  { test: /.*/, priority: 0.8, changefreq: "weekly" },
];

function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ??
    siteConfig.url;
  return url.replace(/\/$/, "");
}

const escapeXml = (value) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]);

const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
const siteUrl = getSiteUrl();
const lastmod = new Date().toISOString();

const routes = Object.keys(manifest.routes)
  .filter((route) => !EXCLUDE.some((pattern) => pattern.test(route)))
  .sort();

const entries = routes.map((route) => {
  const { priority, changefreq } = RULES.find((rule) => rule.test.test(route));
  const loc = escapeXml(`${siteUrl}${route === "/" ? "/" : route}`);
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;

await writeFile(OUTPUT, xml);
console.log(`Sitemap: ${routes.length} routes written to ${OUTPUT}`);
