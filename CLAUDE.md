# Lots of Trip — Project Guide & Plan

A premium tours & trips website for the Indian Himalayas, covering **Uttarakhand** and **Himachal Pradesh**.
The goal is a clean, photography-led site with Apple-level clarity and restrained motion. It must feel crafted by a design studio, never like an AI template.

---

## 1. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (latest stable, App Router) | Server Components by default, `"use client"` only where motion/interaction needs it |
| Language | TypeScript (strict) | No `any`; shared types live in `src/types` |
| Styling | Tailwind CSS v4 + CSS Modules | Tailwind for layout/spacing/tokens; CSS Modules for complex, bespoke pieces (masks, clip-paths, keyframes) |
| Motion | Motion (`motion/react`) | Subtle fade-up reveals, hover states, segmented controls. No scroll-jacking |
| Fonts | `next/font` (self-hosted) | No layout shift |
| Images | `next/image`, local AVIF/WebP | Blur placeholders, explicit sizes |
| Forms | React Hook Form + Zod | Enquiry / trip planner |
| Lint/Format | ESLint + Prettier | |
| Package manager | npm | |

### Commands
```bash
npm run dev      # local dev
npm run build    # production build
npm run start    # serve build
npm run lint     # lint
```

---

## 2. Coding Rules (mandatory)

1. No comments in CSS files.
2. No unnecessary comments in code. Code should explain itself through naming.
3. No inline styles (`style={{}}`). Use Tailwind classes, CSS Modules, or CSS variables set via classes. The only exception is a Motion runtime value that cannot be expressed otherwise.
4. Never put a whole feature in one file. Split into components, hooks, utils, data, and types.
5. Before writing anything new, search the codebase for an existing component, hook, util, or style and reuse it.
6. One component per file, PascalCase filenames, co-located `Component.module.css` when needed.
7. Content (destinations, tours, copy) lives in `src/content` as typed data — never hard-coded inside components.
8. Every animation must respect `prefers-reduced-motion` (handled by `MotionConfig` in `MotionProvider`).
9. Animate only `transform`, `opacity`, `clip-path`, and `filter`. Never animate layout properties.
10. No scroll-jacking, pinned sections, smooth-scroll overrides, preloaders or custom cursors. Native scrolling only.
11. Text must never sit directly on a busy photo. Put headlines on solid backgrounds; images go in rounded frames.

---

## 3. Design Direction — Luxury travel (Aman / Black Tomato feel)

- **Palette:** warm ivory background `#faf8f4`, paper `#f2eee7`, ink `#1c1b19`, muted `#75706a`, champagne-gold accent `#94723f` (light `#d4b483`), charcoal night sections `#14120f`. Full dark mode via `.dark` overrides in `globals.css`.
- **Typography:** Inter everywhere (headings weight 500 with tight tracking, body 400). Eyebrows are 13px semibold in gold. Headline emphasis (`<em>`) is gold, not italic. No serif fonts.
- **Buttons:** black pills with 12px uppercase tracked labels; `light` and `glass` variants for use over photos.
- **Hero:** full-screen cinematic photo with slow ken-burns zoom, dark gradients for legibility, glass trip-finder bar (destination / month / travellers → WhatsApp).
- **Header:** fixed; nav left · logo centred · actions right; uppercase tracked links. Transparent with white text over the home hero, frosted ivory glass after scrolling. Mega menu for destinations.
- **Corners:** subtle 12px (`rounded-xl`) on images and cards; pills stay fully rounded.
- **Floating buttons:** Instagram (brand gradient) and WhatsApp (brand green), bottom-right.
- **Logo:** `public/logo-light.png` on light backgrounds, `public/logo-dark.png` on dark. Favicons in `src/app/icon.png` and `src/app/apple-icon.png`.
- **Avoid:** text over photos without gradients, bright saturated UI colours, emoji icons, heavy animation.

---

## 4. Motion

- One primitive: `components/motion/Reveal` (fade-up on enter, optional stagger via `RevealItem`). Tokens in `src/lib/motion/tokens.ts`.
- `MotionConfig reducedMotion="user"` in the root layout handles accessibility.
- Hover micro-interactions are CSS transitions (image scale 1.04–1.05, chevron nudge).
- Performance: LCP < 2.5s, CLS < 0.1. Animate only transform and opacity.

---

## 5. Destinations

