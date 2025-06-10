import axiosInstance from './axiosInstance';
import { RegisterData } from '@/types/signup';

// ✅ 공통 prefix (인증 관련 API 경로)
const AUTH_PREFIX = '/api/auth';

// 이메일 인증 요청 API
export const sendEmailVerification = async (email: string): Promise<void> => {
  try {
    const response = await axiosInstance.get(
      `${AUTH_PREFIX}/members/${encodeURIComponent(email)}`,
      {
        timeout: 30000,
      }
    );
    console.log('이메일 인증 요청 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('이메일 인증 요청 실패:', error);
    throw error;
  }
};

// 이메일 인증 코드 확인 API
export const verifyEmailCode = async (
  email: string,
  code: string
): Promise<void> => {
  try {
    const response = await axiosInstance.post(
      `${AUTH_PREFIX}/members/email/verify`,
      {
        email,
        code,
      }
    );
    console.log('이메일 인증 확인 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('이메일 인증 확인 실패:', error);
    throw error;
  }
};

// 회원가입 API
export const submitSignup = async (
  registerData: RegisterData
): Promise<void> => {
  try {
    console.log('회원가입 요청 데이터:', registerData);
    const response = await axiosInstance.post(
      `${AUTH_PREFIX}/signup`,
      registerData
    );
    console.log('회원가입 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};

// 대학교 목록 조회 API 필요시
// export const fetchUniversities = async (keyword?: string): Promise<void> => {
//   try {
//     const params = keyword ? { keyword } : {};
//     const response = await axiosInstance.get(`${AUTH_PREFIX}/universities`, {
//       params,
//     });
//     console.log('대학교 목록 조회 성공:', response.data);
//     return response.data || [];
//   } catch (error) {
//     console.error('대학교 목록 조회 실패:', error);
//     throw error;
//   }
// };

// // 알레르기 목록 조회 API 필요시
// export const fetchAllergies = async (keyword?: string): Promise<void> => {
//   try {
//     const params = keyword ? { keyword } : {};
//     const response = await axiosInstance.get(`${AUTH_PREFIX}/allergies`, {
//       params,
//     });
//     console.log('알레르기 목록 조회 성공:', response.data);
//     return response.data || [];
//   } catch (error) {
//     console.error('알레르기 목록 조회 실패:', error);
//     throw error;
//   }
// };

// 📌 기본 export (선택사항)
export default {
  sendEmailVerification,
  verifyEmailCode,
  submitSignup,
  // fetchUniversities,
  // fetchAllergies,
};
