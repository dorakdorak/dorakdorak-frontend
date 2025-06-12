import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyPageSummary, MyCustomDosirak } from '@/types/Mypage';
import { fetchMyCustomDosiraks, fetchMyPageSummary } from '@/api/Mypage';

import styles from '@/css/main/MyCustomDosiraks.module.css';

import CustomDosirakList from '@/components/mypage/CustomDosirakList';
import OrderSummaryStatus from '@/components/mypage/OrderSummaryStatus';
import LoadingSpinner from '@/components/common/LoadingSpinner';

function MyCustomDosiraks() {
    const navigate = useNavigate();

    const [userSummary, setUserSummary] = useState<MyPageSummary | null>(null); // 사용자 정보
    const [customDosirakList, setCustomDosirakList] = useState<MyCustomDosirak[]>([]);    // 커스텀 도시락 배열

    useEffect(() => {
        const loadData = async () => {
            try {
                const [summaryData, dosirakData] = await Promise.all([
                    fetchMyPageSummary(),
                    fetchMyCustomDosiraks()
                ]);

                setUserSummary(summaryData);
                setCustomDosirakList(dosirakData.customDosiraks);

            } catch (error) {
                console.error('나의 커스텀 도시락 목록 불러오기 실패:', error);
            }
        };

        loadData();
    }, []);

    // 도시락 생성하기 버튼 클릭시 실행
    const handleAddDosirak = () => {
        navigate('/mypage/custom-dosirak/create');
    };

    // 페이지 로딩시 스피너 리턴
    if (!userSummary) { return <LoadingSpinner />;}

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
            />
        </div>
    );
}

export default MyCustomDosiraks;
