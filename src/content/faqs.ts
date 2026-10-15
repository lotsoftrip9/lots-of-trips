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

export const homeFaqs: Faq[] = [
  {
    question: "Which places do you plan trips to?",
    answer:
      "We focus on thirteen places we know well. In Uttarakhand: Jim Corbett, Nainital, Haridwar, Rishikesh, Mussoorie and Dhanaulti. In Himachal: Shimla, Manali, Kasol, Jibhi, Dharamshala and Dalhousie, plus Amritsar as the usual gateway. Keeping the list short is how we keep the planning good.",
  },
  {
    question: "Why don't you show prices on the website?",
    answer:
      "Because a fair price depends on your dates, group size, hotel category and how many days you have. A number posted online would be wrong for most people. Instead we send an itemised quote for your exact trip, free and with no obligation.",
  },
  {
    question: "What is usually included in a quote?",
    answer:
      "Hotels with breakfast and dinner, a private car with an experienced hill driver, sightseeing as per the itinerary, and all tolls, parking and driver allowances. Flights, trains, lunches, activity fees and personal expenses are not included unless you ask us to add them. Your quote lists everything in writing.",
  },
  {
    question: "How do I book, and how much do I pay upfront?",
    answer:
      "A part payment confirms your booking, and the exact amount is written in your quote. The balance is due before the trip starts. Once we receive the part payment, we send a written confirmation with your itinerary, hotels and inclusions.",
  },
  {
    question: "What if I need to cancel or change my dates?",
    answer:
      "You can move your trip to new dates once at no extra charge if you tell us at least 15 days before departure, subject to hotel availability. If you cancel 30 days or more before departure, you get a full refund minus any non-refundable hotel, train or flight charges. Between 15 and 29 days, 50% is refunded. Approved refunds reach your original payment method within 7 to 10 working days.",
  },
  {
    question: "Are your trips suitable for families and older parents?",
    answer:
      "Yes. Every trip is private, so we set the pace around your group — shorter driving days, more rest stops and fewer early starts. Most of our destinations sit at comfortable altitudes, and we will tell you honestly if a place or activity is not right for someone in your group.",
  },
  {
    question: "When is the best time to travel?",
    answer:
      "It depends on what you want to see. December to February brings snow to Shimla and Manali. March to June is the classic season for hill stations like Mussoorie, Nainital and Dalhousie. October and November give the clearest mountain views. July to September is monsoon, when landslides can close roads, so we plan those trips more cautiously. Jim Corbett's Dhikala zone is usually open from mid-November to mid-June.",
  },
  {
    question: "What happens if bad weather closes a road?",
    answer:
      "Mountain roads sometimes close for snow or landslides. We track conditions daily and reroute or reschedule so you lose as little of your trip as possible. Any extra cost this causes, such as an additional night's stay, is payable by the traveller, and we always tell you before committing to it.",
  },
];

export const faqCopy = {
  eyebrow: "Good to know",
  stillQuestions: "Still have a question?",
  stillQuestionsBody: "Message us on WhatsApp — we usually reply within a few hours during working hours.",
  cta: "Ask on WhatsApp",
};
