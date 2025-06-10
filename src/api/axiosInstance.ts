import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 공통 베이스 URL https://api.example.com
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
