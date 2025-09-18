'use client';

import { useState } from 'react';

import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '@/constants';

export function useReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const isCommentValid =
    comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;
  const isRatingValid = rating > 0;
  const isFormValid = isCommentValid && isRatingValid;

  return {
    rating,
    setRating,
    comment,
    setComment,
    isFormValid,
  };
}
