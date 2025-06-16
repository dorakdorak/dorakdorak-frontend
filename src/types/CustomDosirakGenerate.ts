import { Nutrition, StorageType } from "@/types/DosirakDetail";

export type CreateCustomDosirakRequest = {
  mainPreference: string;
  importantSense: string;
  mealAmount: string;
  cravingFlavor: string;
};

export type CreateCustomDosirakResponse = {
  name: string;
  imageUrl: string;
  price: number;
  weight: number;
  storageType: StorageType;
  categories: string[];
  nutrition: Nutrition;
  message: string;
};
