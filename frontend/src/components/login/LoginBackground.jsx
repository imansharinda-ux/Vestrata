import { loginSlides } from "../../data/loginSlides.js";

function LoginBackground() {
  return (
    <>
      {loginSlides.map((slide, index) => (
        <img
          key={slide.image}
          className={`login__slide login__slide--${index + 1}`}
          src={slide.image}
          alt={slide.imageAlt}
        />
      ))}
      <div className="login__shade"></div>
    </>
  );
}

export default LoginBackground;
