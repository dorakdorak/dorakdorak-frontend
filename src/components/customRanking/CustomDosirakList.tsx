import CustomDosirakCard from "@/components/customRanking/CustomDosirakCard";
import { DosirakItem } from "@/types/DosirakList";
import styles from "@/css/customRanking/CustomDosirak.module.css";

interface Props {
  items: DosirakItem[];
  onVoteClick: (id: number) => void;
}

function CustomDosirakList({ items, onVoteClick }: Props) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <CustomDosirakCard
          key={item.dosirakId}
          item={item}
          onVoteClick={onVoteClick}
        />
      ))}
    </div>
  );
}

export default CustomDosirakList;
