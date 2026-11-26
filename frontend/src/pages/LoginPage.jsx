import LoginBackground from "../components/login/LoginBackground.jsx";
import LoginShowcase from "../components/login/LoginShowcase.jsx";
import AuthCard from "../components/login/AuthCard.jsx";

function LoginPage() {
  return (
    <div className="login">
      <LoginBackground />
      <div className="login__layout">
        <LoginShowcase />
        <AuthCard />
      </div>
    </div>
  );
}

export default LoginPage;
