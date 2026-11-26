import { useEffect } from "react";
import ScoreRing from "./ScoreRing.jsx";
import { explainScore } from "../../utils/compare.js";

function ScoreDrawer({ property, comparedProperties, onClose }) {
  const explanation = explainScore(property, comparedProperties);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <button type="button" className="drawer-scrim drawer-scrim--dark" onClick={onClose} aria-label="Close"></button>
      <aside className="drawer drawer--wide" role="dialog" aria-label="Why this score">
        <div className="drawer__header">
          <span className="score-drawer__eyebrow">WHY THIS SCORE?</span>
          <button type="button" className="close-button close-button--small" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="score-drawer__intro">
          <ScoreRing score={property.score} image={property.image} size={96} highlight />
          <div className="score-drawer__info">
            <span className="score-drawer__name">{property.name}</span>
            <span className="score-drawer__meta">
              {property.city} · {property.spec}
            </span>
            <span className={`verdict verdict--${explanation.verdict.tone}`}>{explanation.verdict.text}</span>
          </div>
        </div>

        <p className="score-drawer__lead">{explanation.lead}</p>

        <div className="score-breakdown">
          <span className="score-breakdown__title">How the {property.score} points add up</span>
          {explanation.parts.map((part) => (
            <div key={part.label} className={`score-part score-part--${part.tone}`}>
              <div className="score-part__head">
                <span className="score-part__label">{part.label}</span>
                <span>
                  <strong className="score-part__points">{part.points}</strong>{" "}
                  <span className="score-part__max">/ {part.max}</span>
                </span>
              </div>
              <div className="score-part__track">
                <div className="score-part__bar" style={{ width: part.width + "%" }}></div>
              </div>
              <span className="score-part__description">{part.description}</span>
            </div>
          ))}
        </div>

        <div className="pros-cons">
          <div className="pros-cons__box pros-cons__box--good">
            <span className="pros-cons__title">What helps</span>
            {property.helps.map((item) => (
              <span key={item} className="pros-cons__item">
                <span className="pros-cons__icon">✓</span>
                {item}
              </span>
            ))}
          </div>
          <div className="pros-cons__box pros-cons__box--bad">
            <span className="pros-cons__title">What holds it back</span>
            {property.hurts.map((item) => (
              <span key={item} className="pros-cons__item">
                <span className="pros-cons__icon">!</span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="score-tip">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="#9CCBA8" aria-hidden="true">
            <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" />
          </svg>
          <span className="score-tip__body">
            <span className="score-tip__title">HOW TO RAISE IT</span>
            <span className="score-tip__text">{property.tip}</span>
          </span>
        </div>

        <div className="score-ranking">
          <span className="score-ranking__title">Against the others you picked</span>
          {explanation.ranking.map((item) => (
            <div key={item.id} className={item.isThis ? "score-ranking__row score-ranking__row--current" : "score-ranking__row"}>
              <span className="score-ranking__name">{item.name}</span>
              <span className="score-ranking__text">{item.text}</span>
            </div>
          ))}
        </div>

        <span className="score-drawer__note">
          The Vestrata Score is our estimate out of 100, built from cash flow (30), return (25), risk (25) and growth
          (20). It is analysis, not financial advice.
        </span>
      </aside>
    </>
  );
}

export default ScoreDrawer;
