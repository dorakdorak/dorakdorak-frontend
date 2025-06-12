import { useState } from "react";
import CalendarComponent from "@/components/order/Calendar";

function GroupOrder() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  console.log(selectedDate);

  return (
    <div>
      <h1>공구주문</h1>
      <CalendarComponent onDateChange={setSelectedDate} />
    </div>
  );
}

export default GroupOrder;
