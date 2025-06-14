import { ORDER_STATUS_LIST, OrderStatusCode } from "@/constants/orderStatus";
import styles from "@/css/admin/OrderStatusDropdown.module.css";

interface Props {
  currentStatus: OrderStatusCode;
  onChange: (newStatus: OrderStatusCode) => void;
}

export default function OrderStatusDropdown({ currentStatus, onChange }: Props) {
  return (
    <select
      className={styles.select}
      value={currentStatus}
      onChange={(e) => onChange(e.target.value as OrderStatusCode)}
    >
      {ORDER_STATUS_LIST.map((status) => (
        <option key={status.code} value={status.code}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
