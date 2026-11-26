import { Link } from "react-router-dom";
import { RULES_REVIEWED } from "../../data/stateRules.js";

const FRIENDLINESS_STEPS = [1, 2, 3, 4, 5];

function StateDetails({ summary }) {
  return (
    <aside className="state-details">
      <div className="state-card">
        <div className="state-card__header">
          <span className="state-card__title-group">
            <span className="state-card__eyebrow">{summary.code} · LANDLORD RULES</span>
            <span className="state-card__name">{summary.name}</span>
          </span>
          <span className="state-card__rating">
            <span className="state-card__rating-label">Landlord-friendly</span>
            <span className="state-card__dots">
              {FRIENDLINESS_STEPS.map((step) => (
                <span
                  key={step}
                  className={step <= summary.landlordFriendly ? "state-card__dot state-card__dot--on" : "state-card__dot"}
                ></span>
              ))}
            </span>
          </span>
        </div>
        <span className="state-card__badge" style={{ background: summary.rentControlBadge }}>
          {summary.rentControlLabel}
        </span>
        <p className="state-card__note">{summary.note}</p>
      </div>

      <div className="state-facts">
        {summary.facts.map((fact) => (
          <div key={fact.label} className="state-fact">
            <span className="state-fact__label">{fact.label}</span>
            <span className="state-fact__value">{fact.value}</span>
            <span className="state-fact__note">{fact.note}</span>
          </div>
        ))}
      </div>

      <div className="state-meaning">
        <span className="state-meaning__title">What this means for you</span>
        <span className="state-meaning__text">{summary.meaning}</span>
      </div>

      <div className="state-details__footer">
        <Link className="btn btn--primary btn--medium" to="/analyze">
          Analyze a home in {summary.name} →
        </Link>
        <span className="state-details__disclaimer">
          Last reviewed {RULES_REVIEWED}. Cities can add their own rules. Not legal advice.
        </span>
      </div>
    </aside>
  );
}

export default StateDetails;
