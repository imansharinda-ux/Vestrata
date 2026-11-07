import { navLinks } from "../data/navLinks.js";

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar__left">
        <a className="brand" href="/" aria-label="Vestrata home">
          <img className="brand__logo" src="/logo.svg" alt="" width="40" height="40" />
          <span className="brand__name">Vestrata</span>
        </a>
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a className="navbar__link" href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <a className="btn btn--primary btn--small" href="/login">
        Sign in
      </a>
    </nav>
  );
}

export default Navbar;
