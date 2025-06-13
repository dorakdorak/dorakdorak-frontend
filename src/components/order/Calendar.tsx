import * as React from "react";
import { Calendar } from "react-calendar";
import styles from "@/css/order/CalendarComponent.module.css";

interface CalendarComponentProps {
  onDateChange: (selectedDate: string) => void;
}

export default function CalendarComponent({ onDateChange }: CalendarComponentProps) {
  const [date, setDate] = React.useState<Date | null>(null);

  const formatDateToString = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  };

  React.useEffect(() => {
    const today = new Date();
    setDate(today);
    onDateChange(formatDateToString(today));
  }, [onDateChange]);

  if (!date) return null;

  return (
    <div className={styles.container}>
      {/* <h3 className={styles.title}>날짜선택</h3> */}
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
          minDate={new Date()}
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
          formatShortWeekday={(locale, date) => date.toLocaleDateString("ko", { weekday: "short" })}
          showNeighboringMonth={false}
        />
      </div>
    </div>
  );
}
