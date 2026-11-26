import PasswordField from "./PasswordField.jsx";
import GoogleButton from "./GoogleButton.jsx";

function AccountForm({ account, onChange, onContinue, onGoogle }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onContinue();
  };

  return (
    <>
      <form className="auth-form pop-in pop-in--first" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field__label">Full name</span>
          <input
            className="field__input"
            type="text"
            value={account.fullName}
            onChange={(event) => onChange("fullName", event.target.value)}
            placeholder="First and last name"
            autoComplete="name"
            required
          />
        </label>

        <label className="field">
          <span className="field__label">Email</span>
          <input
            className="field__input"
            type="email"
            value={account.email}
            onChange={(event) => onChange("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <PasswordField
          id="signup-password"
          value={account.password}
          onChange={(event) => onChange("password", event.target.value)}
          placeholder="At least 8 characters"
          autoComplete="new-password"
        />

        <button type="submit" className="btn btn--primary btn--block">
          Continue →
        </button>
      </form>

      <div className="auth-form pop-in pop-in--second">
        <div className="auth-divider">or</div>
        <GoogleButton label="Sign up with Google" onClick={onGoogle} />
      </div>
    </>
  );
}

export default AccountForm;
