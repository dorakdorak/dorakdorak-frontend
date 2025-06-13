import { useEffect } from 'react';
import { SignupFormData, University, ServerErrors } from '@/types/signup';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  formData: SignupFormData;
  updateFormData: (
    field: keyof SignupFormData,
    value: string | number | null
  ) => void;
  universityData: University[];
  universitySearchResults: University[];
  showUniversityDropdown: boolean;
  setUniversitySearchResults: React.Dispatch<
    React.SetStateAction<University[]>
  >;
  setShowUniversityDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  serverErrors: ServerErrors;
}

function UniversitySearch({
  formData,
  updateFormData,
  universityData,
  universitySearchResults,
  showUniversityDropdown,
  setUniversitySearchResults,
  setShowUniversityDropdown,
  serverErrors,
}: Props): React.ReactElement {
  const searchUniversities = (keyword: string): void => {
    if (!keyword.trim()) {
      setUniversitySearchResults([]);
      setShowUniversityDropdown(false);
      return;
    }

    const results = universityData.filter((uni) => uni.name.includes(keyword));
    setUniversitySearchResults(results);
    setShowUniversityDropdown(results.length > 0);
  };

  const handleUniversityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    updateFormData('university', value);
    updateFormData('universityId', null);
    searchUniversities(value);
  };

  const handleUniversitySelect = (selectedUniversity: University): void => {
    updateFormData('university', selectedUniversity.name);
    updateFormData('universityId', selectedUniversity.id);
    setShowUniversityDropdown(false);
    setUniversitySearchResults([]);

    console.log('선택된 대학교:', {
      name: selectedUniversity.name,
      id: selectedUniversity.id,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.universityContainer}`)) {
        setShowUniversityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowUniversityDropdown]);

  return (
    <div className={styles.formGroup}>
      <label className={`${styles.formLabel} ${styles.required}`}>대학교</label>
      <div className={styles.universityContainer}>
        <div className={styles.universityRow}>
          <input
            type="text"
            className={styles.formInput}
            placeholder={
              universityData.length > 0
                ? '대학교명을 입력하세요'
                : '대학교 데이터 로딩 중...'
            }
            value={formData.university}
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

        {showUniversityDropdown && universitySearchResults.length > 0 && (
          <div className={styles.universityDropdown}>
            {universitySearchResults.map((uni) => (
              <div
                key={uni.id}
                className={styles.universityItem}
                onClick={() => handleUniversitySelect(uni)}
              >
                {uni.name}
              </div>
            ))}
          </div>
        )}

        {showUniversityDropdown &&
          universitySearchResults.length === 0 &&
          formData.university.trim() && (
            <div className={styles.universityDropdown}>
              <div className={`${styles.universityItem} ${styles.noResult}`}>
                검색 결과가 없습니다
              </div>
            </div>
          )}
      </div>
      {formData.universityId && (
        <div className={styles.validationMessage}>
          <span className={styles.successText}>
            선택된 대학교: {formData.university}
          </span>
        </div>
      )}
      {serverErrors.university && (
        <div className={styles.validationMessage}>
          <span className={styles.errorText}>{serverErrors.university}</span>
        </div>
      )}
    </div>
  );
}

export default UniversitySearch;
