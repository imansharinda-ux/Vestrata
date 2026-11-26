import { useRef, useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import TopicList from "../components/guide/TopicList.jsx";
import VideoPlayer from "../components/guide/VideoPlayer.jsx";
import StepList from "../components/guide/StepList.jsx";
import { guideVideos } from "../data/guideVideos.js";

const PART_COUNT = guideVideos.length - 1;

function GuidePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [seenIds, setSeenIds] = useState([guideVideos[0].id]);
  const [isLarge, setIsLarge] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const topic = guideVideos[activeIndex];
  const nextTopic = guideVideos[activeIndex + 1];
  const label = topic.isTour ? "FULL TOUR · DEMO" : `PART ${activeIndex} OF ${PART_COUNT} · DEMO`;

  const selectTopic = (index) => {
    const selected = guideVideos[index];
    setActiveIndex(index);
    setCurrentTime(0);
    setSeenIds((current) => (current.includes(selected.id) ? current : [...current, selected.id]));
  };

  const jumpTo = (seconds) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = seconds;
    setCurrentTime(seconds);
    video.play().catch(() => {});
  };

  return (
    <div className="app-page">
      <AppNavbar action={null} />

      <div className={isLarge ? "guide guide--large" : "guide"}>
        {!isLarge && <TopicList activeIndex={activeIndex} seenIds={seenIds} onSelect={selectTopic} />}

        <main className="guide__main">
          <VideoPlayer
            topic={topic}
            label={label}
            isLarge={isLarge}
            videoRef={videoRef}
            nextTopic={nextTopic}
            onToggleSize={() => setIsLarge(!isLarge)}
            onNext={() => selectTopic(activeIndex + 1)}
            onTimeUpdate={(event) => setCurrentTime(Math.floor(event.currentTarget.currentTime))}
          />
          <StepList topic={topic} currentTime={currentTime} isLarge={isLarge} onJump={jumpTo} />
        </main>
      </div>
    </div>
  );
}

export default GuidePage;
