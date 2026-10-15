import { siteConfig } from "@/content/site";

export function buildWhatsAppMessageLink(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppLink(subject?: string) {
  return buildWhatsAppMessageLink(
    subject
      ? `Hi Lots of Trip! I'd like to know more about ${subject}.`
      : "Hi Lots of Trip! I'd like help planning a trip to the mountains.",
  );
}

export function buildPriceEnquiryLink(subject: string) {
  return buildWhatsAppMessageLink(`Hi Lots of Trip! Could you share the price for ${subject}?`);
}
