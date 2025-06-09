import CustomDosirakCard from "@/components/customRanking/CustomDosirakCard";
import { CustomDosirakItem } from "@/types/DosirakList";
import styles from "@/css/customRanking/CustomDosirak.module.css";

interface Props {
  items: CustomDosirakItem[];
  onVote: (id: number) => void;
}

function CustomDosirakList({ items, onVote }: Props) {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <CustomDosirakCard key={item.dosirakId} item={item} onVote={onVote} />
      ))}
    </div>
  );
}

export default CustomDosirakList;
