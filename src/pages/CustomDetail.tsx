import styles from "@/css/customGenerate/CustomDetail.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateCustomDosirakResponse } from "@/types/CustomDosirakGenerate";
import NutritionTable from "@/components/detail/NutritionInfo";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import warningIcon from "@/assets/images/icon/caution.png";
import createCustomDosirak from "@/api/CustomDosirakGenerate"; // 이미 있는 API 호출 함수
import Spinner from "@/components/common/Spinner";

function CustomDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState<CreateCustomDosirakResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isLoading) return; // 이미 로딩 끝났으면 중단

        if (id) {
          const res = await fetch(
            `http://localhost:8080/dosiraks/custom-dosirak/${id}`
          );
          const resData = await res.json();
          setData(resData);
        } else if (location.state) {
          const response = await createCustomDosirak({
            mainPreference: location.state.mainPreference,
            importantSense: location.state.importantSense,
            mealAmount: location.state.mealAmount,
            cravingFlavor: location.state.cravingFlavor,
          });
          setData(response);
        }
      } catch (error) {
        console.error("도시락 정보 로딩 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, location.state]);

  if (isLoading) {
    const spinnerText = id ? "로딩 중" : "생성 중";

    return (
      <div className={styles.wrapper}>
        <SectionHeader title="커스텀 도시락 생성 결과" />
        <div className={styles.contentContainer}>
          <div className={styles.imageBox}>
            <Spinner text={spinnerText} />
          </div>
          <div className={styles.nutritionBox}>
            <Spinner text={spinnerText} />
          </div>
        </div>
        {!id && (
          <div className={styles.infoNotice}>
            AI가 선택한 정보로 도시락을 생성중입니다.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <SectionHeader title="커스텀 도시락" />

      <div className={styles.contentContainer}>
        <div className={styles.imageBox}>
          <img src={data.imageUrl} alt={data.name} />
          <h3>{data.name}</h3>
        </div>

        <div className={styles.nutritionBox}>
          <NutritionTable nutrition={data.nutrition} />
        </div>
      </div>

      <div className={styles.infoNotice}>
        <img
          src={warningIcon}
          alt="경고 아이콘"
          className={styles.noticeIcon}
        />
        이 영양 정보는 AI가 추천한 구성에 따라 자동으로 계산된 예상치예요!
        <br />
        실제 식단과는 조금 다를 수 있으니 참고용으로 봐주세요.
      </div>
      {!id && (
        <>
          <div className={styles.infoNotice}>
            AI가 추천한 도시락 구성, 마음에 드시나요?
          </div>

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
