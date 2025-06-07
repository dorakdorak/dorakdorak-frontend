import all from "@/assets/images/category/all.png";
import heart from "@/assets/images/category/heart.png";
import weight from "@/assets/images/category/weight.png";
import star from "@/assets/images/category/star.png";
import dumbbell from "@/assets/images/category/dumbbell.png";
import injection from "@/assets/images/category/injection.png";
import wallet from "@/assets/images/category/wallet.png";

export const FILTER_TYPES = [
  "ALL",
  "HIGH_BLOOD_PRESSURE",
  "LOW_CALORIE",
  "SPECIAL",
  "HIGH_PROTEIN",
  "DIABETIC",
  "VALUE",
] as const;

export type FilterType = (typeof FILTER_TYPES)[number];

export const categories: {
  label: string;
  icon: string;
  filterType: FilterType;
}[] = [
  { label: "전체", icon: all, filterType: "ALL" },
  { label: "고혈압 식단", icon: heart, filterType: "HIGH_BLOOD_PRESSURE" },
  { label: "칼로리 식단", icon: weight, filterType: "LOW_CALORIE" },
  { label: "스페셜 식단", icon: star, filterType: "SPECIAL" },
  { label: "단백질 식단", icon: dumbbell, filterType: "HIGH_PROTEIN" },
  { label: "당뇨 식단", icon: injection, filterType: "DIABETIC" },
  { label: "가성비 식단", icon: wallet, filterType: "VALUE" },
];
