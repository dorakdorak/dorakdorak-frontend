import { useEffect, useState } from "react";
import DosirakSearchInput from "@/components/common/DosirakSearchInput";
import { DosirakSearch } from "@/types/AdminStatistics";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SectionHeader from "@/components/common/SectionHeader";
import { CustomTooltip } from "@/components/adminManagement/CustomTooltip";

const sampleList: DosirakSearch[] = [
  { dosirakId: 1, name: "가성비 혜자 도시락" },
  { dosirakId: 2, name: "치킨마요 도시락" },
  { dosirakId: 3, name: "매운맛 도전 도시락" },
];

const COLORS = ["#3a5d1d", "#a2c081"];

function OrderTypeStatistics() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);

  const mockData = [
    { name: "일반 주문", value: 45 },
    { name: "공구 주문", value: 20 },
  ];

  const fetchData = async (id: number | null) => {
    try {
      const query = id ? `?dosirakId=${id}` : "";
      const res = await fetch(`/admin/statistics/order${query}`);
      const json = await res.json();

      setChartData([
        { name: "일반 주문", value: json.single },
        { name: "공구 주문", value: json.group },
      ]);
    } catch (e) {
      console.error("데이터 불러오기 실패, 목업 사용", e);
      setChartData(mockData);
    }
  };

  useEffect(() => {
    fetchData(selectedId);
  }, [selectedId]);

  return (
    <div style={{ padding: "50px 200px", marginBottom: "50px" }}>
      <SectionHeader title="주문 유형 비율 통계" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <DosirakSearchInput dosiraks={sampleList} onSelect={(id) => setSelectedId(id)} />
      </div>

      <div style={{ width: "100%", height: 500, fontFamily: '"Pretendard", sans-serif' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius="80%"
              dataKey="value"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip chartData={chartData} />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default OrderTypeStatistics;
