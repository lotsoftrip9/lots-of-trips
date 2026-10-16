export const tripzyCopy = {
  name: "Tripzy",
  badge: "AI",
  status: "Online · replies in seconds",
  welcomeTitle: "Plan your Himalayan trip",
  welcomeText:
    "Ask me about routes, seasons, how many days you need or where to stay. I know every place we travel to in Uttarakhand and Himachal.",
  placeholder: "Ask Tripzy anything about your trip",
  thinking: "Tripzy is typing",
  suggestionsLabel: "Popular questions",
  quoteLabel: "Ready for an exact price?",
  quoteCta: "Get a quote",
  quoteMessage: "Hi Lots of Trips! I was planning a trip with Tripzy on your website. Could you share a quote?",
  errorFallback: "I couldn't reply just now. Please try again, or message us on WhatsApp.",
  disclaimer: "AI answers can be wrong. Our team confirms every plan.",
};

export type TripzySuggestionIcon = "mountain" | "waves" | "trees" | "paw";

export const tripzySuggestions: {
  icon: TripzySuggestionIcon;
  title: string;
  description: string;
  prompt: string;
}[] = [
  {
    icon: "mountain",
    title: "4 days in Manali and Kasol",
    description: "Day-by-day route for two",
    prompt: "Plan 4 days in Manali and Kasol for two people.",
  },
  {
    icon: "waves",
    title: "A weekend in Rishikesh",
    description: "Rafting season and a 2-day plan",
    prompt: "When is the best time for rafting in Rishikesh, and how would you plan a weekend there?",
  },
  {
    icon: "trees",
    title: "Quiet places in Himachal",
    description: "Away from the crowds",
    prompt: "Which quieter places in Himachal would you recommend, away from crowds?",
  },
  {
    icon: "paw",
    title: "Nainital and Corbett with family",
    description: "Lakes and a jungle safari in 3 days",
    prompt: "Plan a 3-day family trip covering Nainital and a Jim Corbett safari.",
  },
];
