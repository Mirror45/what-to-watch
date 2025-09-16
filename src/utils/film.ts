export const formatRunTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

export const getRatingLevel = (rating: number): string => {
  if (rating >= 10) return 'Awesome';
  if (rating >= 8) return 'Very good';
  if (rating >= 5) return 'Good';
  if (rating >= 3) return 'Normal';
  return 'Bad';
};
