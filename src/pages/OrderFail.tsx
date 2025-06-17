import { useNavigate } from "react-router-dom";
import styles from "@/css/order/OrderFail.module.css";
import Button from "@/components/common/Button";

const OrderFailPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>결제에 실패했습니다.</h2>
      <p className={styles.text}>결제 도중 문제가 발생했어요.<br />다시 시도해 주세요.</p> <br/>
      <Button onClick={() => navigate(-1)} variant="primary" size="md">돌아가기</Button>
    </div>
  );
};

export default OrderFailPage;