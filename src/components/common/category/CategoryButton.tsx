import styles from "@/css/common/Category.module.css";

interface CategoryButtonProps {
  label: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
}

function CategoryButton({ label, icon, selected = false, onClick }: CategoryButtonProps) {
  return (
    <button className={styles.categoryBtn} onClick={onClick}>
      <div
        className={`${styles.categoryIconWrapper} ${selected ? styles.selected : ""}`}
      >
        <img src={icon} alt={label} />
      </div>
      <span className={styles.categoryLabel}>{label}</span>
    </button>
  );
}

export default CategoryButton;
