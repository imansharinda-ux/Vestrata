function FeatureCard({ feature, delay }) {
  const cardClasses = [
    "bento",
    `bento--${feature.size}`,
    feature.color ? `bento--${feature.color}` : "",
    "scroll-reveal",
    delay > 1 ? `scroll-reveal--${delay}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const titleClass = {
    large: "bento__title bento__title--large",
    wide: "bento__title bento__title--medium",
    small: "bento__title",
  }[feature.size];

  const textClass = {
    large: "bento__text bento__text--large",
    wide: "bento__text",
    small: "bento__text bento__text--small",
  }[feature.size];

  const shadeClass = feature.size === "wide" ? "bento__shade bento__shade--soft" : "bento__shade";

  return (
    <a className={cardClasses} href={feature.href}>
      <img className="bento__image" src={feature.image} alt={feature.imageAlt} />
      <div className={shadeClass}></div>
      <div className="bento__body">
        <span className={titleClass}>{feature.title}</span>
        <span className={textClass}>{feature.text}</span>
      </div>
    </a>
  );
}

export default FeatureCard;
