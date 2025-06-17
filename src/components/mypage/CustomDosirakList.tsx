import styles from '@/css/mypage/CustomDosirakList.module.css';
import { RefObject } from 'react';

interface CustomDosirakItem {
    name: string;       // 도시락 이름
    imageUrl: string;   // 도시락 사진
    createdAt: string;  // 도시락 생성일자
}

interface CustomDosirakListProps {
    dosirakList: CustomDosirakItem[];   // 도시락 배열
    title?: string;                     // 상단 제목 (ex: 커스텀 도시락 주문 내역)
    showMoreButton?: boolean;           // 더보기 활성화 여부
    onMoreClick?: () => void;           // 더보기 클릭시 실행할 함수
    hideHeader?: boolean;               // 헤더 숨김 여부
    limitItems?: number;                // 최대 몇개까지 도시락 보여줄지 제한
    lastElementRef?: RefObject<HTMLDivElement>; // 마지막 요소 감지를 위한 ref
}

const CustomDosirakList = (props: CustomDosirakListProps) => {

    const handleMoreClick = () => {
        if (props.onMoreClick) {
            props.onMoreClick();
        }
    };

    // 최신순 정렬
    const sortedDosirakList = [...props.dosirakList].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const displayDosirakList = props.limitItems 
        ? sortedDosirakList.slice(0, props.limitItems)
        : sortedDosirakList;

    return (
        <div className={styles.customDosirakList}>
            {/* 섹션 헤더 - 제목과 더보기 버튼 */}
            <div className={styles.sectionHeader}>
                <h3>{props.title}</h3>
                {props.showMoreButton && (
                    <button className={styles.moreButton} onClick={handleMoreClick}>
                        더보기 &gt;
                    </button>
                )}
            </div>
            
            {/* 테이블 헤더 - hideHeader가 false일 때만 표시 */}
            {!props.hideHeader && (
                <div className={styles.tableHeader}>
                    <div className={styles.headerItem}>도시락명</div>
                    <div className={styles.headerItem}></div>
                    <div className={styles.headerItem}>등록 일자</div>
                </div>
            )}
            
            {/* 도시락 목록 */}
            <div className={styles.dosirakList}>
                {displayDosirakList.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>등록된 커스텀 도시락이 없습니다.</p>
                    </div>
                ) : (
                    displayDosirakList.map((dosirak, index) => (
                        <div 
                            key={dosirak.name + dosirak.createdAt}
                            className={styles.dosirakItem}
                            ref={
                                index === displayDosirakList.length - 1
                                    ? props.lastElementRef
                                    : undefined
                            }
                        >
                            <div className={styles.dosirakImage}>
                                <img src={dosirak.imageUrl} alt={dosirak.name} />
                            </div>
                            <div className={styles.dosirakDetails}>
                                <div className={styles.dosirakName}>{dosirak.name}</div>
                            </div>
                            <div className={styles.dosirakDate}>
                                {new Date(dosirak.createdAt).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomDosirakList;
