import { useState } from "react";
import styles from "@/css/common/QuantitySelector.module.css";

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
    <div className={styles.quantitySelector}>
      <button className={styles.quantityButton} onClick={handleDecrease}>
        −
      </button>
      <div className={styles.quantityValue}>{quantity}</div>
      <button className={styles.quantityButton} onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}
