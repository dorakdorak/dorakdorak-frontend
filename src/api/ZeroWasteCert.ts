import axiosInstance from "./axiosInstance";

import { ZeroWasteInfo, ZeroWasteResult } from "@/types/ZeroWaste";

/**
 * 도시락 인증용 정보 조회 (도시락명, 기한, 이미지)
 */
export const fetchZeroWasteInfo = (qrcode: string) => {
  return axiosInstance.get<ZeroWasteInfo>(`/api/zero-waste/${qrcode}`);
};

/**
 * 도시락 인증 이미지 업로드
 */
export const uploadZeroWasteImage = (qrcode: string, image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  return axiosInstance.post<ZeroWasteResult>(`/api/zero-waste/${qrcode}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};