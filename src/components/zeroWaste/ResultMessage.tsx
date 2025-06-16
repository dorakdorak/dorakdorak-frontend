import styles from "@/css/zeroWaste/ZeroWasteCert.module.css";
import { ZeroWasteResult } from "@/types/ZeroWaste";

const ResultMessage = ({
  result,
  onRetry,
}: {
  result: ZeroWasteResult;
  onRetry: () => void;
}) => (
  <div className={styles.result}>
    <p className={result.status === "ACCEPTED" ? styles.success : styles.fail}>
      {result.status === "ACCEPTED" ? "💚 인증 성공!" : "⚠ 인증 실패"}
    </p>
    <p className={styles.resultText}>{result.message}</p>
    {result.status === "REJECTED" && (
      <button className={styles.retryButton} onClick={onRetry}>
        다시 시도하기
      </button>
    )}
  </div>
);

export default ResultMessage;