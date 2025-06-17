import { useEffect, useState } from "react";
import { DosirakItem, DosirakRequest } from "@/types/DosirakList";
import AdminCustomDosirakList from "@/components/adminManagement/AdminCustomDosirakList";
import ConfirmModal from "@/components/customRanking/ConfirmModal";
import fetchDosiraks from "@/api/DosirakList";
import { registerCustomDosirak } from "@/api/AdminApi";

export default function DosirakManagement() {
  const [dosiraks, setDosiraks] = useState<DosirakItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  const getLastId = () => {
    return dosiraks.length > 0 ? dosiraks[dosiraks.length - 1].dosirakId : undefined;
  };

  const fetchMoreDosiraks = async (isInitial = false) => {
    if (isFetching || (!hasMore && !isInitial)) return;

    setIsFetching(true);
    const request: DosirakRequest = {
      sortType: "POPULAR",
      dosirakType: "CUSTOM",
      dosirakId: isInitial ? undefined : getLastId(),
    };

    try {
      const { dosiraks: newDosiraks } = await fetchDosiraks(request);
      if (newDosiraks.length === 0) {
        setHasMore(false);
      } else {
        setDosiraks((prev) => {
          const existingIds = new Set(prev.map((d) => d.dosirakId));
          const filtered = newDosiraks.filter((d) => !existingIds.has(d.dosirakId));
          return [...prev, ...filtered];
        });
      }
    } catch (error) {
      console.error("도시락 데이터를 불러오는 데 실패했습니다.", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchMoreDosiraks(true); // 초기 로딩
  }, []);

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
  }, [dosiraks, isFetching, hasMore]);

  const handleRegisterClick = (id: number, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
  };

  const confirmRegister = async () => {
    if (selectedId === null) return;
    try {
      await registerCustomDosirak(selectedId);
      setDosiraks((prev) => prev.filter((item) => item.dosirakId !== selectedId));
      setShowModal(false);
      setSelectedId(null);
      setSelectedName("");
    } catch (error) {
      alert("등록에 실패했습니다.");
      console.log(error);
    }
  };

  const cancelRegister = () => {
    setShowModal(false);
    setSelectedId(null);
    setSelectedName("");
  };

  return (
    <>
      <AdminCustomDosirakList dosiraks={dosiraks} onRegisterClick={handleRegisterClick} />
      <ConfirmModal
        name={selectedName}
        mode="regist"
        show={showModal}
        onConfirm={confirmRegister}
        onCancel={cancelRegister}
      />
    </>
  );
}
