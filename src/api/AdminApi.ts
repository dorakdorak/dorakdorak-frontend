import axiosInstance from "@/api/axiosInstance";
import { AdminOrderResponse } from "@/types/AdminManagement";

/* 어드민 주문 상태 조회 */
export async function fetchAdminOrderList(orderId?: number): Promise<AdminOrderResponse[]> {
  try {
    const response = await axiosInstance.get("/api/admin/orders", {
      params: orderId ? { orderId: orderId } : {},
    });
    console.log(response.data.orders);

    return response.data.orders;
  } catch (error) {
    console.error("주문 목록 불러오기 실패:", error);
    throw error;
  }
}

/* 어드민 주문 상태 변경 */
export async function updateAdminOrderStatus(
  orderId: number,
  newStatus: AdminOrderResponse["orderStatus"]
): Promise<void> {
  try {
    await axiosInstance.patch(`/api/admin/orders/${orderId}/status`, {
      orderStatus: newStatus,
    });
  } catch (error) {
    console.error(`주문 상태 변경 실패 (orderId: ${orderId})`, error);
    throw error;
  }
}

/* 커스텀 도시락 정식 등록 요청 */
export async function registerCustomDosirak(customDosirakId: number): Promise<void> {
  try {
    await axiosInstance.post("/api/admin/custom-dosiraks", {
      customDosirakId,
    });
  } catch (error) {
    console.error(`커스텀 도시락 등록 실패 (ID: ${customDosirakId})`, error);
    throw error;
  }
}
