import axiosInstance from './axiosInstance';
import { AxiosResponse } from 'axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  // 필요시 추가 필드
}

export interface LogoutResponse {
  message: string;
  // 필요시 추가 필드
}

// Axios Response 타입 명시
export type LoginApiResponse = AxiosResponse<LoginResponse>;
export type LogoutApiResponse = AxiosResponse<LogoutResponse>;

// 로그인 API (반환 타입 명시)
export const loginUser = async (
  email: string,
  password: string
): Promise<LoginApiResponse> => {
  try {
    console.log('🔐 로그인 요청:', { email });

    const response: LoginApiResponse = await axiosInstance.post(
      '/api/auth/login',
      { email: email.trim(), password }
    );

    console.log('✅ 로그인 성공:', response.data);
    return response; // 전체 AxiosResponse 반환
  } catch (error) {
    console.error('❌ 로그인 실패:', error);

    if (error.response?.status === 401) {
      throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error(
        '로그인 요청이 지연되고 있습니다. 잠시 후 다시 시도해주세요.'
      );
    }

    // throw new Error('로그인 중 오류가 발생했습니다.');
  }
};

// 로그아웃 API (POST 방식)
export const logoutUser = async (): Promise<LogoutApiResponse> => {
  try {
    console.log('🚪 로그아웃 요청');

    const response: LogoutApiResponse = await axiosInstance.post(
      '/api/auth/logout'
    );

    console.log('✅ 로그아웃 성공:', response.data);
    return response; // 전체 AxiosResponse 반환
  } catch (error) {
    console.error('❌ 로그아웃 실패:', error);

    if (error.response?.status === 401) {
      throw new Error('인증이 만료되었습니다.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error(
        '로그아웃 요청이 지연되고 있습니다. 잠시 후 다시 시도해주세요.'
      );
    }

    throw new Error('로그아웃 중 오류가 발생했습니다.');
  }
};

// orders (권한이 있는 곳)
export const test = async (): Promise<LogoutApiResponse> => {
  try {
    console.log('test 요청');

    const response: LogoutApiResponse = await axiosInstance.get('/api/test');

    console.log('✅ test 성공:', response.data);
    return response; // 전체 AxiosResponse 반환
  } catch (error) {
    console.error('❌ test 실패:', error);

    if (error.response?.status === 401) {
      throw new Error('test 만료되었습니다.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('test 잠시 후 다시 시도해주세요.');
    }

    throw new Error('test 오류가 발생했습니다.');
  }
};

export default {
  loginUser,
  logoutUser, // 로그아웃 함수 추가
  test,
};
