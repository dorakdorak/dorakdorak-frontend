import axiosInstance from "./axiosInstance";
import { DosirakRequest, DosirakItem } from "@/types/DosirakList";

export default async function fetchDosiraks(
  request: DosirakRequest
): Promise<{ dosiraks: DosirakItem[] }> {
  try {
    const response = await axiosInstance.get<{ dosiraks: DosirakItem[] }>("/api/dosiraks", {
      params: request,
    });
    return response.data;
  } catch (error) {
    console.error("도시락 목록 조회 실패:", error);
    throw error;
  }
}
