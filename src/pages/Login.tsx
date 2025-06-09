import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuthStore, { User } from '@/store/authStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  // 상태 변수
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 이메일 입력 핸들러
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setLoginError('');
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    setLoginError('');
  };

  // 폼 유효성 검증
  const isFormValid = (): boolean => {
    return email.trim() !== '' && password.trim() !== '';
  };

  // 로그인 제출 핸들러
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setLoginError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        {
          email: email.trim(),
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const accessToken = response.headers['authorization'] as string;
        console.log('Access Token:', accessToken);

        if (accessToken) {
          // localStorage에 저장 (기존 방식 유지)
          localStorage.setItem('accesstoken', accessToken);

          // Zustand store에 로그인 상태 저장
          const userData: User = {
            email: email.trim(),
            // JWT 토큰에서 추가 정보가 있다면 여기서 디코딩 가능
            id: Date.now(), // 임시 ID (실제로는 JWT에서 추출)
            createdAt: new Date().toISOString(),
          };

          login(accessToken, userData);
        }

        console.log('로그인 성공:', response.data);
        alert('로그인이 완료되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      setLoginError('아이디 또는 비밀번호가 잘못되었습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">로그인</h1>
        <div className="title-line"></div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">이메일</label>
            <input
              type="email"
              className="form-input"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-row">
            <label className="form-label">비밀번호</label>
            <input
              type="password"
              className="form-input"
              placeholder="비밀번호"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
            />
          </div>

          {loginError && (
            <div className="error-message">
              <span className="error-text">{loginError}</span>
            </div>
          )}

          <button
            type="submit"
            className="btn-login"
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>

          <div className="signup-link">
            <span>아직 회원이 아니신가요? </span>
            <Link to="/signup" className="link-text">
              회원가입
            </Link>
          </div>
        </form>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .login-page {
          background: #fff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .login-container {
          max-width: 500px;
          width: 100%;
          padding: 40px 20px;
        }

        .login-title {
          font-size: 24px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
          text-align: left;
        }

        .title-line {
          width: 100%;
          height: 1px;
          background: #ddd;
          margin-bottom: 30px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
          min-width: 80px;
          text-align: left;
        }

        .form-input {
          flex: 1;
          height: 40px;
          padding: 0 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          color: #333;
          background: #fff;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: #8bc572;
        }

        .form-input:disabled {
          background: #f5f5f5;
          color: #666;
          cursor: not-allowed;
        }

        .form-input::placeholder {
          color: #999;
        }

        .error-message {
          margin-left: 96px;
          margin-top: -12px;
          margin-bottom: 8px;
        }

        .error-text {
          color: #ff6b6b;
          font-size: 12px;
        }

        .btn-login {
          width: 100%;
          height: 45px;
          background: #8bc572;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 20px;
        }

        .btn-login:hover:not(:disabled) {
          background: #7bb462;
        }

        .btn-login:disabled {
          background: #ccc;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .signup-link {
          text-align: center;
          font-size: 14px;
          color: #666;
          margin-top: 16px;
        }

        .link-text {
          color: #8bc572;
          text-decoration: underline;
          font-weight: 500;
        }

        .link-text:hover {
          color: #7bb462;
        }

        @media (max-width: 600px) {
          .login-container {
            padding: 24px 16px;
            margin: 0 16px;
          }
          
          .form-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          
          .form-label {
            min-width: auto;
          }
          
          .form-input {
            width: 100%;
          }

          .error-message {
            margin-left: 0;
            margin-top: 4px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
