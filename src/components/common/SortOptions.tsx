import { SORT_OPTIONS, SortType } from "@/constants/sortOptions";
import "@/css/common/SortOptions.css";

interface SortOptionsProps {
  selectedSort: SortType;
  onSelectSort: (sort: SortType) => void;
}

function SortOptions({ selectedSort, onSelectSort }: SortOptionsProps) {
  return (
    <div className="sort-options">
      {SORT_OPTIONS.map((option, index) => (
        <span key={option.value} className="sort-option-wrapper">
          <button
            className={`sort-option ${selectedSort === option.value ? "active" : ""}`}
            onClick={() => onSelectSort(option.value)}
          >
            {option.label}
          </button>
          {index !== SORT_OPTIONS.length - 1 && <span className="divider">|</span>}
        </span>
      ))}
    </div>
  );
}

export default SortOptions;
