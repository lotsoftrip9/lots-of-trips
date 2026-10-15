import { Document, Image as PdfPicture, Link, Page, Text, View } from "@react-pdf/renderer";
import { siteConfig } from "@/content/site";
import { difficultyLabel, formatAltitude, formatMonthRange } from "@/lib/utils/format";
import { buildPriceEnquiryLink } from "@/lib/utils/whatsapp";
import type { Tour } from "@/types/tour";
import { styles } from "./itineraryStyles";
import { PdfBulletList } from "./PdfBulletList";

type PdfImage = { data: Buffer; format: "jpg" | "png" };

export interface ItineraryDocumentProps {
  tour: Tour;
  places: string[];
  cover: PdfImage;
  logo: PdfImage;
  siteUrl: string;
}

export function ItineraryDocument({ tour, places, cover, logo, siteUrl }: ItineraryDocumentProps) {
  const { name, contact } = siteConfig;
  const facts = [
    { label: "Duration", value: `${tour.durationDays} days` },
    { label: "Pace", value: difficultyLabel(tour.difficulty) },
    { label: "Highest point", value: formatAltitude(tour.maxAltitudeM) },
    { label: "Best months", value: formatMonthRange(tour.bestMonths) },
  ];

  return (
    <Document title={`${tour.title} — ${name} itinerary`} author={name} subject={tour.summary}>
      <Page size="A4" style={styles.page}>
        <View style={styles.topBar} fixed>
          <PdfPicture src={logo} style={styles.logo} />
          <Text style={styles.topBarLabel}>Journey itinerary</Text>
        </View>

        <PdfPicture src={cover} style={styles.cover} />
        <Text style={styles.eyebrow}>{places.join(" · ")}</Text>
        <Text style={styles.title}>{tour.title}</Text>
        <Text style={styles.summary}>{tour.summary}</Text>

        <View style={styles.facts}>
          {facts.map((fact) => (
            <View key={fact.label} style={styles.fact}>
              <Text style={styles.factLabel}>{fact.label}</Text>
              <Text style={styles.factValue}>{fact.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeading}>Day by day</Text>
        {tour.itinerary.map((day) => (
          <View key={day.day} style={styles.day} wrap={false}>
            <Text style={styles.dayNumber}>DAY {day.day}</Text>
            <View style={styles.dayBody}>
              <Text style={styles.dayTitle}>{day.title}</Text>
              <Text style={styles.dayDescription}>{day.description}</Text>
            </View>
          </View>
        ))}

        <View style={styles.columns}>
          <PdfBulletList title="Included" items={tour.inclusions} marker="+" />
          <PdfBulletList title="Not included" items={tour.exclusions} marker="–" />
        </View>

        <View style={styles.cta} wrap={false}>
          <Text style={styles.ctaEyebrow}>Your price, for your dates</Text>
          <Text style={styles.ctaTitle}>Get an itemised quote on WhatsApp</Text>
          <Text style={styles.ctaBody}>
            We price every trip for your dates, group size and hotel choice. Your quote covers everything listed as
            included, with no hidden charges. It is free, with no obligation, and usually reaches you within a few
            hours.
          </Text>
          <View style={styles.ctaLinks}>
            <Link src={buildPriceEnquiryLink(`the ${tour.title} journey`)} style={styles.ctaLink}>
              WhatsApp {contact.phoneDisplay}
            </Link>
            <Link src={`tel:${contact.phoneE164}`} style={styles.ctaLink}>
              Call us
            </Link>
            <Link src={`mailto:${contact.email}`} style={styles.ctaLink}>
              {contact.email}
            </Link>
            <Link src={`${siteUrl}/tours/${tour.slug}`} style={styles.ctaLink}>
              View online
            </Link>
          </View>
        </View>

        <Text style={styles.note}>
          This itinerary is indicative. Your confirmed itinerary is the one we share in writing with your booking.
        </Text>
      </Page>
    </Document>
  );
}
