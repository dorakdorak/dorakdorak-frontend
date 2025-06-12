import styles from '@/css/login/login.module.css';

interface Props {
  isFormValid: () => boolean;
  isLoading: boolean;
}

function SubmitButton({ isFormValid, isLoading }: Props): React.ReactElement {
  return (
    <button
      type="submit"
      className={styles.btnLogin}
      disabled={!isFormValid() || isLoading}
    >
      {isLoading ? '로그인 중...' : '로그인'}
    </button>
  );
}

export default SubmitButton;
