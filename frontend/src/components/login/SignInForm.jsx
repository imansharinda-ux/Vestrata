import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordField from "./PasswordField.jsx";
import GoogleButton from "./GoogleButton.jsx";

function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/analyze");
  };

  return (
    <>
      <form className="auth-form pop-in pop-in--first" onSubmit={handleSubmit}>
        <label className="field">
          <span className="field__label">Email</span>
          <input
            className="field__input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <PasswordField
          id="signin-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your password"
          autoComplete="current-password"
          extraLabel={
            <a className="text-link text-link--small" href="#">
              Forgot password?
            </a>
          }
        />

        <label className="checkbox">
          <input
            className="checkbox__input"
            type="checkbox"
            checked={keepSignedIn}
            onChange={(event) => setKeepSignedIn(event.target.checked)}
          />
          Keep me signed in
        </label>

        <button type="submit" className="btn btn--primary btn--block">
          Sign in
        </button>
      </form>

      <div className="auth-form pop-in pop-in--second">
        <div className="auth-divider">or</div>
        <GoogleButton label="Continue with Google" onClick={() => navigate("/analyze")} />
      </div>
    </>
  );
}

export default SignInForm;
