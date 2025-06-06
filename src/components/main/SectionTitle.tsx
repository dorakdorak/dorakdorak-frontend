import "@/css/main/SectionTitle.css";
import arrowIcon from "@/assets/images/icon/arrow.png";
import { Link } from "react-router-dom";

interface SectionTitleProps {
  title: string;
  description?: React.ReactNode;
  to: string;
}

const SectionTitle = ({ title, description, to }: SectionTitleProps) => (
  <div className="section-title">
    <Link to={to} className="title-row">
      <h2>{title}</h2>
      <img src={arrowIcon} alt="화살표" className="arrow-icon" />
    </Link>
    {description && <p>{description}</p>}
  </div>
);

export default SectionTitle;
