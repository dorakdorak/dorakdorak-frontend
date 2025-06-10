import styles from "@/css/common/SelectableItem.module.css";
import checkGreenFull from "@/assets/images/icon/check-green-full.png";
import checkGray from "@/assets/images/icon/check-gray.png";

type Props = {
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function SelectableItem({ label, selected, onClick }: Props) {
  return (
    <div
      className={`${styles.item} ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      <span>{label}</span>
      <img
        src={selected ? checkGreenFull : checkGray}
        alt="선택 상태 표시"
        className={styles.checkmark}
      />
    </div>
  );
}
