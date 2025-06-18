import CategoryList from "@/components/common/category/CategoryList";
import Carousel from "@/components/main/Carousel";
import DosirakSection from "@/components/main/DosirakSection";
import custom1 from "@/assets/images/mock/custom1.png";
import custom2 from "@/assets/images/mock/custom2.png";
import custom3 from "@/assets/images/mock/custom3.png";
import { motion } from "framer-motion";
import SectionTitle from "@/components/main/SectionTitle";
import RankingList from "@/components/main/RankingList";
import { FilterType } from "@/constants/categories";
import { useEffect, useState } from "react";
import fetchDosiraks from "@/api/DosirakList";
import { DosirakItem } from "@/types/DosirakList";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");
  const [popularDosiraks, setPopularDosiraks] = useState<DosirakItem[]>([]);

  const handleCategoryClick = (filter: FilterType) => {
    navigate("/menu", { state: { filter } });
    setSelectedFilter(filter);
  };

  useEffect(() => {
    const fetchPopularDosiraks = async () => {
      try {
        const response = await fetchDosiraks({
          sortType: "POPULAR",
          dosirakType: "NORMAL",
        });
        setPopularDosiraks(response.dosiraks.slice(0, 3));
      } catch (error) {
        console.error("인기 도시락 조회 실패:", error);
      }
    };

    fetchPopularDosiraks();
  }, []);

  return (
    <section style={{ marginBottom: "200px" }}>
      <CategoryList
        selectedFilter={selectedFilter}
        onSelectFilter={handleCategoryClick}
      />
      <Carousel />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0 }}
        viewport={{ once: true }}
      >
        <DosirakSection
          key="popular"
          title="인기 도시락"
          description="지난주 가장 인기 있었던 도시락 TOP3"
          to="/menu"
          cardTo="detail"
          boxes={popularDosiraks.map((item) => ({
            id: item.dosirakId,
            image: item.imageUrl,
            tag: String(item.name),
          }))}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <DosirakSection
          key="custom"
          title="나만의 도시락 만들기"
          description={
            <>
              간단한 옵션만 선택해서
              <br />
              AI가 생성해주는 나만의 커스텀 도시락
            </>
          }
          to="/custom-dosirak"
          cardTo="custom-detail"
          boxes={[
            { id: 117, image: custom1, tag: "비비드 베지 클래식" },
            { id: 127, image: custom2, tag: "대박 해산물 한판!" },
            { id: 130, image: custom3, tag: "고기 러버즈 피스트" },
          ]}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <SectionTitle
          title="제로 웨이스트 인증"
          description={
            <>
              도시락에 부착된 QR 코드를 스캔해
              <br />
              다 먹은 도시락 사진을 업로드해보세요!
              <br />
              <br />
              가장 많이 인증한 학교에는
              <br />
              커스텀 도시락 할인 혜택을 드립니다.
            </>
          }
          to="/zero-waste"
        />
        <RankingList />
      </motion.div>
    </section>
  );
}

export default Main;
