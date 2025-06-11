import styles from "@/css/customGenerate/CustomDetail.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateCustomDosirakResponse } from "@/types/CustomDosirakGenerate";
import { mockCustomDosirakDetail } from "@/mock/CustomDosirakDetailMockData";
import NutritionTable from "@/components/detail/NutritionInfo";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import warningIcon from "@/assets/images/icon/caution.png";

function CustomDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState<CreateCustomDosirakResponse | null>(
    location.state ?? (id ? null : mockCustomDosirakDetail)
  );

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  useEffect(() => {
    if (id && !data) {
      fetch(`http://localhost:8080/dosiraks/custom-dosirak/${id}`)
        .then((res) => res.json())
        .then((resData) => setData(resData))
        .catch(() => {
          alert("도시락 정보를 불러오지 못해 임시 데이터를 사용합니다");
          setData(mockCustomDosirakDetail);
        });
    }
  }, [id, data]);

  if (!data) return <p>로딩 중입니다...</p>;

  const { name, imageUrl, nutrition } = data;

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="커스텀 도시락 생성 결과" />

      <div className={styles.contentContainer}>
        <div className={styles.imageBox}>
          <img src={imageUrl} alt={name} />
          <h3>{name}</h3>
        </div>

        <div className={styles.nutritionBox}>
          <NutritionTable nutrition={nutrition} />
        </div>
      </div>

      <div className={styles.infoNotice}>
        <img src={warningIcon} alt="경고 아이콘" className={styles.noticeIcon} />
        이 영양 정보는 AI가 추천한 구성에 따라 자동으로 계산된 예상치예요!
        <br />
        실제 식단과는 조금 다를 수 있으니 참고용으로 봐주세요.
      </div>
      {!id && (
        <>
          <div className={styles.infoNotice}>AI가 추천한 도시락 구성, 마음에 드시나요?</div>

          <div className={styles.buttonWrapper}>
            <Button variant="gray" size="lg">
              다시하기
            </Button>
            <Button variant="secondary" size="lg">
              등록하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomDetail;
