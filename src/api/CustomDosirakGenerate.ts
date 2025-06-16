import {
  CreateCustomDosirakRequest,
  CreateCustomDosirakResponse,
  CustomDosirakRegisterRequest,
  CustomDosirakRegisterResponse,
} from "@/types/CustomDosirakGenerate";
import axiosInstance from "@/api/axiosInstance";

/* 커스텀 도시락 미리보기 생성 요청 */
export async function createCustomDosirak(
  request: CreateCustomDosirakRequest
): Promise<CreateCustomDosirakResponse> {
  try {
    const response = await axiosInstance.post<CreateCustomDosirakResponse>(
      "/api/custom-dosiraks/preview",
      request
    );
    return response.data;
  } catch (error) {
    console.error("커스텀 도시락 생성 실패:", error);
    throw error;
  }
}

/* 커스텀 도시락 등록 요청 */
export async function registerCustomDosirak(
  request: CustomDosirakRegisterRequest
): Promise<CustomDosirakRegisterResponse> {
  try {
    const response = await axiosInstance.post<CustomDosirakRegisterResponse>(
      "/api/custom-dosiraks",
      request
    );
    return response.data;
  } catch (error) {
    console.error("커스텀 도시락 등록 실패:", error);
    throw error;
  }
}
