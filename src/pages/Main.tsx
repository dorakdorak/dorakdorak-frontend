import CategoryList from "@/components/common/category/CategoryList";
import Carousel from "@/components/main/Carousel";
import DosirakSection from "@/components/main/DosirakSection";
import meal2 from "@/assets/images/mock/meal2.jpg";
import { motion } from "framer-motion";

function Main() {
  return (
    <section>
      <CategoryList />
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
          to="/menu"
          boxes={[
            { image: meal2, tag: "고단백" },
            { image: meal2, tag: "식단조절" },
            { image: meal2, tag: "저당" },
          ]}
        />
      </motion.div>
    </section>
  );
}

export default Main;
