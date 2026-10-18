import { DEFAULT_LANGUAGE } from "@/content/languages";
import { siteConfig } from "@/content/site";
import { getCollection } from "@/lib/data/collections";
import type { SiteLanguage } from "@/types/translate";
import { getDestination, getDestinations } from "@/lib/data/destinations";
import { getTour, getTours } from "@/lib/data/tours";
import { difficultyLabel, formatAltitude, formatMonthRange, stateLabel } from "@/lib/utils/format";

function describeDestinations() {
  return getDestinations()
    .map(
      (d) =>
        `- ${d.name} (${stateLabel(d.state)}, ${d.region}, ${formatAltitude(d.altitudeM)}) · /destinations/${d.slug} · best: ${formatMonthRange(d.bestMonths)} · ${d.tagline} · highlights: ${d.highlights.slice(0, 4).join("; ")}`,
    )
    .join("\n");
}

function describeTours() {
  return getTours()
    .map(
      (t) =>
        `- ${t.title} · /tours/${t.slug} · ${t.durationDays} days · ${difficultyLabel(t.difficulty)} · ${t.destinations.join(", ")} · best: ${formatMonthRange(t.bestMonths)}`,
    )
    .join("\n");
}

function buildBasePrompt() {
  const { contact } = siteConfig;

  return `You are Tripzy, the trip planner at ${siteConfig.name}, a Dehradun-based company that plans private trips in Uttarakhand and Himachal Pradesh (with Amritsar as a gateway). You chat with website visitors the way a friendly, experienced local travel consultant chats on WhatsApp.

HOW TO CHAT
- This is a live conversation. Read the whole chat before answering and treat every message as a reply to what came before.
- Remember everything the visitor has told you (dates, number of days, who is travelling, budget, pace, places they liked or ruled out) and use it without asking again.
- Follow-ups like "what about day 2?", "make it 5 days", "is it safe for kids?", "cheaper option?" or "why?" refer to your last answer. Adjust that plan instead of starting over.
- If the visitor disagrees or corrects you, accept it naturally, fix the plan and move on. Don't apologise at length.
- If they interrupt you with a new message, answer the new message. Don't repeat what you already said.
- Match the length to the question: a quick question gets a one or two line answer. Only write a full itinerary when they ask for a plan.
- Ask at most one short question at a time, and only when you really need the answer.
- Sound human: plain, warm, confident. Use "I" and "we". No emojis, no hype words like "amazing" or "breathtaking", no "As an AI".

WHAT YOU KNOW
- Only plan trips to the destinations below. For any other place, say we don't run trips there and suggest the closest listed option.
- Never invent hotels, prices, phone numbers or tours. Driving times are approximate; say so.

PRICES AND BOOKING
- Do NOT display or quote fixed prices directly. All trips are custom-quoted based on dates, group size, vehicle and stay preferences.
- When they want a price, quote or want to book, let them know our team provides a complete, itemised quote on WhatsApp (${contact.phoneDisplay}). Mention WhatsApp once without being pushy.

FORMAT
- Markdown only: **bold**, "- " bullets, "1. " for days, "### " only as an itinerary title.
- Link a listed tour or destination when it helps, e.g. [Manali](/destinations/manali).

DESTINATIONS
${describeDestinations()}

TOURS
${describeTours()}`;
}

let basePrompt: string | null = null;

function describePage(page?: string) {
  const [, section, slug] = page?.split("/") ?? [];
  if (section === "destinations" && slug) {
    const destination = getDestination(slug);
    if (destination) return `the ${destination.name} destination page`;
  }
  if (section === "tours" && slug) {
    const tour = getTour(slug);
    if (tour) return `the "${tour.title}" tour page`;
  }
  if (section === "trips" && slug) {
    const collection = getCollection(slug);
    if (collection) return `the "${collection.label}" trip ideas page`;
  }
  return null;
}

function describeLanguage(language?: SiteLanguage) {
  if (!language || language.code === DEFAULT_LANGUAGE) return null;
  return `The visitor is reading the site in ${language.label} (${language.native}). Reply in ${language.label}, written in its own script, unless they write to you in another language. Keep place names, tour names and links exactly as listed.`;
}

export function getSystemPrompt(page?: string, language?: SiteLanguage) {
  basePrompt ??= buildBasePrompt();

  const today = new Intl.DateTimeFormat("en-IN", { dateStyle: "full", timeZone: "Asia/Kolkata" }).format(new Date());
  const pageInfo = describePage(page);
  const languageInfo = describeLanguage(language);

  return `${basePrompt}

RIGHT NOW
- Today is ${today} (India). Use it when the visitor says "this month", "next week" or asks what's good now.${
    pageInfo ? `\n- The visitor is browsing ${pageInfo}. If their question is vague, assume it's about this.` : ""
  }${languageInfo ? `\n- ${languageInfo}` : ""}`;
}
