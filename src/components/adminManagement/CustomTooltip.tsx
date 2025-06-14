import { Payload } from "recharts/types/component/DefaultTooltipContent";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload<number, string>[];
  chartData: { name: string; value: number }[];
}

export const CustomTooltip = ({ active, payload, chartData }: CustomTooltipProps) => {
  if (active && payload && payload.length > 0) {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    const { name, value } = payload[0];
    const percent = ((Number(value) / total) * 100).toFixed(1);

    return (
      <div
        style={{
          background: "white",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "6px",
          fontFamily: '"Pretendard", sans-serif',
        }}
      >
        <strong>{name}</strong>
        <div>주문 수: {value}건</div>
        <div>비율: {percent}%</div>
      </div>
    );
  }

  return null;
};
