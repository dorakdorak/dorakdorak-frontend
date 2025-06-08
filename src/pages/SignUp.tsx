import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();

  // 기존 상태들...
  const [email, setEmail] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('직접 입력');
  const [emailDomain, setEmailDomain] = useState('');
  const [gender, setGender] = useState('M');
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [university, setUniversity] = useState(''); // 대학교명 (화면 표시용)
  const [universityId, setUniversityId] = useState(null); // 대학교 ID (백엔드 전송용)
  const [postcode, setPostcode] = useState('');
  const [address, setAddress] = useState(''); // 기본 주소 (화면 표시용)
  const [roadAddress, setRoadAddress] = useState(''); // 도로명 주소 (백엔드 전송용)
  const [jibunAddress, setJibunAddress] = useState(''); // 지번 주소 (백엔드 전송용)
  const [detailAddress, setDetailAddress] = useState(''); // 상세 주소

  // 대학교 데이터 관련 상태
  const [universityData, setUniversityData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 알레르기 데이터 관련 상태 (새로 추가)
  const [allergyData, setAllergyData] = useState([]); // 전체 알레르기 데이터
  const [allergyLoading, setAllergyLoading] = useState(true); // 알레르기 로딩 상태
  const [selectedAllergies, setSelectedAllergies] = useState([]); // 선택된 알레르기 배열
  const [allergySearchKeyword, setAllergySearchKeyword] = useState(''); // 알레르기 검색 키워드
  const [allergySearchResults, setAllergySearchResults] = useState([]); // 알레르기 검색 결과
  const [showAllergyDropdown, setShowAllergyDropdown] = useState(false); // 알레르기 드롭다운 표시

  // 이메일 인증 관련 상태
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isRateLimited, setIsRateLimited] = useState(false); // 이메일 인증 횟수 제한 상태 추가

  // 대학교 검색 관련 상태
  const [universitySearchResults, setUniversitySearchResults] = useState([]);
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false);

  // 비밀번호 유효성 검증 관련 상태
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
    message: '',
  });
  const [passwordConfirmValidation, setPasswordConfirmValidation] = useState({
    isValid: false,
    message: '',
  });

  // 서버 오류 상태
  const [serverErrors, setServerErrors] = useState({});

  // 비밀번호 정규식 패턴
  const passwordRegex = {
    lowerCase: /[a-z]/,
    upperCase: /[A-Z]/,
    number: /\d/,
    specialChar: /[~!@#$%^&*(),.?":{}|<>]/,
    minLength: /.{8,}/,
  };

  // 다음 우편번호 검색 팝업
  const open = useDaumPostcodePopup();

  // 대학교 데이터 로딩 useEffect
  useEffect(() => {
    const loadUniversityData = async () => {
      try {
        setLoading(true);

        // 실제 API 연동 시 사용
        // const response = await axios.get('http://localhost:8080/api/universities');
        // setUniversityData(response.data);

        // 목업 데이터 사용 (현재)
        const { default: mockUniversityData } = await import(
          '@/mock/universityMockData'
        );
        setUniversityData(mockUniversityData);
      } catch (error) {
        console.error('대학교 데이터 로딩 실패:', error);
        setUniversityData([]);
      } finally {
        setLoading(false);
      }
    };

    loadUniversityData();
  }, []);

  // 알레르기 데이터 로딩 useEffect (새로 추가)
  useEffect(() => {
    const loadAllergyData = async () => {
      try {
        setAllergyLoading(true);

        // 실제 API 연동 시 사용
        // const response = await axios.get('http://localhost:8080/api/allergies');
        // setAllergyData(response.data);

        // 목업 데이터 사용 (현재)
        const { default: mockAllergyData } = await import(
          '@/mock/AllergyMockData'
        );
        setAllergyData(mockAllergyData);
      } catch (error) {
        console.error('알레르기 데이터 로딩 실패:', error);
        setAllergyData([]);
      } finally {
        setAllergyLoading(false);
      }
    };

    loadAllergyData();
  }, []);

  // 전체 폼 초기화 함수
  const resetForm = () => {
    setEmail('');
    setSelectedDomain('직접 입력');
    setEmailDomain('');
    setGender('M');
    setName('');
    setBirthYear('');
    setBirthMonth('');
    setBirthDay('');
    setPassword('');
    setPasswordConfirm('');
    setUniversity('');
    setUniversityId('');
    setPostcode('');
    setAddress('');
    setRoadAddress('');
    setJibunAddress('');
    setDetailAddress('');

    // 이메일 인증 관련 상태 초기화
    setShowVerification(false);
    setVerificationCode('');
    setTimeLeft(0);
    setIsVerified(false);
    setVerificationMessage('');
    setIsRateLimited(false); // 이메일 인증 횟수 제한 상태 초기화

    // 대학교 검색 관련 상태 초기화
    setUniversitySearchResults([]);
    setShowUniversityDropdown(false);

    // 알레르기 관련 상태 초기화 (새로 추가)
    setSelectedAllergies([]);
    setAllergySearchKeyword('');
    setAllergySearchResults([]);
    setShowAllergyDropdown(false);

    // 비밀번호 검증 상태 초기화
    setPasswordValidation({
      isValid: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSpecialChar: false,
      hasMinLength: false,
      message: '',
    });
    setPasswordConfirmValidation({
      isValid: false,
      message: '',
    });

    // 서버 오류 상태 초기화
    setServerErrors({});
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    const isConfirmed = window.confirm(
      '입력한 내용이 모두 삭제됩니다. 계속하시겠습니까?'
    );
    if (isConfirmed) {
      resetForm();
    }
  };

  // 생년월일을 YYYY-MM-DD 형식으로 변환하는 함수
  const formatBirthdate = () => {
    if (!birthYear || !birthMonth || !birthDay) return '';
    const month = birthMonth.toString().padStart(2, '0');
    const day = birthDay.toString().padStart(2, '0');
    return `${birthYear}-${month}-${day}`;
  };

  // 전체 폼 유효성 검증 함수
  const isFormValid = () => {
    return (
      isVerified &&
      name.trim() &&
      birthYear &&
      birthMonth &&
      birthDay &&
      passwordValidation.isValid &&
      passwordConfirmValidation.isValid &&
      universityId &&
      postcode &&
      address &&
      detailAddress.trim()
    );
  };

  // 폼 유효성 검증 함수
  const validateForm = () => {
    if (!isVerified) {
      alert('이메일 인증을 완료해주세요.');
      return false;
    }
    if (!name.trim()) {
      alert('이름을 입력해주세요.');
      return false;
    }
    if (!birthYear || !birthMonth || !birthDay) {
      alert('생년월일을 모두 선택해주세요.');
      return false;
    }
    if (!passwordValidation.isValid) {
      alert('비밀번호 조건을 확인해주세요.');
      return false;
    }
    if (!passwordConfirmValidation.isValid) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (!universityId) {
      alert('대학교를 선택해주세요.');
      return false;
    }
    if (!postcode || !address) {
      alert('주소를 입력해주세요.');
      return false;
    }
    if (!detailAddress.trim()) {
      alert('상세주소를 입력해주세요.');
      return false;
    }
    return true;
  };

  // 서버 오류 표시 컴포넌트
  const renderServerError = (fieldName) => {
    if (serverErrors[fieldName]) {
      return (
        <div className="validation-message">
          <span className="error-text">{serverErrors[fieldName]}</span>
        </div>
      );
    }
    return null;
  };

  // 회원가입 제출 핸들러 (중복 이메일 에러 처리 추가)
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('=== 가입하기 버튼 클릭됨 ===');
    console.log('폼 유효성 검사:', isFormValid());

    // 서버 오류 초기화
    setServerErrors({});

    // 폼 유효성 검증
    if (!validateForm()) {
      console.log('폼 검증 실패');
      return;
    }

    // API 요청 데이터 구성 (알레르기 ID 배열 추가)
    const registerData = {
      email: `${email}@${emailDomain}`,
      name: name.trim(),
      password,
      universityId: universityId,
      gender: gender,
      birthdate: formatBirthdate(),
      zipCode: postcode,
      doromyungAddress: roadAddress,
      jibunAddress: jibunAddress,
      detailAddress: detailAddress.trim(),
      allergyIds: selectedAllergies.map((allergy) => allergy.id), // 선택된 알레르기 ID 배열
    };

    console.log('=== 전송할 데이터 ===', registerData);

    try {
      console.log('=== API 요청 시작 ===');
      const response = await axios.post(
        'http://localhost:8080/members/signup',
        registerData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('=== API 응답 성공 ===', response);
      if (response.status === 200 || response.status === 201) {
        alert('회원가입이 완료되었습니다.');
        console.log('회원가입 성공:', response.data);
        navigate('/login');
      }
    } catch (error) {
      console.error('=== API 요청 실패 ===', error);
      console.error('에러 상세:', error.response?.data);
      console.error('에러 상태코드:', error.response?.status);

      if (error.response && error.response.status === 400) {
        const responseData = error.response.data;

        // 중복 이메일 에러 처리 (새로 추가)
        if (
          responseData.errorCode === 'DUPLICATED_EMAIL' ||
          responseData.message?.includes('Duplicated') ||
          responseData.message?.includes('Email')
        ) {
          alert('이미 가입된 이메일입니다.\n회원가입을 다시 시작합니다.');
          console.log('중복 이메일 에러 - 폼 초기화');
          resetForm(); // 폼 전체 초기화
          return;
        }

        // 기타 검증 오류 처리
        if (responseData.errors) {
          setServerErrors(responseData.errors);
          console.log('서버 검증 오류:', responseData.errors);
        } else {
          alert(responseData.message || '입력값을 확인해주세요.');
        }
      } else if (error.response) {
        alert(
          error.response.data?.message || '회원가입 중 오류가 발생했습니다.'
        );
      } else if (error.request) {
        console.log('네트워크 요청 실패:', error.request);
        alert('네트워크 연결을 확인해주세요.');
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  // 비밀번호 유효성 검증 함수
  const validatePassword = (passwordValue) => {
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

    return {
      ...validation,
      isValid,
      message,
    };
  };

  // 비밀번호 확인 유효성 검증 함수
  const validatePasswordConfirm = (confirmValue) => {
    if (!confirmValue) {
      return { isValid: false, message: '' };
    }

    const isValid = password === confirmValue;
    const message = isValid
      ? '비밀번호가 일치합니다.'
      : '비밀번호가 일치하지 않습니다.';

    return { isValid, message };
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValidation(validatePassword(value));

    if (passwordConfirm) {
      setPasswordConfirmValidation(validatePasswordConfirm(passwordConfirm));
    }
  };

  // 비밀번호 확인 변경 핸들러
  const handlePasswordConfirmChange = (e) => {
    const value = e.target.value;
    setPasswordConfirm(value);
    setPasswordConfirmValidation(validatePasswordConfirm(value));
  };

  // 우편번호 검색 완료 핸들러
  const handlePostcodeComplete = (data) => {
    console.log('카카오 주소 API 응답:', data);

    const roadAddr = data.roadAddress || '';
    const jibunAddr = data.jibunAddress || '';

    let displayAddress = '';
    let extraAddress = '';

    if (data.userSelectedType === 'R') {
      displayAddress = roadAddr;
    } else {
      displayAddress = jibunAddr;
    }

    if (data.bname !== '') {
      extraAddress += data.bname;
    }
    if (data.buildingName !== '') {
      extraAddress +=
        extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
    }

    displayAddress += extraAddress !== '' ? ` (${extraAddress})` : '';

    setPostcode(data.zonecode);
    setAddress(displayAddress);
    setRoadAddress(roadAddr);
    setJibunAddress(jibunAddr);
    setDetailAddress('');

    console.log('저장된 주소 정보:', {
      postcode: data.zonecode,
      displayAddress,
      roadAddress: roadAddr,
      jibunAddress: jibunAddr,
      userSelectedType: data.userSelectedType,
      bname: data.bname,
      buildingName: data.buildingName,
    });
  };

  // 우편번호 검색 버튼 클릭 핸들러
  const handlePostcodeSearch = () => {
    open({
      onComplete: handlePostcodeComplete,
      left: window.screen.width / 2 - 570 / 2,
      top: window.screen.height / 2 - 420 / 2,
    });
  };

  // 도메인 셀렉트 변경
  const handleDomainSelect = (e) => {
    const value = e.target.value;
    setSelectedDomain(value);
    if (value !== '직접 입력') {
      setEmailDomain(value);
    } else {
      setEmailDomain('');
    }
  };

  // 이메일 인증 요청 (이메일 인증 횟수 제한 처리 추가)
  const handleEmailVerification = async () => {
    const fullEmail = `${email}@${emailDomain}`;

    try {
      const response = await axios.get(
        `http://localhost:8080/members/api/email/auth/${encodeURIComponent(
          fullEmail
        )}`
      );

      console.log(response.status);
      if (response.status === 200) {
        setShowVerification(true);
        setTimeLeft(180);
        setVerificationCode('');
        setIsVerified(false);
        setVerificationMessage('인증 코드가 전송되었습니다.');
        setIsRateLimited(false); // 성공 시 제한 상태 해제
        console.log('이메일 인증 성공:', fullEmail);
      }
    } catch (error) {
      console.error('이메일 인증 실패:', error);

      // 429 에러 (이메일 인증 횟수 초과) 처리
      if (error.response && error.response.status === 429) {
        const responseData = error.response.data;
        if (responseData.errorCode === 'TOO_MANY_EMAIL_VERIFICATION_REQUESTS') {
          setIsRateLimited(true);
          setVerificationMessage(
            '일일 이메일 인증 요청 횟수(5회)를 초과했습니다. 24시간 후에 다시 시도해주세요.'
          );
          console.log('이메일 인증 횟수 초과');
          return;
        }
      }

      // 기타 에러 처리
      setVerificationMessage('인증 코드 발급에 실패하였습니다.');
      setIsRateLimited(false);
    }
  };

  // 재전송 핸들러 (이메일 인증 횟수 제한 처리 추가)
  const handleResendVerification = async () => {
    // 이미 제한 상태라면 재전송 차단
    if (isRateLimited) {
      return;
    }

    setVerificationMessage('인증 코드를 재전송 중입니다...');
    await handleEmailVerification();
  };

  // 인증번호 확인 함수
  const handleVerificationCodeCheck = async () => {
    const domain = selectedDomain;
    const fullEmail = `${email}@${domain}`;

    if (!verificationCode || verificationCode.length !== 6) {
      setVerificationMessage('인증번호 6자리를 정확히 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/members/api/email/verify',
        {
          email: fullEmail,
          code: verificationCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setIsVerified(true);
        setVerificationMessage('이메일 인증 성공');
      }
    } catch (error) {
      console.error('인증번호 확인 실패:', error);
      setIsVerified(false);

      if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          setVerificationMessage(
            '입력하신 인증번호가 올바르지 않습니다. 다시 확인해주세요.'
          );
        }
      } else if (error.request) {
        setVerificationMessage('네트워크 연결을 확인해주세요.');
      } else {
        setVerificationMessage('인증번호 확인 중 오류가 발생했습니다.');
      }
    }
  };

  // 대학교 검색 함수
  const searchUniversities = (keyword) => {
    if (!keyword.trim()) {
      setUniversitySearchResults([]);
      setShowUniversityDropdown(false);
      return;
    }

    const results = universityData.filter((uni) => uni.name.includes(keyword));
    setUniversitySearchResults(results);
    setShowUniversityDropdown(results.length > 0);
  };

  // 대학교 입력 변경 처리
  const handleUniversityChange = (e) => {
    const value = e.target.value;
    setUniversity(value);
    setUniversityId('');
    searchUniversities(value);
  };

  // 대학교 선택 처리
  const handleUniversitySelect = (selectedUniversity) => {
    setUniversity(selectedUniversity.name);
    setUniversityId(selectedUniversity.id);
    setShowUniversityDropdown(false);
    setUniversitySearchResults([]);

    console.log('선택된 대학교:', {
      name: selectedUniversity.name,
      id: selectedUniversity.id,
    });
  };

  // 알레르기 검색 함수 (새로 추가)
  const searchAllergies = (keyword) => {
    if (!keyword.trim()) {
      setAllergySearchResults([]);
      setShowAllergyDropdown(false);
      return;
    }

    const results = allergyData.filter(
      (allergy) =>
        allergy.name.includes(keyword) &&
        !selectedAllergies.some((selected) => selected.id === allergy.id)
    );
    setAllergySearchResults(results);
    setShowAllergyDropdown(results.length > 0);
  };

  // 알레르기 입력 변경 처리 (새로 추가)
  const handleAllergyChange = (e) => {
    const value = e.target.value;
    setAllergySearchKeyword(value);
    searchAllergies(value);
  };

  // 알레르기 선택 처리 (새로 추가)
  const handleAllergySelect = (selectedAllergy) => {
    const isAlreadySelected = selectedAllergies.some(
      (allergy) => allergy.id === selectedAllergy.id
    );

    if (!isAlreadySelected) {
      setSelectedAllergies([...selectedAllergies, selectedAllergy]);
      setAllergySearchKeyword('');
      setShowAllergyDropdown(false);
      setAllergySearchResults([]);

      console.log('선택된 알레르기:', {
        name: selectedAllergy.name,
        id: selectedAllergy.id,
      });
    }
  };

  // 알레르기 제거 처리 (새로 추가)
  const handleAllergyRemove = (allergyToRemove) => {
    setSelectedAllergies(
      selectedAllergies.filter((allergy) => allergy.id !== allergyToRemove.id)
    );

    console.log('제거된 알레르기:', {
      name: allergyToRemove.name,
      id: allergyToRemove.id,
    });
  };

  useEffect(() => {
    let interval = null;
    if (showVerification && timeLeft > 0 && !isVerified) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showVerification, timeLeft, isVerified]);

  // 시간 포맷팅 (MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  // 안전한 렌더링을 위한 컴포넌트 래퍼
  const renderSafeComponent = () => {
    try {
      // 데이터 로딩 중일 때 표시
      if (loading || allergyLoading) {
        return (
          <div className="signup-page">
            <div className="signup-container">
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>페이지를 로딩 중입니다...</p>
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="signup-page">
          <div className="signup-container">
            <h1 className="signup-title">회원가입</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              {/* 이메일 */}
              <div className="form-group">
                <label className="form-label required">이메일</label>
                <div className="email-row">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span className="at-symbol">@</span>
                  <select
                    className="form-select"
                    value={selectedDomain}
                    onChange={handleDomainSelect}
                  >
                    <option value="직접 입력">선택</option>
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="daum.net">daum.net</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleEmailVerification}
                    disabled={
                      !email || !emailDomain || isVerified || isRateLimited
                    }
                  >
                    이메일 인증
                  </button>
                </div>
                {verificationMessage && (
                  <div className="verification-message">
                    <span
                      className={
                        verificationMessage.includes('성공') ||
                        verificationMessage.includes('전송')
                          ? 'success-text'
                          : 'error-text'
                      }
                    >
                      {verificationMessage}
                    </span>
                  </div>
                )}
                {renderServerError('email')}
              </div>

              {/* 인증번호 입력 */}
              {showVerification && (
                <div className="form-group verification-group">
                  <label className="form-label required">인증번호</label>
                  <div className="verification-row">
                    <input
                      type="text"
                      className="form-input verification-input"
                      placeholder="인증번호 6자리를 입력해 주세요."
                      value={verificationCode}
                      onChange={(e) => {
                        const value = e.target.value.replace(
                          /[^0-9a-zA-Z]/g,
                          ''
                        );
                        setVerificationCode(value.slice(0, 6));
                      }}
                      maxLength={6}
                      disabled={isVerified}
                    />
                    {!isVerified && (
                      <span className="timer">{formatTime(timeLeft)}</span>
                    )}
                    <button
                      type="button"
                      className="btn btn-primary verification-btn"
                      onClick={handleVerificationCodeCheck}
                      disabled={verificationCode.length !== 6 || isVerified}
                    >
                      {isVerified ? '인증완료' : '본인 인증'}
                    </button>
                  </div>
                  {/* 재전송 또는 제한 메시지 표시 */}
                  {!isVerified && (
                    <div className="verification-help">
                      {isRateLimited ? (
                        <span className="rate-limit-text">
                          일일 이메일 인증 횟수를 초과했습니다. 24시간 후에 다시
                          시도해주세요.
                        </span>
                      ) : (
                        <span
                          className="help-text"
                          onClick={handleResendVerification}
                        >
                          인증번호를 받지 못하셨나요? 재전송하기
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 이름 */}
              <div className="form-group">
                <label className="form-label required">이름</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {renderServerError('name')}
              </div>

              {/* 생년월일 */}
              <div className="form-group">
                <label className="form-label required">생년월일</label>
                <div className="birth-row">
                  <select
                    className="form-select"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                  >
                    <option value="">년도</option>
                    {Array.from({ length: 50 }, (_, i) => 2024 - i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    className="form-select"
                    value={birthMonth}
                    onChange={(e) => setBirthMonth(e.target.value)}
                  >
                    <option value="">월</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      )
                    )}
                  </select>
                  <select
                    className="form-select"
                    value={birthDay}
                    onChange={(e) => setBirthDay(e.target.value)}
                  >
                    <option value="">일</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                {renderServerError('birthdate')}
              </div>

              {/* 성별 */}
              <div className="form-group">
                <label className="form-label required">성별</label>
                <div className="gender-row">
                  <button
                    type="button"
                    className={`btn-gender ${gender === 'M' ? 'active' : ''}`}
                    onClick={() => setGender('M')}
                  >
                    남성
                  </button>
                  <button
                    type="button"
                    className={`btn-gender ${gender === 'F' ? 'active' : ''}`}
                    onClick={() => setGender('F')}
                  >
                    여성
                  </button>
                </div>
                {renderServerError('gender')}
              </div>

              {/* 비밀번호 */}
              <div className="form-group">
                <label className="form-label required">비밀번호</label>
                <input
                  type="password"
                  className={`form-input ${
                    password &&
                    (passwordValidation.isValid ? 'valid' : 'invalid')
                  }`}
                  placeholder="비밀번호 (영문 대소문자, 숫자, 특수문자 포함 8자 이상)"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordValidation.message && (
                  <div className="validation-message">
                    <span
                      className={
                        passwordValidation.isValid
                          ? 'success-text'
                          : 'error-text'
                      }
                    >
                      {passwordValidation.message}
                    </span>
                  </div>
                )}
                {password && (
                  <div className="password-requirements">
                    <div
                      className={`requirement ${
                        passwordValidation.hasMinLength ? 'valid' : 'invalid'
                      }`}
                    >
                      ✓ 8자 이상
                    </div>
                    <div
                      className={`requirement ${
                        passwordValidation.hasLowerCase ? 'valid' : 'invalid'
                      }`}
                    >
                      ✓ 영문 소문자 포함
                    </div>
                    <div
                      className={`requirement ${
                        passwordValidation.hasUpperCase ? 'valid' : 'invalid'
                      }`}
                    >
                      ✓ 영문 대문자 포함
                    </div>
                    <div
                      className={`requirement ${
                        passwordValidation.hasNumber ? 'valid' : 'invalid'
                      }`}
                    >
                      ✓ 숫자 포함
                    </div>
                    <div
                      className={`requirement ${
                        passwordValidation.hasSpecialChar ? 'valid' : 'invalid'
                      }`}
                    >
                      ✓ 특수문자 포함
                    </div>
                  </div>
                )}
                {renderServerError('password')}
              </div>

              {/* 비밀번호 확인 */}
              <div className="form-group">
                <label className="form-label required">비밀번호 확인</label>
                <input
                  type="password"
                  className={`form-input ${
                    passwordConfirm &&
                    (passwordConfirmValidation.isValid ? 'valid' : 'invalid')
                  }`}
                  placeholder="비밀번호 확인"
                  value={passwordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
                {passwordConfirmValidation.message && (
                  <div className="validation-message">
                    <span
                      className={
                        passwordConfirmValidation.isValid
                          ? 'success-text'
                          : 'error-text'
                      }
                    >
                      {passwordConfirmValidation.message}
                    </span>
                  </div>
                )}
              </div>

              {/* 대학교 */}
              <div className="form-group">
                <label className="form-label required">대학교</label>
                <div className="university-container">
                  <div className="university-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder={
                        universityData.length > 0
                          ? '대학교명을 입력하세요'
                          : '대학교 데이터 로딩 중...'
                      }
                      value={university}
                      onChange={handleUniversityChange}
                      disabled={universityData.length === 0}
                      onBlur={() => {
                        setTimeout(() => setShowUniversityDropdown(false), 200);
                      }}
                      onFocus={() => {
                        if (universitySearchResults.length > 0) {
                          setShowUniversityDropdown(true);
                        }
                      }}
                    />
                  </div>

                  {showUniversityDropdown &&
                    universitySearchResults.length > 0 && (
                      <div className="university-dropdown">
                        {universitySearchResults.map((uni) => (
                          <div
                            key={uni.id}
                            className="university-item"
                            onClick={() => handleUniversitySelect(uni)}
                          >
                            {uni.name}
                          </div>
                        ))}
                      </div>
                    )}

                  {showUniversityDropdown &&
                    universitySearchResults.length === 0 &&
                    university.trim() && (
                      <div className="university-dropdown">
                        <div className="university-item no-result">
                          검색 결과가 없습니다
                        </div>
                      </div>
                    )}
                </div>
                {universityId && (
                  <div className="validation-message">
                    <span className="success-text">
                      선택된 대학교: {university}
                    </span>
                  </div>
                )}
                {renderServerError('university')}
              </div>

              {/* 알레르기 정보 (새로 추가) */}
              <div className="form-group">
                <label className="form-label required">알레르기 정보</label>
                <div className="allergy-container">
                  <div className="allergy-row">
                    <input
                      type="text"
                      className="form-input"
                      placeholder={
                        allergyData.length > 0
                          ? '알레르기명을 입력하세요'
                          : '알레르기 데이터 로딩 중...'
                      }
                      value={allergySearchKeyword}
                      onChange={handleAllergyChange}
                      disabled={allergyData.length === 0}
                      onBlur={() => {
                        setTimeout(() => setShowAllergyDropdown(false), 200);
                      }}
                      onFocus={() => {
                        if (allergySearchResults.length > 0) {
                          setShowAllergyDropdown(true);
                        }
                      }}
                    />
                  </div>

                  {showAllergyDropdown && allergySearchResults.length > 0 && (
                    <div className="allergy-dropdown">
                      {allergySearchResults.map((allergy) => (
                        <div
                          key={allergy.id}
                          className="allergy-item"
                          onClick={() => handleAllergySelect(allergy)}
                        >
                          {allergy.name}
                        </div>
                      ))}
                    </div>
                  )}

                  {showAllergyDropdown &&
                    allergySearchResults.length === 0 &&
                    allergySearchKeyword.trim() && (
                      <div className="allergy-dropdown">
                        <div className="allergy-item no-result">
                          검색 결과가 없습니다
                        </div>
                      </div>
                    )}
                </div>

                {/* 선택된 알레르기 표시 */}
                {selectedAllergies.length > 0 && (
                  <div className="selected-allergies">
                    <div className="selected-allergies-title">
                      선택된 알레르기:
                    </div>
                    <div className="allergy-tags">
                      {selectedAllergies.map((allergy) => (
                        <div key={allergy.id} className="allergy-tag">
                          <span>{allergy.name}</span>
                          <button
                            type="button"
                            className="allergy-remove-btn"
                            onClick={() => handleAllergyRemove(allergy)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {renderServerError('allergies')}
              </div>

              {/* 주소 */}
              <div className="form-group">
                <label className="form-label required">주소</label>
                <div className="postcode-row">
                  <input
                    type="text"
                    className="form-input postcode-input"
                    placeholder="우편번호"
                    value={postcode}
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePostcodeSearch}
                  >
                    우편번호 확인
                  </button>
                </div>
                <input
                  type="text"
                  className="form-input address-basic"
                  placeholder="기본 주소 (도로명/지번)"
                  value={address}
                  readOnly
                />
                <input
                  type="text"
                  className="form-input address-detail"
                  placeholder="상세 주소"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                />
                {renderServerError('address')}
                {renderServerError('detailAddress')}
              </div>

              {/* 버튼 영역 */}
              <div className="button-row">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={handleCancel}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="btn btn-submit"
                  disabled={!isFormValid()}
                >
                  가입하기
                </button>
              </div>
            </form>
          </div>

          <style>{`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            .signup-page {
              background: #fff;
              min-height: 100vh;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            }

            .signup-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 40px 20px;
            }

            .signup-title {
              font-size: 24px;
              font-weight: 600;
              color: #333;
              margin-bottom: 8px;
              text-align: left;
            }

            .signup-form {
              border-top: 1px solid #ddd;
              padding-top: 32px;
            }

            .form-group {
              margin-bottom: 24px;
            }

            .verification-group {
              margin-bottom: 16px;
              animation: slideDown 0.3s ease-in-out;
            }

            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .form-label {
              display: block;
              font-size: 14px;
              font-weight: 500;
              color: #333;
              margin-bottom: 8px;
            }

            .form-label.required::after {
              content: '*';
              color: #ff6b6b;
              margin-left: 2px;
            }

            .form-input,
            .form-select {
              width: 100%;
              height: 48px;
              padding: 0 16px;
              border: 1px solid #ddd;
              border-radius: 8px;
              font-size: 14px;
              color: #333;
              background: #fff;
              transition: border-color 0.2s;
            }

            .form-input:focus,
            .form-select:focus {
              outline: none;
              border-color: #6eb543;
            }

            .form-input:disabled {
              background: #f5f5f5;
              color: #666;
            }

            .form-input::placeholder {
              color: #999;
            }

            .form-input.valid {
              border-color: #6eb543;
            }

            .form-input.invalid {
              border-color: #ff6b6b;
            }

            .validation-message {
              margin-top: 8px;
            }

            .password-requirements {
              margin-top: 12px;
              padding: 12px;
              background: #f8f9fa;
              border-radius: 6px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 6px;
            }

            .requirement {
              font-size: 12px;
              transition: color 0.2s;
            }

            .requirement.valid {
              color: #6eb543;
            }

            .requirement.invalid {
              color: #999;
            }

            .email-row {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .email-row .form-input {
              flex: 1;
            }

            .at-symbol {
              font-size: 14px;
              color: #333;
              padding: 0 4px;
            }

            .email-row .form-select {
              width: 140px;
            }

            .verification-message {
              margin-top: 8px;
            }

            .success-text {
              color: #6eb543;
              font-size: 12px;
            }

            .error-text {
              color: #ff6b6b;
              font-size: 12px;
            }

            .verification-row {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .verification-input {
              flex: 1;
            }

            .timer {
              color: #6eb543;
              font-size: 14px;
              font-weight: 500;
              min-width: 50px;
            }

            .verification-btn {
              min-width: 100px;
              white-space: nowrap;
            }

            .verification-help {
              margin-top: 8px;
            }

            .help-text {
              color: #ff6b6b;
              font-size: 12px;
              cursor: pointer;
              text-decoration: underline;
            }

            .help-text:hover {
              color: #e55353;
            }

            .rate-limit-text {
              color: #ff9800;
              font-size: 12px;
              font-weight: 500;
            }

            .birth-row {
              display: flex;
              gap: 8px;
            }

            .birth-row .form-select {
              flex: 1;
            }

            .gender-row {
              display: flex;
              gap: 8px;
            }

            .btn-gender {
              flex: 1;
              height: 48px;
              border: 1px solid #ddd;
              border-radius: 8px;
              background: #fff;
              color: #666;
              font-size: 14px;
              cursor: pointer;
              transition: all 0.2s;
            }

            .btn-gender.active {
              background: #6eb543;
              border-color: #6eb543;
              color: #fff;
            }

            .university-container,
            .allergy-container {
              position: relative;
            }

            .university-row,
            .allergy-row {
              display: flex;
              gap: 8px;
              align-items: center;
            }

            .university-row .form-input,
            .allergy-row .form-input {
              flex: 1;
            }

            .university-dropdown,
            .allergy-dropdown {
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: #fff;
              border: 1px solid #ddd;
              border-top: none;
              border-radius: 0 0 8px 8px;
              max-height: 200px;
              overflow-y: auto;
              z-index: 1000;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .university-item,
            .allergy-item {
              padding: 12px 16px;
              cursor: pointer;
              border-bottom: 1px solid #f5f5f5;
              transition: background-color 0.2s;
            }

            .university-item:hover,
            .allergy-item:hover {
              background-color: #f8f9fa;
            }

            .university-item:last-child,
            .allergy-item:last-child {
              border-bottom: none;
            }

            .university-item.no-result,
            .allergy-item.no-result {
              color: #999;
              cursor: default;
            }

            .university-item.no-result:hover,
            .allergy-item.no-result:hover {
              background-color: transparent;
            }

            .selected-allergies {
              margin-top: 12px;
              padding: 12px;
              background: #f8f9fa;
              border-radius: 6px;
            }

            .selected-allergies-title {
              font-size: 12px;
              color: #666;
              margin-bottom: 8px;
            }

            .allergy-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
            }

            .allergy-tag {
              display: flex;
              align-items: center;
              gap: 6px;
              background: #6eb543;
              color: #fff;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
            }

            .allergy-remove-btn {
              background: none;
              border: none;
              color: #fff;
              cursor: pointer;
              font-size: 16px;
              font-weight: bold;
              padding: 0;
              margin: 0;
              line-height: 1;
            }

            .allergy-remove-btn:hover {
              opacity: 0.8;
            }

            .postcode-row {
              display: flex;
              gap: 8px;
              align-items: center;
              margin-bottom: 8px;
            }

            .postcode-input {
              width: 200px !important;
              flex: none;
            }

            .address-basic {
              margin-bottom: 8px;
            }

            .address-detail {
              margin-bottom: 0;
            }

            .btn {
              height: 48px;
              padding: 0 20px;
              border: none;
              border-radius: 8px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s;
            }

            .btn:disabled {
              opacity: 0.6;
              cursor: not-allowed;
            }

            .btn-primary {
              background: #6eb543;
              color: #fff;
              min-width: 120px;
            }

            .btn-primary:hover:not(:disabled) {
              background: #5fa037;
            }

            .button-row {
              display: flex;
              gap: 12px;
              margin-top: 40px;
            }

            .btn-cancel {
              flex: 1;
              background: #8bc572;
              color: #fff;
            }

            .btn-cancel:hover {
              background: #7bb462;
            }

            .btn-submit {
              flex: 1;
              background: #5d8a3a;
              color: #fff;
            }

            .btn-submit:hover:not(:disabled) {
              background: #4d7330;
            }

            .btn-submit:disabled {
              background: #ccc;
              cursor: not-allowed;
              opacity: 0.6;
            }

            .btn-submit:disabled:hover {
              background: #ccc;
            }
          `}</style>
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
