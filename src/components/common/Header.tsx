import "@/css/common/Header.css";

type HeaderProps = {
  isLoggedIn: boolean;
};

function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/images/logo2.png" alt="도락도락 로고" width={24} height={24} />{" "}
          <strong>도락도락</strong>
        </div>
        <nav className="nav-menu">
          <span>도시락 조회</span>
          <span>공구 주문</span>
          <span>나만의 도시락 만들기</span>
          <span>커스텀 랭킹</span>
          <span>제로 웨이스트 랭킹</span>
        </nav>
        <div className="user-menu">
          {isLoggedIn ? (
            <>
              <span>마이페이지</span>
              <span>|</span>
              <span>로그아웃</span>
            </>
          ) : (
            <>
              <span>로그인</span>
              <span>|</span>
              <span>회원가입</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
