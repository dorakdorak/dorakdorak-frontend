import { useEffect, useState } from "react";
import DosirakSearchInput from "@/components/common/DosirakSearchInput";
import { DosirakSearch } from "@/types/AdminStatistics";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SectionHeader from "@/components/common/SectionHeader";
import { CustomTooltip } from "@/components/adminManagement/CustomTooltip";
import { fetchOrderTypeRatio, searchDosiraksByName } from "@/api/AdminApi";

const COLORS = ["#3a5d1d", "#a2c081"];

function OrderTypeStatistics() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>([]);
  const [dosirakList, setDosirakList] = useState<DosirakSearch[]>([]);

  const fetchData = async (id: number | null) => {
    try {
      const { single, group } = await fetchOrderTypeRatio(id ?? undefined);
      setChartData([
        { name: "일반 주문", value: single },
        { name: "공구 주문", value: group },
      ]);
    } catch (e) {
      console.error("주문 유형 데이터 가져오기 실패:", e);
      setChartData([]);
    }
  };

  const fetchInitialDosirakList = async () => {
    try {
      const results = await searchDosiraksByName(""); // 전체 목록 가져오기
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
      <SectionHeader title="주문 유형 비율 통계" />

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <DosirakSearchInput dosiraks={dosirakList} onSelect={(id) => setSelectedId(id)} />
      </div>

      <div style={{ width: "100%", height: 500, fontFamily: '"Pretendard", sans-serif' }}>
        {chartData.every((item) => item.value === 0) ? (
          <div
            style={{ textAlign: "center", paddingTop: "150px", fontSize: "18px", color: "#888" }}
          >
            선택된 도시락의 주문 내역이 없습니다.
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default OrderTypeStatistics;
