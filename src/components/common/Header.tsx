import { Link } from "react-router-dom";
import "@/css/common/Header.css";

type HeaderProps = {
  isLoggedIn: boolean;
};

function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <img src="/images/logo2.png" alt="도락도락 로고" width={24} height={24} />
            <strong>도락도락</strong>
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/menu">도시락 조회</Link>
          <Link to="/group-order">공구 주문</Link>
          <Link to="/custom-dosirak">나만의 도시락 만들기</Link>
          <Link to="/custom-ranking">커스텀 랭킹</Link>
          <Link to="/zero-waste">제로 웨이스트 랭킹</Link>
        </nav>
        <div className="user-menu">
          {isLoggedIn ? (
            <>
              <Link to="/mypage">마이페이지</Link>
              <span>|</span>
              <Link to="/logout">로그아웃</Link>
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
