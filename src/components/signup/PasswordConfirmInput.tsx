import { SignupFormData, PasswordConfirmValidation } from '@/types/signup';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  formData: SignupFormData;
  updateFormData: (field: keyof SignupFormData, value: string) => void;
  passwordConfirmValidation: PasswordConfirmValidation;
  setPasswordConfirmValidation: React.Dispatch<
    React.SetStateAction<PasswordConfirmValidation>
  >;
  validatePasswordConfirm: (confirm: string) => PasswordConfirmValidation;
}

function PasswordConfirmInput({
  formData,
  updateFormData,
  passwordConfirmValidation,
  setPasswordConfirmValidation,
  validatePasswordConfirm,
}: Props) {
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    updateFormData('passwordConfirm', value);
    setPasswordConfirmValidation(validatePasswordConfirm(value));
  };

  return (
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
  );
}

export default PasswordConfirmInput;
