import { formatMonthList } from "@/lib/utils/format";
import type { DestinationContent } from "@/types/destination";
import type { Faq, TravelLeg } from "@/types/guide";

const LOW_ALTITUDE_M = 1000;

function altitudeAnswer({ name, altitudeM }: DestinationContent) {
  if (altitudeM < LOW_ALTITUDE_M) {
    return `${name} is at about ${altitudeM} m, so altitude is not a concern for anyone. Summers can be hot, so light cotton clothing works best from April to June.`;
  }
  return `${name} is at about ${altitudeM.toLocaleString("en-IN")} m. That is comfortable for most travellers, including children and older parents, but mornings and evenings are cold for much of the year, so pack warm layers.`;
}

function reachAnswer(name: string, legs: TravelLeg[]) {
  const byMode = Object.fromEntries(legs.map((leg) => [leg.mode, leg]));
  const parts = [
    byMode.air && `The nearest airport is ${byMode.air.hub}, about ${byMode.air.distanceKm} km away.`,
    byMode.rail && `The most convenient railway station is ${byMode.rail.hub}, about ${byMode.rail.distanceKm} km away.`,
    byMode.road && `By road, ${name} is about ${byMode.road.distanceKm} km from ${byMode.road.hub}.`,
  ];
  return [...parts.filter(Boolean), "We arrange private pickups from any of these."].join(" ");
}

export function buildDestinationFaqs(destination: DestinationContent, legs: TravelLeg[]): Faq[] {
  const { name } = destination;
  return [
    {
      question: `When is the best time to visit ${name}?`,
      answer: `The best months to visit ${name} are ${formatMonthList(destination.bestMonths)}. Outside these months you can still travel, and we will tell you honestly what the weather and roads will be like.`,
    },
    ...(legs.length ? [{ question: `How do I reach ${name}?`, answer: reachAnswer(name, legs) }] : []),
    { question: `How high is ${name}? Will the altitude be a problem?`, answer: altitudeAnswer(destination) },
    {
      question: `How much does a trip to ${name} cost?`,
      answer: `It depends on your dates, hotel category, group size and how many days you have. Message us on WhatsApp with these details and we will send a clear, itemised price, usually within a few hours.`,
    },
    {
      question: `Can you plan a custom trip to ${name}?`,
      answer: `Yes. Every trip we run is planned around you. We can combine ${name} with nearby places, slow the pace for families, or add treks and activities.`,
    },
  ];
}

export const tourFaqs: Faq[] = [
  {
    question: "Can I change this itinerary?",
    answer:
      "Yes. Every journey is a starting point. We can add or remove days, change hotels, swap places or slow the pace. Tell us what you have in mind and we will rework it.",
  },
  {
    question: "How much does this journey cost?",
    answer:
      "Prices depend on your travel dates, hotel category and group size, so we quote each trip individually. Message us on WhatsApp and we will send an itemised price, usually within a few hours.",
  },
  {
    question: "Where does the journey start and end?",
    answer:
      "Most journeys start and end in Delhi, Chandigarh or Dehradun. We can also pick you up from any airport, railway station or hotel along the route.",
  },
  {
    question: "What kind of vehicle will we travel in?",
    answer:
      "A private, well-maintained car or tempo traveller with an experienced hill driver, chosen for your group size. The vehicle stays with you for the whole journey.",
  },
  {
    question: "How do I book, and how do payments work?",
    answer:
      "A part payment confirms your booking, and the balance is due before the trip starts. Our cancellation policy sets out exactly what is refunded if your plans change.",
  },
  {
    question: "What happens if bad weather closes a road?",
    answer:
      "Mountain roads sometimes close for snow or landslides. Our team tracks conditions daily and reroutes or reschedules so you lose as little of your trip as possible.",
  },
];

export const faqCopy = {
  eyebrow: "Good to know",
  stillQuestions: "Still have a question?",
  stillQuestionsBody: "Our team replies on WhatsApp, usually within minutes during working hours.",
  cta: "Ask on WhatsApp",
};
