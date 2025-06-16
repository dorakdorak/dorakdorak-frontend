import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DosirakDetail } from "@/types/DosirakDetail";
import { fetchDosirakDetail } from "@/api/DosirakDetail";
import DosirakInfo from "@/components/detail/DosirakInfo";
import NutritionTable from "@/components/detail/NutritionInfo";
import TabNavigation from "@/components/detail/TabNavigation";
import SectionHeader from "@/components/common/SectionHeader";
import Spinner from "@/components/common/Spinner";

function Detail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DosirakDetail | null>(null);

  useEffect(() => {
    if (id) {
      fetchDosirakDetail(Number(id)).then(setData);
    }
  }, [id]);

  if (!data) return <Spinner />;

  return (
    <div className="dosirak-detail">
      <DosirakInfo dosirak={data} />

      <TabNavigation />

      <section id="info">
        <SectionHeader title="상세 정보" />
        <div className="detail-images" style={{ marginBottom: "100px" }}>
          {data.baseInfo.detailImages.map((img) => (
            <img
              key={img.sortOrder}
              src={img.imageUrl}
              alt={`상세 이미지 ${img.sortOrder}`}
              style={{
                width: "100%",
                maxWidth: "500px",
                display: "block",
                margin: "0 auto 20px",
              }}
            />
          ))}
        </div>
      </section>

      <section id="nutrition" style={{ marginBottom: "200px" }}>
        <SectionHeader title="영양 정보" />
        <NutritionTable nutrition={data.nutrition} />
      </section>
    </div>
  );
}

export default Detail;
