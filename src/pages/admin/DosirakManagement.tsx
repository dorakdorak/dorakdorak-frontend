import { useEffect, useState } from "react";
import { AdminCustomsDosiraksResponse } from "@/types/AdminManagement";
import { mockCustomDosiraks } from "@/mock/AdminCustomDosiraks";
import AdminCustomDosirakList from "@/components/adminManagement/AdminCustomDosirakList";
import ConfirmModal from "@/components/customRanking/ConfirmModal";

export default function DosirakManagement() {
  const [dosiraks, setDosiraks] = useState<AdminCustomsDosiraksResponse[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  useEffect(() => {
    setDosiraks(mockCustomDosiraks);
  }, []);

  const handleRegisterClick = (id: number, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
  };

  const confirmRegister = () => {
    if (selectedId === null) return;
    // TODO: 등록 API 호출
    setDosiraks((prev) => prev.filter((item) => item.customdosirakId !== selectedId));
    setShowModal(false);
    setSelectedId(null);
    setSelectedName("");
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
