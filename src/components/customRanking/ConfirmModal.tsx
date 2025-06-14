import styles from "@/css/customRanking/VoteModal.module.css";

interface ConfirmModalProps {
  name: string;
  mode: "vote" | "regist";
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ name, mode, show, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!show) return null;

  const isVote = mode === "vote";

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.message}>
          [{name}]
          {isVote ? (
            <>
              에 <br />
              투표를 하시겠습니까?
            </>
          ) : (
            <>
              을 <br />
              정식 등록하시겠습니까?
            </>
          )}
        </div>
        <hr className={styles.separator} />
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            {isVote ? "취소하기" : "등록 취소"}
          </button>
          <span className={styles.divider}>|</span>
          <button className={styles.confirm} onClick={onConfirm}>
            {isVote ? "투표하기" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
