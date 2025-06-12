import axiosInstance from "@/api/axiosInstance";
import { MyOrderResponse, MyCustomDosirakResponse,  MyOrderPreviewResponse, MyPageSummary, } from "@/types/Mypage";

export const fetchMyNormalOrders = async (): Promise<MyOrderResponse> => {
    try {
        const response = await axiosInstance.get('/members/orders/normal');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('일반 주문 데이터 조회 실패:', error);
        throw error;
    }
};


export const fetchMyGroupOrders = async (): Promise<MyOrderResponse> => {
    try {
        const response = await axiosInstance.get('/members/orders/group');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('공동 주문 데이터 조회 실패:', error);
        throw error;
    }
};


export const fetchMyCustomDosiraks = async (): Promise<MyCustomDosirakResponse> => {
    try {
        const response = await axiosInstance.get('/members/custom-dosirak');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('나의 커스텀 도시락 데이터 조회 실패:', error);
        throw error;
    }
};


export const fetchMyNormalOrdersPreview = async (): Promise<MyOrderPreviewResponse> => {
    try {
        const response = await axiosInstance.get('/members/orders/normal/preview');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('일반 주문 프리뷰 데이터 조회 실패:', error);
        throw error;
    }
};


export const fetchMyGroupOrdersPreview = async (): Promise<MyOrderPreviewResponse> => {
    try {
        const response = await axiosInstance.get('/members/orders/group/preview');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('공동 주문 프리뷰 데이터 조회 실패:', error);
        throw error;
    }
};

export const fetchMyCustomDosiraksPreview = async (): Promise<MyCustomDosirakResponse> => {
    try {
        const response = await axiosInstance.get('/members/custom-dosirak/preview');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('나의 커스텀 도시락 프리뷰 데이터 조회 실패:', error);
        throw error;
    }
};

export const fetchMyPageSummary = async (): Promise<MyPageSummary> => {
    try {
        const response = await axiosInstance.get('/members/orders/summary');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('마이페이지 요약 데이터 조회 실패:', error);
        throw error;
    }
};