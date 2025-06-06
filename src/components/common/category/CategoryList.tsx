import { useState } from "react";
import CategoryButton from "@/components/common/category/CategoryButton";
import "@/css/common/Category.css";
import { categories } from "@/constants/categories";

function CategoryList() {
  const [selectedLabel, setSelectedLabel] = useState("전체");

  return (
    <div className="category-list">
      {categories.map((item) => (
        <CategoryButton
          key={item.label}
          label={item.label}
          icon={item.icon}
          selected={item.label === selectedLabel}
          onClick={() => setSelectedLabel(item.label)}
        />
      ))}
    </div>
  );
}

export default CategoryList;
