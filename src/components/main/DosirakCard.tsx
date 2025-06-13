import { Link } from "react-router-dom";
import styles from "@/css/main/DosirakCard.module.css";

interface DosirakCardProps {
  image: string;
  tag: string;
  to: string;
}

const DosirakCard = ({ image, tag, to }: DosirakCardProps) => (
  <Link to={to} className={styles.dosirakCard}>
    <div className={styles.dosirakImageWrapper}>
      <img src={image} alt={tag} className={styles.dosirakImage} />
    </div>
    <div className={styles.dosirakTag}># {tag}</div>
  </Link>
);

export default DosirakCard;
