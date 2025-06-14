import { useLocation } from "react-router-dom";
import OrderSuccessHeader from "@/components/order/OrderSuccessHeader";
import OrderSuccessTable from "@/components/order/OrderSuccessTable";
import { OrderSuccessResponse } from "@/types/OrderSuccess";
import mockOrderSuccess from "@/mock/OrderSuccessMockData"; // 

const OrderSuccessPage = () => {
  const location = useLocation();
  const state = location.state as OrderSuccessResponse | undefined;

  const finalState = state ?? mockOrderSuccess;

  return (
    
    <div style={{ maxWidth: "840px", margin: "60px auto 0", padding: "24px 12px" }}>
      <OrderSuccessHeader orderCode={finalState.orderCode} />
      <OrderSuccessTable orders={finalState.orders} />
    </div>
  );
};

export default OrderSuccessPage;
