import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "../../data/contact.js";

function WayIcon({ children }) {
  return (
    <span className="contact-way__icon">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    </span>
  );
}

function WayText({ label, value }) {
  return (
    <span className="contact-way__text">
      <span className="contact-way__label">{label}</span>
      <span className="contact-way__value">{value}</span>
    </span>
  );
}

function ContactWays() {
  return (
    <div className="contact-ways">
      <a className="contact-way pop-in pop-in--first" href={`mailto:${CONTACT_EMAIL}`}>
        <WayIcon>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7 L12 13 L21 7" />
        </WayIcon>
        <WayText label="Email us" value={CONTACT_EMAIL} />
      </a>

      <Link className="contact-way pop-in pop-in--first" to="/guide">
        <WayIcon>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5 L15.5 12 L10 15.5 Z" />
        </WayIcon>
        <WayText label="Learn by watching" value="Video guide for every part" />
      </Link>

      <div className="contact-way pop-in pop-in--second">
        <WayIcon>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7 V12 L15 14" />
        </WayIcon>
        <WayText label="We reply" value="Within 1 business day" />
      </div>
    </div>
  );
}

export default ContactWays;
