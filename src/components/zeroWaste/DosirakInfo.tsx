import styles from "@/css/zeroWaste/ZeroWasteCert.module.css";
import { ZeroWasteInfo } from "@/types/ZeroWaste";

const DosirakInfo = ({ info }: { info: ZeroWasteInfo }) => (
  <div className={styles.dosirakInfo}>
    <img src={info.imageUrl} alt={info.dosirakName} className={styles.image} />
    <div className={styles.text}>
      <p className={styles.name}>{info.dosirakName}</p>
      <p className={styles.date}>인증 기한: ~{info.expireDate}</p>
    </div>
  </div>
);

export default DosirakInfo;