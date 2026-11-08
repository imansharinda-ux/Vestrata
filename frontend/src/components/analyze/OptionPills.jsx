function OptionPills({ options, value, onChange, size = "normal" }) {
  const sizeClass = size === "small" ? " pill--small" : "";

  return (
    <div className="pill-group">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={(option.value === value ? "pill pill--active" : "pill") + sizeClass}
          onClick={() => onChange(option.value)}
          aria-pressed={option.value === value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default OptionPills;
