import styles from "@/css/admin/Manage.module.css";
import { AdminOrderResponse } from "@/types/AdminManagement";
import OrderStatusDropdown from "@/components/adminManagement/OrderStatusDropdown";
import SectionHeader from "../common/SectionHeader";

interface Props {
  orders: AdminOrderResponse[];
  onStatusChange: (orderId: number, newStatus: AdminOrderResponse["orderStatus"]) => void;
}

export default function AdminOrderList({ orders, onStatusChange }: Props) {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title="주문 관리"></SectionHeader>

      <div className={`${styles.table}`}>
        <div className={`${styles.row} ${styles.row5} ${styles.headerRow}`}>
          <div>주문코드</div>
          <div>유형</div>
          <div>가격</div>
          <div>도착일</div>
          <div>상태</div>
        </div>

        {orders.map((order) => (
          <div className={`${styles.row} ${styles.row5}`} key={order.orderId}>
            <div>{order.orderCode}</div>
            <div>{order.type === "SINGLE" ? "일반" : "공구"}</div>
            <div>{order.price.toLocaleString()}원</div>
            <div>{order.arrivedAt}</div>
            <div>
              <OrderStatusDropdown
                currentStatus={order.orderStatus}
                onChange={(newStatus) => onStatusChange(order.orderId, newStatus)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
