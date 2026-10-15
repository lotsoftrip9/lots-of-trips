import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicPath = (src: string) => path.join(process.cwd(), "public", src);

export async function loadPhotoAsJpeg(src: string, width = 1400) {
  const data = await sharp(publicPath(src)).resize({ width, withoutEnlargement: true }).jpeg({ quality: 82 }).toBuffer();
  return { data, format: "jpg" as const };
}

export async function loadPng(src: string) {
  return { data: await readFile(publicPath(src)), format: "png" as const };
}
