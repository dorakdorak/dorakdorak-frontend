import { useEffect } from 'react';
import { Allergy } from '@/types/signup';
import styles from '@/css/signup/Signup.module.css';

interface Props {
  allergyData: Allergy[];
  selectedAllergies: Allergy[];
  allergySearchKeyword: string;
  allergySearchResults: Allergy[];
  showAllergyDropdown: boolean;
  setSelectedAllergies: React.Dispatch<React.SetStateAction<Allergy[]>>;
  setAllergySearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setAllergySearchResults: React.Dispatch<React.SetStateAction<Allergy[]>>;
  setShowAllergyDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

function AllergySearch({
  allergyData,
  selectedAllergies,
  allergySearchKeyword,
  allergySearchResults,
  showAllergyDropdown,
  setSelectedAllergies,
  setAllergySearchKeyword,
  setAllergySearchResults,
  setShowAllergyDropdown,
}: Props): React.ReactElement {
  const searchAllergies = (keyword: string): void => {
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

  const handleAllergyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setAllergySearchKeyword(value);
    searchAllergies(value);
  };

  const handleAllergySelect = (selectedAllergy: Allergy): void => {
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

  const handleAllergyRemove = (allergyToRemove: Allergy): void => {
    setSelectedAllergies(
      selectedAllergies.filter((allergy) => allergy.id !== allergyToRemove.id)
    );

    console.log('제거된 알레르기:', {
      name: allergyToRemove.name,
      id: allergyToRemove.id,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.allergyContainer}`)) {
        setShowAllergyDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setShowAllergyDropdown]);

  return (
    <div className={styles.formGroup}>
      <label className={`${styles.formLabel} ${styles.required}`}>
        알레르기 정보
      </label>
      <div className={styles.allergyContainer}>
        <div className={styles.allergyRow}>
          <input
            type="text"
            className={styles.formInput}
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
          <div className={styles.allergyDropdown}>
            {allergySearchResults.map((allergy) => (
              <div
                key={allergy.id}
                className={styles.allergyItem}
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
            <div className={styles.allergyDropdown}>
              <div className={`${styles.allergyItem} ${styles.noResult}`}>
                검색 결과가 없습니다
              </div>
            </div>
          )}
      </div>

      {/* 📌 선택된 알레르기 여러 개 표시 */}
      {selectedAllergies.length > 0 && (
        <div className={styles.selectedAllergies}>
          <div className={styles.selectedAllergiesTitle}>선택된 알레르기:</div>
          <div className={styles.allergyTags}>
            {selectedAllergies.map((allergy) => (
              <div key={allergy.id} className={styles.allergyTag}>
                <span>{allergy.name}</span>
                <button
                  type="button"
                  className={styles.allergyRemoveBtn}
                  onClick={() => handleAllergyRemove(allergy)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllergySearch;
