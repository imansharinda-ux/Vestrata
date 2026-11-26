import { tickerItems } from "../../data/alerts.js";

function LiveTicker() {
  const loopedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker">
      <span className="ticker__live">
        <span className="ticker__dot"></span>
        LIVE
      </span>
      <div className="ticker__window">
        <div className="ticker__track">
          {loopedItems.map((item, index) => (
            <span key={index} className="ticker__item">
              {item.text}
              {item.value && (
                <>
                  {" · "}
                  <strong>{item.value}</strong>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LiveTicker;
