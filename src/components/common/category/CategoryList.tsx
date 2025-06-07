import CategoryButton from "@/components/common/category/CategoryButton";
import "@/css/common/Category.css";
import { categories, FilterType } from "@/constants/categories";

interface CategoryListProps {
  selectedFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

function CategoryList({ selectedFilter, onSelectFilter }: CategoryListProps) {
  return (
    <div className="category-list">
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
