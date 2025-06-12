import styles from '@/css/mypage/OrderHistoryList.module.css';
import { MyOrder, MyOrderItem } from '@/types/Mypage'; 
import { ORDER_STATUS_KR } from '@/constants/orderStatus';

interface OrderHistoryListProps {
    orderGroups: MyOrder[];                     // 주문 배열
    title?: string;                             // 상단 제목 (ex: 전체 주문 내역)
    onCancelClick?: (orderId: number) => void;  // 주문 취소 버튼 클릭시 실행할 함수
    showMoreButton?: boolean;                   // 더보기 활성화 여부
    onMoreClick?: () => void;                   // 더보기 클릭시 실행할 함수
    hideOrderHeader?: boolean;                  // 주문별 헤더 (주문번호, 취소버튼) 활성화 여부
    limitItems?: number;                        // 주문 1건당 최대 몇개까지 보여줄지 제한
}

const OrderHistoryList = (props: OrderHistoryListProps) => {
    
    // 주문 취소 버튼 클릭시 실행
    const handleCancelClick = (orderId: number, canCancel: boolean) => {
        if (canCancel && props.onCancelClick) {
            props.onCancelClick(orderId);
        }
    };

    // 더보기 버튼 클릭시 실행
    const handleMoreClick = () => {
        if (props.onMoreClick) {
            props.onMoreClick();
        }
    };

    // 주문 총액 계산 함수
    const calculateTotalAmount = (items: MyOrderItem[]) =>
        items.reduce((sum, item) => sum + item.price * item.amount, 0);

    // 보여줄 주문 그룹 제한 처리
    const displayOrderGroups = props.limitItems
        ? props.orderGroups.map(order => ({
            ...order,
            items: order.items.slice(0, props.limitItems)
        }))
        : props.orderGroups;

    return (
        <div className={styles.orderHistoryList}>
            {/* 섹션 헤더 - 제목과 더보기 버튼 */}
            <div className={styles.sectionHeader}>
                {props.title && <h3>{props.title}</h3>}
                {props.showMoreButton && (
                    <button className={styles.moreButton} onClick={handleMoreClick}>
                        더보기 &gt;
                    </button>
                )}
            </div>
            
            {/* 주문 내역들 */}
            <div className={styles.orderGroups}>
                {displayOrderGroups.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>주문 내역이 없습니다.</p>
                    </div>
                ) : (
                    displayOrderGroups.map((order) => {
                        const totalAmount = calculateTotalAmount(order.items);
                        // 결제 대기, 결제 완료, 공구 모집인 경우에만 주문 취소 활성화
                        const cancelStatus = ['PAYMENT_PENDING', 'PAYMENT_COMPLETED', 'GONGGU_OPEN'];
                        const canCancel = order.items.every(item => cancelStatus.includes(item.orderStatus));
                        console.log(order.items.map(i => `[${i.name}] = ${i.orderStatus}`));


                        return (
                            <div key={order.orderId} className={styles.orderGroup}>
                                {!props.hideOrderHeader && (
                                    <div className={styles.orderInfoHeader}>
                                        <div className={styles.orderHeaderLeft}>
                                            <div className={styles.orderIdSection}>
                                                <span className={styles.orderIdLabel}>주문일(주문번호)</span>
                                                <span className={styles.orderId}>
                                                    {new Date(order.orderDate).toLocaleDateString('ko-KR')} ({order.orderCode})
                                                </span>
                                            </div>
                                            <div className={styles.totalAmountSection}>
                                                <span className={styles.totalAmountLabel}>최종결제금액</span>
                                                <span className={styles.totalAmount}>
                                                    {totalAmount.toLocaleString()} 원
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            className={`${styles.orderCancelButton} ${!canCancel ? 'disabled' : ''}`}
                                            onClick={() => handleCancelClick(order.orderId, canCancel)}
                                            disabled={!canCancel}
                                        >
                                            주문 취소
                                        </button>
                                    </div>
                                )}
                                
                                <div className={styles.orderList}>
                                    {order.items.map((item, index) => (
                                        <div
                                            key={`${order.orderId}_${index}`}
                                            className={styles.orderItem}
                                        >
                                            <div className={styles.orderImage}>
                                                <img src={item.imageUrl} alt={item.name} />
                                            </div>
                                            <div className={styles.orderDetails}>
                                                <div className={styles.orderInfo}>
                                                    <div className={styles.orderName}>{item.name}</div>
                                                    <div className={styles.orderMeta}>
                                                        <span>단가: {item.price.toLocaleString()}원</span>
                                                        <span>수량: {item.amount}개</span>
                                                    </div>
                                                </div>
                                                <div className={styles.orderPrice}>
                                                    {(item.price * item.amount).toLocaleString()} 원
                                                </div>
                                            </div>
                                            <div className={styles.orderStatus}>
                                                <span className={`${styles.statusBadge} ${styles[`status${(item.orderStatus || '').replace(/\s/g, '')}`]}`}>
                                                    {ORDER_STATUS_KR[item.orderStatus] ?? item.orderStatus}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default OrderHistoryList;
