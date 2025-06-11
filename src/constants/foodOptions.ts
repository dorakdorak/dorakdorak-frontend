// 좋아하는 재료
export const LIKED_INGREDIENTS = ["CHICKEN", "EGG", "BEEF", "SALMON"] as const;
export type LikedIngredient = typeof LIKED_INGREDIENTS[number];
export const LIKED_INGREDIENT_OPTIONS = [
  { label: "닭가슴살", value: "CHICKEN" },
  { label: "계란", value: "EGG" },
  { label: "소고기", value: "BEEF" },
  { label: "연어", value: "SALMON" },
  { label: "두부", value: "TOFU" },
];

// 싫어하는 재료
export const DISLIKED_INGREDIENTS = ["SEAFOOD", "SPICE", "DAIRY", "CUCUMBER"] as const;
export type DislikedIngredient = typeof DISLIKED_INGREDIENTS[number];
export const DISLIKED_INGREDIENT_OPTIONS = [
  { label: "해산물", value: "SEAFOOD" },
  { label: "향신료", value: "SPICE" },
  { label: "유제품", value: "DAIRY" },
  { label: "오이", value: "CUCUMBER" },
  { label: "버섯", value: "MUSHROOM" },
];

// 음식 스타일
export const FOOD_STYLES = ["BASIC", "RICE_BOWL", "SALAD_BOWL", "FRIED_RICE"] as const;
export type FoodStyle = typeof FOOD_STYLES[number];
export const FOOD_STYLE_OPTIONS = [
  { label: "기본 집밥", value: "BASIC" },
  { label: "덮밥류", value: "RICE_BOWL" },
  { label: "샐러드볼", value: "SALAD_BOWL" },
  { label: "볶음밥", value: "FRIED_RICE" },
  { label: "면 요리", value: "NOODLE" },
];

// 음식 느낌
export const FOOD_PREFERENCES = ["HEALTHY", "HEARTY", "TASTY", "NEUTRAL"] as const;
export type FoodPreference = typeof FOOD_PREFERENCES[number];
export const FOOD_PREFERENCE_OPTIONS = [
  { label: "건강하게", value: "HEALTHY" },
  { label: "든든하게", value: "HEARTY" },
  { label: "맛있게", value: "TASTY" },
  { label: "호불호 갈리지 않게", value: "NEUTRAL" },
  { label: "가볍게", value: "LIGHT" },
];
