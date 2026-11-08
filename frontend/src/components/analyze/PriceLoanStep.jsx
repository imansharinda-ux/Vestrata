import PriceBar from "./PriceBar.jsx";
import OptionPills from "./OptionPills.jsx";
import { loans, downPayments } from "../../data/analyzeOptions.js";
import { money, roundToThousand } from "../../utils/format.js";

function getAskingNote(asking, estimateValue) {
  const difference = (asking - estimateValue) / Math.max(1, estimateValue);
  if (Math.abs(difference) < 0.015) return "Asking is in line with our estimate.";
  if (difference > 0) return "Asking is " + (difference * 100).toFixed(0) + "% above our estimate.";
  return "Asking is " + (-difference * 100).toFixed(0) + "% below our estimate.";
}

function PriceLoanStep({ estimate, deal, result, onDealChange, onContinue }) {
  const asking = Number(deal.asking) || 0;
  const offer = result.price;
  const fairLow = roundToThousand(Math.min(estimate.value, estimate.comparablesMedian) * 0.97);
  const fairHigh = roundToThousand(estimate.value * 1.01);

  const setOffer = (value) => onDealChange({ offer: String(value), priceTouched: true });

  const downPaymentOptions = downPayments.map((share) => ({
    value: share,
    label: Math.round(share * 100) + "% · " + money(offer * share),
  }));

  const rentOptions = [
    { value: "estimate", label: "Our estimate · " + money(estimate.rent) },
    { value: "manual", label: "My own" },
  ];

  return (
    <section className="stage stage--compact">
      <div className="stage__heading">
        <h1 className="stage__title">Set your price and loan</h1>
        <p className="stage__subtitle">Compare the seller's price with our estimate, then decide what you'd pay.</p>
      </div>

      <div className="panel price-strip card-pop card-pop--1">
        <label className="price-strip__item">
          <span className="price-strip__label">Seller's asking price</span>
          <input
            className="input input--price"
            type="number"
            step="1000"
            value={deal.asking}
            onChange={(event) => onDealChange({ asking: event.target.value, priceTouched: true })}
          />
        </label>
        <div className="price-strip__item">
          <span className="price-strip__label">Our estimate</span>
          <span className="price-strip__value">{money(estimate.value)}</span>
        </div>
        <div className="price-strip__item">
          <span className="price-strip__label">Similar homes</span>
          <span className="price-strip__value">{money(estimate.comparablesMedian)}</span>
        </div>
        <div className="price-strip__item">
          <span className="price-strip__note">
            <strong>{getAskingNote(asking, estimate.value)}</strong> Fair offer:{" "}
            <strong>
              {money(fairLow)} – {money(fairHigh)}
            </strong>
          </span>
          <PriceBar low={estimate.valueLow} high={estimate.valueHigh} asking={asking} offer={offer} />
        </div>
      </div>

      <div className="grid-2 grid-2--tight">
        <div className="panel panel--roomy card-pop card-pop--2">
          <div className="form-field">
            <div className="form-field__row">
              <label className="form-label" htmlFor="offer">
                Your purchase price
              </label>
              <input
                className="input input--offer"
                type="number"
                step="1000"
                value={deal.offer}
                onChange={(event) => setOffer(event.target.value)}
                aria-label="Your purchase price"
              />
            </div>
            <input
              id="offer"
              className="range"
              type="range"
              min={roundToThousand(asking * 0.7)}
              max={roundToThousand(asking * 1.1)}
              step="1000"
              value={offer}
              onChange={(event) => setOffer(event.target.value)}
            />
            <div className="chip-row">
              <button type="button" className="chip" onClick={() => setOffer(estimate.value)}>
                Use our estimate
              </button>
              <button type="button" className="chip" onClick={() => setOffer(asking)}>
                Use asking
              </button>
              <button type="button" className="chip" onClick={() => setOffer(roundToThousand(asking * 0.95))}>
                5% below asking
              </button>
            </div>
          </div>

          <label className="form-field">
            <span className="form-label">Loan type</span>
            <span className="select-wrap">
              <select
                className="input select-wrap__select"
                value={deal.loan}
                onChange={(event) => onDealChange({ loan: event.target.value })}
              >
                {Object.entries(loans).map(([value, loan]) => (
                  <option key={value} value={value}>
                    {loan.option}
                  </option>
                ))}
              </select>
            </span>
          </label>

          <div className="form-field">
            <span className="form-label">Down payment</span>
            <OptionPills
              options={downPaymentOptions}
              value={deal.downPayment}
              onChange={(value) => onDealChange({ downPayment: value })}
            />
          </div>
        </div>

        <div className="panel panel--roomy card-pop card-pop--3">
          {result.isRental && (
            <div className="form-field">
              <span className="form-label">Monthly rent</span>
              <div className="rent-picker">
                <OptionPills
                  options={rentOptions}
                  value={deal.rentMode}
                  onChange={(value) => onDealChange({ rentMode: value })}
                />
                {result.isManualRent && (
                  <input
                    className="input input--small"
                    type="number"
                    min="0"
                    step="50"
                    value={deal.manualRent}
                    onChange={(event) => onDealChange({ manualRent: event.target.value })}
                    aria-label="Your monthly rent"
                  />
                )}
              </div>
            </div>
          )}

          <div className="cost-box">
            <span className="form-label">Monthly costs, filled in for you</span>
            <div className="cost-box__row">
              <span>Property tax</span>
              <strong>{money(result.tax)}</strong>
            </div>
            <div className="cost-box__row">
              <span>
                Insurance <span className="cost-box__hint">· you choose it in the next step</span>
              </span>
              <strong>{money(result.insuranceCost)}</strong>
            </div>
            <div className="cost-box__row">
              <span>{result.isRental ? "Vacancy, repairs, management" : "Repairs and upkeep (1% a year)"}</span>
              <strong>{money(result.otherCosts)}</strong>
            </div>
            <label className="cost-box__row">
              HOA fee
              <input
                className="input input--hoa"
                type="number"
                min="0"
                step="10"
                value={deal.hoa === "" ? String(estimate.type.hoa) : deal.hoa}
                onChange={(event) => onDealChange({ hoa: event.target.value })}
              />
            </label>
          </div>

          <button type="button" className="btn btn--primary btn--raise panel__bottom" onClick={onContinue}>
            Continue to insurance →
          </button>
        </div>
      </div>
    </section>
  );
}

export default PriceLoanStep;
