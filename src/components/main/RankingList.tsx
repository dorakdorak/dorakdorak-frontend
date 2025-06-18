import { useEffect, useState } from "react";
import { fetchUniversityRanking } from "@/api/UniversityRanking";
import { University } from "@/types/UniversityRanking";
import CountUp from "react-countup";
import styles from "@/css/main/RankingList.module.css";

const RankingList = () => {
  const [rankings, setRankings] = useState<University[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUniversityRanking();
      if (data) {
        setRankings(data.slice(0, 3));
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.rankingWrapper}>
      <div className={styles.rankingLabel}>실시간 인증 랭킹</div>
      <ul className={styles.rankingList}>
        {rankings.map((item, index) => (
          <li key={item.name} className={styles.rankingItem}>
            {index + 1}위 {item.name} -{" "}
            <CountUp end={item.count} duration={1.5} enableScrollSpy />회
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
