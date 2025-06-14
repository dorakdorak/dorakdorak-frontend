import { useState } from "react";
import { DosirakSearch } from "@/types/AdminStatistics";
import styles from "@/css/common/DosirakSearchInput.module.css";

interface SearchProps {
  dosiraks: DosirakSearch[];
  onSelect: (id: number) => void;
}

export default function DosirakSearchInput({ dosiraks, onSelect }: SearchProps) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<DosirakSearch[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const matches = dosiraks.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(matches);
  };

  const handleSelect = (id: number) => {
    const selected = dosiraks.find((item) => item.dosirakId === id);
    if (!selected) return;

    onSelect(id);
    setQuery(selected.name);
    setFiltered([]);
  };

  const handleSearchButtonClick = () => {
    const exactMatch = dosiraks.find((item) => item.name === query.trim());
    if (exactMatch) {
      handleSelect(exactMatch.dosirakId);
    } else {
      alert("정확히 일치하는 도시락이 없습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="도시락 이름으로 검색"
            className={styles.input}
          />
          {filtered.length > 0 && (
            <ul className={styles.dropdown}>
              {filtered.map((item) => (
                <li
                  key={item.dosirakId}
                  className={styles.option}
                  onClick={() => handleSelect(item.dosirakId)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className={styles.button} onClick={handleSearchButtonClick}>
          검색
        </button>
      </div>
    </div>
  );
}
