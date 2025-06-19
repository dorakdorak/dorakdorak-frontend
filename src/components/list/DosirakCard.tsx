import { DosirakItem } from "@/types/DosirakList";
import styles from "@/css/list/DosirakCard.module.css";
import { getStorageTypeLabel } from "@/utils/storageType";
import { Link } from "react-router-dom";
import { getDiscountedPrice } from "@/utils/price";

interface Props {
  item: DosirakItem;
}

function DosirakCard({ item }: Props) {
  const { dosirakId, name, price, salesPercentage, imageUrl, storageType } =
    item;

  const hasDiscount = salesPercentage > 0;
  const discountRate = Math.round(salesPercentage * 100);
  const discountedPrice = getDiscountedPrice(price, discountRate);

  return (
    <Link
      to={`/detail/${dosirakId}`}
      className={styles.dosirakCard}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className={styles.dosirakImageWrapper}>
        <img src={imageUrl} alt={name} className={styles.dosirakImage} />
      </div>

      <div className={styles.dosirakCardName}>
        <span
          className={`${
            styles.dosirakCardStorageLabel
          } ${storageType.toLowerCase()}`}
        >
          {getStorageTypeLabel(storageType)}
        </span>
        <span className={styles.dosirakCardNameText}>{name}</span>
      </div>

      <div className={styles.dosirakCardPrice}>
        {hasDiscount ? (
          <>
            <div className={styles.dosirakCardOriginalPrice}>
              {price.toLocaleString()}원
            </div>
            <div className={styles.dosirakCardDiscountRate}>
              {discountRate}%
            </div>
            <div className={styles.dosirakCardDiscountedPrice}>
              {discountedPrice.toLocaleString()}원
            </div>
          </>
        ) : (
          <div className={styles.dosirakCardNormalPrice}>
            {price.toLocaleString()}원
          </div>
        )}
      </div>
    </Link>
  );
}

export default DosirakCard;
