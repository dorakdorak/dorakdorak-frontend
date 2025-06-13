import styles from '@/css/signup/Signup.module.css';

interface Props {
  isFormValid: () => boolean;
  resetForm: () => void;
}

function SubmitButtons({ isFormValid, resetForm }: Props): React.ReactElement {
  const handleCancel = (): void => {
    const isConfirmed = window.confirm(
      '입력한 내용이 모두 삭제됩니다. 계속하시겠습니까?'
    );
    if (isConfirmed) {
      resetForm();
    }
  };

  return (
    <div className={styles.buttonRow}>
      <button
        type="button"
        className={`${styles.btn} ${styles.btnCancel}`}
        onClick={handleCancel}
      >
        취소
      </button>
      <button
        type="submit"
        className={`${styles.btn} ${styles.btnSubmit}`}
        disabled={!isFormValid()}
      >
        가입하기
      </button>
    </div>
  );
}

export default SubmitButtons;
