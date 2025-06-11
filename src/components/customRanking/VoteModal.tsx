import styles from "@/css/customRanking/VoteModal.module.css";

interface VoteModalProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const VoteModal = ({ name, onConfirm, onCancel }: VoteModalProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.message}>
          [{name}]에 <br />
          투표를 하시겠습니까?
        </div>
        <hr className={styles.separator} />
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            취소하기
          </button>
          <span className={styles.divider}>|</span>
          <button className={styles.confirm} onClick={onConfirm}>
            투표하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
