import { DosirakItem } from "@/types/DosirakList";
import "@/css/list/DosirakCard.css";
import { getStorageTypeLabel } from "@/utils/storageType";
import { Link } from "react-router-dom";

interface Props {
  item: DosirakItem;
}

function DosirakCard({ item }: Props) {
  const { dosirakId, name, price, salesPercentage, imageUrl, storageType } = item;

  const hasDiscount = salesPercentage > 0;
  const discountRate = Math.round(salesPercentage * 100);
  const discountedPrice = Math.floor(price * (1 - salesPercentage));

  return (
    <Link
      to={`/detail/${dosirakId}`}
      className="dosirak-card"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="dosirak-image-wrapper">
        <img src={imageUrl} alt={name} className="dosirak-image" />
      </div>
      <div className="dosirak-name">
        <span className={`storage-label ${storageType.toLowerCase()}`}>
          {getStorageTypeLabel(storageType)}
        </span>
        <span className="name-text">{name}</span>
      </div>
      <div className="dosirak-price">
        {hasDiscount ? (
          <>
            <div className="original-price">{price.toLocaleString()}원</div>
            <div className="discount-rate">{discountRate}%</div>
            <div className="discounted-price">{discountedPrice.toLocaleString()}원</div>
          </>
        ) : (
          <div className="normal-price">{price.toLocaleString()}원</div>
        )}
      </div>
    </Link>
  );
}

export default DosirakCard;
