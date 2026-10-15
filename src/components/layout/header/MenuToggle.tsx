import styles from "./MenuToggle.module.css";

interface MenuToggleProps {
  open: boolean;
  onToggle: () => void;
}

export function MenuToggle({ open, onToggle }: MenuToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      data-open={open || undefined}
      className={styles.toggle}
    >
      <span className={styles.line} aria-hidden />
      <span className={styles.line} aria-hidden />
    </button>
  );
}
