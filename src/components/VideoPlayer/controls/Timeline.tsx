import { PROGRESS_MAX } from '@/constants';

interface TimelineProps {
  progress: number;
  onMouseDown: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export function Timeline({ progress, onMouseDown }: TimelineProps) {
  return (
    <div className="player__time" onMouseDown={onMouseDown}>
      <progress className="player__progress" value={progress} max={PROGRESS_MAX} />
      <div className="player__toggler" style={{ left: `${progress}%` }}>
        Toggler
      </div>
    </div>
  );
}
