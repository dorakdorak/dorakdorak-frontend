import styles from '@/css/mypage/ZeroWastePromo.module.css';

interface ZeroWastePromoProps {
    onClick: () => void;
}

const ZeroWastePromo = ({ onClick }: ZeroWastePromoProps) => {
    return (
        <div className={styles.zeroWastePromo} onClick={onClick}>
            <div className={styles.promoContent}>
                {/* 헤더 - 아이콘과 제목 */}
                <div className={styles.promoHeader}>
                    {/* 환경 관련 아이콘들 */}
                    <div className={styles.promoIcons}>
                        <div className={styles.recycleIcon}>♻</div>
                        <div className={styles.leafIcon}>🌱</div>
                        <div className={styles.earthIcon}>🌍</div>
                    </div>
                    {/* 제목 */}
                    <div className={styles.promoTitle}>
                        <h3>제로 웨이스트,</h3>
                        <h3>이제 누구나 참여할 수 있습니다.</h3>
                    </div>
                </div>
                
                {/* 콘텐츠 텍스트 */}
                <div className={styles.promoDescription}>
                    <p>도시락 다 드셨다면, 사진 한 장만 올려주세요!</p>
                    <p>AI가 잔반 여부를 분석해 인증 수가 가장 많은 대학에는</p>
                    <p>스페셜 이벤트가 기다리고 있어요! 🌱</p>
                </div>
                
                {/* 하단 배지 및 화살표 */}
                <div className={styles.promoFooter}>
                    {/* ZERO WASTE 배지 */}
                    <div className={styles.promoBadge}>
                        <span className={styles.zeroText}>ZERO</span>
                        <span className={styles.wasteText}>WASTE</span>
                    </div>
                    {/* 화살표 */}
                    <div className={styles.actionArrow}>→</div>
                </div>
            </div>
        </div>
    );
};

export default ZeroWastePromo;
