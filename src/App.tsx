import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/assets/font/font.css";
import "@/App.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Main from "@/pages/Main";
import Menu from "@/pages/Menu";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header isLoggedIn={false} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/menu" element={<Menu />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
