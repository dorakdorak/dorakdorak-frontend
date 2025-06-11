import axios from 'axios';
import useAuthStore from '@/store/authStore';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com', // 공통 베이스 URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (예: 토큰 자동 추가 등)
axiosInstance.interceptors.request.use(
  (config) => {
    // 예: 인증 토큰이 있다면 추가
    // const token = localStorage.getItem("accessToken");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    // Zustand 스토어에서 액세스 토큰 가져오기 token = Bearer token 값
    const token = useAuthStore.getState().accessToken;

    console.log(token);
    if (token) config.headers.Authorization = token;
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (에러 핸들링 일괄 처리 가능)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API 요청 에러:', error);
    return Promise.reject(error);
  }
);
export default axiosInstance;
