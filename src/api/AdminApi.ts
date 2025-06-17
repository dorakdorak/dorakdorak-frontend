import axiosInstance from "@/api/axiosInstance";
import { AdminOrderResponse } from "@/types/AdminManagement";
import {
  DosirakSearch,
  OrderResponse,
  PopularResponse,
  SalesResponse,
} from "@/types/AdminStatistics";

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

/* 도시락 이름으로 검색 */
export async function searchDosiraksByName(name: string): Promise<DosirakSearch[]> {
  try {
    const response = await axiosInstance.get("/api/admin/dosiraks", {
      params: { name },
    });
    return response.data.dosiraks;
  } catch (error) {
    console.error("도시락 검색 실패:", error);
    return [];
  }
}

/* 도시락별 일주일간 판매 통계 조회 */
export async function fetchSalesStatistics(dosirakId?: number): Promise<SalesResponse[]> {
  try {
    const response = await axiosInstance.get("/api/admin/statistics/sales", {
      params: dosirakId ? { dosirakId } : {},
    });
    return response.data.data;
  } catch (error) {
    console.error("판매 통계 조회 실패:", error);
    return [];
  }
}

/* 인기 도시락 통계 조회 (연령대별) */
export async function fetchPopularDosiraks(age?: number): Promise<PopularResponse[]> {
  try {
    const response = await axiosInstance.get("/api/admin/statistics/popular", {
      params: age ? { age } : {},
    });
    return response.data.items;
  } catch (error) {
    console.error("인기 도시락 통계 조회 실패:", error);
    return [];
  }
}

/* 도시락 주문 유형 비율 조회 (도시락 ID 선택적) */
export async function fetchOrderTypeRatio(dosirakId?: number): Promise<OrderResponse> {
  try {
    const response = await axiosInstance.get("/api/admin/statistics/order", {
      params: dosirakId ? { dosirakId } : {},
    });
    return response.data;
  } catch (error) {
    console.error("도시락 주문 유형 통계 조회 실패:", error);
    throw error;
  }
}
