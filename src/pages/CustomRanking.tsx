import { useState } from "react";
import SortOptions from "@/components/common/SortOptions";
import CustomDosirakList from "@/components/customRanking/CustomDosirakList";
import { SortType } from "@/constants/sortOptions";
import { CustomDosirakItem } from "@/types/DosirakList";
import { mockCustomDosiraks } from "@/mock/CustomDosirakRankingMockData";
import styles from "@/css/list/Menu.module.css";
import ConfirmModal from "@/components/customRanking/ConfirmModal";
import SectionHeader from "@/components/common/SectionHeader";

function CustomRanking() {
  const [selectedSort, setSelectedSort] = useState<SortType>("LATEST");
  const [dosiraks, setDosiraks] = useState<CustomDosirakItem[]>(mockCustomDosiraks);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CustomDosirakItem | null>(null);

  // useEffect(() => {
  //   const sorted = [...dosiraks];
  //   if (selectedSort === "LATEST") {
  //     sorted.sort((a, b) => b.dosirakId - a.dosirakId);
  //   } else if (selectedSort === "VOTE") {
  //     sorted.sort((a, b) => b.vote - a.vote);
  //   }
  //   setDosiraks(sorted);
  // }, [selectedSort]);

  const openModal = (item: CustomDosirakItem) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const handleVoteClick = (id: number) => {
    const found = dosiraks.find((item) => item.dosirakId === id);
    if (found) openModal(found);
  };

  const handleVoteConfirm = () => {
    if (!selectedItem) return;
    setDosiraks((prev) =>
      prev.map((item) =>
        item.dosirakId === selectedItem.dosirakId
          ? { ...item, isVoted: true, vote: item.vote + 1 }
          : item
      )
    );
    closeModal();
  };

  return (
    <div className={styles.menuContainer}>
      <SectionHeader title="커스텀 도시락 랭킹"></SectionHeader>
      <div className={styles.menuSortWrapper}>
        <SortOptions selectedSort={selectedSort} onSelectSort={setSelectedSort} />
      </div>
      <CustomDosirakList items={dosiraks} onVoteClick={handleVoteClick} />
      {selectedItem && (
        <ConfirmModal
          name={selectedItem.name}
          mode="vote"
          show={modalOpen}
          onConfirm={handleVoteConfirm}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default CustomRanking;
