import { Link } from "react-router-dom";
import CompareCard from "./CompareCard.jsx";
import CompareChart from "./CompareChart.jsx";
import { getWinners, getSummary } from "../../utils/compare.js";
import { money } from "../../utils/format.js";

function CompareDashboard({ properties, onChangeSelection, onRemove, onExplain }) {
  const winners = getWinners(properties);
  const best = winners.score;
  const summary = getSummary(properties, winners);
  const columns = Math.max(2, properties.length);

  return (
    <section className="compare-stage compare-stage--dashboard">
      <div className="compare-toolbar">
        <div className="compare-toolbar__left">
          <button type="button" className="toolbar-button" onClick={onChangeSelection}>
            ← Change selection
          </button>
          {properties.map((property) => (
            <span key={property.id} className="selected-chip">
              {property.name}
              <button
                type="button"
                className="selected-chip__remove"
                onClick={() => onRemove(property.id)}
                aria-label={`Remove ${property.name}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <Link className="btn btn--outline btn--compact" to="/analyze">
          + Analyze another
        </Link>
      </div>

      <div className="best-banner card-pop">
        <img className="best-banner__image" src={best.image} alt="" />
        <span className="best-banner__title">
          <span className="best-banner__label">BEST PICK · SCORE {best.score}%</span>
          <span className="best-banner__name">
            {best.name}, {best.city}
          </span>
        </span>
        <span className="best-banner__summary">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#9CCBA8" aria-hidden="true">
            <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" />
          </svg>
          {summary}
        </span>
      </div>

      <div className="compare-cards" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {properties.map((property, index) => (
          <CompareCard
            key={property.id}
            property={property}
            winners={winners}
            delay={0.08 + index * 0.08 + "s"}
            onExplain={() => onExplain(property.id)}
          />
        ))}
      </div>

      <div className="compare-charts">
        <CompareChart
          title="Monthly cash flow"
          properties={properties}
          getValue={(property) => property.cashFlow}
          formatValue={(value) => "+" + money(value)}
          winner={winners.cashFlow}
        />
        <CompareChart
          title="Profit after 5 years"
          properties={properties}
          getValue={(property) => property.profit5Years}
          formatValue={(value) => "+" + money(value)}
          winner={winners.profit}
        />
        <CompareChart
          title="Vestrata Score"
          properties={properties}
          getValue={(property) => property.score}
          formatValue={(value) => value + "%"}
          winner={winners.score}
        />
      </div>
    </section>
  );
}

export default CompareDashboard;
