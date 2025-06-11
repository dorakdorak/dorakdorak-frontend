import { useDaumPostcodePopup } from 'react-daum-postcode';
import { SignupFormData, ServerErrors } from '@/types/signup';
import { Address } from 'react-daum-postcode';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  formData: SignupFormData;
  updateFormData: (
    field: keyof SignupFormData,
    value: string | number | null
  ) => void;
  handlePostcodeComplete: (data: Address) => void;
  serverErrors: ServerErrors;
}

function AddressInput({
  formData,
  updateFormData,
  handlePostcodeComplete,
  serverErrors,
}: Props): React.ReactElement {
  const open = useDaumPostcodePopup();

  const handlePostcodeSearch = (): void => {
    open({
      onComplete: handlePostcodeComplete,
      left: window.screen.width / 2 - 570 / 2,
      top: window.screen.height / 2 - 420 / 2,
    });
  };

  return (
    <div className={styles.formGroup}>
      <label className={`${styles.formLabel} ${styles.required}`}>주소</label>
      <div className={styles.postcodeRow}>
        <input
          type="text"
          className={`${styles.formInput} ${styles.postcodeInput}`}
          placeholder="우편번호"
          value={formData.postcode}
          readOnly
        />
        <button
          type="button"
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={handlePostcodeSearch}
        >
          우편번호 확인
        </button>
      </div>
      <input
        type="text"
        className={`${styles.formInput} ${styles.addressBasic}`}
        placeholder="기본 주소 (도로명/지번)"
        value={formData.address}
        readOnly
      />
      <input
        type="text"
        className={`${styles.formInput} ${styles.addressDetail}`}
        placeholder="상세 주소"
        value={formData.detailAddress}
        onChange={(e) => updateFormData('detailAddress', e.target.value)}
      />
      {serverErrors.address && (
        <div className={styles.validationMessage}>
          <span className={styles.errorText}>{serverErrors.address}</span>
        </div>
      )}
      {serverErrors.detailAddress && (
        <div className={styles.validationMessage}>
          <span className={styles.errorText}>{serverErrors.detailAddress}</span>
        </div>
      )}
    </div>
  );
}

export default AddressInput;
