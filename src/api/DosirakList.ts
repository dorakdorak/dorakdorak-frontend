import axiosInstance from "./axiosInstance";
import { DosirakRequest, DosirakItem } from "@/types/DosirakList";

export default async function fetchDosiraks(request: DosirakRequest): Promise<DosirakItem[]> {
  try {
    const response = await axiosInstance.post<DosirakItem[]>("/dosiraks", request);
    return response.data;
  } catch (error) {
    console.error("도시락 목록 조회 실패:", error);
    throw error;
  }
}
