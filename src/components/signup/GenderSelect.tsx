import { SignupFormData, ServerErrors } from '@/types/signup';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  formData: SignupFormData;
  updateFormData: (
    field: keyof SignupFormData,
    value: string | number | null
  ) => void;
  serverErrors: ServerErrors;
}

function GenderSelect({
  formData,
  updateFormData,
  serverErrors,
}: Props): React.ReactElement {
  return (
    <div className={styles.formGroup}>
      <label className={`${styles.formLabel} ${styles.required}`}>성별</label>
      <div className={styles.genderRow}>
        <button
          type="button"
          className={`${styles.btnGender} ${
            formData.gender === 'M' ? styles.active : ''
          }`}
          onClick={() => updateFormData('gender', 'M')}
        >
          남성
        </button>
        <button
          type="button"
          className={`${styles.btnGender} ${
            formData.gender === 'F' ? styles.active : ''
          }`}
          onClick={() => updateFormData('gender', 'F')}
        >
          여성
        </button>
      </div>
      {serverErrors.gender && (
        <div className={styles.validationMessage}>
          <span className={styles.errorText}>{serverErrors.gender}</span>
        </div>
      )}
    </div>
  );
}

export default GenderSelect;
