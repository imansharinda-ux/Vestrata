import { Link } from "react-router-dom";
import { loginSlides } from "../../data/loginSlides.js";

function LoginShowcase() {
  return (
    <div className="login__showcase">
      <Link className="brand login__brand" to="/" aria-label="Vestrata home">
        <img src="/logo.svg" alt="" width="40" height="40" />
        <span className="brand__name">Vestrata</span>
      </Link>

      <div className="login__story">
        <div className="login__captions">
          {loginSlides.map((slide, index) => (
            <p key={slide.caption} className={`login__caption login__caption--${index + 1}`}>
              {slide.caption}
            </p>
          ))}
        </div>
        <div className="login__progress">
          {loginSlides.map((slide, index) => (
            <span key={slide.caption} className={`login__progress-track login__progress-track--${index + 1}`}>
              <span className="login__progress-fill"></span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoginShowcase;