**Scope is exactly these 13 destinations (set by the owner). Do not add content, photos or tours for any other place.** Nearby attractions inside them (e.g. Solang in Manali, Kufri near Shimla, Khajjiar near Dalhousie, Triund near Dharamshala, Kheerganga near Kasol, Jalori/Serolsar near Jibhi, Wagah near Amritsar) are fine.

### Uttarakhand
| Destination | Slug | Type | Highlight |
|---|---|---|---|
| Jim Corbett | `jim-corbett` | Wildlife | Tiger safaris, Dhikala |
| Nainital | `nainital` | Hill station / Lakes | Naini Lake, Snow View |
| Haridwar | `haridwar` | Spiritual | Ganga Aarti at Har Ki Pauri |
| Rishikesh | `rishikesh` | Spiritual / Adventure | Laxman Jhula, rafting |
| Mussoorie | `mussoorie` | Hill station | Mall Road, Landour |
| Dhanaulti | `dhanaulti` | Hill station / Offbeat | Surkanda Devi, deodar forest |

### Himachal (Amritsar grouped here as the usual gateway; its region reads "Amritsar, Punjab")
| Destination | Slug | Type | Highlight |
|---|---|---|---|
| Shimla | `shimla` | Hill station / Snow | The Ridge, toy train |
| Manali | `manali` | Snow / Adventure | Solang Valley, Atal Tunnel |
| Kasol | `kasol` | Offbeat | Parvati river, Kheerganga |
| Jibhi | `jibhi` | Offbeat | Serolsar lake, Jalori Pass |
| Dharamshala | `dharamshala` | Culture / Trek | McLeod Ganj, Triund |
| Dalhousie | `dalhousie` | Hill station | Khajjiar meadow |
| Amritsar | `amritsar` | Spiritual | Golden Temple, Wagah |

> Verify seasons and altitudes before publishing.

