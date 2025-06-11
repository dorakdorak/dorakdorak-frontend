import { SORT_OPTIONS, SortType } from "@/constants/sortOptions";
import styles from "@/css/common/SortOptions.module.css";
import classNames from "classnames";

interface SortOptionsProps {
  selectedSort: SortType;
  onSelectSort: (sort: SortType) => void;
}

function SortOptions({ selectedSort, onSelectSort }: SortOptionsProps) {
  return (
    <div className={styles.sortOptions}>
      {SORT_OPTIONS.map((option, index) => (
        <span key={option.value} className={styles.sortOptionWrapper}>
          <button
            className={classNames(styles.sortOption, {
              [styles.active]: selectedSort === option.value,
            })}
            onClick={() => onSelectSort(option.value)}
          >
            {option.label}
          </button>
          {index !== SORT_OPTIONS.length - 1 && <span className={styles.sortDivider}>|</span>}
        </span>
      ))}
    </div>
  );
}

export default SortOptions;
