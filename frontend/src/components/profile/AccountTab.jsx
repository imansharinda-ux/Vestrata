import { useState } from "react";
import { DELETE_CONFIRMATION } from "../../data/profile.js";

function AccountTab() {
  const [confirmText, setConfirmText] = useState("");
  const canDelete = confirmText === DELETE_CONFIRMATION;

  return (
    <div className="settings-stage">
      <div className="settings-stage__heading">
        <h1 className="settings-stage__title">Account</h1>
        <p className="stage__subtitle">Your data, and closing your account.</p>
      </div>

      <div className="settings-card free-banner">
        <span className="free-banner__icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12 L10 17 L19 7" />
          </svg>
        </span>
        <span className="free-banner__text">
          <span className="free-banner__title">Vestrata is free for everyone</span>
          <span className="free-banner__subtitle">
            Unlimited analyses, saved properties, compare and alerts. No card, no paid plans.
          </span>
        </span>
      </div>

      <div className="settings-card settings-card--row">
        <span className="settings-card__text">
          <span className="settings-card__title">Download my data</span>
          <span className="field-help field-help--large">Your saved properties and results as a file.</span>
        </span>
        <button type="button" className="btn btn--line btn--small-pill">
          Download
        </button>
      </div>

      <div className="settings-card danger-zone">
        <span className="danger-zone__title">Delete account</span>
        <span className="field-help field-help--large">
          This removes your saved properties, alerts and settings for good. Type <strong>{DELETE_CONFIRMATION}</strong> to
          confirm.
        </span>
        <div className="danger-zone__row">
          <input
            className="settings-input danger-zone__input"
            type="text"
            value={confirmText}
            onChange={(event) => setConfirmText(event.target.value)}
            placeholder={DELETE_CONFIRMATION}
            aria-label="Type DELETE to confirm"
          />
          <button type="button" className="btn btn--danger btn--small-pill" disabled={!canDelete}>
            Delete my account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountTab;
