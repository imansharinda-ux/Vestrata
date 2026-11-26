import { Link } from "react-router-dom";
import { horizons } from "../../data/analyzeOptions.js";
import { money, signedMoney, percent } from "../../utils/format.js";

function rate(value, goodAt, okAt, labels) {
  if (value >= goodAt) return { note: labels[0], tone: "good" };
  if (value >= okAt) return { note: labels[1], tone: "warn" };
  return { note: labels[2], tone: "bad" };
}

function getRiskTone(risk) {
  if (risk < 35) return "good";
  if (risk < 60) return "warn";
  return "bad";
}

function getStatCards({ result, estimate }) {
  const riskCard = {
    label: "Risk score",
    value: String(result.risk),
    note: result.riskLabel + " risk",
    tone: getRiskTone(result.risk),
  };

  if (result.isRental) {
    return [
      { label: "Cap rate", value: percent(result.capRate), ...rate(result.capRate, 0.06, 0.045, ["Good", "Average", "Low"]) },
      { label: "Cash-on-cash", value: percent(result.cashOnCash), ...rate(result.cashOnCash, 0.08, 0.04, ["Strong", "OK", "Weak"]) },
      { label: "DSCR", value: result.dscr.toFixed(2), ...rate(result.dscr, 1.25, 1, ["Lender-friendly", "Tight", "Below 1"]) },
      riskCard,
    ];
  }

  const priceDifference = (result.price - estimate.value) / Math.max(1, estimate.value);
  const growth = (estimate.state.growthRate * 100).toFixed(1);

  return [
    { label: "Cash needed upfront", value: money(result.invested), note: "Down payment + closing", tone: "muted" },
    { label: "Equity after 5 years", value: money(result.profitIn5Years.equity), note: `If prices grow ${growth}%/yr`, tone: "good" },
    {
      label: "Price vs our estimate",
      value: (priceDifference >= 0 ? "+" : "") + (priceDifference * 100).toFixed(0) + "%",
      note: priceDifference > 0.03 ? "Above our range" : "Fair price",
      tone: priceDifference > 0.03 ? "warn" : "good",
    },
    riskCard,
  ];
}

function getCostBars(result) {
  const extrasLabel = result.hoa ? ", HOA" : "";
  const items = [
    { label: "Mortgage", amount: result.payment, color: "ink" },
    { label: "Property tax", amount: result.tax, color: "slate" },
    { label: "Insurance", amount: result.insuranceCost, color: "stone" },
  ];

  if (result.isRental) {
    items.push({ label: "Vacancy, repairs, management" + extrasLabel, amount: result.otherCosts + result.hoa, color: "mist" });
    items.push({
      label: result.cashFlow >= 0 ? "Cash flow to you" : "Shortfall you pay",
      amount: Math.abs(result.cashFlow),
      color: result.cashFlow >= 0 ? "green" : "red",
    });
  } else {
    items.push({ label: "Repairs and upkeep" + extrasLabel, amount: result.otherCosts + result.hoa, color: "leaf" });
  }

  const total = result.isRental ? result.rent : result.ownCost;
  return items.map((item) => {
    const share = total > 0 ? Math.round((item.amount / total) * 100) : 0;
    return { ...item, share, width: Math.min(100, share) };
  });
}

