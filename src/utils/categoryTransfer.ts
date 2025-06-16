import { categories as CATEGORY_DATA, FilterType } from "@/constants/categories";

export default function convertLabelsToFilterTypes(labelList: string[]): FilterType[] {
  return labelList
    .map((label) => {
      const found = CATEGORY_DATA.find((c) => c.label === label);
      return found?.filterType;
    })
    .filter((type): type is FilterType => !!type); // undefined 제거
}
