import LineMask from "../LineMask.jsx";
import { guideVideos } from "../../data/guideVideos.js";

function getMark(topic, index, isActive, isSeen) {
  if (topic.isTour) return "▶";
  if (isSeen && !isActive) return "✓";
  return String(index);
}

function TopicList({ activeIndex, seenIds, onSelect }) {
  const seenCount = seenIds.length;
  const progress = Math.round((seenCount / guideVideos.length) * 100);

  return (
    <aside className="guide-topics">
      <div className="guide-topics__heading">
        <h1 className="guide-topics__title">
          <LineMask>How to use Vestrata</LineMask>
        </h1>
        <p className="guide-topics__text card-pop card-pop--1">
          Short videos for each part of the platform. Pick a topic to watch.
        </p>
      </div>

      <div className="guide-progress card-pop card-pop--1">
        <div className="guide-progress__labels">
          <span>
            {seenCount} of {guideVideos.length} videos opened
          </span>
          <span>{progress}%</span>
        </div>
        <div className="guide-progress__track">
          <div className="guide-progress__fill" style={{ width: progress + "%" }}></div>
        </div>
      </div>

      <div className="guide-topics__list" role="tablist" aria-label="Guide topics">
        {guideVideos.map((topic, index) => {
          const isActive = index === activeIndex;
          const isSeen = seenIds.includes(topic.id);

          let className = "guide-topic";
          if (topic.isTour) className += " guide-topic--tour";
          if (isActive) className += " guide-topic--active";
          else if (isSeen) className += " guide-topic--seen";

          return (
            <button
              key={topic.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={className}
              onClick={() => onSelect(index)}
              style={{ animationDelay: 0.1 + index * 0.06 + "s" }}
            >
              <span className="guide-topic__number">{getMark(topic, index, isActive, isSeen)}</span>
              <span className="guide-topic__text">
                <span className="guide-topic__title">{topic.title}</span>
                <span className="guide-topic__summary">{topic.summary}</span>
              </span>
              <span className="guide-topic__length">{topic.length}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

export default TopicList;
