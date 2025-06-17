import { FilterType } from "@/constants/categories";
import { SortType } from "@/constants/sortOptions";
import { StorageType } from "@/types/DosirakDetail";

export interface DosirakRequest {
  dosirakId?: number;
  filterType?: FilterType;
  sortType: SortType;
  dosirakType: "NORMAL" | "CUSTOM";
}

export interface DosirakItem {
  dosirakId: number;
  name: string;
  price: number;
  salesPercentage: number;
  storageType: StorageType;
  imageUrl: string;
  createdAt: string;
  vote: number | null;
  isVoted: boolean | null;
}
