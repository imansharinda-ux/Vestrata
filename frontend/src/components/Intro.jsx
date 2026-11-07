import LineMask from "./LineMask.jsx";

function Intro() {
  return (
    <section className="intro">
      <div className="intro__copy">
        <h2 className="section-title section-title--large">
          <LineMask className="line-mask--scroll">Transforming rental</LineMask>
          <LineMask className="line-mask--scroll">investment decisions</LineMask>
        </h2>
        <p className="intro__text scroll-reveal">
          Prices, rents, property tax, insurance, mortgage rates and state rules usually live in a
          dozen places. Vestrata brings them together, does the maths and explains the result in
          plain English.
        </p>
      </div>

      <div className="intro__gallery">
        <div className="intro__main clip-reveal">
          <img
            className="intro__main-image zoom-out"
            src="/images/kitchen.jpg"
            alt="Open-plan kitchen and living room"
          />
        </div>
        <div className="intro__inset drift">
          <img className="intro__inset-image" src="/images/pool.jpg" alt="Backyard with pool" />
        </div>
      </div>
    </section>
  );
}

export default Intro;
