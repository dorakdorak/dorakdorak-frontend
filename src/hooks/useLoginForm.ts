import { useState, ChangeEvent, FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser, LoginApiResponse } from '@/api/authApi';
import useAuthStore, { User } from '@/store/authStore';
interface JwtPayload {
  role: string;
  email: string;
}
export interface UseLoginFormReturn {
  // 기존 로그인 관련
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  loginError: string;
  isLoading: boolean;
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isFormValid: () => boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;

  // 로그아웃 관련
  isLogoutLoading: boolean;
  handleLogout: () => Promise<void>;
}

export function useLoginForm(): UseLoginFormReturn {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  // 기존 상태들
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 로그아웃 로딩 상태
  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setLoginError('');
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setLoginError('');
  };

  const isFormValid = (): boolean => {
    return email.trim() !== '' && password.trim() !== '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!isFormValid()) {
      setLoginError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const response: LoginApiResponse = await loginUser(
        email.trim(),
        password
      );

      const accessToken =
        response?.headers?.['authorization'] ||
        response?.headers?.['Authorization'] ||
        null;

      console.log('Access Token:', accessToken);

      if (accessToken) {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        const role = decoded.role; // "ADMIN" 또는 "MEMBER" 등
        console.log(role);
        // localStorage 제거, Zustand 스토어만 사용
        const userData: User = {
          email: email.trim(),
          role: role.trim(),
        };

        // Zustand 스토어에만 저장 (login 함수가 모든 것을 처리)
        login(accessToken, userData);

        console.log('로그인 성공 - Zustand 스토어에 저장됨');
      } else {
        throw new Error('서버로부터 액세스 토큰을 받지 못했습니다.');
      }
      console.log('로그인 완료:', response.data);
      navigate('/');
    } catch (error) {
      console.error('로그인 에러:', error);
      setLoginError(error.message || '아이디 또는 비밀번호가 잘못되었습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 로그아웃 핸들러 (Zustand 중심)
  const handleLogout = async (): Promise<void> => {
    setIsLogoutLoading(true);

    try {
      console.log('로그아웃 시작');

      // 서버에 로그아웃 요청 (쿠키 삭제 등)
      await logoutUser();

      console.log('서버 로그아웃 성공');
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
      // 서버 로그아웃 실패해도 클라이언트는 정리
    } finally {
      // Zustand 스토어만 초기화 (localStorage는 스토어에서 처리)
      logout(); // Zustand logout 함수가 모든 정리를 담당

      console.log('클라이언트 상태 정리 완료');
      setIsLogoutLoading(false);

      // 로그인 페이지로 리다이렉트
      navigate('/login');
    }
  };

  return {
    // 기존 로그인 관련
    email,
    setEmail,
    password,
    setPassword,
    loginError,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    isFormValid,
    handleSubmit,

    // 로그아웃 관련
    isLogoutLoading,
    handleLogout,
  };
}

export default useLoginForm;
