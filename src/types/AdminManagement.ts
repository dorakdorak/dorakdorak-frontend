import { OrderStatusCode } from "@/constants/orderStatus";

export interface AdminOrderResponse {
  orderId: number;
  orderCode: string;
  type: "SINGLE" | "GROUP";
  price: number;
  arrivedAt: string;
  orderStatus: OrderStatusCode;
}

export interface AdminCustomsDosiraksResponse {
  customdosirakId: number;
  name: string;
  imageUrl: string;
  voteCount: number;
}

export interface AdminPopularDosirakResponse {
  rank: number;
  dosirakId: number;
  name: string;
  imageUrl: string;
  count: number;
}
