function Counter({ label, value, onDecrease, onIncrease }) {
  return (
    <div className="form-field">
      <span className="form-label">{label}</span>
      <div className="counter">
        <button type="button" className="counter__button" onClick={onDecrease} aria-label={`Fewer ${label.toLowerCase()}`}>
          −
        </button>
        <span className="counter__value">{value}</span>
        <button type="button" className="counter__button" onClick={onIncrease} aria-label={`More ${label.toLowerCase()}`}>
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
