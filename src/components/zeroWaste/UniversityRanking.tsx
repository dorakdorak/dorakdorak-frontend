import styles from "@/css/zeroWaste/RankingList.module.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { University } from "@/types/UniversityRanking";
import { medalMap } from "@/constants/medalMap";

type Props = {
  universities: University[];
};

export default function RankingList({ universities }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleBox}>실시간 인증 랭킹</div>

      {universities.map((univ, index) => (
        <motion.div
          key={index}
          className={styles.item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: index * 0.2,
            ease: "easeOut",
          }}
        >
          <div className={styles.rankIcon}>
            {medalMap[univ.rank] ? (
              <img src={medalMap[univ.rank]} alt={`${univ.rank}위 메달`} />
            ) : (
              <span>{univ.rank}</span>
            )}
          </div>

          <img src={univ.logoUrl} alt={univ.name} className={styles.logo} />

          <span className={styles.name}>{univ.name}</span>

          <span className={styles.count}>
            <CountUp end={univ.count} duration={1.5} separator="," suffix="회" enableScrollSpy />
          </span>
        </motion.div>
      ))}
    </div>
  );
}
