import type { SiteLanguage } from "@/types/translate";

export const DEFAULT_LANGUAGE = "en";

export const languages: SiteLanguage[] = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
];

export const languageCopy = {
  title: "Choose language",
  description: "Translated automatically by Google",
  close: "Close language menu",
  trigger: "Change language",
  note: "Machine translation may not be perfect. Prices and itineraries are always confirmed with you on WhatsApp.",
};
