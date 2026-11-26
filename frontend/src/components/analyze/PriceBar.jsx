function PriceBar({ low, high, asking, offer }) {
  const start = Math.min(low, asking, offer) * 0.94;
  const end = Math.max(high, asking, offer) * 1.06;
  const span = Math.max(1, end - start);
  const position = (amount) => ((amount - start) / span) * 100 + "%";

  return (
    <div className="price-bar">
      <div className="price-bar__track"></div>
      <div className="price-bar__band" style={{ left: position(low), width: ((high - low) / span) * 100 + "%" }}></div>
      <div className="price-bar__marker price-bar__marker--asking" style={{ left: position(asking) }}>
        <span className="price-bar__label">Asking</span>
        <span className="price-bar__line"></span>
      </div>
      <div className="price-bar__marker price-bar__marker--offer" style={{ left: position(offer) }}>
        <span className="price-bar__line"></span>
        <span className="price-bar__label">You</span>
      </div>
    </div>
  );
}

export default PriceBar;
