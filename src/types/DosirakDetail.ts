// 도시락 보관 방식
export type StorageType = "R" | "F" | "RT";

// 기본 정보
export interface DosirakBaseInfo {
  name: string;
  price: number;
  salePercentage: number;
  weight: number;
  storageType: StorageType;
  thumbnailImageUrl: string;
  detailImages: DosirakDetailImage[];
}

// 상세 이미지
export interface DosirakDetailImage {
  imageUrl: string;
  sortOrder: number;
}

// 영양 정보
export interface Nutrition {
  calories: number;
  carbohydrates: number;
  sugars: number;
  protein: number;
  cholesterol: number;
  fat: number;
  transFat: number;
}

// 도시락 상세 응답
export interface DosirakDetail {
  id: number;
  baseInfo: DosirakBaseInfo;
  nutrition: Nutrition;
}
