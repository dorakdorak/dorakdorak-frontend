import CountUp from "react-countup";
import "@/css/main/RankingList.css";

const RankingList = () => {
  const rankings = [
    { rank: 1, school: "연세대학교", count: 124 },
    { rank: 2, school: "경희대학교", count: 98 },
    { rank: 3, school: "이화여대", count: 91 },
  ];

  return (
    <div className="ranking-wrapper">
      <div className="ranking-label">실시간 인증 랭킹</div>
      <ul className="ranking-list">
        {rankings.map((item) => (
          <li key={item.rank} className="ranking-item">
            {item.rank}위 {item.school} -{" "}
            <CountUp end={item.count} duration={1.5} enableScrollSpy />회
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
