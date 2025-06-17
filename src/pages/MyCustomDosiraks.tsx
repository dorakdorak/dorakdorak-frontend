import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyPageSummary, MyCustomDosirak } from '@/types/Mypage';
import { fetchMyCustomDosiraks, fetchMyPageSummary } from '@/api/Mypage';

import styles from '@/css/main/MyCustomDosiraks.module.css';

import CustomDosirakList from '@/components/mypage/CustomDosirakList';
import OrderSummaryStatus from '@/components/mypage/OrderSummaryStatus';
import Spinner from '@/components/common/Spinner';

function MyCustomDosiraks() {
    const navigate = useNavigate();

    const [userSummary, setUserSummary] = useState<MyPageSummary | null>(null); // 사용자 정보
    const [customDosirakList, setCustomDosirakList] = useState<MyCustomDosirak[]>([]);    // 커스텀 도시락 배열
    const [lastDosirakId, setLastDosirakId] = useState<number | undefined>(undefined); // 마지막 도시락 ID
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 여부
    const [isLoading, setIsLoading] = useState(false); // 로딩 중 여부

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement | null>(null);

    // 커스텀 도시락 불러오기 함수
    const loadDosiraks = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        try {
            const res = await fetchMyCustomDosiraks(lastDosirakId, 12);
            const newList = res.customDosiraks;

            setCustomDosirakList(prev => [...prev, ...newList]);

            if (newList.length < 12) {
                setHasMore(false);
            } else {
                setLastDosirakId(newList[newList.length - 1].dosirakId);
            }
        } catch (error) {
            console.error('커스텀 도시락 정보를 불러오는데 문제가 발생했습니다.', error);
        } finally {
            setIsLoading(false);
        }
    }, [lastDosirakId, isLoading, hasMore]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [summaryData] = await Promise.all([
                    fetchMyPageSummary()
                ]);

                setUserSummary(summaryData);
                await loadDosiraks();
            } catch (error) {
                console.error('커스텀 도시락 정보를 불러오는데 문제가 발생했습니다.', error);
            }
        };

        loadData();
    }, []);

    // IntersectionObserver로 마지막 요소 감지
    useEffect(() => {
        if (!hasMore || isLoading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                loadDosiraks();
            }
        });

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => observer.current?.disconnect();
    }, [customDosirakList, hasMore, isLoading, loadDosiraks]);

    // 도시락 생성하기 버튼 클릭시 실행
    const handleAddDosirak = () => {
        navigate('/custom-dosirak');
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
        <div className={styles.customDosirakPage}>
            {/* 사용자 정보 및 주문 통계 컴포넌트 */}
            <OrderSummaryStatus
                userName={userSummary.name}
                userEmail={userSummary.email}
                normalOrderAmount={userSummary.normalOrderAmount}
                groupOrderAmount={userSummary.groupOrderAmount}
                customDosirakAmount={userSummary.customDosirakAmount}
            />

            {/* 섹션 제목 및 버튼 */}
            <div className={styles.pageHeader}>
                <h1>나만의 도시락 등록 내역</h1>
                <button className={styles.addDosirakBtn} onClick={handleAddDosirak}>
                    나만의 도시락 생성
                </button>
            </div>

            {/* 커스텀 도시락 목록 컴포넌트 */}
            <CustomDosirakList
                dosirakList={customDosirakList}
                showMoreButton={false}
                hideHeader={false}
                lastElementRef={lastElementRef}
            />

            {/* 로딩 중일 때 하단 스피너 */}
            {isLoading && (
                <div className={styles.spinnerBottomWrapper}>
                    <Spinner />
                </div>
            )}
        </div>
    );
}

export default MyCustomDosiraks;
