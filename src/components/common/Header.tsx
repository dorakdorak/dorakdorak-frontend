import { Link } from 'react-router-dom';
import { useLoginForm } from '@/hooks/useLoginForm'; // 📌 훅 import
import styles from '@/css/common/Header.module.css';

type HeaderProps = {
  isLoggedIn: boolean;
};

function Header({ isLoggedIn }: HeaderProps): React.ReactElement {
  // useLoginForm 훅에서 로그아웃 기능 가져오기
  const { handleLogout, isLogoutLoading } = useLoginForm();

  //  로그아웃 링크 클릭 핸들러 (간소화됨)
  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    handleLogout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLogo}>
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
        <nav className={styles.headerNavMenu}>
          <Link to="/menu">도시락 조회</Link>
          <Link to="/group-order">공구 주문</Link>
          <Link to="/custom-dosirak">나만의 도시락 만들기</Link>
          <Link to="/custom-ranking">커스텀 랭킹</Link>
          <Link to="/zero-waste">제로 웨이스트 랭킹</Link>
        </nav>
        <div className={styles.headerUserMenu}>
          {isLoggedIn ? (
            <>
              <Link to="/mypage">마이페이지</Link>
              <span>|</span>
              <a
                href="#"
                onClick={handleLogoutClick}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: isLogoutLoading ? 'not-allowed' : 'pointer', //  로딩 중 커서 변경
                  opacity: isLogoutLoading ? 0.6 : 1, // 로딩 중 투명도 변경
                }}
              >
                {isLogoutLoading ? '로그아웃 중...' : '로그아웃'}{' '}
                {/* 로딩 상태 표시 */}
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
