import axiosInstance from "./axiosInstance";
import { DosirakDetail } from "@/types/DosirakDetail";

export async function fetchDosirakDetail(dosirakId: number): Promise<DosirakDetail | null> {
  try {
    const response = await axiosInstance.get(`/api/dosiraks/${dosirakId}`);
    const raw = response.data;

    const dosirakDetail: DosirakDetail = {
      id: raw.dosirakId,
      baseInfo: {
        name: raw.name,
        price: raw.price,
        salePercentage: raw.salesPercentage,
        weight: raw.weight,
        storageType: raw.storageType,
        thumbnailImageUrl: raw.thumbnailImageUrl,
        detailImages: raw.detailImages,
      },
      nutrition: raw.nutrition,
    };

    return dosirakDetail;
  } catch (error) {
    console.error(`도시락 ID ${dosirakId} 조회 실패:`, error);
    return null;
  }
}
