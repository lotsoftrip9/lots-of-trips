import { ArrowDown, ArrowUp, CornerDownLeft } from "lucide-react";
import styles from "./SearchDialog.module.css";

export function SearchKeyHints() {
  return (
    <div className={styles.hints} aria-hidden>
      <span className="flex items-center gap-1.5">
        <kbd className={styles.key}>
          <ArrowUp className="size-3" />
        </kbd>
        <kbd className={styles.key}>
          <ArrowDown className="size-3" />
        </kbd>
        Navigate
      </span>
      <span className="flex items-center gap-1.5">
        <kbd className={styles.key}>
          <CornerDownLeft className="size-3" />
        </kbd>
        Open
      </span>
      <span className="flex items-center gap-1.5">
        <kbd className={styles.key}>esc</kbd>
        Close
      </span>
    </div>
  );
}
