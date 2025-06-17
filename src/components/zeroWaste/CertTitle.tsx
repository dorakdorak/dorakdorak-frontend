import styles from "@/css/zeroWaste/ZeroWasteCert.module.css";

const CertTitle = ({ highlight }: { highlight: string }) => (
  <div className={styles.titleWrapper}>
    <p className={styles.certHighlight}>
        <img
            src="/images/logo2.png"
            alt="도락도락 로고"
            width={24}
            height={24}
        />
        <strong>{highlight}</strong>
    </p>
    <p className={styles.certSub}>제로 웨이스트 인증</p>
  </div>
);

export default CertTitle;