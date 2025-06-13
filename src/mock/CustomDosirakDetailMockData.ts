import { CreateCustomDosirakResponse } from "@/types/CustomDosirakGenerate";
import thumbnail from "@/assets/images/mock/meal2.jpg";

export const mockCustomDosirakDetail: CreateCustomDosirakResponse = {
  customDosirakId: 1,
  name: "헬스 단백질 도시락",
  imageUrl: thumbnail,
  nutrition: {
    calories: 450.5,
    carbohydrates: 30.0,
    sugars: 4.2,
    protein: 40.3,
    cholesterol: 55.0,
    fat: 15.5,
    transFat: 0.2,
  },
  message: "응답",
};
