import axiosInstance from "./axiosInstance";
import { University } from "@/types/UniversityRanking";

export interface UniversityRankingResponse {
  universities: University[];
}

export async function fetchUniversityRanking(): Promise<University[] | null> {
  try {
    const response = await axiosInstance.get<UniversityRankingResponse>("/api/zero-waste/university");
    return response.data.universities;
  } catch (error) {
    console.error("대학교 랭킹 조회 실패:", error);
    return null;
  }
}
