import LineMask from "./LineMask.jsx";
import { footerColumns, socialLinks, legalLinks } from "../data/navLinks.js";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__about">
          <p className="footer__tagline">Clear rental analysis for US investors</p>
          <p className="footer__email">Prefer to email? hello@vestrata.io</p>
        </div>

        <div className="footer__columns">
          {footerColumns.map((column) => (
            <nav key={column.title} className="footer__column" aria-label={column.title}>
              <span className="footer__heading">{column.title}</span>
              {column.links.map((link) => (
                <a key={link.label} className="footer__link" href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div className="footer__social">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              className={social.highlight ? "social social--green" : "social"}
              href={social.href}
              aria-label={social.label}
            >
              {social.text}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2026 Vestrata. All rights reserved.</span>
        <span>Analysis and Decision Support tool.</span>
        <span className="footer__legal">
          {legalLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </span>
      </div>

      <div className="footer__wordmark" aria-hidden="true">
        <LineMask className="line-mask--scroll line-mask--inline" textClassName="footer__wordmark-text">
          vestrata
        </LineMask>
      </div>
    </footer>
  );
}

export default Footer;
