import { Link, NavLink } from "react-router-dom";
import { navLinks } from "../../data/navLinks.js";

const ACCOUNT_INITIALS = "IS";
const SAVED_COUNT = 6;

const defaultAction = {
  label: `My saved (${SAVED_COUNT})`,
  to: "/compare",
  style: "dark",
};

function AppNavbar({ action = defaultAction }) {
  return (
    <nav className="app-navbar" aria-label="Main">
      <div className="app-navbar__left">
        <Link className="brand brand--small" to="/" aria-label="Vestrata home">
          <img src="/logo.svg" alt="" width="34" height="34" />
          <span className="brand__name">Vestrata</span>
        </Link>
        <ul className="app-navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) => (isActive ? "app-navbar__link app-navbar__link--active" : "app-navbar__link")}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="app-navbar__right">
        <Link className="account-chip" to="/profile" aria-label="My account">
          <span className="account-chip__avatar">{ACCOUNT_INITIALS}</span>
          My account
        </Link>
        {action && (
          <Link className={`btn btn--${action.style} btn--compact`} to={action.to}>
            {action.label}
          </Link>
        )}
      </div>
    </nav>
  );
}

export default AppNavbar;
