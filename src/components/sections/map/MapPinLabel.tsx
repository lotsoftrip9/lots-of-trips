import type { MapDestination } from "@/types/map";
import styles from "./DestinationMap.module.css";

const HEIGHT = 30;
const GAP = 14;
const NAME_CHAR = 8.2;
const TEMP_CHAR = 8.8;
const PADDING = 11;

function chipBox(destination: MapDestination, width: number) {
  switch (destination.labelSide) {
    case "left":
      return { x: -GAP - width, y: -HEIGHT / 2 };
    case "top":
      return { x: -width / 2, y: -GAP - HEIGHT - 4 };
    case "bottom":
      return { x: -width / 2, y: GAP };
    default:
      return { x: GAP, y: -HEIGHT / 2 };
  }
}

export function MapPinLabel({ destination, active }: { destination: MapDestination; active: boolean }) {
  const temp = destination.weather ? `${destination.weather.temperature}°` : "";
  const nameWidth = destination.name.length * NAME_CHAR;
  const tempWidth = temp ? temp.length * TEMP_CHAR + 8 : 0;
  const width = Math.round(PADDING * 2 + nameWidth + tempWidth);
  const { x, y } = chipBox(destination, width);

  return (
    <g className={styles.chip} data-active={active || undefined} aria-hidden>
      <rect x={x} y={y} width={width} height={HEIGHT} rx={HEIGHT / 2} className={styles.chipBg} />
      <text x={x + PADDING} y={y + 20} className={styles.chipName}>
        {destination.name}
      </text>
      {temp && (
        <text x={x + width - PADDING} y={y + 20} textAnchor="end" className={styles.chipTemp}>
          {temp}
        </text>
      )}
    </g>
  );
}
