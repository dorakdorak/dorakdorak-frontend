import { useState, useEffect } from 'react';
import { fetchMyGroupOrders, fetchMyPageSummary, cancelOrder } from '@/api/Mypage';
import { MyPageSummary } from '@/types/Mypage';

import styles from '@/css/main/MyGroupOrders.module.css';

import OrderHistoryList from '@/components/mypage/OrderHistoryList';
import OrderSummaryStatus from '@/components/mypage/OrderSummaryStatus';
import Spinner from '@/components/common/Spinner';

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
                console.error("공동 주문 데이터를 불러오는 데 문제가 발생했습니다.");
            }
        };

        loadData();
    }, []);

    // 주문 취소 버튼 클릭시 실행
    const handleOrderCancel = async (orderId: number) => {
        const isConfirmed = window.confirm("정말 이 주문을 취소하시겠습니까?");
        if (!isConfirmed) return;

        try {
            await cancelOrder(orderId);
            alert('주문이 취소되었습니다.');
            window.location.reload();
        } catch (error) {
            alert('주문 취소에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    // 페이지 로딩시 스피너 리턴
    if (!userSummary) {
        return (
            <div className={styles.spinnerFullPageWrapper}>
                <Spinner />
            </div>
        );
    }

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
                hideStatusBadge={false}
            />
        </div>
    );
};

export default MyGroupOrders;
