import type { StateInfo } from "@/types/destination";

export const states: StateInfo[] = [
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    epithet: "Devbhoomi — Land of the Gods",
    intro: "Ganga ghats, lake towns, deodar ridges and tiger country.",
    description:
      "From the evening aarti in Haridwar and Rishikesh to the lakes of Nainital, the misty ridges of Mussoorie and Dhanaulti, and jeep safaris in Jim Corbett — Uttarakhand packs a lot into a short trip.",
    heroImage: { destination: "rishikesh", index: 0 },
    stats: [
      { label: "Destinations", value: "6" },
      { label: "Ideal trip", value: "4–7 days" },
      { label: "Best for", value: "Families" },
    ],
  },
  {
    slug: "himachal",
    name: "Himachal Pradesh",
    epithet: "Snow peaks and cedar valleys",
    intro: "Toy trains, snow days, river valleys and Tibetan monasteries.",
    description:
      "Shimla's colonial ridges, Manali's snow, the Parvati and Tirthan valleys, Dharamshala's monasteries and Dalhousie's meadows — easily combined with the Golden Temple in Amritsar.",
    heroImage: { destination: "manali", index: 0 },
    stats: [
      { label: "Destinations", value: "7" },
      { label: "Ideal trip", value: "6–10 days" },
      { label: "Best for", value: "Couples" },
    ],
  },
];
