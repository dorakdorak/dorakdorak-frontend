import { Nutrition } from "@/types/DosirakDetail";

export type CreateCustomDosirakRequest = {
  likedIngredient: string;
  dislikedIngredient: string;
  preferredStyle: string;
  desiredFeeling: string;
};

export type CreateCustomDosirakResponse = {
  customDosirakId: number;
  name: string;
  imageUrl: string;
  nutrition: Nutrition;
  message: string;
};
