type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    rta?: { track: (name: string, props?: EventProps) => void };
  }
}

export function trackEvent(name: string, props?: EventProps) {
  try {
    window.rta?.track(name, props);
  } catch {}
}
