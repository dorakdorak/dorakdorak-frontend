import styles from "@/css/order/OrderSuccessHeader.module.css";
import successIcon from "@/assets/images/icon/check-green.png";

interface Props {
  orderCode: string;
}

const OrderSuccessHeader = ({ orderCode }: Props) => {
  return (
    <div className={styles.header}>
      <img src={successIcon} alt="success" className={styles.icon} />
      <h2 className={styles.title}>주문이 완료되었습니다.</h2>
      <p className={styles.orderCode}>주문 번호 {orderCode}</p>
    </div>
  );
};

export default OrderSuccessHeader;
