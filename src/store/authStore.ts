import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 사용자 정보 타입 정의 (any 제거)
interface User {
  email: string;
  name?: string;
  role?: string;
  // 추가 속성이 필요한 경우 명시적으로 정의
  id?: number;
  profileImage?: string;
  createdAt?: string;
}

// Auth Store 상태 타입 정의
interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
}

// Auth Store 액션 타입 정의
interface AuthActions {
  login: (token: string, userData?: User | null) => void;
  logout: () => void;
  checkAuth: () => void;
}

// 전체 Auth Store 타입
type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set): AuthStore => ({
      // get 매개변수 제거
      // 상태
      isLoggedIn: false,
      accessToken: null,
      user: null,

      // 액션
      login: (token: string, userData: User | null = null): void => {
        set({
          isLoggedIn: true,
          accessToken: token,
          user: userData,
        });
      },

      logout: (): void => {
        set({
          isLoggedIn: false,
          accessToken: null,
          user: null,
        });
        // localStorage에서도 제거
        localStorage.removeItem('accesstoken');
      },

      // 토큰 유효성 확인
      checkAuth: (): void => {
        const token = localStorage.getItem('accesstoken');
        if (token) {
          set({
            isLoggedIn: true,
            accessToken: token,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage 키
      partialize: (state: AuthStore): Partial<AuthState> => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;
export type { User, AuthState, AuthActions, AuthStore };
