import styles from "@/css/zeroWaste/ZeroWasteCert.module.css";

const GaugeBar = ({ percentage }: { percentage: number }) => (
  <div className={styles.gaugeWrapper}>
    <div className={styles.gaugeBar}>
      <div className={styles.gaugeFill} style={{ width: `${percentage}%` }} />
    </div>
    <p className={styles.gaugeText}>잔반 비율: {percentage}%</p>
  </div>
);

export default GaugeBar;