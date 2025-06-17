import axiosInstance from "@/api/axiosInstance";

export interface VoteResponse {
  status: string; // "success"
  message: string; // "투표가 정상적으로 등록되었습니다."
}

export async function voteCustomDosirak(dosirakId: number): Promise<VoteResponse> {
  try {
    const response = await axiosInstance.post<VoteResponse>(
      `/api/custom-dosiraks/${dosirakId}/vote`
    );
    return response.data;
  } catch (error) {
    console.error(`도시락 투표 실패 (ID: ${dosirakId})`, error);
    throw error;
  }
}
