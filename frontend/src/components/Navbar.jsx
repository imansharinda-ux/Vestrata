import { Link } from "react-router-dom";
import { navLinks } from "../data/navLinks.js";

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar__left">
        <Link className="brand" to="/" aria-label="Vestrata home">
          <img className="brand__logo" src="/logo.svg" alt="" width="40" height="40" />
          <span className="brand__name">Vestrata</span>
        </Link>
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link className="navbar__link" to={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link className="btn btn--primary btn--small" to="/login">
        Sign in
      </Link>
    </nav>
  );
}

export default Navbar;
