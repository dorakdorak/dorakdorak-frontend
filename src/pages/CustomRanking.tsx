import { useEffect, useState } from "react";
import SortOptions from "@/components/common/SortOptions";
import CustomDosirakList from "@/components/customRanking/CustomDosirakList";
import { SortType } from "@/constants/sortOptions";
import { DosirakItem, DosirakRequest } from "@/types/DosirakList";
import styles from "@/css/list/Menu.module.css";
import ConfirmModal from "@/components/customRanking/ConfirmModal";
import SectionHeader from "@/components/common/SectionHeader";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";
import fetchDosiraks from "@/api/DosirakList";
import Spinner from "@/components/common/Spinner";
import { voteCustomDosirak } from "@/api/VoteCustomDosirak";

function CustomRanking() {
  const [selectedSort, setSelectedSort] = useState<SortType>("LATEST");
  const [dosiraks, setDosiraks] = useState<DosirakItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DosirakItem | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  // 로그인 확인
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", {
        replace: true,
        state: { message: "로그인 후 이용 가능한 서비스입니다." },
      });
    }
  }, [isLoggedIn, navigate]);

  const getLastId = () =>
    dosiraks.length > 0 ? dosiraks[dosiraks.length - 1].dosirakId : undefined;

  const fetchMoreDosiraks = async (isInitial = false) => {
    if (isFetching || (!hasMore && !isInitial)) return;

    setIsFetching(true);
    const request: DosirakRequest = {
      sortType: selectedSort,
      dosirakType: "CUSTOM",
      dosirakId: isInitial ? undefined : getLastId(),
    };

    try {
      const { dosiraks: newList } = await fetchDosiraks(request);
      if (newList.length === 0) {
        setHasMore(false);
      } else {
        setDosiraks((prev) => {
          const existingIds = new Set(prev.map((d) => d.dosirakId));
          const unique = newList.filter((d) => !existingIds.has(d.dosirakId));
          return [...prev, ...unique];
        });
      }
    } catch (error) {
      console.error("도시락 데이터를 불러오는 데 실패했습니다.", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const resetAndFetch = async () => {
      setDosiraks([]);
      setHasMore(true);
      await fetchMoreDosiraks(true);
    };
    if (isLoggedIn) resetAndFetch();
  }, [selectedSort, isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;

      if (scrollY + innerHeight >= scrollHeight - 200) {
        fetchMoreDosiraks();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dosiraks, hasMore, isFetching]);

  const openModal = (item: DosirakItem) => {
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

  const handleVoteConfirm = async () => {
    if (!selectedItem) return;

    try {
      await voteCustomDosirak(selectedItem.dosirakId);
      setDosiraks((prev) =>
        prev.map((item) =>
          item.dosirakId === selectedItem.dosirakId
            ? {
                ...item,
                vote: (item.vote ?? 0) + 1,
                isVoted: true,
              }
            : item
        )
      );
      closeModal();
    } catch (error) {
      console.error("투표 실패", error);
      alert("투표에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.menuContainer}>
      <SectionHeader title="커스텀 도시락 랭킹" />
      <div className={styles.menuSortWrapper}>
        <SortOptions
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
        />
      </div>
      <CustomDosirakList items={dosiraks} onVoteClick={handleVoteClick} />
      {isFetching && <Spinner />}
      {/* {!hasMore && dosiraks.length > 0 && (
        <div style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
          더 이상 도시락이 없습니다.
        </div>
      )} */}
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
