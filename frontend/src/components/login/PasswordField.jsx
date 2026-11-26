import { useState } from "react";

function PasswordField({ id, value, onChange, placeholder, autoComplete, extraLabel }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="field">
      <div className="field__label-row">
        <label className="field__label" htmlFor={id}>
          Password
        </label>
        {extraLabel}
      </div>
      <div className="password-field">
        <input
          id={id}
          className="field__input password-field__input"
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={8}
          required
        />
        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setIsVisible(!isVisible)}
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
