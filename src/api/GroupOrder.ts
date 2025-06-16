import GroupOrderItem, { GroupOrderRequest } from "@/types/GroupOrder";
import axiosInstance from "@/api/axiosInstance";

export async function fetchGroupOrders(request: GroupOrderRequest) {
  try {
    const response = await axiosInstance.get<{ orders: GroupOrderItem[] }>(
      "/api/orders/group",
      {
        params: request,
      }
      );
      console.log(response.data.orders);
      
    return response.data.orders;
  } catch (error) {
    console.error("공동 주문 목록 조회 실패:", error);
    throw error;
  }
}
