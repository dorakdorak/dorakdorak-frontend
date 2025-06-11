import {
  SignupFormData,
  PasswordValidation,
  PasswordConfirmValidation,
  ServerErrors,
} from '@/types/signup';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  formData: SignupFormData;
  updateFormData: (
    field: keyof SignupFormData,
    value: string | number | null
  ) => void;
  passwordValidation: PasswordValidation;
  passwordConfirmValidation: PasswordConfirmValidation;
  setPasswordValidation: React.Dispatch<
    React.SetStateAction<PasswordValidation>
  >;
  setPasswordConfirmValidation: React.Dispatch<
    React.SetStateAction<PasswordConfirmValidation>
  >;
  validatePassword: (password: string) => PasswordValidation;
  validatePasswordConfirm: (confirm: string) => PasswordConfirmValidation;
  serverErrors: ServerErrors;
}

function PasswordInput({
  formData,
  updateFormData,
  passwordValidation,
  passwordConfirmValidation,
  setPasswordValidation,
  setPasswordConfirmValidation,
  validatePassword,
  validatePasswordConfirm,
  serverErrors,
}: Props): React.ReactElement {
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    updateFormData('password', value);
    setPasswordValidation(validatePassword(value));

    if (formData.passwordConfirm) {
      setPasswordConfirmValidation(
        validatePasswordConfirm(formData.passwordConfirm)
      );
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    updateFormData('passwordConfirm', value);
    setPasswordConfirmValidation(validatePasswordConfirm(value));
  };

  return (
    <>
      {/* 비밀번호 */}
      <div className={styles.formGroup}>
        <label className={`${styles.formLabel} ${styles.required}`}>
          비밀번호
        </label>
        <input
          type="password"
          className={`${styles.formInput} ${
            formData.password &&
            (passwordValidation.isValid ? styles.valid : styles.invalid)
          }`}
          placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자 포함 8자 이상)"
          value={formData.password}
          onChange={handlePasswordChange}
        />
        {passwordValidation.message && (
          <div className={styles.validationMessage}>
            <span
              className={
                passwordValidation.isValid
                  ? styles.successText
                  : styles.errorText
              }
            >
              {passwordValidation.message}
            </span>
          </div>
        )}
        {formData.password && (
          <div className={styles.passwordRequirements}>
            <div
              className={`${styles.requirement} ${
                passwordValidation.hasMinLength ? styles.valid : styles.invalid
              }`}
            >
              ✓ 8자 이상
            </div>
            <div
              className={`${styles.requirement} ${
                passwordValidation.hasLowerCase ? styles.valid : styles.invalid
              }`}
            >
              ✓ 영문 소문자 포함
            </div>
            <div
              className={`${styles.requirement} ${
                passwordValidation.hasUpperCase ? styles.valid : styles.invalid
              }`}
            >
              ✓ 영문 대문자 포함
            </div>
            <div
              className={`${styles.requirement} ${
                passwordValidation.hasNumber ? styles.valid : styles.invalid
              }`}
            >
              ✓ 숫자 포함
            </div>
            <div
              className={`${styles.requirement} ${
                passwordValidation.hasSpecialChar
                  ? styles.valid
                  : styles.invalid
              }`}
            >
              ✓ 특수문자 포함
            </div>
          </div>
        )}
        {serverErrors.password && (
          <div className={styles.validationMessage}>
            <span className={styles.errorText}>{serverErrors.password}</span>
          </div>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div className={styles.formGroup}>
        <label className={`${styles.formLabel} ${styles.required}`}>
          비밀번호 확인
        </label>
        <input
          type="password"
          className={`${styles.formInput} ${
            formData.passwordConfirm &&
            (passwordConfirmValidation.isValid ? styles.valid : styles.invalid)
          }`}
          placeholder="비밀번호 확인"
          value={formData.passwordConfirm}
          onChange={handlePasswordConfirmChange}
        />
        {passwordConfirmValidation.message && (
          <div className={styles.validationMessage}>
            <span
              className={
                passwordConfirmValidation.isValid
                  ? styles.successText
                  : styles.errorText
              }
            >
              {passwordConfirmValidation.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default PasswordInput;
