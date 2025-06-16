import { motion } from "framer-motion";
import SelectBox from "@/components/common/select/SelectBox";
import styles from "@/css/common/SelectableItem.module.css";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import {
  MAIN_INGREDIENT_PREFERENCES,
  SENSORY_PREFERENCES,
  MEAL_PURPOSES,
  FLAVOR_PREFERENCES,
} from "@/constants/foodOptions";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

type Props = {
  mainPreference: string;
  importantSense: string;
  mealAmount: string;
  cravingFlavor: string;
  setMainPreference: (v: string) => void;
  setImportantSense: (v: string) => void;
  setMealAmount: (v: string) => void;
  setCravingFlavor: (v: string) => void;
};

export default function QuestionGrid({
  mainPreference,
  importantSense,
  mealAmount,
  cravingFlavor,
  setMainPreference,
  setImportantSense,
  setMealAmount,
  setCravingFlavor,
}: Props) {
  const boxes = [
    {
      title: "고기 or 채소, 뭐가 더 끌리세요?",
      options: MAIN_INGREDIENT_PREFERENCES.map((item) => ({
        label: item,
        value: item,
      })),
      selectedValue: mainPreference,
      onChange: setMainPreference,
      delay: 0,
    },
    {
      title: "먹을 때 가장 중요한 감각은?",
      options: SENSORY_PREFERENCES.map((item) => ({
        label: item,
        value: item,
      })),
      selectedValue: importantSense,
      onChange: setImportantSense,
      delay: 0.2,
    },
    {
      title: "한 끼에 얼마나 든든하게 드실래요?",
      options: MEAL_PURPOSES.map((item) => ({ label: item, value: item })),
      selectedValue: mealAmount,
      onChange: setMealAmount,
      delay: 0.4,
    },
    {
      title: "요즘 끌리는 맛은?",
      options: FLAVOR_PREFERENCES.map((item) => ({ label: item, value: item })),
      selectedValue: cravingFlavor,
      onChange: setCravingFlavor,
      delay: 0.6,
    },
  ];

  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const isFormComplete =
    mainPreference && importantSense && mealAmount && cravingFlavor;
  const canSubmit = isLoggedIn && isFormComplete;

  const handleSubmit = () => {
    navigate("/custom-detail", {
      state: {
        mainPreference,
        importantSense,
        mealAmount,
        cravingFlavor,
      },
    });
  };

  return (
    <div>
      <motion.div
        className={styles.headerSection}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <SectionHeader title="커스텀 도시락 옵션 선택" />
      </motion.div>

      <div className={styles.gridContainer}>
        {boxes.map((box, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: box.delay }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <SelectBox
              title={box.title}
              options={box.options}
              selectedValue={box.selectedValue}
              onChange={box.onChange}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className={styles.btnWrapper}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {!isLoggedIn && (
          <div
            style={{ marginBottom: "12px", textAlign: "center", color: "#888" }}
          >
            커스텀 도시락을 만드시려면 로그인이 필요합니다.
          </div>
        )}
        <Button
          variant="secondary"
          size="lg"
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          생성하기
        </Button>
      </motion.div>
    </div>
  );
}
