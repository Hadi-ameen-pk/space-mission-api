import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-title">Space Mission Control</h3>
        <p className="footer-description">
          Exploring and managing space missions beyond Earth.
        </p>

        <div className="footer-links">
          <span>Home</span>
          <span>Missions</span>
          <span>Space News</span>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Space Mission Control. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
