import { savedProperties, MAX_SELECTED, MIN_SELECTED } from "../../data/savedProperties.js";
import { money } from "../../utils/format.js";

function getBarHint(count) {
  if (count < MIN_SELECTED) return "Pick at least 2 to compare.";
  if (count >= MAX_SELECTED) return "That's the maximum. Ready when you are.";
  return `You can add up to ${MAX_SELECTED - count} more.`;
}

function PickView({ selectedIds, onToggle, onCompare }) {
  const count = selectedIds.length;
  const isFull = count >= MAX_SELECTED;
  const canCompare = count >= MIN_SELECTED;

  let barText = "Nothing selected yet";
  if (count > 0) barText = `${count} ${count === 1 ? "property" : "properties"} selected`;

  return (
    <section className="compare-stage">
      <div className="compare-stage__header">
        <div className="stage__heading">
          <h1 className="compare-stage__title">Compare properties</h1>
          <p className="stage__subtitle stage__subtitle--large">Pick 2 to 4 of your saved properties, then press Compare.</p>
        </div>
        <span className="count-badge">
          {count} of {MAX_SELECTED} selected
        </span>
      </div>

      <div className="pick-grid">
        {savedProperties.map((property, index) => {
          const isSelected = selectedIds.includes(property.id);
          return (
            <button
              key={property.id}
              type="button"
              className={isSelected ? "pick-card pick-card--selected" : "pick-card"}
              onClick={() => onToggle(property.id)}
              disabled={!isSelected && isFull}
              aria-pressed={isSelected}
              style={{ animationDelay: index * 0.06 + "s" }}
            >
              <span className="pick-card__photo">
                <img className="pick-card__image" src={property.image} alt={`Photo of ${property.name}`} />
                <span className="pick-card__score">Score {property.score}</span>
                <span className={isSelected ? "pick-card__tick pick-card__tick--on" : "pick-card__tick"}>
                  {isSelected && <span className="pick-card__check">✓</span>}
                </span>
              </span>
              <span className="pick-card__body">
                <span className="pick-card__info">
                  <span className="pick-card__name">{property.name}</span>
                  <span className="pick-card__meta">
                    {property.city} · {property.spec}
                  </span>
                </span>
                <span className="pick-card__numbers">
                  <span className="pick-card__price">{money(property.price)}</span>
                  <span className="pick-card__cash-flow">+{money(property.cashFlow)}/mo</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="compare-bar">
        <span className="compare-bar__text">
          <strong>{barText}</strong>
          <span className="compare-bar__hint">{getBarHint(count)}</span>
        </span>
        <button type="button" className="btn btn--light-green compare-bar__button" onClick={onCompare} disabled={!canCompare}>
          {canCompare ? `Compare ${count} properties →` : "Compare"}
        </button>
      </div>
    </section>
  );
}

export default PickView;
