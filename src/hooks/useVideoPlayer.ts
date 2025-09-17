import { RefObject, useEffect, useState } from 'react';

import { PROGRESS_MAX } from '@/constants';
import { formatTime } from '@/utils';

export function useVideoPlayer(
  videoRef: RefObject<HTMLVideoElement | null>,
  timelineRef: RefObject<HTMLDivElement | null>,
  playerRef: RefObject<HTMLDivElement | null>,
) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (isSeeking || isNaN(video.duration)) return;
      setProgress((video.currentTime / video.duration) * PROGRESS_MAX);
      setTimeLeft(formatTime(video.duration - video.currentTime));
    };

    const handleLoadedData = () => {
      setIsLoading(false);
      video.play().catch(() => console.error('Autoplay was prevented.'));
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => setIsLoading(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isSeeking]);

  // Drag & drop timeline
  useEffect(() => {
    const handleMouseMove = (evt: MouseEvent) => {
      if (!isSeeking || !timelineRef.current || !videoRef.current) return;

      const rect = timelineRef.current.getBoundingClientRect();
      const clickPos = evt.clientX - rect.left;
      const newProgress = Math.max(
        0,
        Math.min(PROGRESS_MAX, (clickPos / rect.width) * PROGRESS_MAX),
      );
      videoRef.current.currentTime = (newProgress / PROGRESS_MAX) * videoRef.current.duration;
      setProgress(newProgress);
    };

    const handleMouseUp = () => setIsSeeking(false);

    if (isSeeking) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSeeking]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!playerRef.current) return;
    if (!isFullscreen) playerRef.current.requestFullscreen();
    else document.exitFullscreen();
  };

  const handleTimelineMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true);

    const timeline = evt.currentTarget;
    if (!videoRef.current || isNaN(videoRef.current.duration)) return;

    const rect = timeline.getBoundingClientRect();
    const clickPos = evt.clientX - rect.left;
    const newProgress = (clickPos / rect.width) * PROGRESS_MAX;
    videoRef.current.currentTime = (newProgress / PROGRESS_MAX) * videoRef.current.duration;
    setProgress(newProgress);
  };

  return {
    isPlaying,
    isLoading,
    progress,
    timeLeft,
    isFullscreen,
    togglePlay,
    toggleFullscreen,
    handleTimelineMouseDown,
  };
}
