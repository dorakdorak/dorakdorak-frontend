import "@/css/common/Category.css";

interface CategoryButtonProps {
  label: string;
  icon: string;
  selected?: boolean;
  onClick?: () => void;
}

function CategoryButton({ label, icon, selected = false, onClick }: CategoryButtonProps) {
  return (
    <button className="category-btn" onClick={onClick}>
      <div className={`icon-wrapper ${selected ? "selected" : ""}`}>
        <img src={icon} alt={label} />
      </div>
      <span className="category-label">{label}</span>
    </button>
  );
}

export default CategoryButton;
