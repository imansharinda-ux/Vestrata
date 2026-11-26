import { useState } from "react";
import Switch from "../common/Switch.jsx";
import { purposes } from "../../data/analyzeOptions.js";
import { emailOptions, defaultEmailSettings } from "../../data/profile.js";

function PreferencesTab() {
  const [purpose, setPurpose] = useState("rent");
  const [downPayment, setDownPayment] = useState(20);
  const [loanYears, setLoanYears] = useState("30");
  const [emailSettings, setEmailSettings] = useState(defaultEmailSettings);

  const toggleEmail = (key) => {
    setEmailSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div className="settings-stage">
      <div className="settings-stage__heading">
        <h1 className="settings-stage__title">Preferences</h1>
        <p className="stage__subtitle">Defaults we use each time you analyze a property.</p>
      </div>

      <div className="settings-columns">
        <div className="settings-card settings-card--form settings-columns__half">
          <p className="settings-card__title">Analysis defaults</p>

          <div className="form-field">
            <span className="settings-label">I usually buy to</span>
            <div className="segment-tabs segment-tabs--wide">
              {purposes.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={option.value === purpose ? "segment-tabs__tab segment-tabs__tab--active" : "segment-tabs__tab"}
                  onClick={() => setPurpose(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <label className="form-field">
            <span className="settings-label">Down payment: {downPayment}%</span>
            <input
              className="range"
              type="range"
              min="5"
              max="40"
              step="5"
              value={downPayment}
              onChange={(event) => setDownPayment(Number(event.target.value))}
            />
          </label>

          <label className="form-field">
            <span className="settings-label">Loan length</span>
            <select className="settings-input" value={loanYears} onChange={(event) => setLoanYears(event.target.value)}>
              <option value="30">30 years</option>
              <option value="15">15 years</option>
            </select>
          </label>
        </div>

        <div className="settings-card settings-card--list settings-columns__half">
          <p className="settings-card__title">Email me when</p>
          {emailOptions.map((option) => (
            <div key={option.key} className="settings-row">
              <span className="alert-settings__text">
                <span className="alert-settings__label">{option.label}</span>
                <span className="field-help">{option.description}</span>
              </span>
              <Switch
                isOn={emailSettings[option.key]}
                onToggle={() => toggleEmail(option.key)}
                label={`Toggle ${option.label}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PreferencesTab;
