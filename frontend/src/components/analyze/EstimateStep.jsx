import { money, formatNumber } from "../../utils/format.js";

function EstimateStep({ details, estimate, address, onEdit, onContinue }) {
  const isRental = details.purpose === "rent";
  const growthRate = estimate.state.growthRate;
  const valueIn5Years = estimate.value * Math.pow(1 + growthRate, 5);

  return (
    <section className="stage">
      <div className="stage__header">
        <div className="stage__heading">
          <h1 className="stage__title">Our estimate</h1>
          <p className="stage__subtitle">
            {address} · {details.beds} bd · {details.baths} ba · {formatNumber(estimate.sqft)} sq ft ·{" "}
            <button type="button" className="inline-link" onClick={onEdit}>
              Edit details
            </button>
          </p>
        </div>
        <span className="confidence-badge card-pop">
          <span className="confidence-badge__dot"></span>
          {estimate.confidence} confidence
        </span>
      </div>

      <div className="grid-2">
        <div className="kpi-card kpi-card--dark card-pop card-pop--1">
          <span className="kpi-card__label">We predict the value at</span>
          <span className="kpi-card__value">{money(estimate.value)}</span>
          <span className="kpi-card__note">
            Likely between {money(estimate.valueLow)} and {money(estimate.valueHigh)}
          </span>
        </div>

        {isRental ? (
          <div className="kpi-card kpi-card--green card-pop card-pop--2">
            <span className="kpi-card__label">We predict the rent at</span>
            <span className="kpi-card__value">
              {money(estimate.rent)}
              <span className="kpi-card__unit"> / month</span>
            </span>
            <span className="kpi-card__note">
              Likely between {money(estimate.rent * 0.93)} and {money(estimate.rent * 1.07)}
            </span>
          </div>
        ) : (
          <div className="kpi-card kpi-card--green card-pop card-pop--2">
            <span className="kpi-card__label">We expect it to be worth, in 5 years</span>
            <span className="kpi-card__value">{money(valueIn5Years)}</span>
            <span className="kpi-card__note">
              About {(growthRate * 100).toFixed(1)}% a year in this area. Rent isn't needed since you'll live there.
            </span>
          </div>
        )}
      </div>

      <div className="grid-estimate-details">
        <div className="panel card-pop card-pop--3">
          <span className="panel__title">What moved our estimate</span>
          {estimate.factors.map((factor) => (
            <div key={factor.label} className="factor-row">
              <span className="factor-row__label">{factor.label}</span>
              <div className="progress">
                <div className="progress__fill" style={{ width: factor.share + "%" }}></div>
              </div>
              <span className="factor-row__value">{factor.share}%</span>
            </div>
          ))}
        </div>

        <div className="panel panel--tight card-pop card-pop--4">
          <span className="panel__title">Similar homes nearby</span>
          {estimate.comparables.map((home) => (
            <div key={home.distance} className="comparable">
              <span className="comparable__info">
                <img className="comparable__image" src={home.image} alt="" />
                <span className="comparable__text">
                  <span className="comparable__spec">
                    {home.beds} bd · {home.baths} ba · {formatNumber(home.sqft)} sq ft
                  </span>
                  <span className="comparable__meta">
                    {home.distance} · {home.status}
                  </span>
                </span>
              </span>
              <span className="comparable__price">{money(home.price)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="stage__actions">
        <button type="button" className="btn btn--primary btn--raise" onClick={onContinue}>
          Continue to price &amp; loan →
        </button>
      </div>
    </section>
  );
}

export default EstimateStep;
