import * as React from "react";
import { Calendar } from "react-calendar";
import styles from "@/css/order/CalendarComponent.module.css";

interface CalendarComponentProps {
  onDateChange: (selectedDate: string) => void;
}

export default function CalendarComponent({
  onDateChange,
}: CalendarComponentProps) {
  const [date, setDate] = React.useState<Date | null>(null);

  const formatDateToString = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // 오늘 기준 3일 뒤 날짜 계산
  const getThreeDaysLater = (): Date => {
    const date = new Date();
    date.setDate(date.getDate() + 4);
    return date;
  };

  // 최초 마운트 시 3일 뒤 날짜 설정
  React.useEffect(() => {
    const threeDaysLater = getThreeDaysLater();
    setDate(threeDaysLater);
    onDateChange(formatDateToString(threeDaysLater));
  }, [onDateChange]);

  if (!date) return null;

  return (
    <div className={styles.container}>
      <Calendar
        calendarType="gregory"
        onChange={(value) => {
          if (value instanceof Date) {
            setDate(value);
            onDateChange(formatDateToString(value));
          }
        }}
        value={date}
        locale="ko-KR"
        minDate={getThreeDaysLater()}
        navigationLabel={({ date }) => (
          <div className={styles.navigationLabel}>
            <span className={styles.navigationLabelText}>
              {date.toLocaleDateString("ko", {
                year: "numeric",
                month: "long",
              })}
            </span>
          </div>
        )}
        prevLabel={<span>&lt;</span>}
        nextLabel={<span>&gt;</span>}
        formatDay={(locale, date) => date.getDate().toString()}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString("ko", { weekday: "short" })
        }
        showNeighboringMonth={false}
      />
    </div>
  );
}
