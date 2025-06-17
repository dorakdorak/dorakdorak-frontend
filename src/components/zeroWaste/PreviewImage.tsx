import styles from "@/css/zeroWaste/ZeroWasteCert.module.css";

const PreviewImage = ({ url }: { url: string }) => (
  <div className={styles.previewWrapper}>
    <img src={url} alt="업로드된 도시락" className={styles.previewImage} />
  </div>
);

export default PreviewImage;