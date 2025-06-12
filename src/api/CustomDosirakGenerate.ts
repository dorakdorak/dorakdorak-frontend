import {
  CreateCustomDosirakRequest,
  CreateCustomDosirakResponse,
} from "@/types/CustomDosirakGenerate";
import axiosInstance from "@/api/axiosInstance";

export default async function createCustomDosirak(
  request: CreateCustomDosirakRequest
): Promise<CreateCustomDosirakResponse> {
  try {
    const response = await axiosInstance.post<CreateCustomDosirakResponse>(
      "/dosiraks/custom-dosirak",
      request
    );
    return response.data;
  } catch (error) {
    console.error("커스텀 도시락 생성 실패:", error);
    throw error;
  }
}
