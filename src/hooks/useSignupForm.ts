import { useState, useEffect } from 'react';
import { Address } from 'react-daum-postcode';
import {
  SignupFormData,
  University,
  Allergy,
  PasswordValidation,
  PasswordConfirmValidation,
  ServerErrors,
  RegisterData,
} from '@/types/signup';
import { submitSignup } from '@/api/signupApi';

export function useSignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    selectedDomain: '직접 입력',
    emailDomain: '',
    gender: 'M',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    password: '',
    passwordConfirm: '',
    university: '',
    universityId: null,
    postcode: '',
    address: '',
    roadAddress: '',
    jibunAddress: '',
    detailAddress: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [universityData, setUniversityData] = useState<University[]>([]);
  const [universitySearchResults, setUniversitySearchResults] = useState<
    University[]
  >([]);
  const [showUniversityDropdown, setShowUniversityDropdown] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [allergyData, setAllergyData] = useState<Allergy[]>([]);
  const [allergyLoading, setAllergyLoading] = useState<boolean>(true);
  const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);
  const [allergySearchKeyword, setAllergySearchKeyword] = useState<string>('');
  const [allergySearchResults, setAllergySearchResults] = useState<Allergy[]>(
    []
  );
  const [showAllergyDropdown, setShowAllergyDropdown] =
    useState<boolean>(false);

  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      isValid: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      hasMinLength: false,
      message: '',
    });

  const [passwordConfirmValidation, setPasswordConfirmValidation] =
    useState<PasswordConfirmValidation>({
      isValid: false,
      message: '',
    });

  const [serverErrors, setServerErrors] = useState<ServerErrors>({});

  const passwordRegex = {
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    number: /\d/,
    specialChar: /[~!@#$%^&*(),.?":{}|<>]/,
    minLength: /.{8,}/,
  };

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        setAllergyLoading(true);

        console.log('📥 목업 데이터 로딩 시작...');

        const { default: mockUniversityData } = await import(
          '@/mock/universityMockData'
        );
        const { default: mockAllergyData } = await import(
          '@/mock/AllergyMockData'
        );

        console.log('🏫 대학교 데이터 로딩:', mockUniversityData);
        console.log('🤧 알레르기 데이터 로딩:', mockAllergyData);

        setUniversityData(mockUniversityData);
        setAllergyData(mockAllergyData);

        console.log('✅ 목업 데이터 로딩 완료');
      } catch (error) {
        console.error('❌ 데이터 로딩 실패:', error);
        setUniversityData([]);
        setAllergyData([]);
      } finally {
        setLoading(false);
        setAllergyLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (showVerification && timeLeft > 0 && !isVerified) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showVerification, timeLeft, isVerified]);

  const updateFormData = (
    field: keyof SignupFormData,
    value: string | number | null
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePassword = (passwordValue: string): PasswordValidation => {
    const validation = {
      hasLowerCase: passwordRegex.lowerCase.test(passwordValue),
      hasUpperCase: passwordRegex.upperCase.test(passwordValue),
      hasNumber: passwordRegex.number.test(passwordValue),
      hasSpecialChar: passwordRegex.specialChar.test(passwordValue),
      hasMinLength: passwordRegex.minLength.test(passwordValue),
    };

    const isValid = Object.values(validation).every(Boolean);
    let message = '';

    if (!passwordValue) {
      message = '';
    } else if (!isValid) {
      const missing = [];
      if (!validation.hasLowerCase) missing.push('소문자');
      if (!validation.hasUpperCase) missing.push('대문자');
      if (!validation.hasNumber) missing.push('숫자');
      if (!validation.hasSpecialChar) missing.push('특수문자');
      if (!validation.hasMinLength) missing.push('8자 이상');
      message = `${missing.join(', ')}을(를) 포함해야 합니다.`;
    } else {
      message = '사용 가능한 비밀번호입니다.';
    }

    return { ...validation, isValid, message };
  };

  const validatePasswordConfirm = (
    confirmValue: string
  ): PasswordConfirmValidation => {
    if (!confirmValue) {
      return { isValid: false, message: '' };
    }
    const isValid = formData.password === confirmValue;
    const message = isValid
      ? '비밀번호가 일치합니다.'
      : '비밀번호가 일치하지 않습니다.';
    return { isValid, message };
  };

  const isFormValid = (): boolean => {
    return (
      isVerified &&
      formData.name.trim() !== '' &&
      formData.birthYear !== '' &&
      formData.birthMonth !== '' &&
      formData.birthDay !== '' &&
      passwordValidation.isValid &&
      passwordConfirmValidation.isValid &&
      formData.universityId !== null &&
      formData.postcode !== '' &&
      formData.address !== '' &&
      formData.detailAddress.trim() !== ''
    );
  };

  const resetForm = (): void => {
    setFormData({
      email: '',
      selectedDomain: '직접 입력',
      emailDomain: '',
      gender: 'M',
      name: '',
      birthYear: '',
      birthMonth: '',
      birthDay: '',
      password: '',
      passwordConfirm: '',
      university: '',
      universityId: null,
      postcode: '',
      address: '',
      roadAddress: '',
      jibunAddress: '',
      detailAddress: '',
    });

    setShowVerification(false);
    setVerificationCode('');
    setTimeLeft(0);
    setIsVerified(false);
    setVerificationMessage('');
    setIsRateLimited(false);
    setSelectedAllergies([]);
    setAllergySearchKeyword('');
    setServerErrors({});
    setPasswordValidation({
      isValid: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      hasMinLength: false,
      message: '',
    });
    setPasswordConfirmValidation({ isValid: false, message: '' });
  };

  // 📌 도로명주소와 지번주소 모두 처리하는 개선된 함수
  const handlePostcodeComplete = (data: Address): void => {
    console.log('📮 우편번호 검색 결과:', data);

    const roadAddr = data.roadAddress || '';
    const jibunAddr = data.jibunAddress || '';
    const zonecode = data.zonecode || '';

    // 📌 기본 표시 주소 결정 (사용자가 선택한 타입 우선)
    let displayAddress = '';
    let extraAddress = '';

    // 📌 사용자가 선택한 주소 타입에 따라 기본 표시 주소 설정
    if (data.userSelectedType === 'R') {
      // 도로명주소를 선택한 경우
      displayAddress = roadAddr;
      console.log('🛣️ 도로명주소 선택:', roadAddr);
    } else {
      // 지번주소를 선택한 경우
      displayAddress = jibunAddr;
      console.log('🏘️ 지번주소 선택:', jibunAddr);
    }

    // 📌 참고항목 추가 (동명, 건물명 등)
    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress +=
        extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }

    // 📌 참고항목이 있으면 괄호로 추가
    if (extraAddress !== '') {
      displayAddress += ` (${extraAddress})`;
    }

    // 📌 모든 주소 정보 저장 (도로명주소와 지번주소 모두)
    updateFormData('postcode', zonecode);
    updateFormData('address', displayAddress); // 사용자가 선택한 주소
    updateFormData('roadAddress', roadAddr); // 도로명주소 (API 전송용)
    updateFormData('jibunAddress', jibunAddr); // 지번주소 (API 전송용)
    updateFormData('detailAddress', ''); // 상세주소 초기화

    console.log('✅ 주소 정보 저장 완료:', {
      우편번호: zonecode,
      기본주소: displayAddress,
      도로명주소: roadAddr,
      지번주소: jibunAddr,
      선택타입: data.userSelectedType === 'R' ? '도로명' : '지번',
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setServerErrors({});

    if (!isFormValid()) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // 📌 API 요청 데이터 구성 (도로명주소와 지번주소 모두 전송)
    const registerData: RegisterData = {
      email: `${formData.email}@${formData.emailDomain}`,
      name: formData.name.trim(),
      password: formData.password,
      universityId: formData.universityId!,
      gender: formData.gender,
      birthdate: `${formData.birthYear}-${formData.birthMonth.padStart(
        2,
        '0'
      )}-${formData.birthDay.padStart(2, '0')}`,
      zipCode: formData.postcode,
      doromyungAddress: formData.roadAddress || formData.address, // 📌 도로명주소 우선, 없으면 기본주소
      jibunAddress: formData.jibunAddress || formData.address, // 📌 지번주소 우선, 없으면 기본주소
      detailAddress: formData.detailAddress.trim(),
      allergyIds: selectedAllergies.map((allergy) => allergy.id),
    };

    console.log('📤 API 전송 데이터:', registerData);

    try {
      await submitSignup(registerData);
      setShowSuccessModal(true);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response: {
            status: number;
            data: {
              errorCode?: string;
              message?: string;
              errors?: ServerErrors;
            };
          };
        };

        if (axiosError.response?.status === 400) {
          const responseData = axiosError.response.data;
          if (responseData.errorCode === 'DUPLICATED_EMAIL') {
            alert('이미 가입된 이메일입니다.\n회원가입을 다시 시작합니다.');
            resetForm();
            return;
          }
          if (responseData.errors) {
            setServerErrors(responseData.errors);
          } else {
            alert(responseData.message || '입력값을 확인해주세요.');
          }
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return {
    formData,
    universityData,
    universitySearchResults,
    showUniversityDropdown,
    loading,
    allergyData,
    allergyLoading,
    selectedAllergies,
    allergySearchKeyword,
    allergySearchResults,
    showAllergyDropdown,
    showVerification,
    verificationCode,
    timeLeft,
    isVerified,
    verificationMessage,
    isRateLimited,
    passwordValidation,
    passwordConfirmValidation,
    serverErrors,
    showSuccessModal,

    updateFormData,
    setSelectedAllergies,
    setAllergySearchKeyword,
    setVerificationCode,
    setPasswordValidation,
    setPasswordConfirmValidation,
    setUniversitySearchResults,
    setShowUniversityDropdown,
    setAllergySearchResults,
    setShowAllergyDropdown,
    setShowVerification,
    setTimeLeft,
    setIsVerified,
    setVerificationMessage,
    setIsRateLimited,

    validatePassword,
    validatePasswordConfirm,
    isFormValid,
    resetForm,
    handleSubmit,
    handlePostcodeComplete,
    setShowSuccessModal,
  };
}
