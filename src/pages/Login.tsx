import { useLoginForm } from "@/hooks/useLoginForm";
import EmailInput from "@/components/login/EmailInput";
import PasswordInput from "@/components/login/PasswordInput";
import SubmitButton from "@/components/login/SubmitButton";
import ErrorMessage from "@/components/login/ErrorMessage";
import SignupLink from "@/components/login/SignupLink";
import styles from "@/css/login/login.module.css";

import { useLocation } from "react-router-dom";
import Modal from "@/components/common/Modal";
import { useState } from "react";

function LoginPage(): React.ReactElement {
  const location = useLocation();
  const navigateMessage = location.state?.message;

  const [showModal, setShowModal] = useState<boolean>(!!navigateMessage);

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

  const handleConfirm = () => {
    setShowModal(false);
    // 메시지 한 번 본 뒤에는 상태를 초기화 (뒤로 가기 방지용)
    window.history.replaceState({}, document.title);
  };

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

      <Modal
        message={navigateMessage || ""}
        show={showModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default LoginPage;
