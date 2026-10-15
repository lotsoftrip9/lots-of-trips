export interface ImageCredit {
  title: string;
  artist: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL: string;
  credit: ImageCredit;
}
