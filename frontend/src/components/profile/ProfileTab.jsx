import { useState } from "react";
import { accountStats, profileStates } from "../../data/profile.js";
import { checkUsername } from "../../utils/validation.js";

function ProfileTab({ user, initials, onSave }) {
  const [fullName, setFullName] = useState(user.fullName);
  const [username, setUsername] = useState(user.username);
  const [contactEmail, setContactEmail] = useState(user.email);
  const [phone, setPhone] = useState("");
  const [state, setState] = useState(user.state);
  const [city, setCity] = useState(user.city);

  const usernameCheck = checkUsername(username, user.username);
  const cleanUsername = username.trim().toLowerCase();
  const hasChanges = fullName.trim() !== user.fullName || cleanUsername !== user.username;
  const canSave = hasChanges && usernameCheck.isValid && fullName.trim() !== "";

  const resetForm = () => {
    setFullName(user.fullName);
    setUsername(user.username);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSave) return;
    setUsername(cleanUsername);
    onSave({ fullName: fullName.trim(), username: cleanUsername });
  };

  return (
    <div className="settings-stage">
      <div className="settings-stage__heading">
        <h1 className="settings-stage__title">Profile</h1>
        <p className="stage__subtitle">Your name and username show on saved reports you share.</p>
      </div>

      <div className="stat-grid">
        {accountStats.map((stat) => (
          <div key={stat.label} className="settings-card settings-card--small">
            <span className="settings-card__label">{stat.label}</span>
            <strong className="settings-card__value">{stat.value}</strong>
          </div>
        ))}
      </div>

      <form className="settings-card settings-card--form" onSubmit={handleSubmit}>
        <div className="avatar-row">
          <span className="avatar-row__avatar">{initials}</span>
          <div className="avatar-row__actions">
            <button type="button" className="btn btn--line btn--small-pill">
              Upload photo
            </button>
            <button type="button" className="btn btn--ghost btn--small-pill">
              Remove
            </button>
          </div>
        </div>

        <div className="settings-grid">
          <label className="form-field">
            <span className="settings-label">Full name</span>
            <input
              className="settings-input"
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              autoComplete="name"
            />
          </label>

          <label className="form-field">
            <span className="settings-label">Username</span>
            <span className="username-input">
              <span className="username-input__at">@</span>
              <input
                className="settings-input username-input__field"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
              />
            </span>
            <span className={usernameCheck.isValid ? "field-message text-good" : "field-message text-bad"}>
              {usernameCheck.message}
            </span>
          </label>

          <label className="form-field">
            <span className="settings-label">Sign-in email</span>
            <input className="settings-input" type="email" value={user.email} readOnly />
            <span className="field-help">From Google. Change it in your Google account.</span>
          </label>

          <label className="form-field">
            <span className="settings-label">Contact email</span>
            <input
              className="settings-input"
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              autoComplete="email"
            />
            <span className="field-help">Where we send your alerts.</span>
          </label>

          <label className="form-field">
            <span className="settings-label">Phone</span>
            <input
              className="settings-input"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Optional"
              autoComplete="tel"
            />
          </label>

          <div className="settings-grid settings-grid--tight">
            <label className="form-field">
              <span className="settings-label">State</span>
              <select className="settings-input" value={state} onChange={(event) => setState(event.target.value)}>
                {profileStates.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
            <label className="form-field">
              <span className="settings-label">City</span>
              <input
                className="settings-input"
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                autoComplete="address-level2"
              />
            </label>
          </div>
        </div>

        <div className="settings-actions">
          <button type="button" className="btn btn--line btn--small-pill" onClick={resetForm}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary btn--small-pill" disabled={!canSave}>
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileTab;
