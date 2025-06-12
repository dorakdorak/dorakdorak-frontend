import { ChangeEvent } from 'react';
import styles from '@/css/login/login.module.css';

interface Props {
  email: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

function EmailInput({ email, onChange, disabled }: Props): React.ReactElement {
  return (
    <div className={styles.formRow}>
      <label className={styles.formLabel} htmlFor="email">
        이메일
      </label>
      <input
        id="email"
        type="email"
        className={styles.formInput}
        placeholder="이메일"
        value={email}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default EmailInput;
