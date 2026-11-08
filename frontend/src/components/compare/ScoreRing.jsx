const RADIUS = 84;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function ScoreRing({ score, image, size = 104, highlight = false }) {
  const filled = (score / 100) * CIRCUMFERENCE;

  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <img className="score-ring__image" src={image} alt="" />
      <div className="score-ring__shade"></div>
      <svg
        className="score-ring__svg"
        width={size}
        height={size}
        viewBox="0 0 184 184"
        role="img"
        aria-label={`Vestrata score ${score} out of 100`}
      >
        <circle cx="92" cy="92" r={RADIUS} fill="none" stroke="#E8EBE4" strokeWidth="14" />
        <circle
          className="score-ring__progress"
          cx="92"
          cy="92"
          r={RADIUS}
          fill="none"
          stroke={highlight ? "#5FA777" : "#2C3A31"}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
          transform="rotate(-90 92 92)"
        />
      </svg>
      <span className="score-ring__value">{score}%</span>
    </div>
  );
}

export default ScoreRing;
