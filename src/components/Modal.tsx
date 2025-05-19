import { type Record } from '../lib/useWsData';
import isIntervowel from '../lib/isIntervowel.ts';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
}

export default function Modal({ isOpen, onClose, record }: ModalProps) {
  if (!isOpen || !record) return null;

  return (
    <div
      className="fixed inset-0 z-500 flex items-center justify-center bg-gray-800/80"
      onClick={onClose}
    >
      <div className="relative w-full max-w-md rounded-xl bg-black p-8 shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <div className="flex flex-col items-center justify-center gap-2">
          <div>{record.data}</div>
          <div>{isIntervowel(record.data) ? 'YES' : 'NO'}</div>
        </div>
      </div>
    </div>
  );
}
