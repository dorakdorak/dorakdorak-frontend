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

function BirthdateInput({
  formData,
  updateFormData,
  serverErrors,
}: Props): React.ReactElement {
  return (
    <div className={styles.formGroup}>
      <label className={`${styles.formLabel} ${styles.required}`}>
        생년월일
      </label>
      <div className={styles.birthRow}>
        <select
          className={styles.formSelect}
          value={formData.birthYear}
          onChange={(e) => updateFormData('birthYear', e.target.value)}
        >
          <option value="">년도</option>
          {Array.from({ length: 50 }, (_, i) => 2024 - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className={styles.formSelect}
          value={formData.birthMonth}
          onChange={(e) => updateFormData('birthMonth', e.target.value)}
        >
          <option value="">월</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          className={styles.formSelect}
          value={formData.birthDay}
          onChange={(e) => updateFormData('birthDay', e.target.value)}
        >
          <option value="">일</option>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {serverErrors.birthdate && (
        <div className={styles.validationMessage}>
          <span className={styles.errorText}>{serverErrors.birthdate}</span>
        </div>
      )}
    </div>
  );
}

export default BirthdateInput;
