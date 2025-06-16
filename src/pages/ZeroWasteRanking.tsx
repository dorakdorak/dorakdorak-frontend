import { useEffect, useState } from "react";
import { fetchUniversityRanking } from "@/api/UniversityRanking";
import type { University } from "@/types/UniversityRanking";
import IntroSection from "@/components/common/IntroSection";
import UniversityRanking from "@/components/zeroWaste/UniversityRanking";
import zeroWaste from "@/assets/images/intro/zero-waste.png";
import { motion } from "framer-motion";

function ZeroWasteRanking() {
  const [universities, setUniversities] = useState<University[] | null>(null);

  useEffect(() => {
    const loadRanking = async () => {
      try {
        const data = await fetchUniversityRanking();
        if (data) setUniversities(data);
      } catch (error) {
        console.log("랭킹 정보를 불러오는 데 실패했습니다.", error);
      }
    };
    loadRanking();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <IntroSection
        title={["제로 웨이스트,", "이제 누구나 참여할 수 있습니다."]}
        description={[
          "도시락 다 드셨다면, 사진 한 장만 올려주세요!",
          "AI가 잔반 여부를 분석해 인증 수가 가장 많은 대학에는",
          "스페셜 이벤트가 기다리고 있어요! 🌱",
        ]}
        imageUrl={zeroWaste}
        backGroundColor="white"
      />

      {universities && <UniversityRanking universities={universities} />}
    </motion.div>
  );
}

export default ZeroWasteRanking;
