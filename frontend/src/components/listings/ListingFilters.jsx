import { marketOptions, priceOptions, sortOptions } from "../../data/listings.js";

function FilterPills({ options, value, onChange }) {
  return options.map((option) => (
    <button
      key={option.value}
      type="button"
      className={option.value === value ? "filter-pill filter-pill--active" : "filter-pill"}
      onClick={() => onChange(option.value)}
      aria-pressed={option.value === value}
    >
      {option.label}
    </button>
  ));
}

function ListingFilters({ filters, onChange }) {
  return (
    <div className="listing-filters pop-in pop-in--second">
      <span className="select-wrap">
        <select
          className="listing-filters__select"
          value={filters.market}
          onChange={(event) => onChange({ market: event.target.value })}
          aria-label="State"
        >
          {marketOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>

      <FilterPills options={priceOptions} value={filters.maxPrice} onChange={(value) => onChange({ maxPrice: value })} />

      <span className="listing-filters__divider"></span>

      <FilterPills options={sortOptions} value={filters.sort} onChange={(value) => onChange({ sort: value })} />
    </div>
  );
}

export default ListingFilters;
