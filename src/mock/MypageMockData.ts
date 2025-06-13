// src/mock/mypage/mockMyNormalOrders.ts

import { MyOrder, MyPageSummary, MyCustomDosirak, MyOrderPreview } from '@/types/Mypage';

const logo = '/images/logo2.png';

export const mockSummary: MyPageSummary = {
    name: '도락도락',
    email: 'dorak@dorakdorak.store',
    normalOrderAmount: 2,
    groupOrderAmount: 2,
    customDosirakAmount: 2
};

export const mockOrders: MyOrder[] = [
    {
        orderId: 1,
        orderCode: 'ord_20250612_0000001',
        orderDate: '2025-06-12T12:00:00Z',
        items: [
            {
                name: '단백질 도시락',
                imageUrl: logo,
                price: 7800,
                amount: 1,
                orderStatus: 'PAYMENT_PENDING'
            },
            {
                name: '다이어트 도시락',
                imageUrl: logo,
                price: 7200,
                amount: 2,
                orderStatus: 'PAYMENT_COMPLETED'
            }
        ]
    },
    {
        orderId: 2,
        orderCode: 'ord_20250611_0000002',
        orderDate: '2025-06-11T14:30:00Z',
        items: [
            {
                name: '웰빙 도시락',
                imageUrl: logo,
                price: 6500,
                amount: 1,
                orderStatus: 'PAYMENT_CANCELED'
            }
        ]
    }
];

export const mockCustomDosiraks: MyCustomDosirak[] = [
    {
        name: '탄단지 밸런스 도시락',
        imageUrl: logo,
        createdAt: '2025-06-01T10:00:00Z'
    },
    {
        name: '비건 채식 도시락',
        imageUrl: logo,
        createdAt: '2025-06-08T15:30:00Z'
    }
];

export const mockNormalPreview: MyOrderPreview[] = [
    {
        name: '고단백 도시락',
        imageUrl: logo,
        price: 7200,
        amount: 1,
        orderDate: '2025-06-10T10:00:00Z',
        orderStatus: 'PAYMENT_COMPLETED'
    },
    {
        name: '웰빙 도시락',
        imageUrl: logo,
        price: 6800,
        amount: 2,
        orderDate: '2025-06-10T10:00:00Z',
        orderStatus: 'PAYMENT_COMPLETED'
    }
];

export const mockGroupPreview: MyOrderPreview[] = [
    {
        name: '공동 구매 도시락 A',
        imageUrl: logo,
        price: 5800,
        amount: 1,
        orderDate: '2025-06-09T15:30:00Z',
        orderStatus: 'GONGGU_OPEN'
    }
];

export const mockCustomDosiraksPreview: MyCustomDosirak[] = [
    {
        name: '비건 도시락',
        imageUrl: logo,
        createdAt: '2025-06-03T14:00:00Z'
    },
    {
        name: '헬시 고구마 도시락',
        imageUrl: logo,
        createdAt: '2025-06-05T09:00:00Z'
    }
];
