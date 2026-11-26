import { Link } from "react-router-dom";

const EXPAND_ICON = "M4 9 V4 H9 M20 9 V4 H15 M4 15 V20 H9 M20 15 V20 H15";
const SHRINK_ICON = "M9 4 V9 H4 M15 4 V9 H20 M9 20 V15 H4 M15 20 V15 H20";

function getDownloadName(title) {
  return "vestrata-" + title.toLowerCase().replace(/[^a-z]+/g, "-") + ".mp4";
}

function VideoPlayer({ topic, label, isLarge, videoRef, nextTopic, onToggleSize, onNext, onTimeUpdate }) {
  return (
    <section className="video-panel card-pop card-pop--2">
      <div className="video-panel__header">
        <span className="video-panel__titles">
          <span className="video-panel__label">{label}</span>
          <span className="video-panel__title">{topic.title}</span>
        </span>
        <span className="video-panel__tools">
          <span className="video-panel__length">
            <span className="video-panel__live"></span>
            {topic.length} video
          </span>
          <button type="button" className="size-button" onClick={onToggleSize} aria-pressed={isLarge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={isLarge ? SHRINK_ICON : EXPAND_ICON} />
            </svg>
            {isLarge ? "Smaller video" : "Large video"}
          </button>
        </span>
      </div>

      <video
        key={topic.video}
        ref={videoRef}
        className="video-panel__video"
        src={topic.video}
        controls
        autoPlay
        muted
        playsInline
        preload="auto"
        onTimeUpdate={onTimeUpdate}
        aria-label={`Demo video: ${topic.title}`}
      />

      <p className="video-panel__intro">{topic.intro}</p>

      <div className="video-panel__actions">
        <Link className="btn btn--primary btn--medium btn--icon" to={topic.page}>
          Try it yourself <span aria-hidden="true">→</span>
        </Link>
        <a className="btn btn--outline btn--medium btn--icon" href={topic.video} download={getDownloadName(topic.title)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4 V15 M7 10 L12 15 L17 10 M5 20 H19" />
          </svg>
          Download video
        </a>
        {nextTopic && (
          <button type="button" className="btn btn--outline btn--medium" onClick={onNext}>
            Next: {nextTopic.title}
          </button>
        )}
      </div>
    </section>
  );
}

export default VideoPlayer;
