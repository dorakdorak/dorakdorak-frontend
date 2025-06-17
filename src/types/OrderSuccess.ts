export interface OrderItem {
  imageUrl: string;
  name: string;
  price: number;
  amount: number;
  orderStatus: string;
}

export interface OrderSuccessResponse {
  orderCode: string;
  orders: OrderItem[];
}