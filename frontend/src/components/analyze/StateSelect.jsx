import { useEffect, useRef, useState } from "react";
import { states } from "../../data/states.js";

function StateSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef(null);

  const selectedState = states.find((state) => state.code === value);
  const search = query.trim().toLowerCase();
  const matches = states.filter(
    (state) => !search || state.name.toLowerCase().includes(search) || state.code.toLowerCase() === search
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openList = () => {
    setQuery("");
    setIsOpen(true);
  };

  const selectState = (code) => {
    onChange(code);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div className="form-field combobox" ref={wrapperRef}>
      <label className="form-label" htmlFor="state-input">
        State
      </label>
      <div className="combobox__control">
        <input
          id="state-input"
          className="input combobox__input"
          type="text"
          value={isOpen ? query : selectedState.name}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={openList}
          placeholder="Search states"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls="state-list"
          autoComplete="off"
        />
        <button
          type="button"
          className="combobox__toggle"
          onClick={() => (isOpen ? setIsOpen(false) : openList())}
          aria-label="Show all states"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 5 L7 10 L12 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div id="state-list" className="combobox__list" role="listbox">
          {matches.map((state) => (
            <button
              key={state.code}
              type="button"
              role="option"
              aria-selected={state.code === value}
              className={state.code === value ? "combobox__option combobox__option--selected" : "combobox__option"}
              onClick={() => selectState(state.code)}
            >
              <span>{state.name}</span>
              <span className="combobox__code">{state.code}</span>
            </button>
          ))}
          {matches.length === 0 && <span className="combobox__empty">No state matches "{query}"</span>}
        </div>
      )}
    </div>
  );
}

export default StateSelect;
