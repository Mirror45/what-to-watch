export const formatTime = (seconds: number): string => {
  const totalSeconds = Math.round(seconds);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  if (h > 0) {
    return `-${pad(h)}:${pad(m)}:${pad(s)}`;
  }
  return `-${pad(m)}:${pad(s)}`;
};
