import { PLAYER_BUTTONS, SPRITE_IDS } from '@/constants';

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

export function PlayButton({ isPlaying, onClick }: PlayButtonProps) {
  return (
    <button type="button" className="player__play" onClick={onClick}>
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref={isPlaying ? SPRITE_IDS.pause : SPRITE_IDS.play} />
      </svg>
      <span>{isPlaying ? PLAYER_BUTTONS.pause : PLAYER_BUTTONS.play}</span>
    </button>
  );
}
