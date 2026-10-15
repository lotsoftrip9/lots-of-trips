import type { Experience } from "@/types/site";

export const experiences: Experience[] = [
  {
    type: "hill-station",
    label: "Hill stations",
    description: "Mall roads, colonial charm and cool mountain air.",
    image: { destination: "shimla", index: 0 },
  },
  {
    type: "snow",
    label: "Snow",
    description: "Winter days in Manali and Shimla's white ridges.",
    image: { destination: "manali", index: 1 },
  },
  {
    type: "pilgrimage",
    label: "Spiritual",
    description: "Ganga aarti, ghats and the Golden Temple.",
    image: { destination: "amritsar", index: 0 },
  },
  {
    type: "wildlife",
    label: "Wildlife",
    description: "Tiger safaris in the sal forests of Corbett.",
    image: { destination: "jim-corbett", index: 0 },
  },
  {
    type: "offbeat",
    label: "Offbeat valleys",
    description: "Kasol, Jibhi and quiet Dhanaulti.",
    image: { destination: "jibhi", index: 0 },
  },
  {
    type: "lakes",
    label: "Lakes & meadows",
    description: "Naini Lake and the Khajjiar meadow.",
    image: { destination: "nainital", index: 0 },
  },
];
