import { Nutrition } from "@/types/DosirakDetail";
import styles from "@/css/detail/NutritionTable.module.css";

interface Props {
  nutrition: Nutrition;
}

const NutritionTable = ({ nutrition }: Props) => {
  return (
    <div className={styles.nutritionBox}>
      <h2 className={styles.nutritionTitle}>영양 정보</h2>
      <table className={styles.nutritionTable}>
        <tbody>
          <tr>
            <th>칼로리</th>
            <td>{nutrition.calories}kcal</td>
          </tr>
          <tr>
            <th>탄수화물</th>
            <td>{nutrition.carbohydrates}g</td>
          </tr>
          <tr>
            <th>당류</th>
            <td>{nutrition.sugars}g</td>
          </tr>
          <tr>
            <th>단백질</th>
            <td>{nutrition.protein}g</td>
          </tr>
          <tr>
            <th>지방</th>
            <td>{nutrition.fat}g</td>
          </tr>
          <tr>
            <th>트랜스지방</th>
            <td>{nutrition.transFat}g</td>
          </tr>
          <tr>
            <th>콜레스테롤</th>
            <td>{nutrition.cholesterol}mg</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;
