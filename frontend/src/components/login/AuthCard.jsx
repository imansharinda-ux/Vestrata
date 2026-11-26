import { useState } from "react";
import LineMask from "../LineMask.jsx";
import SignInForm from "./SignInForm.jsx";
import AccountForm from "./AccountForm.jsx";
import ProfileForm from "./ProfileForm.jsx";

const HEADINGS = {
  signin: {
    title: "Welcome back.",
    subtitle: "Sign in to analyze, save and compare properties.",
  },
  account: {
    title: "Create your account.",
    subtitle: "Vestrata is completely free. Create an account to start.",
  },
  profile: {
    title: "A bit about you.",
    subtitle: "We use this to set up your alerts and local numbers.",
  },
};

const GOOGLE_DEMO_ACCOUNT = {
  fullName: "Alex Morgan",
  email: "alex.morgan@gmail.com",
};

const EMPTY_ACCOUNT = {
  fullName: "",
  email: "",
  password: "",
};

function AuthCard() {
  const [mode, setMode] = useState("signin");
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState(EMPTY_ACCOUNT);
  const [fromGoogle, setFromGoogle] = useState(false);

  const isSignIn = mode === "signin";
  const view = isSignIn ? "signin" : step === 1 ? "account" : "profile";
  const heading = HEADINGS[view];

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setStep(1);
  };

  const updateAccount = (field, value) => {
    setAccount({ ...account, [field]: value });
  };

  const continueWithForm = () => {
    setFromGoogle(false);
    setStep(2);
  };

  const continueWithGoogle = () => {
    setAccount({
      ...account,
      fullName: account.fullName || GOOGLE_DEMO_ACCOUNT.fullName,
      email: account.email || GOOGLE_DEMO_ACCOUNT.email,
    });
    setFromGoogle(true);
    setStep(2);
  };

  return (
    <section className="auth-card" aria-label="Sign in or create an account">
      <div className="auth-card__header">
        <h1 className="auth-card__title">
          <LineMask key={heading.title}>{heading.title}</LineMask>
        </h1>
        <p key={heading.subtitle} className="auth-card__subtitle pop-in">
          {heading.subtitle}
        </p>
      </div>

      {view !== "profile" && (
        <div className="auth-tabs pop-in" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={isSignIn}
            className={isSignIn ? "auth-tabs__tab auth-tabs__tab--active" : "auth-tabs__tab"}
            onClick={() => switchMode("signin")}
          >
            Sign in
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={!isSignIn}
            className={isSignIn ? "auth-tabs__tab" : "auth-tabs__tab auth-tabs__tab--active"}
            onClick={() => switchMode("signup")}
          >
            Create account
          </button>
        </div>
      )}

      {!isSignIn && (
        <div className="auth-steps">
          <span className="auth-steps__count">STEP {step} OF 2</span>
          <span className="auth-steps__name">{step === 1 ? "Your account" : "About you"}</span>
          <span className="auth-steps__bars">
            <span className="auth-steps__bar auth-steps__bar--done"></span>
            <span className={step === 2 ? "auth-steps__bar auth-steps__bar--done" : "auth-steps__bar"}></span>
          </span>
        </div>
      )}

      {view === "signin" && <SignInForm />}

      {view === "account" && (
        <AccountForm
          account={account}
          onChange={updateAccount}
          onContinue={continueWithForm}
          onGoogle={continueWithGoogle}
        />
      )}

      {view === "profile" && (
        <ProfileForm defaultEmail={account.email} fromGoogle={fromGoogle} onBack={() => setStep(1)} />
      )}

      {view !== "profile" && (
        <p className="auth-card__switch">
          {isSignIn ? "New to Vestrata?" : "Already have an account?"}{" "}
          <button type="button" className="text-link" onClick={() => switchMode(isSignIn ? "signup" : "signin")}>
            {isSignIn ? "Create an account" : "Sign in"}
          </button>
        </p>
      )}

      <p className="auth-card__legal">
        By continuing you agree to our{" "}
        <a className="text-link" href="#">
          Terms
        </a>{" "}
        and{" "}
        <a className="text-link" href="#">
          Privacy Policy
        </a>
        . We never share your data.
      </p>
    </section>
  );
}

export default AuthCard;
