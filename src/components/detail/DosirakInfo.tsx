import { DosirakDetail } from "@/types/DosirakDetail";
import { getStorageTypeLabel } from "@/utils/storageType";
import QuantitySelector from "@/components/common/QuantitySelector";
import Button from "@/components/common/Button";
import { useState } from "react";
import styles from "@/css/detail/DosirakInfo.module.css";
import { useNavigate } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { SinglePaymentPrepareRequest } from "@/types/Payment";
import { requestSinglePayment } from "@/api/Payment";
import { getDiscountedPrice } from "@/utils/price";

interface Props {
  dosirakId: number;
  dosirak: DosirakDetail;
}

const DosirakInfo = ({ dosirakId, dosirak }: Props) => {
  const [quantity, setQuantity] = useState(1);
  const finalPrice = getDiscountedPrice(
    dosirak.baseInfo.price,
    Math.round(dosirak.baseInfo.salePercentage * 100)
  );
  const navigate = useNavigate();

  const handleSingleOrder = async () => {
    try {
      // Step 1. 주문 준비 요청
      const prepareRequest: SinglePaymentPrepareRequest = {
        orderItems: [{ dosirakId, count: quantity }],
      };
      const res = await requestSinglePayment(prepareRequest);

      // Step 2. 토스페이먼츠 결제창 호출
      const tossPayments = await loadTossPayments(
        "test_ck_AQ92ymxN34dmjmq9pxDg3ajRKXvd"
      ); // 테스트 키
      await tossPayments.requestPayment("카드", {
        amount: res.amount,
        orderId: res.orderId,
        orderName: res.orderName,
        customerName: res.customerName,
        customerEmail: res.customerEmail,
        successUrl: `${window.location.origin}/order-success?toss=true`,
        failUrl: `${window.location.origin}/order-fail`,
      });
    } catch (err) {
      console.error("결제 요청 중 오류:", err);
      alert("결제 요청에 실패했습니다.");
    }
  };

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
          {dosirak.baseInfo.salePercentage > 0 && (
            <span className={styles.dosirakDetailSale}>
              {`${dosirak.baseInfo.salePercentage * 100}%`}
            </span>
          )}
          <span className={styles.dosirakDetailPrice}>
            {finalPrice.toLocaleString()}원
          </span>
          {dosirak.baseInfo.salePercentage > 0 && (
            <span className={styles.dosirakDetailOriginalPrice}>
              {dosirak.baseInfo.price.toLocaleString()}원
            </span>
          )}
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
                  <QuantitySelector
                    initialQuantity={quantity}
                    onChange={setQuantity}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.dosirakDetailButtons}>
          <Button variant="primary" size="md" onClick={handleSingleOrder}>
            일반 주문
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate(`/group-order?dosirakId=${dosirakId}`)}
          >
            공동 주문
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DosirakInfo;
