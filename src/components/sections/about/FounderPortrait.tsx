import Image from "next/image";
import styles from "./FounderPortrait.module.css";

interface FounderPortraitProps {
  src: string;
  alt: string;
  blurDataURL: string;
}

export function FounderPortrait({ src, alt, blurDataURL }: FounderPortraitProps) {
  return (
    <div className={styles.ring}>
      <div className={styles.gap}>
        <div className={styles.frame}>
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 640px) 256px, 224px"
            quality={92}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className={styles.photo}
          />
        </div>
      </div>
    </div>
  );
}
