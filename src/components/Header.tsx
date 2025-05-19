import type { Recording } from '../lib/useWsData.tsx';

export interface HeaderProps {
  timestamp?: string;
  onStart: () => void;
  onStop: () => void;
  recordingState: Recording;
  showOnlyIntervowels: boolean;
  onSetShowOnlyIntervowels: (show: boolean) => void;
}

const Header = ({
  timestamp,
  onStart,
  onStop,
  recordingState,
  showOnlyIntervowels,
  onSetShowOnlyIntervowels,
}: HeaderProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-1xl">
        Last WS timestamp:{' '}
        {timestamp ? new Date(timestamp).toLocaleString() : '-'}
      </div>
      <div className="flex flex-row items-center gap-2">
        <button
          className="rounded border p-2 disabled:text-gray-500"
          onClick={onStart}
          disabled={
            recordingState === 'Started' || recordingState === 'Waiting'
          }
        >
          Start
        </button>
        <button
          className="rounded border p-2 disabled:text-gray-500"
          onClick={onStop}
          disabled={
            recordingState === 'Stopped' || recordingState === 'Waiting'
          }
        >
          Stop
        </button>
        <label className="ml-5 flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnlyIntervowels}
            className="scale-150 accent-gray-400"
            onChange={(event) => onSetShowOnlyIntervowels(event.target.checked)}
          />
          Only intervowels
        </label>
      </div>
    </div>
  );
};

export default Header;
