import { useState, useEffect } from "react";
import { AdminOrderResponse } from "@/types/AdminManagement";
import { mockOrders } from "@/mock/AdminOrders";
import AdminOrderList from "@/components/adminManagement/AdminOrderList";

export default function AdminPage() {
  const [orders, setOrders] = useState<AdminOrderResponse[]>([]);

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  useEffect(() => {
    setOrders(mockOrders);
  }, []);

  const handleStatusChange = (orderId: number, newStatus: AdminOrderResponse["orderStatus"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    // 서버 API 호출 예시
    // axios.patch(`/api/orders/${orderId}/status`, { status: newStatus });
  };

  return <AdminOrderList orders={orders} onStatusChange={handleStatusChange} />;
}
