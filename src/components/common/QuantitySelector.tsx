import { useState } from "react";
import "@/css/common/QuantitySelector.css";

interface QuantitySelectorProps {
  initialQuantity?: number;
  onChange?: (quantity: number) => void;
}

export default function QuantitySelector({ initialQuantity = 1, onChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange?.(newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange?.(newQuantity);
    }
  };

  return (
    <div className="quantity-selector">
      <button className="quantity-button" onClick={handleDecrease}>
        −
      </button>
      <div className="quantity-value">{quantity}</div>
      <button className="quantity-button" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}
