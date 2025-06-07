import DosirakCard from "@/components/list/DosirakCard";
import { DosirakItem } from "@/types/DosirakList";
import "@/css/list/DosirakList.css";

function DosirakList({ items }: { items: DosirakItem[] }) {
  return (
    <div className="dosirak-list">
      {items.map((item) => (
        <DosirakCard key={item.dosirakId} item={item} />
      ))}
    </div>
  );
}

export default DosirakList;
