import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DosirakDetail } from "@/types/DosirakDetail";
// import { fetchDosirakDetail } from "@/api/dosirak"; // 추후 사용
import mockDosirak from "@/mock/DosirakDetailMockData"; // 임시 목업
import DosirakInfo from "@/components/detail/DosirakInfo";
import NutritionTable from "@/components/detail/NutritionInfo";
import TabNavigation from "@/components/detail/TabNavigation";
import SectionHeader from "@/components/common/SectionHeader";

function Detail() {
  const { dosirakId } = useParams<{ dosirakId: string }>();
  const [data, setData] = useState<DosirakDetail | null>(null);

  useEffect(() => {
    // 실제 API 연동 시 사용
    // if (dosirakId) {
    //   fetchDosirakDetail(Number(dosirakId)).then(setData);
    // }

    // 목업 데이터 사용
    setData(mockDosirak);
  }, [dosirakId]);

  if (!data) return <p>로딩 중...</p>;

  return (
    <div className="dosirak-detail">
      <DosirakInfo dosirak={mockDosirak} />

      <TabNavigation />

      <section id="info">
        <SectionHeader title="상세 정보" />
        <div className="detail-images" style={{ marginBottom: "100px" }}>
          {mockDosirak.baseInfo.detailImages.map((img) => (
            <img
              key={img.sortOrder}
              src={img.imageUrl}
              alt={`상세 이미지 ${img.sortOrder}`}
              style={{ width: "100%", maxWidth: "500px", display: "block", margin: "0 auto 20px" }}
            />
          ))}
        </div>
      </section>

      <section id="nutrition">
        <SectionHeader title="영양 정보" />
        <NutritionTable nutrition={mockDosirak.nutrition} />
      </section>
    </div>
  );
}

export default Detail;
