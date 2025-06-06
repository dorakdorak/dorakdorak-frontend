import thumbnail from "@/assets/images/mock/meal2.jpg";
import sub1 from "@/assets/images/mock/detail.png";
import sub2 from "@/assets/images/mock/detail.png";
import { DosirakDetail } from "@/types/DosirakDetail";

const mockDosirak: DosirakDetail = {
  id: 0,
  baseInfo: {
    name: "고단백 헬스 도시락",
    price: 7900,
    salePercentage: 0.1,
    weight: 420,
    storageType: "F",
    thumbnailImageUrl: thumbnail,
    detailImages: [
      { imageUrl: sub1, sortOrder: 1 },
      { imageUrl: sub2, sortOrder: 2 },
    ],
  },
  nutrition: {
    calories: 410.0,
    carbohydrates: 45.5,
    sugars: 3.2,
    protein: 37.1,
    cholesterol: 55.0,
    fat: 12.0,
    transFat: 0.3,
  },
};

export default mockDosirak;
