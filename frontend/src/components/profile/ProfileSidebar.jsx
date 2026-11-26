import { Link } from "react-router-dom";
import { settingsTabs } from "../../data/profile.js";

function TabIcon({ path, color = "#2E6B4F" }) {
  return (
    <span className="settings-nav__icon">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={path} />
      </svg>
    </span>
  );
}

function ProfileSidebar({ user, initials, activeTab, onTabChange }) {
  return (
    <aside className="settings-sidebar card-pop">
      <div className="user-card">
        <span className="user-card__avatar">{initials}</span>
        <span className="user-card__text">
          <span className="user-card__name">{user.fullName}</span>
          <span className="user-card__username">@{user.username}</span>
        </span>
      </div>

      <div className="settings-nav" role="tablist" aria-label="Settings">
        {settingsTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={tab.value === activeTab}
            className={tab.value === activeTab ? "settings-nav__item settings-nav__item--active" : "settings-nav__item"}
            onClick={() => onTabChange(tab.value)}
          >
            <TabIcon path={tab.icon} />
            {tab.label}
          </button>
        ))}
      </div>

      <Link className="settings-nav__item settings-nav__item--signout" to="/">
        <TabIcon path="M15 4 H19 V20 H15 M10 8 L6 12 L10 16 M6 12 H15" color="#5C6660" />
        Sign out
      </Link>
    </aside>
  );
}

export default ProfileSidebar;
