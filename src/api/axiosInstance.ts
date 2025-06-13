import axios from 'axios';
import useAuthStore from '@/store/authStore';
const axiosInstance = axios.create({
  baseURL: 'https://dorakdorak.store/', // 공통 베이스 URL https://api.example.com
  timeout: 5000,
  withCredentials: true,
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
  async (error) => {
    const statusCode = error.response?.status;
    console.log('응답 상태 코드:', statusCode);

    const isLoginRequest =
      error.config?.url?.includes('/api/auth/login') ||
      error.config?.url?.includes('/api/auth/signup') ||
      error.config?.url?.includes('/api/auth/logout');

    if ((statusCode === 419 || statusCode === 401) && !isLoginRequest) {
      try {
        const startUrl = 'https://dorakdorak.store/';
        const refreshResponse = await axios.post(
          startUrl + '/api/auth/reissue',
          {},
          {
            withCredentials: true,
          }
        );

        console.log('토큰 재발급 응답:', refreshResponse);

        // 새로운 액세스 토큰 추출
        const newToken =
          refreshResponse.headers['authorization'] ||
          refreshResponse.headers['Authorization'];

        // 1. Zustand 스토어 업데이트
        const { updateToken } = useAuthStore.getState();
        updateToken(newToken);
        console.log('Zustand에 새 토큰 저장 완료');

        // 2. 원래 실패한 요청에 새 토큰 적용
        error.config.headers['Authorization'] = newToken;
        console.log('원래 요청에 새 토큰 적용:', newToken);

        // 3. 새 토큰으로 원래 요청 재시도
        return axiosInstance(error.config);
      } catch (refreshError) {
        console.error('토큰 재발급 실패:', refreshError);
        const { logout } = useAuthStore.getState();
        logout();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
