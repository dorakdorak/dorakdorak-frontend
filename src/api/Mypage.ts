import axiosInstance from "@/api/axiosInstance";
import {
    MyOrderResponse,
    MyCustomDosirakResponse,
    MyOrderPreviewResponse,
    MyPageSummary,
} from "@/types/Mypage";

export const fetchMyNormalOrders = async (
        orderId?: number,
        count: number = 12
    ): Promise<MyOrderResponse> => {
    try {
        const response = await axiosInstance.get("/api/members/orders/normal", {
            params: { orderId, count },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("일반 주문 데이터 조회 실패");
        throw error;
    }
};

export const fetchMyGroupOrders = async (
        orderId?: number,
        count: number = 12
    ): Promise<MyOrderResponse> => {
    try {
        const response = await axiosInstance.get("/api/members/orders/group", {
            params: { orderId, count },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("공동 주문 데이터 조회 실패");
        throw error;
    }
};

export const fetchMyCustomDosiraks = async (
        orderId?: number,
        count: number = 12
    ): Promise<MyCustomDosirakResponse> => {
    try {
        const response = await axiosInstance.get("/api/members/custom-dosirak", {
            params: { orderId, count },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("나의 커스텀 도시락 데이터 조회 실패");
        throw error;
    }
};

export const fetchMyNormalOrdersPreview = async (): Promise<MyOrderPreviewResponse> => {
    try {
        const response = await axiosInstance.get("/api/members/orders/normal/preview");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("일반 주문 프리뷰 데이터 조회 실패");
        throw error;
    }
};

export const fetchMyGroupOrdersPreview = async (): Promise<MyOrderPreviewResponse> => {
    try {
        const response = await axiosInstance.get("/api/members/orders/group/preview");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("공동 주문 프리뷰 데이터 조회 실패");
        throw error;
    }
};

export const fetchMyCustomDosiraksPreview = async (): Promise<MyCustomDosirakResponse> => {
    try {
        const response = await axiosInstance.get("/api/members/custom-dosirak/preview");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("나의 커스텀 도시락 프리뷰 데이터 조회 실패");
        throw error;
    }
};

export const fetchMyPageSummary = async (): Promise<MyPageSummary> => {
    try {
        const response = await axiosInstance.get("/api/members/orders/summary");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("마이페이지 요약 데이터 조회 실패");
        throw error;
    }
};

export const cancelOrder = async (orderId: number): Promise<void> => {
    try {
        await axiosInstance.delete(`/api/members/orders/${orderId}`);
        console.log("주문 취소 완료");
    } catch (error) {
        console.error("주문 취소 실패");
        throw error;
    }
};
