import axiosInstance from "@/api/axiosInstance";
import {
  SinglePaymentPrepareRequest,
  GroupPaymentPrepareRequest,
  PaymentPrepareResponse,
  PaymentConfirmRequest,
  PaymentConfirmResponse,
} from "@/types/Payment";

// 일반 주문 결제 요청
export const requestSinglePayment = async (
  data: SinglePaymentPrepareRequest
): Promise<PaymentPrepareResponse> => {
  const response = await axiosInstance.post("/api/payments/request/single", data);
  return response.data;
};

// 공구 주문 결제 요청
export const requestGroupPayment = async (
  data: GroupPaymentPrepareRequest
): Promise<PaymentPrepareResponse> => {
  const response = await axiosInstance.post("/api/payments/request/group", data);
  return response.data;
};

// 결제 승인 요청
export const confirmPayment = async (
  data: PaymentConfirmRequest
): Promise<PaymentConfirmResponse> => {
  const response = await axiosInstance.post("/api/payments/confirm", data);
  return response.data;
};
