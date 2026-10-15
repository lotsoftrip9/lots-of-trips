import type { TravelLeg } from "@/types/guide";

export const gettingThere: Record<string, TravelLeg[]> = {
  rishikesh: [
    { mode: "air", hub: "Jolly Grant Airport, Dehradun", distanceKm: 20, note: "Daily flights from Delhi, Mumbai and Bengaluru. About 40 minutes by taxi." },
    { mode: "rail", hub: "Yog Nagari Rishikesh", distanceKm: 5, note: "Direct trains from Delhi and Howrah. Haridwar Junction, 25 km away, has more options." },
    { mode: "road", hub: "Delhi", distanceKm: 240, note: "6–7 hours via Meerut and Haridwar. Overnight Volvo buses run from ISBT Kashmere Gate." },
  ],
  haridwar: [
    { mode: "air", hub: "Jolly Grant Airport, Dehradun", distanceKm: 35, note: "The closest airport. About an hour by taxi." },
    { mode: "rail", hub: "Haridwar Junction", distanceKm: 1, note: "Shatabdi and Vande Bharat trains reach from Delhi in about 4.5 hours." },
    { mode: "road", hub: "Delhi", distanceKm: 220, note: "5–6 hours on the Delhi–Meerut Expressway and NH334." },
  ],
  mussoorie: [
    { mode: "air", hub: "Jolly Grant Airport, Dehradun", distanceKm: 60, note: "About 2 hours by taxi, the last stretch on winding hill roads." },
    { mode: "rail", hub: "Dehradun", distanceKm: 35, note: "Shatabdi and Vande Bharat trains from Delhi, then about an hour uphill." },
    { mode: "road", hub: "Delhi", distanceKm: 290, note: "7–8 hours via Dehradun. Leave early to avoid weekend traffic near Kimadi." },
  ],
  dhanaulti: [
    { mode: "air", hub: "Jolly Grant Airport, Dehradun", distanceKm: 85, note: "About 3 hours by taxi through Mussoorie." },
    { mode: "rail", hub: "Dehradun", distanceKm: 60, note: "The nearest railhead, about 2 hours away by road." },
    { mode: "road", hub: "Delhi", distanceKm: 320, note: "8–9 hours via Dehradun and Mussoorie. Snow can close the road for a day or two in winter." },
  ],
  nainital: [
    { mode: "air", hub: "Pantnagar Airport", distanceKm: 70, note: "Limited flights from Delhi. About 2 hours by taxi." },
    { mode: "rail", hub: "Kathgodam", distanceKm: 35, note: "The overnight Ranikhet Express and the Kathgodam Shatabdi run from Delhi. About 1 hour uphill." },
    { mode: "road", hub: "Delhi", distanceKm: 310, note: "7–8 hours via Moradabad and Haldwani." },
  ],
  "jim-corbett": [
    { mode: "air", hub: "Pantnagar Airport", distanceKm: 80, note: "About 2 hours by taxi to Ramnagar." },
    { mode: "rail", hub: "Ramnagar", distanceKm: 2, note: "The park's gateway town. The Corbett Park Link Express runs overnight from Delhi." },
    { mode: "road", hub: "Delhi", distanceKm: 260, note: "6–7 hours via Moradabad and Kashipur." },
  ],
  shimla: [
    { mode: "air", hub: "Chandigarh International Airport", distanceKm: 115, note: "Best connected option, about 3.5 hours by road. Shimla's own airport has very few flights." },
    { mode: "rail", hub: "Kalka", distanceKm: 90, note: "Change to the UNESCO-listed toy train to Shimla, about 5 hours of tunnels and bridges." },
    { mode: "road", hub: "Delhi", distanceKm: 350, note: "8–9 hours via Chandigarh and the Parwanoo highway." },
  ],
  manali: [
    { mode: "air", hub: "Bhuntar Airport, Kullu", distanceKm: 50, note: "Small flights from Delhi that are often cancelled in bad weather. About 1.5 hours by road." },
    { mode: "rail", hub: "Chandigarh", distanceKm: 300, note: "The most practical railhead. About 8 hours by road through the Kiratpur–Manali highway." },
    { mode: "road", hub: "Delhi", distanceKm: 540, note: "11–13 hours. Most travellers take an overnight Volvo and arrive by morning." },
  ],
  kasol: [
    { mode: "air", hub: "Bhuntar Airport, Kullu", distanceKm: 31, note: "About 1 hour up the Parvati valley." },
    { mode: "rail", hub: "Chandigarh", distanceKm: 270, note: "The most practical railhead. About 7 hours by road." },
    { mode: "road", hub: "Delhi", distanceKm: 520, note: "11–12 hours. Overnight Volvos go to Bhuntar, then a taxi or local bus to Kasol." },
  ],
  jibhi: [
    { mode: "air", hub: "Bhuntar Airport, Kullu", distanceKm: 60, note: "About 2 hours via Aut and Banjar." },
    { mode: "rail", hub: "Chandigarh", distanceKm: 240, note: "The most practical railhead. About 7 hours by road." },
    { mode: "road", hub: "Delhi", distanceKm: 500, note: "10–12 hours. Overnight Volvos stop at Aut, about an hour from Jibhi by taxi." },
  ],
  dharamshala: [
    { mode: "air", hub: "Gaggal Airport, Kangra", distanceKm: 13, note: "Direct flights from Delhi. About 30 minutes by taxi." },
    { mode: "rail", hub: "Pathankot", distanceKm: 85, note: "Well connected to Delhi and Jammu. About 3 hours by road." },
    { mode: "road", hub: "Delhi", distanceKm: 480, note: "10–11 hours. Overnight Volvos run to McLeod Ganj." },
  ],
  dalhousie: [
    { mode: "air", hub: "Gaggal Airport, Kangra", distanceKm: 120, note: "About 4 hours by road." },
    { mode: "rail", hub: "Pathankot", distanceKm: 80, note: "The nearest railhead. About 3 hours uphill." },
    { mode: "road", hub: "Delhi", distanceKm: 560, note: "11–12 hours via Pathankot." },
  ],
  amritsar: [
    { mode: "air", hub: "Sri Guru Ram Dass Jee International Airport", distanceKm: 11, note: "Direct flights from most Indian metros. About 25 minutes to the Golden Temple." },
    { mode: "rail", hub: "Amritsar Junction", distanceKm: 2, note: "Shatabdi and Vande Bharat trains reach from Delhi in about 6 hours." },
    { mode: "road", hub: "Delhi", distanceKm: 450, note: "7–8 hours on NH44 via Ambala and Jalandhar." },
  ],
};
