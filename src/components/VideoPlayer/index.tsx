'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { Loading } from '@/components/Loading';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';
import { Film } from '@/types/film';

import { ExitButton } from './controls/ExitButton';
import { FullscreenButton } from './controls/FullscreenButton';
import { PlayButton } from './controls/PlayButton';
import { Timeline } from './controls/Timeline';

interface VideoPlayerProps {
  film: Film;
}

export function VideoPlayer({ film }: VideoPlayerProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const {
    isPlaying,
    isLoading,
    progress,
    timeLeft,
    isFullscreen,
    togglePlay,
    toggleFullscreen,
    handleTimelineMouseDown,
  } = useVideoPlayer(videoRef, timelineRef, playerRef);

  const handleExit = () => router.back();

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
        onClick={togglePlay}
      />

      <ExitButton onClick={handleExit} />

      <div className="player__controls">
        <div className="player__controls-row">
          <Timeline progress={progress} onMouseDown={handleTimelineMouseDown} />
          <div className="player__time-value">{timeLeft}</div>
        </div>

        <div className="player__controls-row">
          <PlayButton isPlaying={isPlaying} onClick={togglePlay} />
          <div className="player__name">{film.name}</div>
          <FullscreenButton isFullscreen={isFullscreen} onClick={toggleFullscreen} />
        </div>
      </div>
    </div>
  );
}
