import { useState } from "react";
import { Link } from "react-router-dom";
import { signedInDevices } from "../../data/profile.js";
import { getPasswordStrength } from "../../utils/validation.js";

const STRENGTH_STEPS = [1, 2, 3, 4];

function SecurityTab({ onPasswordChange }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const strength = getPasswordStrength(newPassword);
  const passwordsMatch = confirmPassword.length > 0 && confirmPassword === newPassword;
  const canSave = currentPassword && newPassword.length >= 8 && passwordsMatch && strength.score >= 2;
  const inputType = isVisible ? "text" : "password";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!canSave) return;
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onPasswordChange();
  };

  return (
    <div className="settings-stage">
      <div className="settings-stage__heading">
        <h1 className="settings-stage__title">Password &amp; security</h1>
        <p className="stage__subtitle">Change your password and see where you're signed in.</p>
      </div>

      <div className="settings-columns">
        <form className="settings-card settings-card--form settings-columns__main" onSubmit={handleSubmit}>
          <p className="settings-card__title">Change password</p>

          <label className="form-field">
            <span className="settings-label">Current password</span>
            <input
              className="settings-input"
              type={inputType}
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Your current password"
            />
          </label>

          <label className="form-field">
            <span className="settings-label">New password</span>
            <span className="password-field">
              <input
                className="settings-input password-field__input"
                type={inputType}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                className="password-field__toggle"
                onClick={() => setIsVisible(!isVisible)}
                aria-label={isVisible ? "Hide passwords" : "Show passwords"}
              >
                {isVisible ? "Hide" : "Show"}
              </button>
            </span>
          </label>

          <div className={`strength strength--${newPassword ? strength.score : "empty"}`}>
            <div className="strength__bars">
              {STRENGTH_STEPS.map((step) => (
                <span
                  key={step}
                  className={newPassword && step <= strength.score ? "strength__bar strength__bar--on" : "strength__bar"}
                ></span>
              ))}
            </div>
            <span className="strength__label">{strength.label}</span>
          </div>

          <label className="form-field">
            <span className="settings-label">Confirm new password</span>
            <input
              className="settings-input"
              type={inputType}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              placeholder="Type it again"
            />
            {confirmPassword && (
              <span className={passwordsMatch ? "field-message text-good" : "field-message text-bad"}>
                {passwordsMatch ? "Passwords match." : "Passwords don't match."}
              </span>
            )}
          </label>

          <div className="settings-actions settings-actions--spread">
            <Link className="text-link text-link--small" to="/login">
              Forgot your current password?
            </Link>
            <button type="submit" className="btn btn--primary btn--small-pill" disabled={!canSave}>
              Update password
            </button>
          </div>
        </form>

        <div className="settings-columns__side">
          <div className="settings-card settings-card--list">
            <p className="settings-card__title">Sign-in methods</p>
            <div className="settings-row">
              <span className="settings-row__label">
                <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#4285F4" d="M45 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2.1 5-4.4 6.6v5.5h7.1C42.6 36.7 45 31.1 45 24.5z" />
                  <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41 15.5 46 24 46z" />
                  <path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.3-2.9.7-4.2v-5.7H4.5C3 17.1 2 20.4 2 24s1 6.9 2.5 9.9l7.3-5.7z" />
                  <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 29.9 2 24 2 15.5 2 8.1 7 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z" />
                </svg>
                Google
              </span>
              <span className="status-tag status-tag--required">Connected</span>
            </div>
            <div className="settings-row">
              <span>Email &amp; password</span>
              <span className="status-tag status-tag--required">On</span>
            </div>
          </div>

          <div className="settings-card settings-card--list">
            <p className="settings-card__title">Where you're signed in</p>
            {signedInDevices.map((device) => (
              <div key={device.name} className="settings-row settings-row--top">
                <span>
                  {device.name}
                  <br />
                  <span className="field-help">{device.detail}</span>
                </span>
                {device.isCurrent && <span className="settings-row__current">This device</span>}
              </div>
            ))}
            <button type="button" className="btn btn--line btn--tiny-pill">
              Sign out of other devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecurityTab;
