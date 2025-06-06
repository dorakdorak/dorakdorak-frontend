import { DosirakDetail } from "@/types/DosirakDetail";
import { getStorageTypeLabel } from "@/utils/storageType";
import QuantitySelector from "@/components/common/QuantitySelector";
import Button from "@/components/common/Button";
import { useState } from "react";
import "@/css/detail/DosirakInfo.css";

interface Props {
  dosirak: DosirakDetail;
}

const DosirakInfo = ({ dosirak }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const finalPrice = dosirak.baseInfo.price * (1 - dosirak.baseInfo.salePercentage);

  return (
    <div className="dosirak-detail-container">
      <div className="dosirak-detail-image-wrapper">
        <img
          src={dosirak.baseInfo.thumbnailImageUrl}
          alt={dosirak.baseInfo.name}
          className="dosirak-detail-image"
        />
      </div>

      <div className="dosirak-detail-info">
        <h2 className="dosirak-detail-title">{dosirak.baseInfo.name}</h2>

        <div className="dosirak-detail-priceBox">
          <span className="dosirak-detail-sale">{`${dosirak.baseInfo.salePercentage * 100}%`}</span>
          <span className="dosirak-detail-price">{finalPrice.toLocaleString()}원</span>
          <span className="dosirak-detail-originalPrice">
            {dosirak.baseInfo.price.toLocaleString()}원
          </span>
        </div>

        <div className="dosirak-detail-detail">
          <table className="dosirak-detail-table">
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

        <div className="dosirak-detail-buttons">
          <Button variant="primary" size="md">
            일반 주문
          </Button>
          <Button variant="secondary" size="md">
            공동 주문
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DosirakInfo;
