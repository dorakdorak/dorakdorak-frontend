import { Link } from "react-router-dom";
import "@/css/main/DosirakCard.css";

interface DosirakCardProps {
  image: string;
  tag: string;
  to: string;
}

const DosirakCard = ({ image, tag, to }: DosirakCardProps) => (
  <Link to={to} className="dosirak-card">
    <div className="dosirak-image-wrapper">
      <img src={image} alt={tag} className="dosirak-image" />
    </div>
    <div className="dosirak-tag"># {tag}</div>
  </Link>
);

export default DosirakCard;
