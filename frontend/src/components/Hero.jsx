import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import LineMask from "./LineMask.jsx";

function Hero() {
  return (
    <header className="hero">
      <img className="hero__image" src="/images/hero.jpg" alt="Bright, renovated home interior" />
      <div className="hero__shade hero__shade--side"></div>
      <div className="hero__shade hero__shade--top"></div>

      <Navbar />

      <div className="hero__content">
        <h1 className="hero__title">
          <LineMask>Introducing Vestrata,</LineMask>
          <LineMask className="line-mask--second">clear way to buy</LineMask>
          <LineMask className="line-mask--third">rental property.</LineMask>
        </h1>
        <p className="hero__text pop-in pop-in--first">
          Real US listings, our own price and rent estimates, and every cost explained, so you know
          what a rental will earn before you make an offer.
        </p>
        <div className="hero__actions pop-in pop-in--second">
          <Link className="btn btn--primary" to="/analyze">
            Analyze a property
          </Link>
          <Link className="btn btn--outline" to="/listings">
            Browse real listings
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Hero;
