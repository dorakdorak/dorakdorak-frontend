import { useState } from "react";
import SortOptions from "@/components/common/SortOptions";
import CustomDosirakList from "@/components/customRanking/CustomDosirakList";
import { SortType } from "@/constants/sortOptions";
import { CustomDosirakItem } from "@/types/DosirakList";
import { mockCustomDosiraks } from "@/mock/CustomDosirakRankingMockData";
import styles from "@/css/list/Menu.module.css";

function CustomRanking() {
  const [selectedSort, setSelectedSort] = useState<SortType>("LATEST");
  const [dosiraks, setDosiraks] = useState<CustomDosirakItem[]>(mockCustomDosiraks);

  // useEffect(() => {
  //   const sorted = [...dosiraks];
  //   if (selectedSort === "LATEST") {
  //     sorted.sort((a, b) => b.dosirakId - a.dosirakId);
  //   } else if (selectedSort === "VOTE") {
  //     sorted.sort((a, b) => b.vote - a.vote);
  //   }
  //   setDosiraks(sorted);
  // }, [selectedSort]);

  const handleVote = (id: number) => {
    setDosiraks((prev) =>
      prev.map((item) =>
        item.dosirakId === id
          ? { ...item, isVoted: true, vote: item.vote + 1 }
          : item
      )
    );
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.menuSortWrapper}>
        <SortOptions selectedSort={selectedSort} onSelectSort={setSelectedSort} />
      </div>
      <CustomDosirakList items={dosiraks} onVote={handleVote} />
    </div>
  );
}

export default CustomRanking;
