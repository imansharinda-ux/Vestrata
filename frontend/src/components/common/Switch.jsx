function Switch({ isOn, onToggle, label }) {
  return (
    <button
      type="button"
      className={isOn ? "toggle-switch toggle-switch--on" : "toggle-switch"}
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isOn}
    >
      <span className="toggle-switch__knob"></span>
    </button>
  );
}

export default Switch;
