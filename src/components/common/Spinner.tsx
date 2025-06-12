import styles from "@/css/common/Spinner.module.css";

interface SpinnerProps {
  text?: string;
}

export default function Spinner({ text = "로딩 중" }: SpinnerProps) {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.loadingText}>{text}</p>
    </div>
  );
}
