import Script from "next/script";
import { analytics } from "@/content/site";

export function Analytics() {
  return <Script src={analytics.trackerSrc} data-site={analytics.siteId} strategy="afterInteractive" />;
}
