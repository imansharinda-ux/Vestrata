import LineMask from "./LineMask.jsx";
import FeatureCard from "./FeatureCard.jsx";
import { features } from "../data/features.js";

function Features() {
  return (
    <section className="features">
      <h2 className="section-title">
        <LineMask className="line-mask--scroll">What Vestrata does</LineMask>
      </h2>
      <div className="features__grid">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} delay={index + 1} />
        ))}
      </div>
    </section>
  );
}

export default Features;
