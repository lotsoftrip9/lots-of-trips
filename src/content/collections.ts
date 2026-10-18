import type { TripCollectionContent } from "@/types/collection";

export const collectionsCopy = {
  eyebrow: "Trip ideas",
  title: "Find the trip that",
  emphasis: "fits you.",
  description:
    "Snow in December, cool hills in May, a quiet valley or a long weekend away. Start from an idea and we'll shape it around your dates on WhatsApp.",
  gridLabel: "Browse by idea",
  gridTitle: "Trips for every",
  gridEmphasis: "season and mood.",
  moreLabel: "More trip ideas",
  goodToKnow: "Good to know",
  destinationsTitle: "Where to go",
  toursTitle: "Journeys to start from",
  whatsappCta: "Plan this on WhatsApp",
  quizCta: "Take the trip quiz",
};

export const collectionContent: TripCollectionContent[] = [
  {
    slug: "snow",
    label: "Snow trips",
    eyebrow: "December to February",
    title: "Snow trips in the",
    emphasis: "Himalayas.",
    description:
      "Fresh snow on deodar forests, frozen mornings and warm evenings by the heater. From December to February, Manali, Shimla and Dhanaulti turn white.",
    teaser: "Solang, Kufri and white winter ridges.",
    image: { destination: "manali", index: 1 },
    filter: { destinations: ["manali", "shimla", "dhanaulti"], months: [12, 1, 2] },
    goodToKnow: [
      "Snowfall is never guaranteed. Mid-December to mid-February gives you the best chance.",
      "Solang Valley near Manali and Kufri near Shimla are the easiest places to play in the snow.",
      "Roads can close for a while after heavy snowfall, so we keep a buffer day in the plan.",
      "Pack thermals, waterproof shoes and gloves. Snow suits and boots can be rented locally.",
    ],
    faqs: [
      {
        question: "When is the best time to see snow in Manali?",
        answer:
          "Usually late December to February. Solang Valley holds snow longer than Manali town, so even early March can work.",
      },
      {
        question: "Is the Atal Tunnel open in winter?",
        answer:
          "It stays open through most of winter, but it can close for a few hours or days after heavy snowfall. We check the latest status before your trip and plan around it.",
      },
      {
        question: "Is a snow trip okay with kids or elderly parents?",
        answer:
          "Yes, with a relaxed pace and heated rooms. We keep driving days short and plan warm breaks between snow activities.",
      },
    ],
    subject: "a snow trip",
    keywords: ["snow trip packages", "Manali snowfall trip", "Shimla snow tour", "winter trips Himachal", "Dhanaulti snowfall"],
  },
  {
    slug: "summer",
    label: "Summer escapes",
    eyebrow: "April to June",
    title: "Summer escapes from the",
    emphasis: "heat.",
    description:
      "When the plains cross 40°C, the hills stay mild. Cool mornings, long evenings and plenty of shade under the pines and deodars.",
    teaser: "Cool hill towns when the plains are burning.",
    image: { destination: "mussoorie", index: 0 },
    filter: { types: ["hill-station", "offbeat", "lakes"], months: [4, 5, 6] },
    goodToKnow: [
      "May and June are peak season. Book stays and cabs a few weeks ahead.",
      "Weekends in Mussoorie, Shimla and Nainital get busy. Weekdays are calmer.",
      "Offbeat places like Jibhi and Dhanaulti stay quieter even in June.",
      "The monsoon reaches the hills by late June, so travel earlier in summer if you can.",
    ],
    faqs: [
      {
        question: "Which hill station is coolest in summer?",
        answer:
          "Manali and Jibhi sit higher and stay cooler than Shimla, Mussoorie or Nainital. Evenings everywhere need a light jacket.",
      },
      {
        question: "Is it too crowded in May and June?",
        answer:
          "The main Mall Roads get busy. We pick stays a little away from the centre and plan sightseeing early in the day.",
      },
    ],
    subject: "a summer trip to the hills",
    keywords: ["summer hill stations India", "summer vacation Uttarakhand", "summer trip Himachal", "hill stations near Delhi summer"],
  },
  {
    slug: "long-weekends",
    label: "Long weekends",
    eyebrow: "Three or four days",
    title: "Long weekends,",
    emphasis: "well spent.",
    description:
      "Three or four days is enough for a proper break. These places are a day's drive from Delhi, so you spend more time there and less on the road.",
    teaser: "Short trips within a day's drive of Delhi.",
    image: { destination: "rishikesh", index: 0 },
    filter: {
      destinations: ["rishikesh", "haridwar", "mussoorie", "dhanaulti", "nainital", "jim-corbett"],
      maxDays: 4,
    },
    goodToKnow: [
      "Leave Delhi early in the morning to make the most of day one.",
      "Haridwar and Rishikesh fit comfortably into two or three days.",
      "Long weekends sell out fast, so message us a couple of weeks before.",
      "If you arrive by train, we can start from Dehradun, Haridwar or Kathgodam instead of Delhi.",
    ],
    faqs: [
      {
        question: "Where can I go for 3 days from Delhi?",
        answer:
          "Haridwar and Rishikesh, Mussoorie and Dhanaulti, or Nainital with a Corbett safari all work well in three days with a private cab.",
      },
      {
        question: "Can the trip start from a railway station?",
        answer:
          "Yes. Tell us your train and we'll plan the pickup from Dehradun, Haridwar or Kathgodam.",
      },
    ],
    subject: "a long weekend trip",
    keywords: ["weekend trips from Delhi", "3 day trip from Delhi", "long weekend getaways Uttarakhand", "Rishikesh weekend trip"],
  },
  {
    slug: "honeymoon",
    label: "Honeymoons",
    eyebrow: "For couples",
    title: "Honeymoons in the",
    emphasis: "hills.",
    description:
      "A private cab, quiet stays with a view and room in the plan to do nothing at all. Our favourite places for couples in Uttarakhand and Himachal.",
    teaser: "Quiet stays, slow days and big views.",
    image: { destination: "dalhousie", index: 0 },
    filter: { destinations: ["manali", "shimla", "nainital", "mussoorie", "dalhousie", "jibhi"] },
    goodToKnow: [
      "Share your dates early. Rooms with the best views fill up months ahead in peak season.",
      "We plan a slower pace for couples, with fewer hotel changes and late starts.",
      "Jibhi and Dalhousie are quieter. Manali and Shimla have more to do in the evenings.",
      "Room decoration, a candle-light dinner or private sightseeing can be added on request.",
    ],
    faqs: [
      {
        question: "Manali or Shimla for a honeymoon?",
        answer:
          "Manali has more adventure and snow, while Shimla has colonial charm and is closer to Chandigarh. Many couples combine both in six days.",
      },
      {
        question: "Can you arrange a room decoration or a special dinner?",
        answer: "Yes. Tell us what you have in mind on WhatsApp and we'll arrange it with the hotel.",
      },
      {
        question: "What is the best month for a honeymoon in the hills?",
        answer:
          "March to June for pleasant weather, October and November for clear views, and December to February if you want snow.",
      },
    ],
    subject: "a honeymoon trip",
    keywords: ["honeymoon packages Himachal", "Manali honeymoon package", "Shimla honeymoon trip", "honeymoon in Uttarakhand"],
  },
  {
    slug: "family",
    label: "Family trips",
    eyebrow: "All ages",
    title: "Family trips,",
    emphasis: "easy on everyone.",
    description:
      "Short drives, comfortable stays and days with something for every age, from toy trains and boat rides to jungle safaris.",
    teaser: "Toy trains, boat rides and jungle safaris.",
    image: { destination: "nainital", index: 0 },
    filter: {
      destinations: ["nainital", "jim-corbett", "shimla", "manali", "mussoorie", "dalhousie", "amritsar"],
      difficulty: ["easy"],
    },
    goodToKnow: [
      "We keep driving to around five or six hours a day wherever we can.",
      "Family rooms, extra beds and ground-floor rooms can be requested.",
      "Corbett safaris are a favourite with kids. Zones are booked in advance, so tell us early.",
      "For elderly parents we avoid steep walks and plan around rest times.",
    ],
    faqs: [
      {
        question: "Is the Shimla toy train good for kids?",
        answer:
          "Yes, the Kalka–Shimla toy train is a favourite. Seats get booked out, so let us know early if you want it in the plan.",
      },
      {
        question: "Are these trips okay for elderly parents?",
        answer:
          "Yes. These are easy trips with comfortable cars and hotels. Tell us about any mobility needs and we'll plan around them.",
      },
    ],
    subject: "a family trip",
    keywords: ["family tour packages Himachal", "family trip Uttarakhand", "Nainital family package", "Jim Corbett family trip"],
  },
  {
    slug: "spiritual",
    label: "Spiritual journeys",
    eyebrow: "Ghats and temples",
    title: "Spiritual journeys,",
    emphasis: "unhurried.",
    description:
      "Ganga Aarti at Har Ki Pauri, morning yoga by the river in Rishikesh and the Golden Temple glowing at night.",
    teaser: "Ganga Aarti, yoga and the Golden Temple.",
    image: { destination: "amritsar", index: 0 },
    filter: { types: ["pilgrimage"] },
    goodToKnow: [
      "The evening Ganga Aarti in Haridwar is busiest on weekends and festivals. Arrive early for a good spot.",
      "The area around the ghats in Rishikesh is vegetarian and alcohol-free.",
      "At the Golden Temple, cover your head and leave your shoes at the counter. The langar is open to all.",
      "The Wagah border ceremony is in the late afternoon, so plan at least one night in Amritsar.",
    ],
    faqs: [
      {
        question: "How many days do I need for Haridwar and Rishikesh?",
        answer:
          "Two to three days covers the Ganga Aarti, the ghats, Laxman Jhula and a rafting session in season.",
      },
      {
        question: "When is the best time for a spiritual trip?",
        answer:
          "October to March is pleasant for Haridwar, Rishikesh and Amritsar. Summers in the plains get very hot.",
      },
    ],
    subject: "a spiritual trip",
    keywords: ["Haridwar Rishikesh tour", "spiritual tour Uttarakhand", "Golden Temple Amritsar tour", "pilgrimage packages North India"],
  },
  {
    slug: "offbeat",
    label: "Offbeat valleys",
    eyebrow: "Away from the crowds",
    title: "Offbeat valleys,",
    emphasis: "far from the crowds.",
    description:
      "Wooden homestays, riverside cafés and trails through deodar forest. The quieter side of Himachal and Uttarakhand.",
    teaser: "Homestays, river cafés and forest trails.",
    image: { destination: "jibhi", index: 0 },
    filter: { types: ["offbeat"] },
    goodToKnow: [
      "Mobile signal can be patchy in Jibhi and parts of the Parvati valley.",
      "Kheerganga and Serolsar Lake are easy-to-moderate treks most people can do.",
      "Homestays are simple and cosy. We pick ones with good reviews and hot water.",
      "The last stretch to some homestays is a short walk, so pack light.",
    ],
    faqs: [
      {
        question: "Is Kasol good for solo travellers?",
        answer: "Yes, it's popular with solo travellers. We arrange stays with good reviews and share local contacts.",
      },
      {
        question: "Jibhi or Kasol?",
        answer:
          "Kasol is livelier, with cafés and the Kheerganga trek. Jibhi is quieter, with forest walks, Jalori Pass and Serolsar Lake.",
      },
    ],
    subject: "an offbeat trip",
    keywords: ["offbeat places Himachal", "Jibhi tour package", "Kasol trip", "Dhanaulti offbeat trip"],
  },
];
