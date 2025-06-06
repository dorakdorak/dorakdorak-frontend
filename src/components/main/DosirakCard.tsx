import "@/css/main/DosirakCard.css";

interface DosirakCardProps {
  image: string;
  tag: string;
}

const DosirakCard = ({ image, tag }: DosirakCardProps) => (
  <div className="dosirak-card">
    <div className="dosirak-image-wrapper">
      <img src={image} alt={tag} className="dosirak-image" />
    </div>
    <div className="dosirak-tag"># {tag}</div>
  </div>
);

export default DosirakCard;
