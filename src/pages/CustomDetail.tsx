import styles from "@/css/customGenerate/CustomDetail.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { CreateCustomDosirakResponse } from "@/types/CustomDosirakGenerate";
import NutritionTable from "@/components/detail/NutritionInfo";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import warningIcon from "@/assets/images/icon/caution.png";
import { createCustomDosirak, registerCustomDosirak } from "@/api/CustomDosirakGenerate";
import Spinner from "@/components/common/Spinner";
import { useNavigate } from "react-router-dom";
import { fetchDosirakDetail } from "@/api/DosirakDetail";

function CustomDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState<CreateCustomDosirakResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      try {
        if (!isLoading) return;

        if (id) {
          fetchDosirakDetail(Number(id)).then((res) => {
            if (res) {
              const transformed: CreateCustomDosirakResponse = {
                name: res.baseInfo.name,
                imageUrl: res.baseInfo.thumbnailImageUrl,
                price: res.baseInfo.price,
                weight: res.baseInfo.weight,
                storageType: res.baseInfo.storageType,
                categories: [],
                nutrition: res.nutrition,
                message: "",
              };
              console.log(transformed);

              setData(transformed);
            }
          });
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
        {!id && <div className={styles.infoNotice}>AI가 선택한 정보로 도시락을 생성중입니다.</div>}
      </div>
    );
  }

  if (!data) return null;

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
        <img src={warningIcon} alt="경고 아이콘" className={styles.noticeIcon} />
        이 영양 정보는 AI가 추천한 구성에 따라 자동으로 계산된 예상치예요!
        <br />
        실제 식단과는 조금 다를 수 있으니 참고용으로 봐주세요.
      </div>
      {!id && (
        <>
          <div className={styles.infoNotice}>AI가 추천한 도시락 구성, 마음에 드시나요?</div>

          <div className={styles.buttonWrapper}>
            <Button variant="gray" size="lg" onClick={() => navigate("/custom-dosirak")}>
              다시하기
            </Button>
            <Button
              variant="secondary"
              size="lg"
              disabled={isSubmitting} // 중복 클릭 방지
              onClick={async () => {
                if (!data) return;

                try {
                  setIsSubmitting(true); // 등록 시작
                  await registerCustomDosirak({
                    name: data.name,
                    imageUrl: data.imageUrl,
                    price: data.price,
                    weight: data.weight,
                    storageType: data.storageType,
                    categories: data.categories,
                    nutrition: data.nutrition,
                  });
                  navigate("/custom-ranking");
                } catch (error) {
                  console.error("도시락 등록 실패", error);
                  alert("도시락 등록에 실패했습니다.");
                } finally {
                  setIsSubmitting(false); // 등록 끝
                }
              }}
            >
              {isSubmitting ? "등록 중..." : "등록하기"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomDetail;
