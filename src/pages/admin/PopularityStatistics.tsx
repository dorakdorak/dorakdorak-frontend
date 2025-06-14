import { useEffect, useState } from "react";
import { AdminPopularDosirakResponse } from "@/types/AdminManagement"; // 위에 정의한 타입
import { mockPopularDosirak } from "@/mock/AdminPopularDosiraks";
import SectionHeader from "@/components/common/SectionHeader";

const ageGroups = [0, 10, 20, 30, 40, 50];

export default function PopularityStatistics() {
  const [selectedAge, setSelectedAge] = useState<number>(0);
  const [popularList, setPopularList] = useState<AdminPopularDosirakResponse[]>([]);

  const fetchPopular = async (age: number) => {
    try {
      const query = age !== 0 ? `?age=${age}` : "";
      const res = await fetch(`/admin/statistics/popular${query}`);
      const json = await res.json();
      setPopularList(json.items);
    } catch (e) {
      console.error("인기 도시락 불러오기 실패", e);
      setPopularList(mockPopularDosirak);
    }
  };

  useEffect(() => {
    fetchPopular(selectedAge);
  }, [selectedAge]);

  return (
    <div
      style={{
        padding: "50px 200px",
        marginBottom: "50px",
        fontFamily: '"Pretendard", sans-serif',
      }}
    >
      <SectionHeader title="연령대별 인기 도시락" />

      <div style={{ marginBottom: "40px" }}>
        {ageGroups.map((age) => (
          <button
            key={age}
            onClick={() => setSelectedAge(age)}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: selectedAge === age ? "#3a5d1d" : "#f0f0f0",
              color: selectedAge === age ? "white" : "black",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontFamily: '"Pretendard", sans-serif',
              fontSize: "16px",
            }}
          >
            {age === 0 ? "전체" : `${age}대`}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {popularList.map((item) => (
          <div
            key={item.dosirakId}
            style={{
              border: "2px solid #3a5d1d",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              backgroundColor: "white",
            }}
          >
            <div style={{ fontWeight: "bold", marginBottom: "16px", fontSize: "20px" }}>
              {item.rank}위
            </div>
            <div style={{ width: "100%", aspectRatio: "1/1" }}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: 600 }}>{item.name}</div>
            <div style={{ marginTop: "10px", color: "#555", fontSize: "14px" }}>
              주문 수: {item.count}건
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
