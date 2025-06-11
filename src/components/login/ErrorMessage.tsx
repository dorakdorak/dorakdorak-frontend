import styles from '@/css/login/login.module.css';

interface Props {
  message: string;
}

function ErrorMessage({ message }: Props): React.ReactElement | null {
  if (!message) return null;

  return (
    <div className={styles.errorMessage}>
      <span className={styles.errorText}>{message}</span>
    </div>
  );
}

export default ErrorMessage;
