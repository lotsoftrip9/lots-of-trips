import type { Policy } from "@/types/guide";

export const policies: Policy[] = [
  {
    slug: "cancellation",
    title: "Cancellation & Refunds",
    summary: "What happens to your payment if you cancel, change dates, or if we have to change your trip.",
    updated: "2026-10-14",
    sections: [
      {
        heading: "Booking amount",
        body: [
          "A part payment confirms your booking. The amount is shared in your quote and depends on the hotels and season.",
          "The balance is due before the trip starts, on the date mentioned in your booking confirmation.",
        ],
      },
      {
        heading: "If you cancel",
        body: [
          "30 days or more before departure: full refund minus non-refundable hotel, train or flight charges already paid on your behalf.",
          "15 to 29 days before departure: 50% of the total trip cost is refunded.",
          "Less than 15 days before departure, or no-show: no refund.",
          "All cancellations must be sent in writing on WhatsApp or by email.",
        ],
      },
      {
        heading: "Changing your dates",
        body: [
          "You can move your trip to new dates once at no extra charge if you tell us at least 15 days before departure, subject to hotel availability and any difference in seasonal rates.",
        ],
      },
      {
        heading: "Weather, roads and events beyond our control",
        body: [
          "Snow, landslides, road closures, strikes or government orders can change plans in the mountains. We will always reroute or reschedule to protect your trip.",
          "Extra costs caused by such events, like an additional night's stay, are payable by the traveller. Unused services are refunded wherever hotels and suppliers refund us.",
        ],
      },
      {
        heading: "Refund timelines",
        body: ["Approved refunds are made to the original payment method within 7 to 10 working days."],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    summary: "The terms that apply when you book a journey with Lots of Trip.",
    updated: "2026-10-14",
    sections: [
      {
        heading: "Your booking",
        body: [
          "A booking is confirmed once we receive the part payment and send a written confirmation with your itinerary, hotels and inclusions.",
          "Anything not listed in your inclusions, such as meals outside the plan, entry tickets, activities and personal expenses, is paid by the traveller.",
        ],
      },
      {
        heading: "Itineraries",
        body: [
          "Itineraries on this website are indicative. Your confirmed itinerary is the one we share in writing.",
          "Driving times are estimates and can change with traffic, weather and road conditions.",
        ],
      },
      {
        heading: "Travellers' responsibilities",
        body: [
          "Carry a valid government photo ID for every traveller. Foreign nationals must carry their passport and visa.",
          "Tell us about any medical conditions before booking, especially for higher-altitude destinations.",
          "Follow local rules, respect places of worship and keep the mountains clean.",
        ],
      },
      {
        heading: "Hotels and vehicles",
        body: [
          "If a confirmed hotel becomes unavailable, we will provide one of a similar or better category.",
          "Vehicles follow state rules on driving hours and are not available for unplanned late-night travel in the hills.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "We work with trusted hotels, drivers and guides but are not liable for loss, injury or delay caused by third parties or events beyond our control.",
          "We strongly recommend travel insurance for all trips.",
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "What information we collect when you contact or book with us, and how we use it.",
    updated: "2026-10-14",
    sections: [
      {
        heading: "What we collect",
        body: [
          "The details you share when you enquire or book: name, phone number, email, travel dates, group size and preferences.",
          "ID details needed by hotels and authorities, collected only after you book.",
          "Anonymous usage data, such as pages visited, to improve this website.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "To reply to your enquiry, plan your trip, make bookings with hotels and transport, and support you during travel.",
          "We never sell your data and do not send marketing messages without your permission.",
        ],
      },
      {
        heading: "Who we share it with",
        body: [
          "Only the hotels, drivers, guides and service providers who need it to deliver your trip, and authorities when the law requires it.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask us to see, correct or delete your data at any time by writing to us. We keep booking records only as long as the law requires.",
        ],
      },
    ],
  },
];
