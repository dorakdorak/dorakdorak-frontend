import { SignupFormData } from '@/types/signup';
import { verifyEmailCode } from '@/api/signupApi';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  showVerification: boolean;
  verificationCode: string;
  setVerificationCode: React.Dispatch<React.SetStateAction<string>>;
  timeLeft: number;
  isVerified: boolean;
  setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  setVerificationMessage: React.Dispatch<React.SetStateAction<string>>;
  formData: SignupFormData;
  isRateLimited: boolean;
  onResendVerification: () => Promise<void>;
}

function VerificationCodeInput({
  showVerification,
  verificationCode,
  setVerificationCode,
  timeLeft,
  isVerified,
  setIsVerified,
  setVerificationMessage,
  formData,
  isRateLimited,
  onResendVerification,
}: Props): React.ReactElement | null {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleVerificationCodeCheck = async (): Promise<void> => {
    const fullEmail = `${formData.email}@${formData.emailDomain}`;

    if (!verificationCode || verificationCode.length !== 6) {
      setVerificationMessage('인증번호 6자리를 정확히 입력해주세요.');
      return;
    }

    try {
      await verifyEmailCode(fullEmail, verificationCode);
      setIsVerified(true);
      setVerificationMessage('이메일 인증 성공');
    } catch (error: unknown) {
      setIsVerified(false);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 500) {
          setVerificationMessage(
            '입력하신 인증번호가 올바르지 않습니다. 다시 확인해주세요.'
          );
        } else {
          setVerificationMessage('인증번호 확인 중 오류가 발생했습니다.');
        }
      } else {
        setVerificationMessage('인증번호 확인 중 오류가 발생했습니다.');
      }
    }
  };

  if (!showVerification) return null;

  return (
    <div className={`${styles.formGroup} ${styles.verificationGroup}`}>
      <label className={`${styles.formLabel} ${styles.required}`}>
        인증번호
      </label>
      <div className={styles.verificationRow}>
        <input
          type="text"
          className={`${styles.formInput} ${styles.verificationInput}`}
          placeholder="인증번호 6자리를 입력해 주세요."
          value={verificationCode}
          onChange={(e) => {
            const value = e.target.value.replace(/[^0-9a-zA-Z]/g, '');
            setVerificationCode(value.slice(0, 6));
          }}
          maxLength={6}
          disabled={isVerified}
        />
        {!isVerified && (
          <span className={styles.timer}>{formatTime(timeLeft)}</span>
        )}
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary} ${styles.verificationBtn}`}
          onClick={handleVerificationCodeCheck}
          disabled={verificationCode.length !== 6 || isVerified}
        >
          {isVerified ? '인증완료' : '본인 인증'}
        </button>
      </div>
      {!isVerified && (
        <div className={styles.verificationHelp}>
          {isRateLimited ? (
            <span className={styles.rateLimitText}>
              일일 이메일 인증 횟수를 초과했습니다. 24시간 후에 다시
              시도해주세요.
            </span>
          ) : (
            <span className={styles.helpText} onClick={onResendVerification}>
              인증번호를 받지 못하셨나요? 재전송하기
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default VerificationCodeInput;
