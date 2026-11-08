import ScoreRing from "./ScoreRing.jsx";
import { money } from "../../utils/format.js";

function CompareCard({ property, winners, delay, onExplain }) {
  const isBest = property === winners.score;

  const rows = [
    { label: "Price", value: money(property.price), winner: winners.price },
    { label: "Cash flow / mo", value: "+" + money(property.cashFlow), winner: winners.cashFlow },
    { label: "Cap rate", value: property.capRate.toFixed(1) + "%", winner: winners.capRate },
    { label: "Cash-on-cash", value: property.cashOnCash.toFixed(1) + "%", winner: winners.cashOnCash },
    { label: "DSCR", value: property.dscr.toFixed(2), winner: winners.dscr },
    { label: "Risk", value: property.risk, winner: winners.risk },
    { label: "Profit after 5 yrs", value: "+" + money(property.profit5Years), winner: winners.profit },
  ];

  return (
    <div
      className={isBest ? "compare-card compare-card--best card-pop" : "compare-card card-pop"}
      style={{ animationDelay: delay }}
    >
      <div className="compare-card__header">
        <ScoreRing score={property.score} image={property.image} highlight={isBest} />
        <div className="compare-card__info">
          {isBest && <span className="status-tag status-tag--required">Best pick</span>}
          <span className="compare-card__name">{property.name}</span>
          <span className="compare-card__meta">
            {property.city} · {property.spec}
          </span>
        </div>
      </div>

      <div className="compare-card__rows">
        {rows.map((row) => (
          <div key={row.label} className="compare-card__row">
            <span className="compare-card__label">{row.label}</span>
            <strong className={row.winner === property ? "text-good" : ""}>{row.value}</strong>
          </div>
        ))}
      </div>

      <button type="button" className="explain-button" onClick={onExplain}>
        Comparison Results
      </button>
    </div>
  );
}

export default CompareCard;
