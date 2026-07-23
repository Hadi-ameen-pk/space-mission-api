function Footer() {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">
          <h2>Space Explorer</h2>

          <p>
            Learn Space Science through interactive lessons,
            videos and real-time space news.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/topics">Topics</a>
          <a href="/news">News</a>
          <a href="/dashboard">Dashboard</a>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>

          <a
            href="https://www.youtube.com/@SpaceExplorer-r3o"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>

          <a
            href="https://www.instagram.com/space_explorer_166/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>

          <a
            href="https://github.com/Hadi-ameen-pk"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>

      </div>

      <hr />

      <p className="copyright">
        © 2026 Space Explorer | Developed by Hadi Ameen PK
      </p>

    </footer>
  );
}

export default Footer;