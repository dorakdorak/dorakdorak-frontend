import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore, { User } from '@/store/authStore'; // User 타입 import 추가
import '@/css/common/Header.css';

type HeaderProps = {
  isLoggedIn: boolean;
};

function Header({ isLoggedIn }: HeaderProps) {
  const navigate = useNavigate();

  // 🔥 타입 명시적 지정
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user) as User | null;

  // 로그아웃 핸들러
  const handleLogout = async (): Promise<void> => {
    try {
      // 1. 서버에 로그아웃 요청
      await axios.post(
        'http://localhost:8080/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('서버 로그아웃 성공');
    } catch (error) {
      console.error('서버 로그아웃 실패:', error);
    } finally {
      // 2. Zustand store 초기화
      logout();

      // 3. 메인 페이지로 리다이렉트
      navigate('/');

      // 4. 로그아웃 완료 알림
      alert('로그아웃이 완료되었습니다.');
    }
  };

  // 로그아웃 링크 클릭 핸들러
  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    handleLogout();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <img
              src="/images/logo2.png"
              alt="도락도락 로고"
              width={24}
              height={24}
            />
            <strong>도락도락</strong>
          </Link>
        </div>
        <nav className="header-nav-menu">
          <Link to="/menu">도시락 조회</Link>
          <Link to="/group-order">공구 주문</Link>
          <Link to="/custom-dosirak">나만의 도시락 만들기</Link>
          <Link to="/custom-ranking">커스텀 랭킹</Link>
          <Link to="/zero-waste">제로 웨이스트 랭킹</Link>
        </nav>
        <div className="header-user-menu">
          {isLoggedIn ? (
            <>
              {/* 🔥 사용자 정보 표시 (선택사항) */}
              {user?.email && <></>}
              <Link to="/mypage">마이페이지</Link>
              <span>|</span>
              <a
                href="#"
                onClick={handleLogoutClick}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                로그아웃
              </a>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <span>|</span>
              <Link to="/signup">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
