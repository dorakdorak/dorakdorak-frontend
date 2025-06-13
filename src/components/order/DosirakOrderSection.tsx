import { useEffect, useState } from "react";
import styles from "@/css/order/GroupOrder.module.css";
import QuantitySelector from "../common/QuantitySelector";
import checkGreenFull from "@/assets/images/icon/check-green-full.png";
import checkGray from "@/assets/images/icon/check-gray.png";
import { getDiscountedPrice } from "@/utils/price";
import Button from "../common/Button";

type Dosirak = {
  dosirakId: number;
  name: string;
  categories: string;
  price: number;
  count: number;
  selected: boolean;
};

export default function DosirakOrderSection() {
  const [orders, setOrders] = useState<Dosirak[]>([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // 예시 응답
    const response = {
      orders: [
        {
          dosirakId: 1,
          name: "닭가슴살 도시락",
          categories: "단백질 식단",
          price: 5000,
          count: 3,
        },
        {
          dosirakId: 2,
          name: "병아리콩카레 도시락",
          categories: "저당 식단",
          price: 5000,
          count: 1,
        },
      ],
    };

    const initialized = response.orders.map((o) => ({
      ...o,
      selected: false,
    }));

    setOrders(initialized);
  }, []);

  const toggleSelect = (id: number) => {
    setOrders((prev) =>
      prev.map((o) => (o.dosirakId === id ? { ...o, selected: !o.selected } : o))
    );
  };

  const changeCount = (id: number, count: number) => {
    setOrders((prev) => prev.map((o) => (o.dosirakId === id ? { ...o, count: count } : o)));
  };

  const selectedOrders = orders.filter((o) => o.selected && o.count > 0);

  const totalAmount = selectedOrders.reduce(
    (sum, o) => sum + getDiscountedPrice(o.price, 15) * o.count,
    0
  );

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
            <span>{o.categories}</span>
            <span>{o.price.toLocaleString()}</span>
            <span>{o.count}/20</span>
            <span>
              <QuantitySelector
                initialQuantity={o.count}
                onChange={(newQty) => changeCount(o.dosirakId, newQty)}
              ></QuantitySelector>
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
            <span>{o.categories}</span>
            <span>{getDiscountedPrice(o.price, 15).toLocaleString()}</span>
            <span>{o.count}</span>
            <span>{(o.count * getDiscountedPrice(o.price, 15)).toLocaleString()}</span>
          </div>
        ))}
        <div className={styles.totalAmountBox}>
          총 주문 금액: <span className={styles.totalAmount}>{totalAmount.toLocaleString()}원</span>
        </div>
      </div>

      <div className={styles.noticeWrapper}>
        <ul className={styles.noticeList}>
          <li>
            해당 도시락은 <strong>공동 주문 상품</strong>으로, 일정 수량 이상 모일 경우에만 배송이
            진행됩니다.
          </li>
          <li>
            <strong>최소 주문 수량을 초과하면</strong>, 선택한 시간에 맞춰 배송이 보장됩니다.
          </li>
          <li>
            주문 수량이 충족되면, <strong>등록된 이메일로 알림이 발송</strong>됩니다.
          </li>
        </ul>
      </div>

      <div className={styles.agreementWrapper}>
        <div className={styles.checkboxAgreement} onClick={() => setAgreed(!agreed)}>
          <img
            src={agreed ? checkGreenFull : checkGray}
            alt="동의 여부"
            className={styles.checkboxImage}
          />
          <span className={styles.checkboxText}>
            공동 주문 정책 및 최소 주문 수량 도달 시 배송이 확정됨을 확인하였으며, 이에 동의합니다.
          </span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button size="lg" variant="secondary" disabled={totalAmount === 0 || !agreed}>
          주문하기
        </Button>
      </div>
    </div>
  );
}
