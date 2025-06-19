import { useEffect, useState } from "react";
import styles from "@/css/order/GroupOrder.module.css";
import QuantitySelector from "../common/QuantitySelector";
import checkGreenFull from "@/assets/images/icon/check-green-full.png";
import checkGray from "@/assets/images/icon/check-gray.png";
import { getDiscountedPrice } from "@/utils/price";
import Button from "@/components/common/Button";
import GroupOrderItem from "@/types/GroupOrder";
import { requestGroupPayment } from "@/api/Payment";
import { loadTossPayments } from "@tosspayments/payment-sdk";

interface Dosirak extends GroupOrderItem {
  selected: boolean;
  orderCount: number;
}

interface Props {
  orderList: GroupOrderItem[];
  arriveAt: string;
  arriveTime: number;
}

export default function DosirakOrderSection({
  orderList,
  arriveAt,
  arriveTime,
}: Props) {
  const [orders, setOrders] = useState<Dosirak[]>([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const initialized = orderList.map((o) => ({
      ...o,
      selected: false,
      orderCount: 0,
    }));
    setOrders(initialized);
  }, [orderList]);

  const toggleSelect = (id: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.dosirakId === id ? { ...o, selected: !o.selected } : o
      )
    );
  };

  const changeCount = (id: number, count: number) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.dosirakId === id
          ? {
              ...o,
              orderCount: count,
              selected: count > 0, // 0이면 false, 1 이상이면 true
            }
          : o
      )
    );
  };

  const selectedOrders = orders.filter((o) => o.selected && o.orderCount > 0);

  const totalAmount = selectedOrders.reduce(
    (sum, o) => sum + getDiscountedPrice(o.price, 15) * o.orderCount,
    0
  );

  const handleOrder = async () => {
    try {
      const orderItems = selectedOrders.map((o) => ({
        dosirakId: o.dosirakId,
        count: o.orderCount,
      }));

      const response = await requestGroupPayment({
        orderItems,
        arriveAt,
        arriveTime,
      });

      const tossPayments = await loadTossPayments(
        "test_ck_AQ92ymxN34dmjmq9pxDg3ajRKXvd"
      );

      await tossPayments.requestPayment("카드", {
        amount: response.amount,
        orderId: response.orderId,
        orderName: response.orderName,
        customerName: response.customerName,
        customerEmail: response.customerEmail,
        successUrl: `${window.location.origin}/order-success?toss=true`,
        failUrl: `${window.location.origin}/order-fail`,
      });
    } catch (error) {
      console.error("공동 주문 결제 실패:", error);
    }
  };

  return (
    <div>
      <div className={styles.table}>
        <h3 className={styles.title}>주문 현황</h3>
        <div className={styles.row + " " + styles.headerRow}>
          <span>선택</span>
          <span>이름</span>
          <span>카테고리</span>
          <span>원가</span>
          <span>수량/최소수량</span>
          <span>주문 수량</span>
        </div>

        {orders.map((o) => (
          <div key={o.dosirakId} className={styles.row}>
            <img
              src={o.selected ? checkGreenFull : checkGray}
              alt="선택"
              className={styles.checkbox}
              onClick={() => toggleSelect(o.dosirakId)}
            />
            <span>{o.name}</span>
            <span>{o.category}</span>
            <span>{o.price.toLocaleString()}</span>
            <span>{o.count}/20</span>
            <span>
              <QuantitySelector
                initialQuantity={o.orderCount}
                onChange={(newQty) => changeCount(o.dosirakId, newQty)}
              />
            </span>
          </div>
        ))}
      </div>

      <div className={styles.table}>
        <h3 className={styles.title}>주문 예정 금액</h3>
        <div className={styles.row + " " + styles.headerRow}>
          <span>선택</span>
          <span>이름</span>
          <span>카테고리</span>
          <span>할인가</span>
          <span>주문 수량</span>
          <span>합계</span>
        </div>
        {selectedOrders.map((o) => (
          <div key={o.dosirakId} className={styles.row}>
            <img
              src={o.selected ? checkGreenFull : checkGray}
              alt="선택"
              className={styles.checkbox}
              onClick={() => toggleSelect(o.dosirakId)}
            />
            <span>{o.name}</span>
            <span>{o.category}</span>
            <span>{getDiscountedPrice(o.price, 15).toLocaleString()}</span>
            <span>{o.orderCount}</span>
            <span>
              {(
                o.orderCount * getDiscountedPrice(o.price, 15)
              ).toLocaleString()}
            </span>
          </div>
        ))}
        <div className={styles.totalAmountBox}>
          총 주문 금액:{" "}
          <span className={styles.totalAmount}>
            {totalAmount.toLocaleString()}원
          </span>
        </div>
      </div>

      <div className={styles.noticeWrapper}>
        <ul className={styles.noticeList}>
          <li>
            해당 도시락은 <strong>공동 주문 상품</strong>으로, 일정 수량 이상
            모일 경우에만 배송이 진행됩니다.
          </li>
          <li>
            <strong>최소 주문 수량을 초과하면</strong>, 선택한 시간에 맞춰
            배송이 보장됩니다.
          </li>
          <li>
            주문 수량이 충족되면, <strong>등록된 이메일로 알림이 발송</strong>
            됩니다.
          </li>
        </ul>
      </div>

      <div className={styles.agreementWrapper}>
        <div
          className={styles.checkboxAgreement}
          onClick={() => setAgreed(!agreed)}
        >
          <img
            src={agreed ? checkGreenFull : checkGray}
            alt="동의 여부"
            className={styles.checkboxImage}
          />
          <span className={styles.checkboxText}>
            공동 주문 정책 및 최소 주문 수량 도달 시 배송이 확정됨을
            확인하였으며, 이에 동의합니다.
          </span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button
          size="lg"
          variant="secondary"
          disabled={totalAmount === 0 || !agreed}
          onClick={handleOrder}
        >
          주문하기
        </Button>
      </div>
    </div>
  );
}
