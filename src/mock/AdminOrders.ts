import { AdminOrderResponse } from "@/types/AdminManagement";

export const mockOrders: AdminOrderResponse[] = [
  {
    orderId: 1,
    orderCode: "20250613_00001",
    type: "SINGLE",
    price: 12000,
    arrivedAt: "2025년 6월 15일",
    orderStatus: "PAYMENT_COMPLETED",
  },
  {
    orderId: 2,
    orderCode: "20250613_00002",
    type: "GROUP",
    price: 10000,
    arrivedAt: "2025년 6월 15일 13시",
    orderStatus: "GONGGOO_CONFIRMED",
  },
  {
    orderId: 3,
    orderCode: "20250613_00003",
    type: "SINGLE",
    price: 9500,
    arrivedAt: "2025년 6월 15일",
    orderStatus: "DELIVERY_READY",
  },
  {
    orderId: 4,
    orderCode: "20250613_00004",
    type: "GROUP",
    price: 15000,
    arrivedAt: "2025년 6월 16일 11시",
    orderStatus: "DELIVERY_IN_PROGRESS",
  },
  {
    orderId: 5,
    orderCode: "20250613_00005",
    type: "SINGLE",
    price: 11000,
    arrivedAt: "2025년 6월 17일",
    orderStatus: "DELIVERY_COMPLETED",
  },
];
