import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/assets/font/font.css";
import "@/App.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Main from "@/pages/Main";
import Menu from "@/pages/Menu";
import GroupOrder from "@/pages/GroupOrder";
import CustomDosirak from "@/pages/CustomDosirak";
import CustomRanking from "@/pages/CustomRanking";
import ZeroWasteRanking from "@/pages/ZeroWasteRanking";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Mypage from "@/pages/Mypage";
import Detail from "@/pages/Detail";
import CustomDetail from "@/pages/CustomDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header isLoggedIn={false} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/group-order" element={<GroupOrder />} />
            <Route path="/custom-dosirak" element={<CustomDosirak />} />
            <Route path="/custom-ranking" element={<CustomRanking />} />
            <Route path="/zero-waste" element={<ZeroWasteRanking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/custom-detail" element={<CustomDetail />} />
            <Route path="/custom-detail/:id" element={<CustomDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
