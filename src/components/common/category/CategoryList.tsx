import CategoryButton from "@/components/common/category/CategoryButton";
import styles from "@/css/common/Category.module.css";
import { categories, FilterType } from "@/constants/categories";

interface CategoryListProps {
  selectedFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

function CategoryList({ selectedFilter, onSelectFilter }: CategoryListProps) {
  return (
    <div className={styles.categoryList}>
      {categories.map((item) => (
        <CategoryButton
          key={item.filterType}
          label={item.label}
          icon={item.icon}
          selected={item.filterType === selectedFilter}
          onClick={() => onSelectFilter(item.filterType)}
        />
      ))}
    </div>
  );
}

export default CategoryList;
