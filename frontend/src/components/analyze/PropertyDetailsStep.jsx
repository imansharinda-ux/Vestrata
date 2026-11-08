import StateSelect from "./StateSelect.jsx";
import Counter from "./Counter.jsx";
import OptionPills from "./OptionPills.jsx";
import ToggleGroup from "./ToggleGroup.jsx";
import { purposes, propertyTypes, conditions } from "../../data/analyzeOptions.js";
import { formatNumber } from "../../utils/format.js";

const typeOptions = Object.entries(propertyTypes).map(([value, type]) => ({ value, label: type.label }));
const conditionOptions = Object.entries(conditions).map(([value, condition]) => ({ value, label: condition.label }));

function PropertyDetailsStep({ details, sqft, cityName, isLoading, onChange, onSubmit }) {
  const isRental = details.purpose === "rent";

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form className="stage stage--card" onSubmit={handleSubmit}>
      <div className="stage__heading">
        <h1 className="stage__title">Tell us about the property</h1>
        <p className="stage__subtitle stage__subtitle--large">
          {isRental
            ? "We use these details to estimate its value and rent."
            : "We use these details to estimate its value and what it costs to own."}
        </p>
      </div>

      <div className="purpose-bar card-pop card-pop--1">
        <span className="form-label">I'm buying this to</span>
        <ToggleGroup
          label="How will you use the property?"
          options={purposes}
          value={details.purpose}
          onChange={(value) => onChange("purpose", value)}
        />
      </div>

      <div className="form-grid form-grid--address card-pop card-pop--1">
        <label className="form-field">
          <span className="form-label">Street address</span>
          <input
            className="input"
            type="text"
            value={details.street}
            onChange={(event) => onChange("street", event.target.value)}
            placeholder="e.g. 1420 Maple Ave"
            autoComplete="street-address"
          />
        </label>
        <label className="form-field">
          <span className="form-label">City</span>
          <input
            className="input"
            type="text"
            value={details.city}
            onChange={(event) => onChange("city", event.target.value)}
            placeholder="City"
          />
        </label>
      </div>

      <div className="form-grid form-grid--location card-pop card-pop--1">
        <StateSelect value={details.stateCode} onChange={(code) => onChange("stateCode", code)} />
        <label className="form-field">
          <span className="form-label">ZIP</span>
          <input
            className="input"
            type="text"
            inputMode="numeric"
            value={details.zip}
            onChange={(event) => onChange("zip", event.target.value)}
          />
        </label>
        <div className="form-field">
          <span className="form-label">Property type</span>
          <OptionPills options={typeOptions} value={details.type} onChange={(value) => onChange("type", value)} />
        </div>
      </div>

      <div className="form-grid form-grid--rooms card-pop card-pop--2">
        <Counter
          label="Bedrooms"
          value={details.beds}
          onDecrease={() => onChange("beds", Math.max(1, details.beds - 1))}
          onIncrease={() => onChange("beds", Math.min(8, details.beds + 1))}
        />
        <Counter
          label="Bathrooms"
          value={details.baths}
          onDecrease={() => onChange("baths", Math.max(1, details.baths - 0.5))}
          onIncrease={() => onChange("baths", Math.min(6, details.baths + 0.5))}
        />
        <label className="form-field">
          <span className="form-label">Year built</span>
          <input
            className="input"
            type="number"
            min="1850"
            max="2026"
            value={details.year}
            onChange={(event) => onChange("year", event.target.value)}
          />
        </label>
        <label className="form-field">
          <span className="form-label">Lot size (acres)</span>
          <input
            className="input"
            type="number"
            min="0"
            step="0.01"
            value={details.lot}
            onChange={(event) => onChange("lot", event.target.value)}
          />
        </label>
      </div>

      <div className="form-grid form-grid--size card-pop card-pop--3">
        <div className="form-field">
          <div className="form-field__row">
            <label className="form-label" htmlFor="sqft">
              House size
            </label>
            <span className="form-field__value">{formatNumber(sqft)} sq ft</span>
          </div>
          <input
            id="sqft"
            className="range"
            type="range"
            min="400"
            max="4000"
            step="10"
            value={sqft}
            onChange={(event) => onChange("sqft", event.target.value)}
          />
        </div>
        <div className="form-field">
          <span className="form-label">Condition</span>
          <OptionPills
            options={conditionOptions}
            value={details.condition}
            onChange={(value) => onChange("condition", value)}
            size="small"
          />
        </div>
      </div>

      <div className="stage__footer card-pop card-pop--4">
        <span className="stage__hint">Takes a few seconds. You can change anything later.</span>
        <button type="submit" className="btn btn--primary btn--raise">
          Get our estimate →
        </button>
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-overlay__dots">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
          <p className="loading-overlay__title">Working out our estimate…</p>
          <p className="loading-overlay__text">Checking similar homes near {cityName}</p>
        </div>
      )}
    </form>
  );
}

export default PropertyDetailsStep;
