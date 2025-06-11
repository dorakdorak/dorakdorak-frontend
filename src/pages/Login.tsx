import { useLoginForm } from '@/hooks/useLoginForm';
import EmailInput from '@/components/login/EmailInput';
import PasswordInput from '@/components/login/PasswordInput';
import SubmitButton from '@/components/login/SubmitButton';
import ErrorMessage from '@/components/login/ErrorMessage';
import SignupLink from '@/components/login/SignupLink';
import styles from '@/css/login/login.module.css';

function LoginPage(): React.ReactElement {
  const {
    email,
    password,
    loginError,
    isLoading,
    handleEmailChange,
    handlePasswordChange,
    isFormValid,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>로그인</h1>
        <div className={styles.titleLine}></div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <EmailInput
            email={email}
            onChange={handleEmailChange}
            disabled={isLoading}
          />

          <PasswordInput
            password={password}
            onChange={handlePasswordChange}
            disabled={isLoading}
          />

          <ErrorMessage message={loginError} />

          <SubmitButton isFormValid={isFormValid} isLoading={isLoading} />

          <SignupLink />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
