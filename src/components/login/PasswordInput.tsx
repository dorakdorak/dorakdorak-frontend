import { ChangeEvent } from 'react';
import styles from '@/css/login/login.module.css';

interface Props {
  password: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

function PasswordInput({
  password,
  onChange,
  disabled,
}: Props): React.ReactElement {
  return (
    <div className={styles.formRow}>
      <label className={styles.formLabel} htmlFor="password">
        비밀번호
      </label>
      <input
        id="password"
        type="password"
        className={styles.formInput}
        placeholder="비밀번호"
        value={password}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

export default PasswordInput;
