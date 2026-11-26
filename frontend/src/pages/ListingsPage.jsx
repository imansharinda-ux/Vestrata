import { useState } from "react";
import AppNavbar from "../components/layout/AppNavbar.jsx";
import LineMask from "../components/LineMask.jsx";
import ListingFilters from "../components/listings/ListingFilters.jsx";
import ListingCard from "../components/listings/ListingCard.jsx";
import { listings, cardTints, LAST_UPDATED } from "../data/listings.js";

const navbarAction = { label: "Analyze my own address", to: "/analyze", style: "primary" };

const sorters = {
  score: (a, b) => b.score - a.score,
  price: (a, b) => a.price - b.price,
  newest: (a, b) => a.daysListed - b.daysListed,
};

const STICKY_START = 90;
const STICKY_STEP = 16;

function padNumber(value) {
  return String(value).padStart(2, "0");
}

function ListingsPage() {
  const [filters, setFilters] = useState({ market: "all", maxPrice: 0, sort: "score" });

  const updateFilters = (changes) => {
    setFilters((current) => ({ ...current, ...changes }));
  };

  const visibleListings = listings
    .filter((listing) => filters.market === "all" || listing.stateCode === filters.market)
    .filter((listing) => !filters.maxPrice || listing.price <= filters.maxPrice)
    .sort(sorters[filters.sort]);

  const count = visibleListings.length;

  return (
    <div className="app-page">
      <AppNavbar action={navbarAction} />

      <section className="listings-hero">
        <h1 className="listings-hero__title">
          <LineMask>Homes for sale.</LineMask>
          <LineMask className="line-mask--second">We analyze them, we don't sell them.</LineMask>
        </h1>
        <p className="listings-hero__text pop-in pop-in--first">
          These homes are listed by their sellers and agents. We run the numbers on each one so you can decide, and
          we never take a commission. Last updated {LAST_UPDATED}.
        </p>
        <ListingFilters filters={filters} onChange={updateFilters} />
        <span className="listings-hero__count pop-in pop-in--second">
          {count} {count === 1 ? "home matches" : "homes match"} your filters
        </span>
      </section>

      <section className="listing-stack">
        {visibleListings.map((listing, index) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            number={padNumber(index + 1)}
            total={padNumber(count)}
            tint={cardTints[index % cardTints.length]}
            stickyTop={STICKY_START + index * STICKY_STEP + "px"}
          />
        ))}
      </section>

      <footer className="page-footer">
        <span>© 2026 Vestrata</span>
        <span>Availability may have changed since the last update.</span>
        <span className="page-footer__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </span>
      </footer>
    </div>
  );
}

export default ListingsPage;
