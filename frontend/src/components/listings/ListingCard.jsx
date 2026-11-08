import { Link } from "react-router-dom";
import LineMask from "../LineMask.jsx";
import ScoreCircle from "./ScoreCircle.jsx";
import { money } from "../../utils/format.js";

function ListingCard({ listing, number, total, tint, stickyTop }) {
  return (
    <article className="listing-card" style={{ background: tint, top: stickyTop }}>
      <div className="listing-card__main">
        <span className="listing-card__count">
          {number} / {total}
        </span>
        <h2 className="listing-card__title">
          <LineMask className="line-mask--scroll">{listing.titleLine1}</LineMask>
          <LineMask className="line-mask--scroll">{listing.titleLine2}</LineMask>
        </h2>
        <span className="listing-card__meta">
          {listing.type} / {listing.city} / {listing.rooms}
        </span>
        <div className="listing-card__photo">
          <img
            className="listing-card__image"
            src={listing.image}
            alt={`Photo of ${listing.name}`}
            style={{ objectPosition: listing.imagePosition }}
          />
          <span className="listing-card__source">Listed by the seller's agent</span>
        </div>
      </div>

      <div className="listing-card__side scroll-reveal">
        <div className="listing-card__tags">
          <span className="listing-tag">{listing.tag}</span>
          <span className="listing-tag listing-tag--soft">Listed {listing.listedText}</span>
        </div>

        <div className="listing-summary">
          <div className="listing-summary__header">
            <div className="listing-summary__name-group">
              <span className="listing-summary__name">{listing.name}</span>
              <span className="listing-summary__spec">{listing.spec}</span>
            </div>
            <ScoreCircle score={listing.score} />
          </div>

          <div className="listing-summary__prices">
            <div className="listing-stat listing-stat--green">
              <span className="listing-stat__label">Seller's asking price</span>
              <span className="listing-stat__value">{money(listing.price)}</span>
            </div>
            <div className="listing-stat">
              <span className="listing-stat__label">Our estimate</span>
              <span className="listing-stat__value">{money(listing.estimate)}</span>
            </div>
          </div>

          <div className="listing-summary__numbers">
            <div className="listing-stat listing-stat--small">
              <span className="listing-stat__label">Est. rent</span>
              <strong>{money(listing.rent)}</strong>
            </div>
            <div className="listing-stat listing-stat--small">
              <span className="listing-stat__label">Cash flow</span>
              <strong>+{money(listing.cashFlow)}</strong>
            </div>
            <div className="listing-stat listing-stat--small">
              <span className="listing-stat__label">Cap rate</span>
              <strong>{listing.capRate}</strong>
            </div>
          </div>

          <div className="listing-summary__actions">
            <Link className="btn btn--dark listing-summary__analyze" to="/analyze">
              Analyze this home <span aria-hidden="true">→</span>
            </Link>
            <a className="btn btn--outline listing-summary__seller" href={listing.sellerUrl} target="_blank" rel="noreferrer">
              See seller's listing <span aria-hidden="true">↗</span>
            </a>
          </div>

          <span className="listing-summary__note">Vestrata doesn't sell this home or take a commission.</span>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
