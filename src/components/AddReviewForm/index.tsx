'use client';

import 'react-toastify/dist/ReactToastify.css';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent, JSX } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { useReviewForm } from '@/hooks/useReviewForm';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postComment } from '@/store/slices/comments/commentThunks';

import { RatingStars } from './RatingStars';
import { ReviewTextarea } from './ReviewTextarea';

export function AddReviewForm(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const filmId = params.id as string;

  const dispatch = useAppDispatch();
  const { isPosting } = useAppSelector((state) => state.comments);

  const { rating, setRating, comment, setComment, isFormValid } = useReviewForm();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isFormValid || isPosting) return;

    try {
      await dispatch(postComment({ id: filmId, commentData: { comment, rating } })).unwrap();
      router.push(`/films/${filmId}`);
    } catch {
      toast.error('Failed to post comment. Please try again.');
    }
  };

  return (
    <div className="add-review">
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      <form className="add-review__form" onSubmit={handleSubmit}>
        <fieldset disabled={isPosting} style={{ border: 'none', padding: 0 }}>
          <div className="rating">
            <RatingStars rating={rating} onChange={setRating} />
          </div>

          <div className="add-review__text">
            <ReviewTextarea value={comment} onChange={setComment} />
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                disabled={!isFormValid || isPosting}
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
