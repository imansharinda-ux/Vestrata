function CompareChart({ title, properties, getValue, formatValue, winner }) {
  const highest = Math.max(...properties.map(getValue), 1);

  return (
    <div className="compare-chart card-pop">
      <span className="compare-chart__title">{title}</span>
      {properties.map((property) => {
        const value = getValue(property);
        const isWinner = property === winner;
        return (
          <div key={property.id} className="compare-chart__row">
            <span className="compare-chart__name">{property.name}</span>
            <div className="compare-chart__track">
              <div
                className={isWinner ? "compare-chart__bar compare-chart__bar--best" : "compare-chart__bar"}
                style={{ width: Math.round((value / highest) * 100) + "%" }}
              ></div>
            </div>
            <span className="compare-chart__value">{formatValue(value)}</span>
          </div>
        );
      })}
    </div>
  );
}

export default CompareChart;
