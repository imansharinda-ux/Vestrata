import { states } from "../../data/states.js";

const MAX_RESULTS = 6;

function StateSearch({ query, onQueryChange, onSelect }) {
  const search = query.trim().toLowerCase();
  const results = search
    ? states
        .filter((state) => state.name.toLowerCase().includes(search) || state.code.toLowerCase() === search)
        .slice(0, MAX_RESULTS)
    : [];

  return (
    <div className="state-search">
      <svg
        className="state-search__icon"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20 L16 16" />
      </svg>
      <input
        className="state-search__input"
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search a state, e.g. Texas"
        aria-label="Search states"
      />

      {search && (
        <div className="state-search__results">
          {results.map((state) => (
            <button key={state.code} type="button" className="state-search__result" onClick={() => onSelect(state.code)}>
              {state.name} <span className="state-search__code">· {state.code}</span>
            </button>
          ))}
          {results.length === 0 && <span className="state-search__empty">No state matches.</span>}
        </div>
      )}
    </div>
  );
}

export default StateSearch;
