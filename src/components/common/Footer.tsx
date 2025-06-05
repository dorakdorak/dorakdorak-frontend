import "@/css/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <p>
            <span className="label">대표이메일</span>{" "}
            <span className="email">dorakdorak@hyundai.co.kr</span>
          </p>
          <p className="copyright">© DORAKDORAK All Rights Reserved.</p>
        </div>
        <div className="footer-right">
          <div>DORAK</div>
          <div>DORAK</div>
          <div>도락도락</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
