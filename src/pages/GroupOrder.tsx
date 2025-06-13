import { useEffect, useState } from "react";
import CalendarComponent from "@/components/order/Calendar";
import SectionHeader from "@/components/common/SectionHeader";
import SelectBox from "@/components/common/select/SelectBox";
import { TIME_OPTIONS } from "@/constants/times";
import styles from "@/css/order/GroupOrder.module.css";
import DosirakOrderSection from "@/components/order/DosirakOrderSection";

function GroupOrder() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  console.log(selectedDate);
  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);
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
        <DosirakOrderSection />
      </div>
    </div>
  );
}

export default GroupOrder;
