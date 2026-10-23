export const tripzyCopy = {
  name: "Tripzy",
  badge: "AI",
  status: "Online · replies in seconds",
  welcomeEyebrow: "Hi, I'm Tripzy",
  welcomeTitle: "Where in the Himalaya are you headed?",
  welcomeText: "Ask about routes, seasons or where to stay across Uttarakhand and Himachal.",
  placeholder: "Ask about your trip…",
  thinking: "Tripzy is typing",
  suggestionsLabel: "Try asking",
  quoteLabel: "Ready for an exact price?",
  quoteCta: "Get a quote",
  quoteMessage: "Hi Lots of Trips! I was planning a trip with Tripzy on your website. Could you share a quote?",
  sharePlan: "Send plan on WhatsApp",
  sharePlanIntro: "Hi Lots of Trips! Tripzy suggested this plan on your website. Could you share a quote for it?",
  copy: "Copy",
  copied: "Copied",
  errorFallback: "I couldn't reply just now. Please try again, or message us on WhatsApp.",
  disclaimer: "AI answers can be wrong. Our team confirms every plan.",
};

export const askTripzyCopy = {
  title: "Questions about this trip?",
  subtitle: "Ask Tripzy, our AI trip planner. Answers in seconds.",
};

export const tourQuestions = (title: string, days: number) => [
  `Is ${title} a good trip for this month?`,
  `Can ${title} be done in ${Math.max(days - 2, 2)} days?`,
  `Is ${title} comfortable with kids or elderly parents?`,
];

export const destinationQuestions = (name: string) => [
  `How many days do I need in ${name}?`,
  `What's the weather like in ${name} this month?`,
  `How do I reach ${name} and where should I stay?`,
];

export const tripzySuggestions: { title: string; prompt: string }[] = [
  { title: "4 days in Manali & Kasol", prompt: "Plan 4 days in Manali and Kasol for two people." },
  {
    title: "Weekend in Rishikesh",
    prompt: "When is the best time for rafting in Rishikesh, and how would you plan a weekend there?",
  },
  {
    title: "Quiet places in Himachal",
    prompt: "Which quieter places in Himachal would you recommend, away from crowds?",
  },
  {
    title: "Nainital & Corbett with family",
    prompt: "Plan a 3-day family trip covering Nainital and a Jim Corbett safari.",
  },
];
