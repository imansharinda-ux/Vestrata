function formatTime(seconds) {
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
}

function getActiveStep(steps, currentTime) {
  let active = 0;
  steps.forEach((step, index) => {
    if (step.time <= currentTime) active = index;
  });
  return active;
}

function StepList({ topic, currentTime, isLarge, onJump }) {
  const activeStep = getActiveStep(topic.steps, currentTime);

  return (
    <section className="step-panel card-pop card-pop--2">
      <span className="step-panel__title">Steps in this video</span>
      <span className="step-panel__hint">Click a step to jump to it.</span>

      <div className={isLarge ? "step-panel__list step-panel__list--wide" : "step-panel__list"}>
        {topic.steps.map((step, index) => (
          <button
            key={step.time}
            type="button"
            className={index === activeStep ? "video-step video-step--active" : "video-step"}
            onClick={() => onJump(step.time)}
          >
            <span className="video-step__time">{formatTime(step.time)}</span>
            <span>{step.text}</span>
          </button>
        ))}
      </div>

      <div className="step-panel__tip">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#2E6B4F" aria-hidden="true">
          <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" />
        </svg>
        <span>
          <strong>Tip:</strong> {topic.tip}
        </span>
      </div>
    </section>
  );
}

export default StepList;
