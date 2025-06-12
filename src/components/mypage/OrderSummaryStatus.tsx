import styles from '@/css/mypage/OrderSummaryStatus.module.css';
import { useNavigate } from 'react-router-dom';

interface OrderSummaryStatusProps {
    userName: string;               // 사용자 이름
    userEmail: string;              // 사용자 이메일
    normalOrderAmount: number;      // 일반주문 개수
    groupOrderAmount: number;       // 공동주문 개수
    customDosirakAmount: number;    // 나의 커스텀 도시락 개수
}

const OrderSummaryStatus = (props: OrderSummaryStatusProps) => {

    const navigate = useNavigate();

    const onNormalOrderClick = () => {
        navigate('/mypage/normal-orders');
    };

    const onGroupOrderClick = () => {
        navigate('/mypage/group-orders');
    };

    const onCustomDosirakClick = () => {
        navigate('/mypage/custom-dosirak');
    };

    return (
        <div className={styles.orderSummaryStatus}>
            {/* 사용자 정보 섹션 */}
            <div className={styles.userInfo}>
                <h2>{props.userName} 고객님, 안녕하세요!</h2>
                <p className={styles.userEmail}>{props.userEmail}</p>
            </div>
            
            {/* 주문 통계 */}
            <div className={styles.statusCards}>
                {/* 일반 주문 */}
                <div className={styles.statusCard} onClick={onNormalOrderClick}>
                    <div className={styles.statusLabel}>일반주문</div>
                    <div className={styles.statusValue}>{props.normalOrderAmount}</div>
                </div>
                {/* 공동 주문 */}
                <div className={styles.statusCard} onClick={onGroupOrderClick}>
                    <div className={styles.statusLabel}>공동주문</div>
                    <div className={styles.statusValue}>{props.groupOrderAmount}</div>
                </div>
                {/* 나의 커스텀 도시락 */}
                <div className={styles.statusCard} onClick={onCustomDosirakClick}>
                    <div className={styles.statusLabel}>나만의 도시락</div>
                    <div className={styles.statusValue}>{props.customDosirakAmount}</div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummaryStatus;
