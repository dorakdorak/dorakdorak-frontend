import { useEffect, useState } from "react";
import fetchDosiraks from "@/api/DosirakList";
import { DosirakItem } from "@/types/DosirakList";
import { FilterType } from "@/constants/categories";
import { SortType } from "@/constants/sortOptions";
import CategoryList from "@/components/common/category/CategoryList";
import SortOptions from "@/components/common/SortOptions";
import DosirakList from "@/components/list/DosirakList";
import styles from "@/css/list/Menu.module.css";
import Spinner from "@/components/common/Spinner";

function Menu() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");
  const [selectedSort, setSelectedSort] = useState<SortType>("LATEST");
  const [dosiraks, setDosiraks] = useState<DosirakItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getLastId = () => {
    return dosiraks.length > 0
      ? dosiraks[dosiraks.length - 1].dosirakId
      : undefined;
  };

  const fetchMoreDosiraks = async (isInitial = false) => {
    if (isFetching || (!hasMore && !isInitial)) return;

    setIsFetching(true);
    try {
      const data = await fetchDosiraks({
        filterType: selectedFilter,
        sortType: selectedSort,
        dosirakType: "NORMAL",
        dosirakId: isInitial ? undefined : getLastId(),
      });

      if (data.dosiraks.length === 0) {
        setHasMore(false);
      } else {
        setDosiraks((prev) => {
          const existingIds = new Set(prev.map((d) => d.dosirakId));
          const newItems = data.dosiraks.filter(
            (d) => !existingIds.has(d.dosirakId)
          );
          return [...prev, ...newItems];
        });
      }
    } catch (error) {
      console.error("도시락 불러오기 실패:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const resetAndFetch = async () => {
      setDosiraks([]);
      setHasMore(true);
      await fetchMoreDosiraks(true); // ✅ 초기화 상태로 첫 요청
    };
    resetAndFetch();
  }, [selectedFilter, selectedSort]);

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

  return (
    <div className={styles.menuContainer}>
      <CategoryList
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
      />
      <div className={styles.menuSortWrapper}>
        <SortOptions
          selectedSort={selectedSort}
          onSelectSort={setSelectedSort}
        />
      </div>
      <DosirakList items={dosiraks} />

      {isFetching && <Spinner />}

      {/* {!hasMore && dosiraks.length > 0 && (
        <div style={{ textAlign: "center", color: "#888", marginTop: "20px" }}>
          더 이상 도시락이 없습니다.
        </div>
      )} */}
    </div>
  );
}

export default Menu;
