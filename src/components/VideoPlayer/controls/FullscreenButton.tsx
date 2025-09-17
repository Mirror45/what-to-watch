import { PLAYER_BUTTONS, SPRITE_IDS } from '@/constants';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onClick: () => void;
}

export function FullscreenButton({ isFullscreen, onClick }: FullscreenButtonProps) {
  return (
    <button type="button" className="player__full-screen" onClick={onClick}>
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref={isFullscreen ? SPRITE_IDS.fullscreen : SPRITE_IDS.fullscreen} />
      </svg>
      <span>{PLAYER_BUTTONS.fullscreen}</span>
    </button>
  );
}
