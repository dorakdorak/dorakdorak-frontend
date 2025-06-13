import { Link } from "react-router-dom";
import { useLoginForm } from "@/hooks/useLoginForm"; // 📌 훅 import
import styles from "@/css/common/Header.module.css";

function AdminHeader(): React.ReactElement {
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
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
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
          <Link to="/order-management">주문관리</Link>
          <Link to="/dosirak-management">제품관리</Link>
          <Link to="/sales-statistics">판매량통계</Link>
          <Link to="/popular-statistics">인기도통계</Link>
          <Link to="/order-statistics">주문통계</Link>
        </nav>
        <div className={styles.headerUserMenu}>
          <a
            href="#"
            onClick={handleLogoutClick}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: isLogoutLoading ? "not-allowed" : "pointer", //  로딩 중 커서 변경
              opacity: isLogoutLoading ? 0.6 : 1, // 로딩 중 투명도 변경
            }}
          >
            {isLogoutLoading ? "로그아웃 중..." : "로그아웃"}{" "}
          </a>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
