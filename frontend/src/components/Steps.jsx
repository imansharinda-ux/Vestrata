import { Link } from "react-router-dom";
import LineMask from "./LineMask.jsx";
import { steps } from "../data/steps.js";

const ROUTE_PATH =
  "M71 28 C143 28 143 168 214 168 C286 168 286 28 357 28 C429 28 429 168 500 168 C571 168 571 28 643 28 C714 28 714 168 786 168 C857 168 857 28 929 28";

function Steps() {
  return (
    <section className="steps">
      <div className="steps__heading">
        <p className="steps__eyebrow scroll-reveal">How it works</p>
        <h2 className="section-title">
          <LineMask className="line-mask--scroll">Your path from listing to decision.</LineMask>
        </h2>
      </div>

      <div className="steps__scroller">
        <div className="steps__track">
          <svg className="steps__route" viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="route-line"
              d={ROUTE_PATH}
              fill="none"
              stroke="#A9B8AD"
              strokeWidth="2"
              strokeDasharray="7 9"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {steps.map((step) => {
            const stepClasses = [
              "step",
              step.low ? "step--low" : "",
              "scroll-reveal",
              step.delay > 1 ? `scroll-reveal--${step.delay}` : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <Link key={step.number} className={stepClasses} to={step.href}>
                <span className="step__pin">{step.number}</span>
                <span className="step__title">{step.title}</span>
                <span className="step__text">{step.text}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Steps;
