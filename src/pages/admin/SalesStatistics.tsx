import { useEffect, useState } from "react";
import DosirakSearchInput from "@/components/common/DosirakSearchInput";
import { DosirakSearch } from "@/types/AdminStatistics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SectionHeader from "@/components/common/SectionHeader";

const sampleList: DosirakSearch[] = [
  { dosirakId: 1, name: "가성비 혜자 도시락" },
  { dosirakId: 2, name: "치킨마요 도시락" },
  { dosirakId: 3, name: "매운맛 도전 도시락" },
];

function SalesStatistics() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ date: string; count: number }[]>([]);
  const mockChartData = [
    { date: "2024-06-07", count: 3 },
    { date: "2024-06-08", count: 4 },
    { date: "2024-06-09", count: 5 },
    { date: "2024-06-10", count: 6 },
    { date: "2024-06-11", count: 2 },
    { date: "2024-06-12", count: 3 },
    { date: "2024-06-13", count: 6 },
  ];

  const fetchData = async (id: number | null) => {
    try {
      const query = id ? `?dosirakId=${id}` : "";
      const res = await fetch(`/admin/statistics/sales${query}`);
      const json = await res.json();
      setChartData(json.data);
    } catch (e) {
      console.error("데이터 가져오기 실패", e);
      setChartData(mockChartData);
    }
  };

  useEffect(() => {
    fetchData(selectedId);
  }, [selectedId]);

  return (
    <div style={{ padding: "50px 200px", marginBottom: "50px" }}>
      <SectionHeader title="판매량 통계" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <DosirakSearchInput dosiraks={sampleList} onSelect={(id) => setSelectedId(id)} />
      </div>
      <div style={{ width: "100%", height: 400, marginTop: "20px", marginBottom: "50px" }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#3a5d1d"
              name="주문건수"
              barSize={50}
              activeBar={{ fill: "#2b4715", stroke: "#1e3010", strokeWidth: 1 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesStatistics;
