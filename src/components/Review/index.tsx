import { CommentGet } from '@/types/comment';

interface ReviewProps {
  review: CommentGet;
}

const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function Review({ review }: ReviewProps) {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>
        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={review.date}>
            {formatReviewDate(review.date)}
          </time>
        </footer>
      </blockquote>
      <div className="review__rating">{review.rating.toFixed(1)}</div>
    </div>
  );
}
