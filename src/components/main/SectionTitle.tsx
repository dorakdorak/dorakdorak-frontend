import styles from "@/css/main/SectionTitle.module.css";
import arrowIcon from "@/assets/images/icon/arrow.png";
import { Link } from "react-router-dom";

interface SectionTitleProps {
  title: string;
  description?: React.ReactNode;
  to: string;
}

const SectionTitle = ({ title, description, to }: SectionTitleProps) => (
  <div className={styles.sectionTitle}>
    <Link to={to} className={styles.sectionTitleRow}>
      <h2>{title}</h2>
      <img src={arrowIcon} alt="화살표" className={styles.sectionArrowIcon} />
    </Link>
    {description && <p>{description}</p>}
  </div>
);

export default SectionTitle;