function ResultsStep({ estimate, result, deal, address, horizon, warnings, onHorizonChange, onOpenAi, onChangeInsurance }) {
  const statCards = getStatCards({ result, estimate });
  const costBars = getCostBars(result);
  const profit = result.profit;
  const rentSpread = result.rent * 0.07;

  let headlineClass = "kpi-card kpi-card--dark";
  if (result.isRental) headlineClass = result.cashFlow >= 0 ? "kpi-card kpi-card--green" : "kpi-card kpi-card--red";

  const profitRows = [
    {
      label: result.isRental
        ? `Cash flow over ${horizon} ${horizon === 1 ? "year" : "years"}`
        : "Monthly costs (they replace rent)",
      value: result.isRental ? signedMoney(profit.cashFlowTotal) : "not counted",
    },
    { label: "Value growth", value: signedMoney(profit.appreciation) },
    { label: "Loan paid down", value: signedMoney(profit.paydown) },
    { label: "Selling costs (7%)", value: signedMoney(-profit.sellingCost) },
    { label: "Closing and rehab", value: signedMoney(-(result.closingCost + estimate.condition.rehabCost)) },
  ];

  return (
    <section className="stage stage--compact">
      <div className="stage__header">
        <div className="stage__heading">
          <h1 className="stage__title">Your results</h1>
          <p className="stage__subtitle">
            {address} · {money(result.price)} · {Math.round(deal.downPayment * 100)}% down · {result.loan.label}
          </p>
        </div>
        <div className="stage__buttons">
          <button type="button" className="btn btn--dark btn--medium btn--icon" onClick={onOpenAi}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="#9CCBA8" aria-hidden="true">
              <path d="M8 0 L9.6 6.4 L16 8 L9.6 9.6 L8 16 L6.4 9.6 L0 8 L6.4 6.4 Z" />
            </svg>
            Get AI explanation
          </button>
          <Link className="btn btn--outline btn--medium" to="/compare">
            Save &amp; add to compare
          </Link>
        </div>
      </div>

      <div className="results-kpis">
        <div className={`${headlineClass} kpi-card--small card-pop card-pop--1`}>
          <span className="kpi-card__label">{result.isRental ? "Monthly cash flow" : "Monthly cost to own"}</span>
          <span className="kpi-card__value">{result.isRental ? signedMoney(result.cashFlow) : money(result.ownCost)}</span>
          <span className="kpi-card__note">
            {result.isRental
              ? `Likely ${signedMoney(result.cashFlow - rentSpread)} to ${signedMoney(result.cashFlow + rentSpread)}`
              : "Mortgage, tax, insurance and upkeep"}
          </span>
        </div>
        {statCards.map((card) => (
          <div key={card.label} className="stat-card card-pop card-pop--2">
            <span className="stat-card__label">{card.label}</span>
            <span className="stat-card__value">{card.value}</span>
            <span className={`stat-card__note text-${card.tone}`}>{card.note}</span>
          </div>
        ))}
      </div>

      <div className="grid-2 grid-2--tight">
        <div className="panel panel--results card-pop card-pop--3">
          <span className="panel__title panel__title--small">
            {result.isRental
              ? `Where the rent goes · ${money(result.rent)}/mo`
              : `Where your monthly cost goes · ${money(result.ownCost)}/mo`}
          </span>
          {costBars.map((bar) => (
            <div key={bar.label} className="cost-bar">
              <div className="cost-bar__head">
                <span>{bar.label}</span>
                <span className="cost-bar__value">
                  {money(bar.amount)} · {bar.share}%
                </span>
              </div>
              <div className="progress progress--thin">
                <div className={`progress__fill progress__fill--${bar.color}`} style={{ width: bar.width + "%" }}></div>
              </div>
            </div>
          ))}
        </div>

        <div className="panel panel--results card-pop card-pop--4">
          <div className="panel__header">
            <span className="panel__title panel__title--small">Profit if you sell after</span>
            <div className="mini-tabs">
              {horizons.map((years) => (
                <button
                  key={years}
                  type="button"
                  className={years === horizon ? "mini-tabs__tab mini-tabs__tab--active" : "mini-tabs__tab"}
                  onClick={() => onHorizonChange(years)}
                >
                  {years} {years === 1 ? "yr" : "yrs"}
                </button>
              ))}
            </div>
          </div>
          <span className={profit.total >= 0 ? "profit-total" : "profit-total profit-total--loss"}>
            {signedMoney(profit.total)}
          </span>
          {profitRows.map((row) => (
            <div key={row.label} className="profit-row">
              <span>{row.label}</span>
              <span>{row.value}</span>
            </div>
          ))}
          <span className="profit-return">
            Return on the {money(result.invested)} you put in:{" "}
            <strong>{((profit.total / result.invested) * 100).toFixed(0)}%</strong>
          </span>
        </div>
      </div>

      <div className="warning-row card-pop card-pop--4">
        <span className="warning-row__title">Things to check:</span>
        {warnings.map((warning) => (
          <span key={warning.short} className={`warning-chip warning-chip--${warning.tone}`}>
            <span className="warning-chip__dot"></span>
            {warning.short}
          </span>
        ))}
      </div>

      <div className="hazard-strip card-pop card-pop--4">
        <span className="hazard-strip__title">Natural hazards here</span>
        {result.hazardInfo.hazards.map((hazard) => (
          <span key={hazard.name} className={`hazard-chip level-${hazard.level}`}>
            <span className="hazard-chip__dot"></span>
            {hazard.name} · {hazard.levelLabel}
          </span>
        ))}
        <button type="button" className="hazard-strip__button" onClick={onChangeInsurance}>
          Change insurance <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

export default ResultsStep;
