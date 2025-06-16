// 나의 일반 주문 내역, 공동 주문 내역 관련

export interface MyOrderItem {
    name: string;
    imageUrl: string;
    price: number;
    amount: number;
    itemStatus: string;
}

export interface MyOrder {
    orderId: number;
    orderCode: string;
    orderDate: string;
    items: MyOrderItem[];
}

export interface MyOrderResponse {
    orders: MyOrder[];
}

export interface MyOrderPreview{
    name: string;
    imageUrl: string;
    price: number;
    amount: number;
    orderDate: string;
    itemStatus: string;
}

export interface MyOrderPreviewResponse{
    orders: MyOrderPreview[];
}

// 나의 커스텀 도시락 내역 관련
export interface MyCustomDosirak {
    name: string;
    imageUrl: string;
    createdAt: string;
}

export interface MyCustomDosirakResponse {
    customDosiraks: MyCustomDosirak[];
}

export interface MyPageSummary {
    name: string;
    email: string;
    normalOrderAmount: number;
	groupOrderAmount: number;
	customDosirakAmount: number;
}