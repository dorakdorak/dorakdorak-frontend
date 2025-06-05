import "@/App.css";
import "@/assets/font/font.css";
import Header from "@/components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="app-wrapper">
      <Header isLoggedIn={false} />
      <main className="main-content">
        <section className="section">
          <div style={{ flex: 1, background: "#eee", height: "402px" }}>본문</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
export default App;
