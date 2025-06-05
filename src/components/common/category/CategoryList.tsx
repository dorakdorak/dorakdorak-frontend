import { useState } from "react";
import CategoryButton from "@/components/common/category/CategoryButton";
import "@/css/common/Category.css";

const categories = [
  { label: "전체", icon: "/images/category/all.png" },
  { label: "고혈압 식단", icon: "/images/category/heart.png" },
  { label: "칼로리 식단", icon: "/images/category/weight.png" },
  { label: "스페셜 식단", icon: "/images/category/star.png" },
  { label: "단백질 식단", icon: "/images/category/dumbbell.png" },
  { label: "당뇨 식단", icon: "/images/category/injection.png" },
  { label: "가성비 식단", icon: "/images/category/wallet.png" },
];

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
