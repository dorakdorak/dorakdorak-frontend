export const SORT_TYPES = ["LATEST", "POPULAR", "PRICE_ASC", "PRICE_DESC"] as const;
export type SortType = (typeof SORT_TYPES)[number];

export const SORT_OPTIONS: {
  label: string;
  value: SortType;
}[] = [
  { label: "최신 등록순", value: "LATEST" },
  { label: "인기순", value: "POPULAR" },
  { label: "낮은 가격순", value: "PRICE_ASC" },
  { label: "높은 가격순", value: "PRICE_DESC" },
];
