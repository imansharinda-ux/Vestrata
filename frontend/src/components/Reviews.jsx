import LineMask from "./LineMask.jsx";
import ReviewCard from "./ReviewCard.jsx";
import { reviews } from "../data/reviews.js";

const REVIEWS_PER_ROW = 6;

function ReviewRow({ items, reverse }) {
  const trackClass = reverse ? "reviews__track reviews__track--reverse" : "reviews__track";
  const loopedItems = [...items, ...items];

  return (
    <div className="reviews__row">
      <div className={trackClass}>
        {loopedItems.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </div>
  );
}

function Reviews() {
  const firstRow = reviews.slice(0, REVIEWS_PER_ROW);
  const secondRow = reviews.slice(REVIEWS_PER_ROW);

  return (
    <section className="reviews">
      <h2 className="section-title section-title--center">
        <LineMask className="line-mask--scroll">What investors say</LineMask>
        <LineMask className="line-mask--scroll">about Vestrata.</LineMask>
      </h2>
      <div className="reviews__rows">
        <ReviewRow items={firstRow} />
        <ReviewRow items={secondRow} reverse />
      </div>
    </section>
  );
}

export default Reviews;
