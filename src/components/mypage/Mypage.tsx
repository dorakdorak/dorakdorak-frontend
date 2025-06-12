import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '@/css/main/Mypage.module.css';

import OrderSummaryStatus from '@/components/mypage/OrderSummaryStatus';
import OrderHistoryList from '@/components/mypage/OrderHistoryList';
import CustomDosirakList from '@/components/mypage/CustomDosirakList';
import ZeroWastePromo from '@/components/mypage/ZeroWastePromo';
import Spinner from '@/components/common/Spinner';

import {
    fetchMyNormalOrdersPreview,
    fetchMyGroupOrdersPreview,
    fetchMyCustomDosiraksPreview,
    fetchMyPageSummary
} from '@/api/Mypage';

import {
    MyOrderPreview,
    MyCustomDosirak,
    MyOrder,
    MyPageSummary
} from '@/types/Mypage';

function Mypage() {
    const navigate = useNavigate();
    const contentLayoutRef = useRef<HTMLDivElement>(null);

    const [userSummary, setUserSummary] = useState<MyPageSummary | null>(null);        // 사용자 요약 정보
    const [normalOrder, setNormalOrder] = useState<MyOrder[]>([]);                     // 일반 주문 미리보기
    const [groupOrder, setGroupOrder] = useState<MyOrder[]>([]);                       // 공동 주문 미리보기
    const [customDosirakList, setCustomDosirakList] = useState<MyCustomDosirak[]>([]); // 커스텀 도시락 미리보기

    // 각 박스 높이를 맞춰주는 함수
    const equalizeBoxHeights = () => {
        if (!contentLayoutRef.current) return;

        const boxes = contentLayoutRef.current.querySelectorAll(
            `.${styles.orderHistoryList}, .${styles.customDosirakList}, .${styles.zeroWastePromo}`
        );

        let maxHeight = 0;

        // 일단 높이 초기화
        boxes.forEach((box) => {
            (box as HTMLElement).style.height = 'auto';
        });

        // 최대 높이 계산
        boxes.forEach((box) => {
            const height = (box as HTMLElement).offsetHeight;
            maxHeight = Math.max(maxHeight, height);
        });

        // 최소 높이 보장
        maxHeight = Math.max(maxHeight, 280);

        // 다시 모든 박스에 동일한 높이 적용
        boxes.forEach((box) => {
            (box as HTMLElement).style.height = `${maxHeight}px`;
        });
    };

    // 프리뷰 데이터를 MyOrder 형식으로 변환
    const mapPreviewsToSingleOrder = (previews: MyOrderPreview[]): MyOrder[] => {
        if (previews.length === 0) return [];

        const orderDate = previews[0].orderDate;

        const order: MyOrder = {
            // 아래 3개는 형식적인 값임
            orderId: 0,         // 프리뷰 ID
            orderCode: 'PRE',   // 프리뷰 코드
            orderDate,          // 프리뷰 데이트

            // 실제 데이터
            items: previews.map((data) => ({
                name: data.name,
                imageUrl: data.imageUrl,
                price: data.price,
                amount: data.amount,
                orderStatus: data.orderStatus
            })),
        };

        return [order];
    };

    // 데이터 로딩
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [normalPreview, groupPreview, customPreview, summary] = await Promise.all([
                    fetchMyNormalOrdersPreview(),
                    fetchMyGroupOrdersPreview(),
                    fetchMyCustomDosiraksPreview(),
                    fetchMyPageSummary()
                ]);

                // 각 프리뷰 데이터를 하나의 주문으로 묶음
                const normalOrders: MyOrder[] = mapPreviewsToSingleOrder(normalPreview.orders);
                const groupOrders: MyOrder[] = mapPreviewsToSingleOrder(groupPreview.orders);

                setNormalOrder(normalOrders);
                setGroupOrder(groupOrders);
                setCustomDosirakList(customPreview.customDosiraks);
                setUserSummary(summary);
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
            }
        };

        fetchData();
    }, []);

    // 내용 높이 정렬 - 데이터 변경될 때
    useEffect(() => {
        const timer = setTimeout(() => {
            equalizeBoxHeights();
        }, 100);
        return () => clearTimeout(timer);
    }, [normalOrder, groupOrder, customDosirakList]);

    // 창 크기 변경될 때 높이 다시 맞춤
    useEffect(() => {
        const handleResize = () => {
            equalizeBoxHeights();
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 네비게이션 핸들러
    const handleNormalOrderMore = () => navigate('/mypage/normal-orders');
    const handleGroupOrderMore = () => navigate('/mypage/group-orders');
    const handleCustomDosirakMore = () => navigate('/mypage/custom-dosirak');
    const handleZeroWasteClick = () => navigate('/zero-waste');

    // 페이지 로딩시 스피너 리턴
    if (!userSummary) {
        return (
            <div className={styles.spinnerFullPageWrapper}>
                <Spinner />
            </div>
        );
    }

    return (
        <div className={styles.mypageContainer}>
            {/* 상단 사용자 요약 정보 및 주문 통계 */}
            <OrderSummaryStatus
                userName={userSummary.name}
                userEmail={userSummary.email}
                normalOrderAmount={userSummary.normalOrderAmount}
                groupOrderAmount={userSummary.groupOrderAmount}
                customDosirakAmount={userSummary.customDosirakAmount}
            />

            {/* 본문 그리드 레이아웃 */}
            <div className={styles.contentLayout} ref={contentLayoutRef}>
                {/* 왼쪽: 일반 주문 + 제로웨이스트 */}
                <div className={styles.leftColumn}>
                    <OrderHistoryList
                        orderGroups={normalOrder}
                        title="일반 주문 내역"
                        showMoreButton={true}
                        onMoreClick={handleNormalOrderMore}
                        hideOrderHeader={true}
                        hideStatusBadge={true}
                        limitItems={3}
                    />
                    <ZeroWastePromo onClick={handleZeroWasteClick} />
                </div>

                {/* 오른쪽: 공동 주문 + 나만의 도시락 */}
                <div className={styles.rightColumn}>
                    <OrderHistoryList
                        orderGroups={groupOrder}
                        title="공동 주문 내역"
                        showMoreButton={true}
                        onMoreClick={handleGroupOrderMore}
                        hideOrderHeader={true}
                        hideStatusBadge={true}
                        limitItems={3}
                    />
                    <CustomDosirakList
                        dosirakList={customDosirakList}
                        title="나만의 도시락 등록 내역"
                        showMoreButton={true}
                        onMoreClick={handleCustomDosirakMore}
                        hideHeader={true}
                        limitItems={3}
                    />
                </div>
            </div>
        </div>
    );
}

export default Mypage;
