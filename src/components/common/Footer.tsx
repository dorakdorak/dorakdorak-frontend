import styles from "@/css/common/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLeft}>
          <p>
            <span className={styles.label}>대표이메일</span>{" "}
            <span className={styles.email}>dorakdorak@hyundai.co.kr</span>
          </p>
          <p className={styles.copyright}>© DORAKDORAK All Rights Reserved.</p>
        </div>
        <div className={styles.footerRight}>
          <div>DORAK</div>
          <div>DORAK</div>
          <div>도락도락</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
