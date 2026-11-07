const MAX_RATING = 5;

function getInitials(text) {
  return text
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }) {
  const stars = "★".repeat(review.rating) + "☆".repeat(MAX_RATING - review.rating);

  return (
    <figure className="review">
      <span className="review__stars" role="img" aria-label={`${review.rating} out of ${MAX_RATING} stars`}>
        {stars}
      </span>
      <blockquote className="review__quote">“{review.quote}”</blockquote>
      <figcaption className="review__author">
        <span className="review__avatar" style={{ background: review.tint }}>
          {getInitials(review.place)}
        </span>
        <span className="review__details">
          <span className="review__name">{review.name}</span>
          <span className="review__place">{review.place}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default ReviewCard;
