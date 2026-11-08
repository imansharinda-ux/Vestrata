import ToggleGroup from "./ToggleGroup.jsx";
import HazardIcon from "./HazardIcon.jsx";
import { coverageLevels, deductibles } from "../../data/analyzeOptions.js";
import { isPolicyIncluded } from "../../utils/analysis.js";
import { money, formatNumber } from "../../utils/format.js";

const coverageOptions = Object.entries(coverageLevels).map(([value, level]) => ({ value, label: level.label }));
const deductibleOptions = deductibles.map((option) => ({
  value: option.amount,
  label: "$" + formatNumber(option.amount),
}));

function getStatusClass(policy) {
  if (policy.required) return "status-tag status-tag--danger";
  if (policy.status === "Recommended") return "status-tag status-tag--caution";
  return "status-tag";
}

function getDeductibleText(amount) {
  const start = "You pay the first $" + formatNumber(amount) + " of each claim";
  if (amount === 5000) return start + ", so the monthly price is lower.";
  if (amount === 1000) return start + ", so the monthly price is higher.";
  return start + ".";
}

function InsuranceStep({ result, insurance, onInsuranceChange, onContinue }) {
  const { hazardInfo, policies } = result;
  const [basePolicy, ...extraPolicies] = policies;
  const coverage = coverageLevels[insurance.coverage];

  const togglePolicy = (policy) => {
    const isOn = isPolicyIncluded(policy, insurance.extras);
    onInsuranceChange({ extras: { ...insurance.extras, [policy.key]: !isOn } });
  };

  return (
    <section className="stage stage--compact">
      <div className="stage__heading">
        <h1 className="stage__title">Insurance &amp; risk</h1>
        <p className="stage__subtitle">
          See the natural disaster risk here, then choose the insurance you want counted.
        </p>
      </div>

      <div className="insurance-grid">
        <div className="panel panel--compact card-pop card-pop--1">
          <div className="panel__header">
            <span className="panel__title">Natural disaster risk</span>
            <span className={`level-badge level-${hazardInfo.highest}`}>{hazardInfo.overall}</span>
          </div>
          {hazardInfo.hazards.map((hazard, index) => (
            <div
              key={hazard.name}
              className={`hazard level-${hazard.level}`}
              style={{ animationDelay: 0.1 + index * 0.07 + "s" }}
            >
              <span className="hazard__icon">
                <HazardIcon path={hazard.icon} />
              </span>
              <span className="hazard__body">
                <span className="hazard__head">
                  <strong>{hazard.name}</strong>
                  <span className="hazard__level">{hazard.levelLabel}</span>
                </span>
                <span className="hazard__meter">
                  {[1, 2, 3].map((segment) => (
                    <span
                      key={segment}
                      className={hazard.level >= segment ? "hazard__segment hazard__segment--filled" : "hazard__segment"}
                    ></span>
                  ))}
                </span>
                <span className="hazard__note">{hazard.note}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="insurance-options card-pop card-pop--2">
          <div className="policy-card">
            <div className="policy-card__header">
              <span className="policy-card__name-group">
                <span className="status-tag status-tag--required">REQUIRED</span>
                <span className="policy-card__name">{basePolicy.name}</span>
              </span>
              <span className="policy-card__price">
                <span className="policy-card__amount">{money(basePolicy.cost)}</span>
                <span className="policy-card__period">per month</span>
              </span>
            </div>

            <div className="grid-2 grid-2--small">
              <div className="form-field">
                <span className="form-label">Coverage level</span>
                <ToggleGroup
                  label="Coverage level"
                  options={coverageOptions}
                  value={insurance.coverage}
                  onChange={(value) => onInsuranceChange({ coverage: value })}
                  variant="muted"
                  size="small"
                />
              </div>
              <div className="form-field">
                <span className="form-label">Deductible</span>
                <ToggleGroup
                  label="Deductible"
                  options={deductibleOptions}
                  value={insurance.deductible}
                  onChange={(value) => onInsuranceChange({ deductible: value })}
                  variant="muted"
                  size="small"
                />
              </div>
            </div>

            <span className="policy-card__text">
              <strong>{coverage.label}:</strong> {coverage.text} {getDeductibleText(insurance.deductible)}
            </span>
            <span className="policy-card__text">
              <strong className="text-good">Covers:</strong> {basePolicy.covers}{" "}
              <strong className="text-bad">Doesn't cover:</strong> {basePolicy.excludes}
            </span>
          </div>

          <span className="insurance-options__title">Add more cover</span>

          {extraPolicies.map((policy) => {
            const isOn = isPolicyIncluded(policy, insurance.extras);
            return (
              <div key={policy.key} className={isOn ? "policy-option policy-option--on" : "policy-option"}>
                <span className="policy-option__body">
                  <span className="policy-option__head">
                    <span className="policy-option__name">{policy.name}</span>
                    <span className={getStatusClass(policy)}>{policy.status}</span>
                  </span>
                  <span className="policy-option__text">{policy.covers}</span>
                </span>
                <strong className="policy-option__cost">{money(policy.cost)}/mo</strong>
                {policy.required ? (
                  <span className="status-tag status-tag--required">Included</span>
                ) : (
                  <button
                    type="button"
                    className={isOn ? "switch switch--on" : "switch"}
                    onClick={() => togglePolicy(policy)}
                    aria-label={`Include ${policy.name}`}
                    aria-pressed={isOn}
                  >
                    <span className="switch__knob"></span>
                  </button>
                )}
              </div>
            );
          })}

          {extraPolicies.length === 0 && (
            <span className="insurance-options__empty">No extra cover is needed for the risks here.</span>
          )}

          <div className="insurance-total">
            <span className="insurance-total__summary">
              <span className="insurance-total__label">Your insurance</span>
              <strong className="insurance-total__amount">{money(result.insuranceCost)}/mo</strong>
              <span className="insurance-total__year">{money(result.insuranceCost * 12)} a year</span>
            </span>
            <button type="button" className="btn btn--light-green" onClick={onContinue}>
              Calculate results →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InsuranceStep;
