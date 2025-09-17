import { PLAYER_BUTTONS } from '@/constants';

interface ExitButtonProps {
  onClick: () => void;
}

export function ExitButton({ onClick }: ExitButtonProps) {
  return (
    <button type="button" className="player__exit" onClick={onClick}>
      {PLAYER_BUTTONS.exit}
    </button>
  );
}
