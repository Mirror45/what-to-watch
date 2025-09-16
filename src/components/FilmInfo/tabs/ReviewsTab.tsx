import { Review } from '@/components/Review';
import { CommentGet } from '@/types/comment';

interface ReviewsTabProps {
  comments: CommentGet[];
  isLoading: boolean;
}

export function ReviewsTab({ comments, isLoading }: ReviewsTabProps) {
  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.map((comment) => (
          <Review key={comment.id} review={comment} />
        ))}
      </div>
    </div>
  );
}
