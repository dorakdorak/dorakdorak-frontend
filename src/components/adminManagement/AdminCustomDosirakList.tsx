import styles from "@/css/admin/Manage.module.css";
import { DosirakItem } from "@/types/DosirakList";
import SectionHeader from "@/components/common/SectionHeader";

interface Props {
  dosiraks: DosirakItem[];
  onRegisterClick: (id: number, name: string) => void;
}

export default function AdminCustomDosirakList({ dosiraks, onRegisterClick }: Props) {
  return (
    <div className={styles.wrapper}>
      <SectionHeader title="커스텀 도시락 관리" />

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.row4} ${styles.headerRow}`}>
          <div>썸네일</div>
          <div>이름</div>
          <div>투표 수</div>
          <div>정식 등록</div>
        </div>

        {dosiraks.map((item) => (
          <div className={`${styles.row} ${styles.row4}`} key={item.name}>
            <div>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
              />
            </div>
            <div>{item.name}</div>
            <div>{item.vote.toLocaleString()}표</div>
            <div>
              <button
                onClick={() => onRegisterClick(item.dosirakId, item.name)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  backgroundColor: "#3a5d1d",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                등록
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
