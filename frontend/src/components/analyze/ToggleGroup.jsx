function ToggleGroup({ options, value, onChange, label, variant = "white", size = "normal" }) {
  const groupClass = variant === "muted" ? "toggle-group toggle-group--muted" : "toggle-group";
  const optionSize = size === "small" ? " toggle-group__option--small" : "";

  return (
    <div className={groupClass} role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          className={
            (option.value === value ? "toggle-group__option toggle-group__option--active" : "toggle-group__option") +
            optionSize
          }
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default ToggleGroup;
