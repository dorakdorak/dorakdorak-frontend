import styles from "@/css/zeroWaste/ZeroWasteCert.module.css";

const ImageUploadBox = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <label htmlFor="upload" className={styles.uploadBox}>
    <span className={styles.plus}>＋</span>
    사진 업로드
    <input
      id="upload"
      type="file"
      accept="image/*"
      style={{ display: "none" }}
      onChange={onChange}
    />
  </label>
);

export default ImageUploadBox;