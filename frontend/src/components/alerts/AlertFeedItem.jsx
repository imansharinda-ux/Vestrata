function AlertFeedItem({ alert, isActive, delay, onSelect }) {
  return (
    <button
      type="button"
      className={isActive ? "feed-item feed-item--active" : "feed-item"}
      onClick={onSelect}
      style={{ animationDelay: delay }}
      aria-pressed={isActive}
    >
      <span className="feed-item__badge" style={{ background: alert.tint }}>
        {alert.short}
      </span>
      <span className="feed-item__body">
        <span className="feed-item__meta">
          <span>{alert.tag}</span>
          <span>{alert.time}</span>
        </span>
        <span className="feed-item__title">{alert.title}</span>
      </span>
      <span className={alert.isGood ? "feed-item__impact" : "feed-item__impact feed-item__impact--bad"}>
        {alert.impact}
      </span>
    </button>
  );
}

export default AlertFeedItem;
