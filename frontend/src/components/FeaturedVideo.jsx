function FeaturedVideo() {

  const video = {
    title: "Black Hole Explained",
    description:
      "Understand what black holes are, how they form, and why they are one of the most mysterious objects in the universe.",

    thumbnail:
      "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg",

    link:
      "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  };

  return (
    <section className="featured-video">

      <h2>Featured Video</h2>

      <div className="video-feature-card">

        <img
          src={video.thumbnail}
          alt={video.title}
        />

        <div>

          <h3>{video.title}</h3>

          <p>{video.description}</p>

          <a
            href={video.link}
            target="_blank"
            rel="noreferrer"
          >
            <button className="hero-btn">
              ▶ Watch on YouTube
            </button>
          </a>

        </div>

      </div>

    </section>
  );
}

export default FeaturedVideo;