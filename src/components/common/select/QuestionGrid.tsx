import { motion } from "framer-motion";
import SelectBox from "@/components/common/select/SelectBox";
import styles from "@/css/common/SelectableItem.module.css";
import SectionHeader from "@/components/common/SectionHeader";
import Button from "@/components/common/Button";
import createCustomDosirak from "@/api/CustomDosirakGenerate";
import { mockCustomDosirakDetail } from "@/mock/CustomDosirakDetailMockData";
import {
  LIKED_INGREDIENT_OPTIONS,
  DISLIKED_INGREDIENT_OPTIONS,
  FOOD_STYLE_OPTIONS,
  FOOD_PREFERENCE_OPTIONS,
} from "@/constants/foodOptions";
import { useNavigate } from "react-router-dom";

type Props = {
  liked: string;
  disliked: string;
  style: string;
  preference: string;
  setLiked: (v: string) => void;
  setDisliked: (v: string) => void;
  setStyle: (v: string) => void;
  setPreference: (v: string) => void;
};

export default function QuestionGrid({
  liked,
  disliked,
  style,
  preference,
  setLiked,
  setDisliked,
  setStyle,
  setPreference,
}: Props) {
  const boxes = [
    {
      title: "좋아하는 재료가 있나요?",
      options: LIKED_INGREDIENT_OPTIONS,
      selectedValue: liked,
      onChange: setLiked,
      delay: 0,
    },
    {
      title: "싫어하는 재료가 있나요?",
      options: DISLIKED_INGREDIENT_OPTIONS,
      selectedValue: disliked,
      onChange: setDisliked,
      delay: 0.2,
    },
    {
      title: "어떤 스타일을 선호하시나요?",
      options: FOOD_STYLE_OPTIONS,
      selectedValue: style,
      onChange: setStyle,
      delay: 0.4,
    },
    {
      title: "원하는 느낌이 있다면 알려주세요",
      options: FOOD_PREFERENCE_OPTIONS,
      selectedValue: preference,
      onChange: setPreference,
      delay: 0.6,
    },
  ];

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await createCustomDosirak({
        likedIngredient: liked,
        dislikedIngredient: disliked,
        preferredStyle: style,
        desiredFeeling: preference,
      });

      navigate("/dosiraks/result", { state: response });
    } catch (error) {
      alert("도시락 생성에 실패했습니다.");
      console.log(error);
      alert("도시락 생성에 실패하여 임시 데이터를 사용합니다.");
      navigate("/custom-detail", { state: mockCustomDosirakDetail });
    }
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
        <Button variant="secondary" size="lg" onClick={handleSubmit}>
          생성하기
        </Button>
      </motion.div>
    </div>
  );
}
