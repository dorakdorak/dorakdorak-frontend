import { useState, useEffect } from 'react';
import { fetchMyGroupOrders, fetchMyPageSummary } from '@/api/Mypage';
import { MyPageSummary } from '@/types/Mypage';

import styles from '@/css/main/MyGroupOrders.module.css';

import OrderHistoryList from '@/components/mypage/OrderHistoryList';
import OrderSummaryStatus from '@/components/mypage/OrderSummaryStatus';
import LoadingSpinner from '@/components/common/LoadingSpinner';

function MyGroupOrders () {
    const [userSummary, setUserSummary] = useState<MyPageSummary | null>(null); // 사용자 정보
    const [groupOrder, setGroupOrder] = useState([]);   // 공동 주문 내역

    useEffect(() => {
        const loadData = async () => {
            try {
                const [summaryData, orderData] = await Promise.all([
                    fetchMyPageSummary(),
                    fetchMyGroupOrders()
                ]);

                setGroupOrder(orderData.orders);
                setUserSummary(summaryData);
            } catch (error) {
                console.error("공동 주문 데이터 불러오기 실패:", error);
            }
        };

        loadData();
    }, []);

    // 주문 취소 버튼 클릭시 실행
    const handleOrderCancel = (orderId: number) => {
        // TODO: 여기서 주문 취소로 이어져야합니다.
        setGroupOrder(prev =>
            prev.map(group =>
                group.orderId === orderId
                    ? {
                        ...group,
                        canCancel: false,
                        items: group.items.map(item => ({
                            ...item,
                            orderStatus: '주문 취소'
                        }))
                    }
                    : group
            )
        );
    };

    // 페이지 로딩시 스피너 리턴
    if (!userSummary) { return <LoadingSpinner />;}

    return (
        <div className={styles.groupOrdersPage}>
            {/* 사용자 정보 및 주문 통계 컴포넌트 */}
            <OrderSummaryStatus
                userName={userSummary.name}
                userEmail={userSummary.email}
                normalOrderAmount={userSummary.normalOrderAmount}
                groupOrderAmount={userSummary.groupOrderAmount}
                customDosirakAmount={userSummary.customDosirakAmount}
            />

            {/* 섹션 제목 */}
            <h1>공동 주문 내역</h1>

            {/* 공동주문 내역 목록 컴포넌트 */}
            <OrderHistoryList
                orderGroups={groupOrder}
                onCancelClick={handleOrderCancel}
                showMoreButton={false}
                hideOrderHeader={false}
            />
        </div>
    );
};

export default MyGroupOrders;
