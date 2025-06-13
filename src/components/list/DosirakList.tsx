import DosirakCard from "@/components/list/DosirakCard";
import { DosirakItem } from "@/types/DosirakList";
import styles from "@/css/list/DosirakList.module.css";

function DosirakList({ items }: { items: DosirakItem[] }) {
  return (
    <div className={styles.dosirakList}>
      {items.map((item) => (
        <DosirakCard key={item.dosirakId} item={item} />
      ))}
    </div>
  );
}

export default DosirakList;
