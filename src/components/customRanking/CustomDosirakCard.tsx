import styles from "@/css/customRanking/CustomDosirak.module.css";
import checkGreen from "@/assets/images/icon/check-green.png";
import checkWhite from "@/assets/images/icon/check-white.png";
import { DosirakItem } from "@/types/DosirakList";
import { useNavigate } from "react-router-dom";

interface Props {
  item: DosirakItem;
  onVoteClick: (id: number) => void;
}

const CustomDosirakCard = ({ item, onVoteClick }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/custom-detail/${item.dosirakId}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        <img src={item.imageUrl} alt={item.name} className={styles.image} />
      </div>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.voteCount}>{item.price.toLocaleString()}원</div>
      <div className={styles.voteCount}>{item.vote.toLocaleString()}표</div>
      <button
        className={`${styles.voteButton} ${
          item.vote === 1 ? styles.voted : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onVoteClick(item.dosirakId);
        }}
        disabled={item.vote === 1}
      >
        <img
          src={item.vote === 1 ? checkWhite : checkGreen}
          alt="투표"
          className={styles.icon}
        />
        {item.vote ? "투표완료" : "투표하기"}
      </button>
    </div>
  );
};

export default CustomDosirakCard;