### Image sourcing
- Sources: **Unsplash** and **Pexels** (free for commercial use), **Wikimedia Commons** (check each image's license; attribution is required for CC-BY / CC-BY-SA).
- Research real photos of each actual place. Never use a photo of a different location, and never use AI-generated images.
- Download locally to `public/images/destinations/<slug>/` (hero, 3–6 gallery images), convert to AVIF/WebP, max 2400px wide.
- Record every image in `src/content/credits.ts` (`src`, `photographer`, `source`, `license`, `url`) and show the credits on a `/credits` page.
- Generate blur placeholders at build time (`plaiceholder` or a script in `scripts/`).

---

## 6. Brand, Social & Contact

All business details live in `src/content/site.ts`. Use **dummy placeholder values for now**; replace them before launch.

| Field | Value |
|---|---|
| Brand | Lots of Trip |
| Instagram | https://www.instagram.com/lotsoftrip_/ (real) |
| WhatsApp | +91 70152 48493 (real) → wa.me/917015248493 with a prefilled message |
| Phone | +91 70152 48493 (real) |
| Email | lotsoftrip9@gmail.com (real) |
| Address | `Dehradun, Uttarakhand, India` (dummy) |

### Contact flows
1. **Contact form** is the DA Forms embed (siteConfig.contactFormSrc) rendered by components/ui/EmbeddedForm, which auto-resizes via the da-forms:height postMessage. Used on /contact and every tour page.
2. **Direct WhatsApp.** A floating WhatsApp button on every page, plus "Chat on WhatsApp" CTAs on tour and destination pages. Each opens `wa.me` with a prefilled message naming the tour or destination (built by a `buildWhatsAppLink` util).
3. **Instagram.** Linked in the header/menu and footer, plus an "On the trail with us" Instagram section on the home page (dummy grid of local images linking to the profile; no API for now).

Everything else (tour prices, testimonials, journal posts, team) is also dummy content for now, clearly kept in `src/content` so it is easy to replace.

---

## 7. Information Architecture

```
/                         Home
/destinations             All destinations (filter: state, type, season)
/destinations/[slug]      Destination detail
/tours                    Curated tour packages
/tours/[slug]             Tour detail + day-wise itinerary + enquiry
/journeys/uttarakhand     State landing page
/journeys/himachal        State landing page
/journal                  Travel stories / guides
/journal/[slug]           Article
/about                    Story, team, values
/contact                  Contact + trip planner form
/credits                  Photo credits
```

### Home page sections
1. Hero — centred headline on black, framed photo below
2. Manifesto — short statement + stats grid
3. "Two States" — two cards (Uttarakhand, Himachal)
4. Destination carousel (native scroll + arrow buttons)
5. Featured tours — card grid
6. Seasons — month segmented control → destinations in season
7. Ways to travel — image tile grid
8. Testimonials — black section, centred quote, dot navigation
9. Instagram strip "On the trail with us" → links to @lotsoftrip_
10. Plan-your-journey CTA card (form + WhatsApp)

---

## 8. Folder Structure

```
src/
  app/
    layout.tsx
    page.tsx
    destinations/
      page.tsx
      [slug]/page.tsx
    tours/
      page.tsx
      [slug]/page.tsx
    journeys/[state]/page.tsx
    journal/...
    about/page.tsx
    contact/page.tsx
    credits/page.tsx
    sitemap.ts
    robots.ts
  components/
    layout/        header/, footer/, MotionProvider, WhatsAppFloat
    ui/            ButtonLink, AppImage, Carousel, SectionIntro, Logo, icons
    motion/        Reveal (+ RevealItem)
    sections/      home/, shared/, destination/, tour/ section components
    cards/         DestinationCard, TourCard
  content/         destinations.ts, tours.ts, states.ts, experiences.ts, testimonials.ts, site.ts, generated/images.json
  lib/
    data/          destinations.ts, tours.ts, images.ts, navigation.ts
    motion/        tokens.ts
    utils/         cn.ts, format.ts, whatsapp.ts
  styles/
    globals.css
    tokens.css
  types/           destination.ts, tour.ts, journal.ts
public/
  images/destinations/<slug>/
  images/tours/<slug>/
  fonts/ (only if not using next/font/google)
scripts/           image optimisation, blur placeholder generation
```

---

## 9. Data Models (initial)

```ts
type State = "uttarakhand" | "himachal";
type TripType = "trek" | "pilgrimage" | "snow" | "wildlife" | "hill-station" | "offbeat" | "adventure" | "culture";

interface Destination {
  slug: string;
  name: string;
  state: State;
  region: string;
  tagline: string;
  description: string;
  altitudeM: number;
  coordinates: { lat: number; lng: number };
  types: TripType[];
  bestMonths: number[];
  highlights: string[];
  heroImage: ImageAsset;
  gallery: ImageAsset[];
}

interface Tour {
  slug: string;
  title: string;
  destinations: string[];
  durationDays: number;
  difficulty: "easy" | "moderate" | "challenging";
  priceFromINR: number;
  itinerary: { day: number; title: string; description: string; image?: ImageAsset }[];
  inclusions: string[];
  exclusions: string[];
}

interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  creditId: string;
}
```

---

## 10. Roadmap

### Phase 0 — Setup
- [ ] Scaffold Next.js + TS + Tailwind v4 + ESLint/Prettier
- [ ] Install GSAP, Lenis, Motion, React Hook Form, Zod
- [ ] Tokens, fonts, globals, `cn` util, GSAP plugin registration, Lenis provider

### Phase 1 — Content & Images
- [ ] Types + content files for all destinations above
- [ ] Research and download real photos per destination, fill `credits.ts`
- [ ] Image optimisation + blur placeholder script

### Phase 2 — Foundation Components
- [ ] Header (hides on scroll down, shows on scroll up), mobile menu, footer
- [ ] Motion primitives: RevealText, ImageReveal, Parallax, HorizontalScroll, Counter, MagneticButton, Cursor
- [ ] Preloader + page transition

### Phase 3 — Home Page
- [ ] All 11 sections from §7, tuned for desktop and mobile

### Phase 4 — Destinations & Tours
- [ ] Destinations index with animated filtering
- [ ] Destination detail (hero morph, facts strip, gallery, map, best-season chart, related tours)
- [ ] Tours index + tour detail with sticky itinerary and enquiry form

### Phase 5 — Supporting Pages
- [ ] State landing pages, journal, about, contact/trip planner, credits

### Phase 6 — Polish & Launch
- [ ] SEO metadata, OG images, sitemap, JSON-LD (`TouristDestination`, `TouristTrip`)
- [ ] Accessibility pass (keyboard, focus states, alt text, contrast, reduced motion)
- [ ] Lighthouse/performance pass, cross-browser + mobile testing
- [ ] Deploy (Vercel)
