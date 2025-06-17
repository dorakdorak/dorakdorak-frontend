import { useEffect, useState } from "react";
import { AdminOrderResponse } from "@/types/AdminManagement";
import { fetchAdminOrderList, updateAdminOrderStatus } from "@/api/AdminApi";
import AdminOrderList from "@/components/adminManagement/AdminOrderList";
import Spinner from "@/components/common/Spinner";

export default function AdminPage() {
  const [orders, setOrders] = useState<AdminOrderResponse[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    document.body.classList.add("bg-custom");
    return () => {
      document.body.classList.remove("bg-custom");
    };
  }, []);

  const getLastOrderId = () => {
    return orders.length > 0 ? orders[orders.length - 1].orderId : undefined;
  };

  const fetchMoreOrders = async (isInitial = false) => {
    if (isFetching || (!hasMore && !isInitial)) return;

    setIsFetching(true);
    try {
      const data = await fetchAdminOrderList(isInitial ? undefined : getLastOrderId());

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setOrders((prev) => {
          const existingIds = new Set(prev.map((o) => o.orderId));
          const filtered = data.filter((o) => !existingIds.has(o.orderId));
          return [...prev, ...filtered];
        });
      }
    } catch (e) {
      console.error("주문 목록 불러오기 실패:", e);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      setOrders([]);
      setHasMore(true);
      await fetchMoreOrders(true);
    };
    init();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.body.scrollHeight;

      if (scrollY + innerHeight >= scrollHeight - 200) {
        fetchMoreOrders();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [orders, isFetching, hasMore]);

  const handleStatusChange = async (
    orderId: number,
    newStatus: AdminOrderResponse["orderStatus"]
  ) => {
    try {
      await updateAdminOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (error) {
      alert("주문 상태 변경에 실패했습니다.");
      console.log(error);
    }
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      <AdminOrderList orders={orders} onStatusChange={handleStatusChange} />
      {isFetching && <Spinner />}
    </div>
  );
}
