import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import OrderSuccessHeader from "@/components/order/OrderSuccessHeader";
import OrderSuccessTable from "@/components/order/OrderSuccessTable";
import Spinner from "@/components/common/Spinner";
import { confirmPayment } from "@/api/Payment";
import { PaymentConfirmRequest, PaymentConfirmResponse } from "@/types/Payment";

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [result, setResult] = useState<PaymentConfirmResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const toss = searchParams.get("toss");
    const orderId = searchParams.get("orderId");
    const paymentKey = searchParams.get("paymentKey");
    const amount = searchParams.get("amount");

    // 토스 결제 성공 시만 API 호출
    if (toss && orderId && paymentKey && amount) {
      setLoading(true);
      const request: PaymentConfirmRequest = {
        orderId,
        paymentKey,
        amount: Number(amount),
      };

      confirmPayment(request)
        .then((res) => setResult(res))
        .catch(() => alert("결제 확인 중 오류 발생"))
        .finally(() => setLoading(false));
    } else {
      // state 기반 fallback
      const state = location.state as PaymentConfirmResponse | undefined;
      if (state) {
        setResult(state);
      }
    }
  }, [location.state, searchParams]);

  if (loading || !result) {
    return (
      <div>
        <br />
        <br />
        <Spinner text="결제 확인 중입니다..." />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "840px",
        margin: "120px auto 0",
        padding: "24px 12px",
      }}
    >
      <OrderSuccessHeader orderCode={result.orderCode} />
      <OrderSuccessTable orders={result.orders} />
    </div>
  );
};

export default OrderSuccessPage;
