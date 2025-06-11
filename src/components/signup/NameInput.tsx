import { SignupFormData, ServerErrors } from '@/types/signup';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  formData: SignupFormData;
  updateFormData: (field: keyof SignupFormData, value: string) => void;
  serverErrors: ServerErrors;
}

function NameInput({ formData, updateFormData, serverErrors }: Props) {
  return (
    <div className={styles.formGroup}>
      <label className={`${styles.formLabel} ${styles.required}`}>이름</label>
      <input
        type="text"
        className={styles.formInput}
        placeholder="이름"
        value={formData.name}
        onChange={(e) => updateFormData('name', e.target.value)}
      />
      {serverErrors.name && (
        <div className={styles.validationMessage}>
          <span className={styles.errorText}>{serverErrors.name}</span>
        </div>
      )}
    </div>
  );
}

export default NameInput;
