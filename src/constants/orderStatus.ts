export const ORDER_STATUS_KR: Record<string, string> = {
  PAYMENT_PENDING: "결제 대기",
  PAYMENT_COMPLETED: "결제 완료",
  PAYMENT_FAILED: "결제 실패",
  PAYMENT_CANCELLED: "결제 취소",
  GONGGOO_OPEN: "모집중",
  GONGGOO_CONFIRMED: "모집 마감",
  DELIVERY_IN_PROGRESS: "배송 진행 중",
  DELIVERY_COMPLETED: "배송 완료",
};

export const ORDER_STATUS_LIST = [
  { code: "PAYMENT_COMPLETED", label: "결제 완료" },
  { code: "GONGGOO_CONFIRMED", label: "공구 모집 마감" },
  { code: "DELIVERY_READY", label: "배송 준비 중" },
  { code: "DELIVERY_IN_PROGRESS", label: "배송 중" },
  { code: "DELIVERY_COMPLETED", label: "배송 완료" },
] as const;

export type OrderStatusCode = (typeof ORDER_STATUS_LIST)[number]["code"];
