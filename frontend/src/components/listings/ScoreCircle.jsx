const RADIUS = 31;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreCircle({ score }) {
  const filled = (score / 100) * CIRCUMFERENCE;

  return (
    <div className="score-circle">
      <svg width="72" height="72" viewBox="0 0 72 72" role="img" aria-label={`Score ${score} out of 100`}>
        <circle cx="36" cy="36" r={RADIUS} fill="none" stroke="#E5E8E0" strokeWidth="7" />
        <circle
          cx="36"
          cy="36"
          r={RADIUS}
          fill="none"
          stroke="#2E6B4F"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
          transform="rotate(-90 36 36)"
        />
      </svg>
      <span className="score-circle__value">{score}</span>
    </div>
  );
}

export default ScoreCircle;
