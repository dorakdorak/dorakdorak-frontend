import axiosInstance from "./axiosInstance";
import { DosirakDetail } from "@/types/DosirakDetail";

export async function fetchDosirakDetail(dosirakId: number): Promise<DosirakDetail | null> {
  try {
    const response = await axiosInstance.get<DosirakDetail>(`/dosiraks/${dosirakId}`);
    return response.data;
  } catch (error) {
    console.error(`도시락 ID ${dosirakId} 조회 실패:`, error);
    return null;
  }
}
