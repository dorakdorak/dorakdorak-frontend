import { useState, useEffect, useRef, useCallback } from "react";
import {
  fetchMyGroupOrders,
  fetchMyPageSummary,
  cancelOrder,
} from "@/api/Mypage";
import { MyOrder, MyPageSummary } from "@/types/Mypage";

import styles from "@/css/main/MyGroupOrders.module.css";

import OrderHistoryList from "@/components/mypage/OrderHistoryList";
import OrderSummaryStatus from "@/components/mypage/OrderSummaryStatus";
import Spinner from "@/components/common/Spinner";
import Modal from "@/components/common/Modal";

function MyGroupOrders() {
  const [userSummary, setUserSummary] = useState<MyPageSummary | null>(null); // 사용자 정보
  const [groupOrder, setGroupOrder] = useState<MyOrder[]>([]); // 공동 주문 내역
  const [lastOrderId, setLastOrderId] = useState<number | undefined>(undefined); // 마지막 주문 ID
  const [hasMore, setHasMore] = useState(true); // 더 불러올 주문이 있는지 여부
  const [isLoading, setIsLoading] = useState(false); // API 로딩 상태

  const observer = useRef<IntersectionObserver | null>(null);
  const lastOrderRef = useRef<HTMLDivElement | null>(null);

  const [showModal, setShowModal] = useState(false); // 모달 표시 여부
  const [targetOrderId, setTargetOrderId] = useState<number | null>(null); // 취소할 주문 ID

  // 주문 불러오기 함수
  const loadOrders = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const res = await fetchMyGroupOrders(lastOrderId, 6);
      const newOrders = res.orders;

      setGroupOrder((prev) => [...prev, ...newOrders]);

      if (newOrders.length < 6) {
        setHasMore(false);
      } else {
        setLastOrderId(newOrders[newOrders.length - 1].orderId);
      }
    } catch (error) {
      console.error("공동 주문 데이터를 불러오는 데 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [lastOrderId, hasMore, isLoading]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const summaryData = await fetchMyPageSummary();
        setUserSummary(summaryData);
        await loadOrders();
      } catch (error) {
        console.error("공동 주문 데이터를 불러오는 데 문제가 발생했습니다.");
      }
    };

    loadData();
  }, []);

  // IntersectionObserver로 마지막 주문 감지
  useEffect(() => {
    if (!hasMore || isLoading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadOrders();
      }
    });

    if (lastOrderRef.current) {
      observer.current.observe(lastOrderRef.current);
    }

    return () => observer.current?.disconnect();
  }, [groupOrder, hasMore, isLoading, loadOrders]);

  // 주문 취소 버튼 클릭시 실행
  const handleOrderCancelClick = (orderId: number) => {
    setTargetOrderId(orderId);
    setShowModal(true);
  };

  const handleConfirmCancel = async () => {
    if (targetOrderId === null) return;

    try {
      await cancelOrder(targetOrderId);
      //   alert("주문이 취소되었습니다.");
      window.location.reload();
    } catch (error) {
      alert("주문 취소에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setShowModal(false);
      setTargetOrderId(null);
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
        onCancelClick={handleOrderCancelClick}
        showMoreButton={false}
        hideOrderHeader={false}
        hideStatusBadge={false}
        lastElementRef={lastOrderRef}
      />

      {/* 로딩 중일 때 하단 스피너 */}
      {isLoading && (
        <div className={styles.spinnerBottomWrapper}>
          <Spinner />
        </div>
      )}
      <Modal
        message="정말 이 주문을 취소하시겠습니까?"
        show={showModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}

export default MyGroupOrders;
