import type { SavedTrip } from "@/types/site";

const STORAGE_KEY = "lots-of-trips:saved";
const MAX_SAVED = 20;
const EMPTY: SavedTrip[] = [];

const listeners = new Set<() => void>();
let cache: SavedTrip[] | null = null;

export const savedTripId = ({ kind, slug }: Pick<SavedTrip, "kind" | "slug">) => `${kind}:${slug}`;

function isSavedTrip(value: unknown): value is SavedTrip {
  if (typeof value !== "object" || value === null) return false;
  const { kind, slug, name, image } = value as Partial<SavedTrip>;
  const validImage = image === undefined || (typeof image === "string" && image.startsWith("/images/"));
  return (kind === "tour" || kind === "destination") && typeof slug === "string" && typeof name === "string" && validImage;
}

function readStorage(): SavedTrip[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter(isSavedTrip).slice(0, MAX_SAVED) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function commit(next: SavedTrip[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((listener) => listener());
}

export const savedTripsStore = {
  getSnapshot: () => (cache ??= readStorage()),
  getServerSnapshot: () => EMPTY,
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      cache = readStorage();
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  toggle(trip: SavedTrip) {
    const current = savedTripsStore.getSnapshot();
    const id = savedTripId(trip);
    const exists = current.some((item) => savedTripId(item) === id);
    commit(exists ? current.filter((item) => savedTripId(item) !== id) : [trip, ...current].slice(0, MAX_SAVED));
  },
  remove(id: string) {
    commit(savedTripsStore.getSnapshot().filter((item) => savedTripId(item) !== id));
  },
  clear() {
    commit(EMPTY);
  },
};
