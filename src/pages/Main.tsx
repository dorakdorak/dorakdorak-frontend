import CategoryList from "@/components/common/category/CategoryList";
import Carousel from "@/components/main/Carousel";
import DosirakSection from "@/components/main/DosirakSection";
import meal2 from "@/assets/images/mock/meal2.jpg";
import { motion } from "framer-motion";
import SectionTitle from "@/components/main/SectionTitle";
import RankingList from "@/components/main/RankingList";
import { useState } from "react";
import { FilterType } from "@/constants/categories";

function Main() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");

  return (
    <section style={{ marginBottom: "200px" }}>
      <CategoryList
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
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
          boxes={[
            { image: meal2, tag: "고혈압 식단" },
            { image: meal2, tag: "스페셜 식단" },
            { image: meal2, tag: "당뇨 식단" },
          ]}
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
            { image: meal2, tag: "고단백" },
            { image: meal2, tag: "식단조절" },
            { image: meal2, tag: "저당" },
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
