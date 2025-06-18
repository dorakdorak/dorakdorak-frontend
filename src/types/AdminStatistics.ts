export interface DosirakSearch {
  dosirakId: number;
  name: string;
}

export interface SalesResponse{
  day: string;
  count: number;
}

export interface PopularResponse{
  rank: number;
  dosirakId: number;
  name: string;
  imageUrl: string;
  count: number;
}

export interface OrderResponse{
  single: number;
  group: number;
}