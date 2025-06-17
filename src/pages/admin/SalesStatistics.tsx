import { useEffect, useState } from "react";
import DosirakSearchInput from "@/components/common/DosirakSearchInput";
import { DosirakSearch } from "@/types/AdminStatistics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SectionHeader from "@/components/common/SectionHeader";
import { fetchSalesStatistics, searchDosiraksByName } from "@/api/AdminApi";

function SalesStatistics() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ date: string; count: number }[]>([]);
  const [dosirakList, setDosirakList] = useState<DosirakSearch[]>([]);

  const fetchData = async (id: number | null) => {
    try {
      const result = await fetchSalesStatistics(id ?? undefined);
      const formatted = result.map((item) => ({
        date: item.day,
        count: item.count,
      }));
      setChartData(formatted);
    } catch (e) {
      console.error("판매 통계 조회 실패:", e);
      setChartData([]);
    }
  };

  const fetchInitialDosirakList = async () => {
    try {
      const results = await searchDosiraksByName(""); // 전체 검색
      setDosirakList(results);
    } catch (e) {
      console.error("도시락 목록 불러오기 실패:", e);
    }
  };

  useEffect(() => {
    fetchInitialDosirakList();
    fetchData(null);
  }, []);

  useEffect(() => {
    fetchData(selectedId);
  }, [selectedId]);

  return (
    <div style={{ padding: "50px 200px", marginBottom: "50px" }}>
      <SectionHeader title="판매량 통계" />
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <DosirakSearchInput dosiraks={dosirakList} onSelect={(id) => setSelectedId(id)} />
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
