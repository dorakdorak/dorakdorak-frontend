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
      <div className="dosirak-card-name">
        <span className={`dosirak-card-storage-label ${storageType.toLowerCase()}`}>
          {getStorageTypeLabel(storageType)}
        </span>
        <span className="dosirak-card-name-text">{name}</span>
      </div>
      <div className="dosirak-card-price">
        {hasDiscount ? (
          <>
            <div className="dosirak-card-original-price">{price.toLocaleString()}원</div>
            <div className="dosirak-card-discount-rate">{discountRate}%</div>
            <div className="dosirak-card-discounted-price">
              {discountedPrice.toLocaleString()}원
            </div>
          </>
        ) : (
          <div className="dosirak-card-normal-price">{price.toLocaleString()}원</div>
        )}
      </div>
    </Link>
  );
}

export default DosirakCard;
