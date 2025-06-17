// 1. 선호 재료 유형
export const MAIN_INGREDIENT_PREFERENCES = [
  "고기 위주가 좋아요",
  "채소 위주로 가볍게 먹고 싶어요",
  "생선이나 해산물도 좋아요",
  "밸런스 있게 다 담아줘요",
] as const;
export type MainIngredientPreference = typeof MAIN_INGREDIENT_PREFERENCES[number];

// 2. 중요하게 생각하는 감각
export const SENSORY_PREFERENCES = [
  "색감 예쁜 비주얼 중심 도시락",
  "향긋한 허브나 향신료 활용",
  "바삭하고 쫄깃한 조합",
  "오독오독한 식감 선호",
] as const;
export type SensoryPreference = typeof SENSORY_PREFERENCES[number];

// 3. 식사 목적
export const MEAL_PURPOSES = [
  "간단히 요기할 수 있는 한 끼",
  "든든하게 배부른 한 끼",
  "가볍게 다이어트할 수 있는 한 끼",
  "상관 없어요, AI가 알아서!",
] as const;
export type MealPurpose = typeof MEAL_PURPOSES[number];

// 4. 맛 선호
export const FLAVOR_PREFERENCES = [
  "화끈하게 매콤한 맛",
  "짭짤한 간장/소금기반",
  "달콤한 양념",
  "깔끔하고 담백한 클린푸드",
] as const;
export type FlavorPreference = typeof FLAVOR_PREFERENCES[number];
