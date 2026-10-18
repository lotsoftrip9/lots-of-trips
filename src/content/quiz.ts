import type { QuizQuestion } from "@/types/quiz";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "when",
    title: "When would you like to go?",
    summaryLabel: "When",
    options: [
      { id: "winter", label: "Dec – Feb", hint: "Snow and crisp winter days", icon: "snow", months: [12, 1, 2] },
      { id: "spring", label: "Mar – Apr", hint: "Blossoms and clear skies", icon: "spring", months: [3, 4] },
      { id: "summer", label: "May – Jun", hint: "Escape the heat", icon: "sun", months: [5, 6] },
      {
        id: "monsoon",
        label: "Jul – Aug",
        hint: "Green, misty and quiet",
        icon: "rain",
        months: [7, 8],
        note: "July and August are monsoon months in the hills, with a risk of landslides. We'll plan safer routes and keep buffer days.",
      },
      { id: "autumn", label: "Sep – Nov", hint: "Clearest mountain views", icon: "autumn", months: [9, 10, 11] },
      { id: "flexible", label: "Not sure yet", hint: "Show me the best fit", icon: "calendar" },
    ],
  },
  {
    id: "mood",
    title: "What kind of trip are you in the mood for?",
    summaryLabel: "Mood",
    options: [
      { id: "snow", label: "Snow & mountains", hint: "Solang, Kufri, white ridges", icon: "mountain", types: ["snow", "adventure"] },
      { id: "spiritual", label: "Peace & spirituality", hint: "Ghats, aarti, the Golden Temple", icon: "spiritual", types: ["pilgrimage", "culture"] },
      { id: "adventure", label: "Treks & adventure", hint: "Trails, rafting, paragliding", icon: "trek", types: ["adventure", "trek"] },
      { id: "offbeat", label: "Quiet & offbeat", hint: "Homestays and forest walks", icon: "forest", types: ["offbeat"] },
      { id: "lakes", label: "Lakes & hill towns", hint: "Mall roads and boat rides", icon: "lake", types: ["hill-station", "lakes"] },
      { id: "wildlife", label: "Wildlife safari", hint: "Tigers in Corbett", icon: "wildlife", types: ["wildlife"] },
    ],
  },
  {
    id: "party",
    title: "Who's travelling?",
    summaryLabel: "Travelling as",
    options: [
      { id: "couple", label: "A couple", hint: "Slow days, views, privacy", icon: "couple", types: ["hill-station", "offbeat", "lakes"] },
      { id: "family", label: "Family with kids", hint: "Short drives, fun stops", icon: "family", types: ["wildlife", "hill-station", "lakes"], prefersEasy: true },
      { id: "friends", label: "Group of friends", hint: "Treks, cafés, bonfires", icon: "friends", types: ["trek", "offbeat", "adventure"] },
      { id: "solo", label: "Just me", hint: "Easy to meet people", icon: "solo", types: ["offbeat", "culture", "trek"] },
      { id: "parents", label: "With parents", hint: "Comfortable and unhurried", icon: "parents", types: ["pilgrimage", "hill-station"], prefersEasy: true },
    ],
  },
  {
    id: "days",
    title: "How many days do you have?",
    summaryLabel: "Length",
    options: [
      { id: "short", label: "2 – 3 days", hint: "A long weekend", days: 3 },
      { id: "medium", label: "4 – 5 days", hint: "A proper break", days: 5 },
      { id: "week", label: "6 – 7 days", hint: "Two or three places", days: 7 },
      { id: "long", label: "8+ days", hint: "The full circuit", days: 9 },
    ],
  },
];

export const quizCopy = {
  eyebrow: "Trip finder",
  title: "Which trip",
  emphasis: "suits you?",
  intro: "Four quick questions. We'll match you with journeys and places, then you can send your picks to us on WhatsApp.",
  step: (current: number, total: number) => `Question ${current} of ${total}`,
  back: "Back",
  restart: "Start again",
  resultsEyebrow: "Your matches",
  resultsTitle: "Here's what we'd",
  resultsEmphasis: "suggest.",
  toursLabel: "Journeys for you",
  placesLabel: "Places that fit",
  whatsappCta: "Send my picks on WhatsApp",
  tripzyCta: "Ask Tripzy",
  footnote: "Free and no obligation. We reply with a plan built around your answers.",
};
