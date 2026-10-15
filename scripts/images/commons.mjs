export const USER_AGENT =
  "LotsOfTripImageFetcher/1.0 (https://www.instagram.com/lotsoftrip_/; lotsoftrip9@gmail.com)";

const API = "https://commons.wikimedia.org/w/api.php";
const ALLOWED_LICENSE = /^(public domain|cc0|cc by(-sa)? \d(\.\d)?)/i;
const EXCLUDED_TITLE = /map|logo|diagram|\b1[89]\d\d|sign ?board|selfie|poster/i;

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const stripHtml = (value = "") =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

export async function fetchWithRetry(url, options = {}, attempts = 4) {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const response = await fetch(url, {
      ...options,
      headers: { "User-Agent": USER_AGENT, ...options.headers },
    });
    if (response.ok) return response;
    if (attempt === attempts) {
      throw new Error(`${response.status} ${response.statusText} for ${url}`);
    }
    await sleep(1500 * attempt);
  }
}

export async function searchCommons(query, thumbWidth) {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    generator: "search",
    gsrnamespace: "6",
    gsrlimit: "30",
    gsrsearch: `${query} filetype:bitmap`,
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiextmetadatafilter: "LicenseShortName|LicenseUrl|Artist",
    iiurlwidth: String(thumbWidth),
  });
  const response = await fetchWithRetry(`${API}?${params}`);
  const data = await response.json();
  const pages = Object.values(data.query?.pages ?? {}).sort((a, b) => a.index - b.index);

  return pages
    .map((page) => {
      const info = page.imageinfo?.[0];
      if (!info) return null;
      const meta = info.extmetadata ?? {};
      return {
        title: page.title,
        width: info.width,
        height: info.height,
        mime: info.mime,
        original: info.url,
        thumb: info.thumburl,
        pageUrl: info.descriptionurl,
        license: meta.LicenseShortName?.value ?? "",
        licenseUrl: meta.LicenseUrl?.value ?? "",
        artist: stripHtml(meta.Artist?.value),
      };
    })
    .filter(Boolean);
}

export function isUsable(candidate) {
  const ratio = candidate.width / candidate.height;
  return (
    candidate.mime === "image/jpeg" &&
    candidate.width >= 1800 &&
    ratio >= 1.25 &&
    ratio <= 2.4 &&
    ALLOWED_LICENSE.test(candidate.license) &&
    !EXCLUDED_TITLE.test(candidate.title)
  );
}
