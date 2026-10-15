import { Text, View } from "@react-pdf/renderer";
import { styles } from "./itineraryStyles";

interface PdfBulletListProps {
  title: string;
  items: string[];
  marker: string;
}

export function PdfBulletList({ title, items, marker }: PdfBulletListProps) {
  return (
    <View style={styles.column} wrap={false}>
      <Text style={styles.sectionHeading}>{title}</Text>
      {items.map((item) => (
        <View key={item} style={styles.listItem}>
          <Text style={styles.listMarker}>{marker}</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}
