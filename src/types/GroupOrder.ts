export default interface GroupOrderItem {
    dosirakId: number;
    name: string;
    category: string;
    price: number;
    count: number;
}

export interface GroupOrderRequest {
    arriveAt: string;
    arriveTime: string;
    dosirakId?: number;
}