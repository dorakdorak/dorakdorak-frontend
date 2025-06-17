// 주문 아이템 요청용
export interface OrderItemRequest {
  dosirakId: number;
  count: number;
}

// 단일 주문 요청
export interface SinglePaymentPrepareRequest {
  orderItems: OrderItemRequest[];
}

// 공구 주문 요청
export interface GroupPaymentPrepareRequest {
  orderItems: OrderItemRequest[];
  arriveAt: string; // YYYY-MM-DD
  arriveTime: number; // 시간 인덱스 (예: 1 = 오전 11시)
}

// 주문 응답
export interface PaymentPrepareResponse {
  orderId: string;
  amount: number;
  orderName: string;
  customerName: string;
  customerEmail: string;
}

// 결제 승인 요청
export interface PaymentConfirmRequest {
  orderId: string;
  paymentKey: string;
  amount: number;
}

// 결제 승인 응답
export interface PaymentConfirmResponse {
  orderCode: string;
  orders: ConfirmedOrder[];
}

export interface ConfirmedOrder {
  imageUrl: string;
  name: string;
  price: number;
  amount: number;
  orderStatus: string;
}
