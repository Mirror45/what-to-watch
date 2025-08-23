'use client';

import 'react-toastify/dist/ReactToastify.css';

import { useParams, useRouter } from 'next/navigation';
import { FormEvent, Fragment, JSX, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { postComment } from '@/store/slices/comments/commentThunks';

const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

export function AddReviewForm(): JSX.Element {
  const router = useRouter();
  const params = useParams();
  const filmId = params.id as string;

  const dispatch = useAppDispatch();
  const { isPosting } = useAppSelector((state) => state.comments);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const isCommentValid =
    comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;
  const isRatingValid = rating > 0;
  const isFormValid = isCommentValid && isRatingValid;

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isFormValid || isPosting) {
      return;
    }

    try {
      await dispatch(postComment({ id: filmId, commentData: { comment, rating } })).unwrap();
      router.push(`/films/${filmId}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error('Failed to post comment. Please try again.');
    }
  };

  return (
    <div className="add-review">
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <fieldset disabled={isPosting} style={{ border: 'none', padding: 0 }}>
          <div className="rating">
            <div className="rating__stars">
              {Array.from({ length: 10 }, (_, i) => 10 - i).map((value) => (
                <Fragment key={value}>
                  <input
                    className="rating__input"
                    id={`star-${value}`}
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                  />
                  <label className="rating__label" htmlFor={`star-${value}`}>
                    Rating {value}
                  </label>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
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
