import { FilterType } from "@/constants/categories";
import { SortType } from "@/constants/sortOptions";
import { StorageType } from "@/types/DosirakDetail";

export interface DosirakRequest {
  dosirakId?: number;
  filterType: FilterType;
  sortType: SortType;
}

export interface DosirakItem {
  dosirakId: number;
  name: string;
  price: number;
  salesPercentage: number;
  storageType: StorageType;
  imageUrl: string;
}

export interface CustomDosirakItem {
  dosirakId: number;
  name: string;
  price: number;
  vote: number;
  imageUrl: string;
  isVoted: boolean;
}
