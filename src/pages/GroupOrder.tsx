import { useEffect, useState } from "react";
import CalendarComponent from "@/components/order/Calendar";
import SectionHeader from "@/components/common/SectionHeader";
import SelectBox from "@/components/common/select/SelectBox";
import { TIME_OPTIONS } from "@/constants/times";
import styles from "@/css/order/GroupOrder.module.css";
import DosirakOrderSection from "@/components/order/DosirakOrderSection";
import { fetchGroupOrders } from "@/api/GroupOrder";
import GroupOrderItem from "@/types/GroupOrder";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

function GroupOrder() {
  const getToday = () => {
    const date = new Date();
    date.setDate(date.getDate() + 4); // 오늘에서 3일 더하기
    return date.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getToday());
  const [selectedTime, setSelectedTime] = useState<string>("9");
  const [orderList, setOrderList] = useState<GroupOrderItem[]>([]);

  const [searchParams] = useSearchParams();
  const dosirakIdParam = searchParams.get("dosirakId");
  const dosirakId = dosirakIdParam ? parseInt(dosirakIdParam) : undefined;

  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  // 로그인 확인
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", {
        replace: true,
        state: { message: "로그인 후 이용 가능한 서비스입니다." },
      });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const request = {
        arriveAt: selectedDate,
        arriveTime: selectedTime,
        ...(dosirakId ? { dosirakId } : {}),
      };

      fetchGroupOrders(request)
        .then(setOrderList)
        .catch((err) => {
          console.error("공동 주문 목록 불러오기 실패", err);
          setOrderList([]);
        });
    }
  }, [selectedDate, selectedTime]);

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="공동 주문" />
      <div className={styles.contentContainer}>
        <div className={styles.box}>
          <CalendarComponent onDateChange={setSelectedDate} />
        </div>
        <div className={styles.box}>
          <SelectBox
            title=""
            options={TIME_OPTIONS}
            selectedValue={selectedTime}
            onChange={setSelectedTime}
          />
        </div>
      </div>
      <div className={styles.orderSection}>
        <DosirakOrderSection
          orderList={orderList}
          arriveAt={selectedDate}
          arriveTime={parseInt(selectedTime)}
        />
      </div>
    </div>
  );
}

export default GroupOrder;
