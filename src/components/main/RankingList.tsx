import CountUp from "react-countup";
import styles from "@/css/main/RankingList.module.css";

const RankingList = () => {
  const rankings = [
    { rank: 1, school: "연세대학교", count: 124 },
    { rank: 2, school: "경희대학교", count: 98 },
    { rank: 3, school: "이화여대", count: 91 },
  ];

  return (
    <div className={styles.rankingWrapper}>
      <div className={styles.rankingLabel}>실시간 인증 랭킹</div>
      <ul className={styles.rankingList}>
        {rankings.map((item) => (
          <li key={item.rank} className={styles.rankingItem}>
            {item.rank}위 {item.school} -{" "}
            <CountUp end={item.count} duration={1.5} enableScrollSpy />회
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
