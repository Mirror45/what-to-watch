'use client';

import { useRouter } from 'next/navigation';
import { JSX, MouseEvent, useEffect, useRef, useState } from 'react';

import { Loading } from '@/components/Loading';
import { PLAYER_BUTTONS, PROGRESS_MAX, SPRITE_IDS } from '@/constants';
import { Film } from '@/types/film';
import { formatTime } from '@/utils';

interface VideoPlayerProps {
  film: Film;
}

export function VideoPlayer({ film }: VideoPlayerProps): JSX.Element {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('waiting', () => setIsLoading(true));
    video.addEventListener('playing', () => setIsLoading(false));
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('waiting', () => setIsLoading(true));
      video.removeEventListener('playing', () => setIsLoading(false));
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isSeeking]);

  useEffect(() => {
    const handleMouseMove = (evt: globalThis.MouseEvent) => {
      if (
        !isSeeking ||
        !timelineRef.current ||
        !videoRef.current ||
        isNaN(videoRef.current.duration)
      )
        return;

      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      const clickPosition = evt.clientX - rect.left;
      const timelineWidth = rect.width;

      const newProgressPercent = Math.max(
        0,
        Math.min(PROGRESS_MAX, (clickPosition / timelineWidth) * PROGRESS_MAX),
      );
      const newTime = (newProgressPercent / PROGRESS_MAX) * videoRef.current.duration;

      videoRef.current.currentTime = newTime;
      setProgress(newProgressPercent);
    };

    const handleMouseUp = () => {
      setIsSeeking(false);
    };

    if (isSeeking) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isSeeking]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (!playerRef.current) return;
    if (!isFullscreen) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleExit = () => {
    router.back();
  };

  const handleTimelineMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    setIsSeeking(true);
    if (!timelineRef.current || !videoRef.current || isNaN(videoRef.current.duration)) return;

    const timeline = timelineRef.current;
    const rect = timeline.getBoundingClientRect();
    const clickPosition = evt.clientX - rect.left;
    const newProgressPercent = (clickPosition / rect.width) * PROGRESS_MAX;
    const newTime = (newProgressPercent / PROGRESS_MAX) * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setProgress(newProgressPercent);
  };

  return (
    <div className="player" ref={playerRef}>
      {isLoading && <Loading />}
      <video
        ref={videoRef}
        src={film.videoLink}
        className="player__video"
        poster={film.posterImage}
        autoPlay
        muted
        onClick={handlePlayPause}
      />
      <button type="button" className="player__exit" onClick={handleExit}>
        {PLAYER_BUTTONS.exit}
      </button>
      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time" ref={timelineRef} onMouseDown={handleTimelineMouseDown}>
            <progress className="player__progress" value={progress} max={PROGRESS_MAX} />
            <div className="player__toggler" style={{ left: `${progress}%` }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{timeLeft}</div>
        </div>
        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayPause}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isPlaying ? SPRITE_IDS.pause : SPRITE_IDS.play} />
            </svg>
            <span>{isPlaying ? PLAYER_BUTTONS.pause : PLAYER_BUTTONS.play}</span>
          </button>
          <div className="player__name">{film.name}</div>
          <button type="button" className="player__full-screen" onClick={handleFullscreen}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref={isFullscreen ? SPRITE_IDS.fullscreen : SPRITE_IDS.fullscreen} />
            </svg>
            <span>{PLAYER_BUTTONS.fullscreen}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
