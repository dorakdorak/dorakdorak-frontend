import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 사용자 정보 타입 정의
interface User {
  email: string;
  role: string;
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
  updateToken: (newToken: string) => void; // 토큰 업데이트 함수 추가
  updateUser: (userData: User) => void; // 사용자 정보 업데이트 함수 추가
}

// 전체 Auth Store 타입
type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>()(
  persist(
    (set): AuthStore => ({
      // 상태
      isLoggedIn: false,
      accessToken: null,
      user: null,

      // 로그인 액션 (localStorage 제거)
      login: (token: string, userData: User | null = null): void => {
        console.log('🔐 Zustand 로그인:', {
          email: userData?.email || 'Unknown',
          role: userData?.role || 'Unkown',
          token: token,
        });

        set({
          isLoggedIn: true,
          accessToken: token,
          user: userData,
        });
      },

      // 로그아웃 액션 (localStorage 제거)
      logout: (): void => {
        console.log('🚪 Zustand 로그아웃 - persist만 정리');

        set({
          isLoggedIn: false,
          accessToken: null,
          user: null,
        });
        //  localStorage.removeItem('accesstoken') 제거됨
      },

      // 토큰 업데이트 (새로 추가)
      updateToken: (newToken: string): void => {
        console.log('🔄 토큰 업데이트:', newToken);

        set({
          accessToken: newToken,
        });
      },

      // 사용자 정보 업데이트 (새로 추가)
      updateUser: (userData: User): void => {
        console.log('👤 사용자 정보 업데이트:', userData.email);

        set({
          user: userData,
        });
      },
    }),
    {
      name: 'auth-storage', // Zustand persist만 사용
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
