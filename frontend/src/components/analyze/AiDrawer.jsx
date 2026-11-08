import { useEffect } from "react";
import { Link } from "react-router-dom";

function AiDrawer({ text, warnings, questions, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      <button type="button" className="drawer-scrim" onClick={onClose} aria-label="Close AI explanation"></button>
      <aside className="drawer" role="dialog" aria-label="AI explanation">
        <div className="drawer__header">
          <span className="drawer__title">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="#2E6B4F" aria-hidden="true">
              <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" />
            </svg>
            AI explanation
          </span>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <span className="drawer__hint">Based only on the numbers on this page.</span>
        <p className="drawer__text">{text}</p>

        <div className="drawer__box">
          <span className="drawer__subtitle">Things to check</span>
          {warnings.map((warning) => (
            <span key={warning.short} className={`drawer__warning warning-chip--${warning.tone}`}>
              <span className="warning-chip__dot"></span>
              {warning.text}
            </span>
          ))}
        </div>

        <div className="drawer__questions">
          <span className="drawer__subtitle">Ask the seller</span>
          {questions.map((question) => (
            <span key={question} className="drawer__question">
              — {question}
            </span>
          ))}
        </div>

        <Link className="btn btn--primary drawer__action" to="/compare">
          Save &amp; add to compare
        </Link>
      </aside>
    </>
  );
}

export default AiDrawer;
