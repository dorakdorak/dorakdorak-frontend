import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@/assets/font/font.css";
import "@/App.css";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import AdminHeader from "@/components/common/AdminHeader";

import Main from "@/pages/Main";
import Menu from "@/pages/Menu";
import GroupOrder from "@/pages/GroupOrder";
import OrderSuccess from "@/pages/OrderSuccess";
import OrderFail from "@/pages/OrderFail";
import CustomDosirak from "@/pages/CustomDosirak";
import CustomRanking from "@/pages/CustomRanking";
import ZeroWasteRanking from "@/pages/ZeroWasteRanking";
import ZeroWasteCert from "@/pages/ZeroWasteCert";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Mypage from "@/pages/Mypage";
import Detail from "@/pages/Detail";
import CustomDetail from "@/pages/CustomDetail";
import MyNormalOrders from "@/pages/MyNormalOrders";
import MyGroupOrders from "@/pages/MyGroupOrders";
import MyCustomDosiraks from "@/pages/MyCustomDosiraks";
import OrderManagement from "@/pages/admin/OrderManagement";
import DosirakManagement from "@/pages/admin/DosirakManagement";
import SalesStatistics from "@/pages/admin/SalesStatistics";
import PopularityStatistics from "@/pages/admin/PopularityStatistics";
import OrderStatistics from "@/pages/admin/OrderStatistics";

import useAuthStore from "@/store/authStore";

const LayoutWrapper = () => {
  // Production 확인용. 향후 삭제 예정
  console.log("현재 VITE MODE:", import.meta.env.MODE);

  // Zustand persist가 자동으로 상태 복원
  const { isLoggedIn, user } = useAuthStore();
  const location = useLocation();

  const hideLayout = location.pathname.startsWith("/zero-waste/cert");

  return (
    <div className="app-wrapper">
      {!hideLayout &&
        (user?.role === "ADMIN" ? (
          <AdminHeader />
        ) : (
          <Header isLoggedIn={isLoggedIn} />
        ))}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/group-order" element={<GroupOrder />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/order-fail" element={<OrderFail />} />
          <Route path="/custom-dosirak" element={<CustomDosirak />} />
          <Route path="/custom-ranking" element={<CustomRanking />} />
          <Route path="/zero-waste" element={<ZeroWasteRanking />} />
          <Route path="/zero-waste/cert/:qrcode" element={<ZeroWasteCert />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/custom-detail" element={<CustomDetail />} />
          <Route path="/custom-detail/:id" element={<CustomDetail />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/normal-orders" element={<MyNormalOrders />} />
          <Route path="/mypage/group-orders" element={<MyGroupOrders />} />
          <Route path="/mypage/custom-dosirak" element={<MyCustomDosiraks />} />
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/dosirak-management" element={<DosirakManagement />} />
          <Route path="/sales-statistics" element={<SalesStatistics />} />
          <Route path="/popular-statistics" element={<PopularityStatistics />} />
          <Route path="/order-statistics" element={<OrderStatistics />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <LayoutWrapper />
  </BrowserRouter>
);

export default App;
