import { useSignupForm } from '@/hooks/useSignupForm';
import { sendEmailVerification } from '@/api/signupApi';
import EmailInput from '@/components/signup/EmailInput';
import VerificationCodeInput from '@/components/signup/VerificationCodeInput';
import PasswordInput from '@/components/signup/PasswordInput';
import BirthdateInput from '@/components/signup/BirthdateInput';
import GenderSelect from '@/components/signup/GenderSelect';
import UniversitySearch from '@/components/signup/UniversitySearch';
import AllergySearch from '@/components/signup/AllergySearch';
import AddressInput from '@/components/signup/AddressInput';
import SubmitButtons from '@/components/signup/SubmitButtons';
import Modal from '@/components/common/Modal';
import styles from '@/css/signup/Signup.module.css';
import { useNavigate } from 'react-router-dom';

function SignUp(): React.ReactElement {
  const formProps = useSignupForm();
  const navigate = useNavigate();

  // 재전송 핸들러
  const handleResendVerification = async (): Promise<void> => {
    if (formProps.isRateLimited) {
      return;
    }

    formProps.setVerificationMessage('인증 코드를 재전송 중입니다...');

    const fullEmail = `${formProps.formData.email}@${formProps.formData.emailDomain}`;

    try {
      await sendEmailVerification(fullEmail);
      formProps.setShowVerification(true);
      formProps.setTimeLeft(180);
      formProps.setVerificationCode('');
      formProps.setIsVerified(false);
      formProps.setVerificationMessage('인증 코드가 전송되었습니다.');
      formProps.setIsRateLimited(false);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response: { status: number } };
        if (axiosError.response?.status === 429) {
          formProps.setIsRateLimited(true);
          formProps.setVerificationMessage(
            '일일 이메일 인증 요청 횟수(5회)를 초과했습니다. 24시간 후에 다시 시도해주세요.'
          );
        } else {
          formProps.setVerificationMessage('인증 코드 발급에 실패하였습니다.');
        }
      } else {
        formProps.setVerificationMessage('인증 코드 발급에 실패하였습니다.');
      }
    }
  };
  const handleModalConfirm = (): void => {
    console.log('모달 확인 - 로그인 페이지로 이동');
    formProps.setShowSuccessModal(false); // 모달 먼저 닫기
    navigate('/login'); // 그 다음 이동
  };
  // 안전한 렌더링을 위한 컴포넌트 래퍼
  const renderSafeComponent = (): React.ReactElement => {
    try {
      // 데이터 로딩 중일 때 표시
      if (formProps.loading || formProps.allergyLoading) {
        return (
          <div className={styles.signupPage}>
            <div className={styles.signupContainer}>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>페이지를 로딩 중입니다...</p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className={styles.signupPage}>
          <div className={styles.signupContainer}>
            <h1 className={styles.signupTitle}>회원가입</h1>
            <form
              className={styles.signupForm}
              onSubmit={formProps.handleSubmit}
            >
              <EmailInput
                formData={formProps.formData}
                updateFormData={formProps.updateFormData}
                verificationMessage={formProps.verificationMessage}
                isVerified={formProps.isVerified}
                isRateLimited={formProps.isRateLimited}
                setShowVerification={formProps.setShowVerification}
                setTimeLeft={formProps.setTimeLeft}
                setVerificationCode={formProps.setVerificationCode}
                setIsVerified={formProps.setIsVerified}
                setVerificationMessage={formProps.setVerificationMessage}
                setIsRateLimited={formProps.setIsRateLimited}
                serverErrors={formProps.serverErrors}
              />

              <VerificationCodeInput
                showVerification={formProps.showVerification}
                verificationCode={formProps.verificationCode}
                setVerificationCode={formProps.setVerificationCode}
                timeLeft={formProps.timeLeft}
                isVerified={formProps.isVerified}
                setIsVerified={formProps.setIsVerified}
                setVerificationMessage={formProps.setVerificationMessage}
                formData={formProps.formData}
                isRateLimited={formProps.isRateLimited}
                onResendVerification={handleResendVerification}
              />

              {/* 이름 */}
              <div className={styles.formGroup}>
                <label className={`${styles.formLabel} ${styles.required}`}>
                  이름
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="이름"
                  value={formProps.formData.name}
                  onChange={(e) =>
                    formProps.updateFormData('name', e.target.value)
                  }
                />
                {formProps.serverErrors.name && (
                  <div className={styles.validationMessage}>
                    <span className={styles.errorText}>
                      {formProps.serverErrors.name}
                    </span>
                  </div>
                )}
              </div>

              <BirthdateInput
                formData={formProps.formData}
                updateFormData={formProps.updateFormData}
                serverErrors={formProps.serverErrors}
              />

              <GenderSelect
                formData={formProps.formData}
                updateFormData={formProps.updateFormData}
                serverErrors={formProps.serverErrors}
              />

              <PasswordInput
                formData={formProps.formData}
                updateFormData={formProps.updateFormData}
                passwordValidation={formProps.passwordValidation}
                passwordConfirmValidation={formProps.passwordConfirmValidation}
                setPasswordValidation={formProps.setPasswordValidation}
                setPasswordConfirmValidation={
                  formProps.setPasswordConfirmValidation
                }
                validatePassword={formProps.validatePassword}
                validatePasswordConfirm={formProps.validatePasswordConfirm}
                serverErrors={formProps.serverErrors}
              />

              <UniversitySearch
                formData={formProps.formData}
                updateFormData={formProps.updateFormData}
                universityData={formProps.universityData}
                universitySearchResults={formProps.universitySearchResults}
                showUniversityDropdown={formProps.showUniversityDropdown}
                setUniversitySearchResults={
                  formProps.setUniversitySearchResults
                }
                setShowUniversityDropdown={formProps.setShowUniversityDropdown}
                serverErrors={formProps.serverErrors}
              />

              <AllergySearch
                allergyData={formProps.allergyData}
                selectedAllergies={formProps.selectedAllergies}
                allergySearchKeyword={formProps.allergySearchKeyword}
                allergySearchResults={formProps.allergySearchResults}
                showAllergyDropdown={formProps.showAllergyDropdown}
                setSelectedAllergies={formProps.setSelectedAllergies}
                setAllergySearchKeyword={formProps.setAllergySearchKeyword}
                setAllergySearchResults={formProps.setAllergySearchResults}
                setShowAllergyDropdown={formProps.setShowAllergyDropdown}
              />

              <AddressInput
                formData={formProps.formData}
                updateFormData={formProps.updateFormData}
                handlePostcodeComplete={formProps.handlePostcodeComplete}
                serverErrors={formProps.serverErrors}
              />

              <SubmitButtons
                isFormValid={formProps.isFormValid}
                resetForm={formProps.resetForm}
              />
              <Modal
                show={formProps.showSuccessModal}
                message="회원가입이 완료되었습니다!"
                onConfirm={handleModalConfirm}
              />
            </form>
          </div>
        </div>
      );
    } catch (error) {
      console.error('렌더링 오류:', error);
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>페이지 로딩 중 오류가 발생했습니다.</p>
          <button onClick={() => window.location.reload()}>새로고침</button>
        </div>
      );
    }
  };

  return renderSafeComponent();
}

export default SignUp;
