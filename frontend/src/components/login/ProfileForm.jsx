import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usStates, countryCodes, buyingGoals, experienceLevels } from "../../data/formOptions.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ProfileForm({ defaultEmail, fromGoogle, onBack }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    contactEmail: defaultEmail,
    countryCode: countryCodes[0],
    phone: "",
    state: usStates[0],
    city: "",
    goal: buyingGoals[0].value,
    experience: experienceLevels[0],
    agreed: false,
    wantsEmails: true,
  });

  const updateProfile = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const canSubmit = profile.agreed && EMAIL_PATTERN.test(profile.contactEmail);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (canSubmit) {
      navigate("/analyze");
    }
  };

  return (
    <form className="auth-form pop-in" onSubmit={handleSubmit}>
      <label className="field">
        <span className="field__label">Contact email</span>
        <input
          className="field__input"
          type="email"
          value={profile.contactEmail}
          onChange={(event) => updateProfile("contactEmail", event.target.value)}
          placeholder="Where we send alerts"
          autoComplete="email"
        />
        {fromGoogle && (
          <span className="field__hint">Filled from your Google account. Change it if you like.</span>
        )}
      </label>

      <div className="field">
        <span className="field__label">
          Phone <span className="field__optional">(optional)</span>
        </span>
        <div className="phone-input">
          <select
            className="field__input phone-input__code"
            value={profile.countryCode}
            onChange={(event) => updateProfile("countryCode", event.target.value)}
            aria-label="Country code"
          >
            {countryCodes.map((code) => (
              <option key={code}>{code}</option>
            ))}
          </select>
          <input
            className="field__input"
            type="tel"
            value={profile.phone}
            onChange={(event) => updateProfile("phone", event.target.value)}
            placeholder="(555) 123-4567"
            autoComplete="tel-national"
            aria-label="Phone number"
          />
        </div>
      </div>

      <div className="field-row">
        <label className="field">
          <span className="field__label">State</span>
          <select
            className="field__input"
            value={profile.state}
            onChange={(event) => updateProfile("state", event.target.value)}
            autoComplete="address-level1"
          >
            {usStates.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span className="field__label">City</span>
          <input
            className="field__input"
            type="text"
            value={profile.city}
            onChange={(event) => updateProfile("city", event.target.value)}
            placeholder="e.g. Austin"
            autoComplete="address-level2"
          />
        </label>
      </div>

      <div className="field">
        <span className="field__label">I'm buying to</span>
        <div className="segmented" role="radiogroup" aria-label="Buying goal">
          {buyingGoals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              role="radio"
              aria-checked={profile.goal === goal.value}
              className={profile.goal === goal.value ? "segmented__option segmented__option--active" : "segmented__option"}
              onClick={() => updateProfile("goal", goal.value)}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>

      <label className="field">
        <span className="field__label">Experience</span>
        <select
          className="field__input"
          value={profile.experience}
          onChange={(event) => updateProfile("experience", event.target.value)}
        >
          {experienceLevels.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </select>
      </label>

      <label className="checkbox checkbox--top">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={profile.agreed}
          onChange={(event) => updateProfile("agreed", event.target.checked)}
        />
        I understand Vestrata gives analysis only, not financial advice.
      </label>

      <label className="checkbox checkbox--top">
        <input
          className="checkbox__input"
          type="checkbox"
          checked={profile.wantsEmails}
          onChange={(event) => updateProfile("wantsEmails", event.target.checked)}
        />
        Email me alerts and updates for my area.
      </label>

      <div className="auth-form__actions">
        <button type="button" className="btn btn--google" onClick={onBack}>
          Back
        </button>
        <button type="submit" className="btn btn--primary auth-form__submit" disabled={!canSubmit}>
          Create free account
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
