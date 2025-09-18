'use client';

type ReviewTextareaProps = {
  value: string;
  onChange: (text: string) => void;
};

export function ReviewTextarea({ value, onChange }: ReviewTextareaProps) {
  return (
    <textarea
      className="add-review__textarea"
      name="review-text"
      id="review-text"
      placeholder="Review text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
