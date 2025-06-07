import { useEffect, useState } from "react";
import fetchDosiraks from "@/api/DosirakList";
import { DosirakItem } from "@/types/DosirakList";
import { FilterType } from "@/constants/categories";
import { SortType } from "@/constants/sortOptions";
import CategoryList from "@/components/common/category/CategoryList";
import SortOptions from "@/components/common/SortOptions";
import { mockDosiraks } from "@/mock/DosirakListMockData";
import DosirakList from "@/components/list/DosirakList";
import "@/css/list/Menu.css";
function Menu() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");
  const [selectedSort, setSelectedSort] = useState<SortType>("LATEST");
  const [dosiraks, setDosiraks] = useState<DosirakItem[]>([]);
  const USE_MOCK = true;

  useEffect(() => {
    if (USE_MOCK) {
      setDosiraks(mockDosiraks);
    } else {
      fetchDosiraks({ filterType: selectedFilter, sortType: selectedSort })
        .then(setDosiraks)
        .catch(console.error);
    }
  }, [selectedFilter, selectedSort]);

  return (
    <div className="menu-container">
      <CategoryList selectedFilter={selectedFilter} onSelectFilter={setSelectedFilter} />
      <div className="menu-sort-wrapper">
        <SortOptions selectedSort={selectedSort} onSelectSort={setSelectedSort} />
      </div>
      <DosirakList items={dosiraks} />
    </div>
  );
}

export default Menu;
