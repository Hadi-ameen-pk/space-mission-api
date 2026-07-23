import Navbar from "../components/Navbar";

function Certificate() {

  const username =
    localStorage.getItem("username") || "Student";

  return (
    <>
      <Navbar />

      <section className="certificate-page">

        <div className="certificate">

          <h3>Space Explorer</h3>

          <h1>Certificate of Completion</h1>

          <p>This certificate is proudly presented to</p>

          <h2>{username}</h2>

          <p>
            for successfully completing the
            Space Explorer Learning Program.
          </p>

          <h4>Congratulations!</h4>

          <button
            className="hero-btn"
            onClick={() => window.print()}
          >
            Download / Print Certificate
          </button>

        </div>

      </section>
    </>
  );
}

export default Certificate;