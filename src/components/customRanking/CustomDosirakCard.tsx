import styles from "@/css/customRanking/CustomDosirak.module.css";
import checkGreen from "@/assets/images/icon/check-green.png";
import checkWhite from "@/assets/images/icon/check-white.png";
import { CustomDosirakItem } from "@/types/DosirakList";

interface Props {
  item: CustomDosirakItem;
  onVote: (id: number) => void;
}

const CustomDosirakCard = ({ item, onVote }: Props) => {
  const handleClick = () => {
    if (!item.isVoted) {
      onVote(item.dosirakId);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={item.imageUrl} alt={item.name} className={styles.image} />
      </div>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.voteCount}>{item.price.toLocaleString()}원</div>
      <div className={styles.voteCount}>{item.vote.toLocaleString()}표</div>
      <button
        className={`${styles.voteButton} ${item.isVoted ? styles.voted : ""}`}
        onClick={handleClick}
        disabled={item.isVoted}
      >
        <img src={item.isVoted ? checkWhite : checkGreen} alt="투표" className={styles.icon} />
        {item.isVoted ? "투표완료" : "투표하기"}
      </button>
    </div>
  );
};

export default CustomDosirakCard;
