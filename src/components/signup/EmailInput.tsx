import { SignupFormData, ServerErrors } from '@/types/signup';
import { sendEmailVerification } from '@/api/signupApi';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  formData: SignupFormData;
  updateFormData: (
    field: keyof SignupFormData,
    value: string | number | null
  ) => void;
  verificationMessage: string;
  isVerified: boolean;
  isRateLimited: boolean;
  setShowVerification: React.Dispatch<React.SetStateAction<boolean>>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setVerificationMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsRateLimited: React.Dispatch<React.SetStateAction<boolean>>;
  serverErrors: ServerErrors;
}

function EmailInput({
  formData,
  updateFormData,
  verificationMessage,
  isVerified,
  isRateLimited,
  setShowVerification,
  setTimeLeft,
  setVerificationCode,
  setIsVerified,
  setVerificationMessage,
  setIsRateLimited,
  serverErrors,
}: Props): React.ReactElement {
  const handleDomainSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const value = e.target.value;
    updateFormData('selectedDomain', value);
    if (value !== '직접 입력') {
      updateFormData('emailDomain', value);
    } else {
      updateFormData('emailDomain', '');
    }
  };

  const handleEmailVerification = async (): Promise<void> => {
    const fullEmail = `${formData.email}@${formData.emailDomain}`;

    try {
      await sendEmailVerification(fullEmail);
      setShowVerification(true);
      setTimeLeft(180);
      setVerificationCode('');
      setIsVerified(false);
      setVerificationMessage('인증 코드가 전송되었습니다.');
      setIsRateLimited(false);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 429) {
          setIsRateLimited(true);
          setVerificationMessage(
            '일일 이메일 인증 요청 횟수(5회)를 초과했습니다. 24시간 후에 다시 시도해주세요.'
          );
        } else if (axiosError.response?.status === 500) {
          setVerificationMessage(
            '이미 등록된 사용자입니다. 다른 이메일로 회원가입해주세요.'
          );
        }
      } else {
        setVerificationMessage('인증 코드 발급에 실패하였습니다.');
      }
    }
  };

  return (
    <div className={styles.formGroup}>
      <label className={`${styles.formLabel} ${styles.required}`}>이메일</label>
      <div className={styles.emailRow}>
        <input
          type="text"
          className={styles.formInput}
          placeholder="이메일"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
        />
        <span className={styles.atSymbol}>@</span>
        <select
          className={styles.formSelect}
          value={formData.selectedDomain}
          onChange={handleDomainSelect}
        >
          <option value="직접 입력">선택</option>
          <option value="naver.com">naver.com</option>
          <option value="gmail.com">gmail.com</option>
          <option value="daum.net">daum.net</option>
        </select>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={handleEmailVerification}
          disabled={
            !formData.email ||
            !formData.emailDomain ||
            isVerified ||
            isRateLimited
          }
        >
          이메일 인증
        </button>
      </div>
      {verificationMessage && (
        <div className={styles.verificationMessage}>
          <span
            className={
              verificationMessage.includes('성공') ||
              verificationMessage.includes('전송')
                ? styles.successText
                : styles.errorText
            }
          >
            {verificationMessage}
          </span>
        </div>
      )}
      {serverErrors.email && (
        <div className={styles.validationMessage}>
          <span className={styles.errorText}>{serverErrors.email}</span>
        </div>
      )}
    </div>
  );
}

export default EmailInput;
