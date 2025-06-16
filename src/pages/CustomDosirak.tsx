import { useEffect, useState } from "react";
import QuestionGrid from "@/components/common/select/QuestionGrid";
import IntroSection from "@/components/common/IntroSection";
import aiImage from "@/assets/images/intro/custom-register.png";

export default function CustomDosirak() {
  const [mainPreference, setMainPreference] = useState("");
  const [importantSense, setImportantSense] = useState("");
  const [mealAmount, setMealAmount] = useState("");
  const [cravingFlavor, setCravingFlavor] = useState("");

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f5faf1",
        padding: "130px 0",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <IntroSection
        title={["맞춤형 나만의 도시락,", "이제 누구나 만들 수 있습니다."]}
        description={[
          "메뉴 고르느라 머리 아플 필요 없어요.",
          "원하는 재료만 선택하면",
          "AI가 딱 맞는 도시락을 만들어 드립니다!",
        ]}
        imageUrl={aiImage}
      />
      <QuestionGrid
        mainPreference={mainPreference}
        importantSense={importantSense}
        mealAmount={mealAmount}
        cravingFlavor={cravingFlavor}
        setMainPreference={setMainPreference}
        setImportantSense={setImportantSense}
        setMealAmount={setMealAmount}
        setCravingFlavor={setCravingFlavor}
      />
    </div>
  );
}
