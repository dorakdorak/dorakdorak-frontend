import styles from '@/css/customRanking/VoteModal.module.css';

interface ModalProps {
  message: string;
  show: boolean;
  onConfirm: () => void;
}

const Modal = ({
  message,
  show,
  onConfirm,
}: ModalProps): React.ReactElement | null => {
  // show가 false면 모달을 렌더링하지 않음
  if (!show) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.message}>{message}</div>
        <hr className={styles.separator} />
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
