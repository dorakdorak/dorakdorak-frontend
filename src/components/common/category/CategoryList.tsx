import { useState } from "react";
import CategoryButton from "@/components/common/category/CategoryButton";
import "@/css/common/Category.css";
import { categories, FilterType } from "@/constants/categories";

function CategoryList() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");

  return (
    <div className="category-list">
      {categories.map((item) => (
        <CategoryButton
          key={item.filterType}
          label={item.label}
          icon={item.icon}
          selected={item.filterType === selectedFilter}
          onClick={() => setSelectedFilter(item.filterType)}
        />
      ))}
    </div>
  );
}

export default CategoryList;
