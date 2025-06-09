import { DosirakDetail } from "@/types/DosirakDetail";
import { getStorageTypeLabel } from "@/utils/storageType";
import QuantitySelector from "@/components/common/QuantitySelector";
import Button from "@/components/common/Button";
import { useState } from "react";
import styles from "@/css/detail/DosirakInfo.module.css";

interface Props {
  dosirak: DosirakDetail;
}

const DosirakInfo = ({ dosirak }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const finalPrice = dosirak.baseInfo.price * (1 - dosirak.baseInfo.salePercentage);

  return (
    <div className={styles.dosirakDetailContainer}>
      <div className={styles.dosirakDetailImageWrapper}>
        <img
          src={dosirak.baseInfo.thumbnailImageUrl}
          alt={dosirak.baseInfo.name}
          className={styles.dosirakDetailImage}
        />
      </div>

      <div className={styles.dosirakDetailInfo}>
        <h2 className={styles.dosirakDetailTitle}>{dosirak.baseInfo.name}</h2>

        <div className={styles.dosirakDetailPriceBox}>
          <span className={styles.dosirakDetailSale}>
            {`${dosirak.baseInfo.salePercentage * 100}%`}
          </span>
          <span className={styles.dosirakDetailPrice}>
            {finalPrice.toLocaleString()}원
          </span>
          <span className={styles.dosirakDetailOriginalPrice}>
            {dosirak.baseInfo.price.toLocaleString()}원
          </span>
        </div>

        <div className={styles.dosirakDetailDetail}>
          <table className={styles.dosirakDetailTable}>
            <tbody>
              <tr>
                <td>배송정보</td>
                <td>
                  [일반] 7pm 이전 결제 시 다음날 도착 보장
                  <br />
                  [공동] 최소 주문 수량을 넘으면, 원하는 시간에 도착 보장
                </td>
              </tr>
              <tr>
                <td>용량</td>
                <td>{dosirak.baseInfo.weight}g</td>
              </tr>
              <tr>
                <td>칼로리</td>
                <td>{dosirak.nutrition.calories}kcal</td>
              </tr>
              <tr>
                <td>보관방법</td>
                <td>{getStorageTypeLabel(dosirak.baseInfo.storageType)}</td>
              </tr>
              <tr>
                <td>수량</td>
                <td>
                  <QuantitySelector initialQuantity={quantity} onChange={setQuantity} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.dosirakDetailButtons}>
          <Button variant="primary" size="md">일반 주문</Button>
          <Button variant="secondary" size="md">공동 주문</Button>
        </div>
      </div>
    </div>
  );
};

export default DosirakInfo;
