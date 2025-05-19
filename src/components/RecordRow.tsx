import { type Record } from '../lib/useWsData';

export type RecordRowProps = {
  record: Record;
  onClick: () => void;
};

const RecordRow = ({ record, onClick }: RecordRowProps) => (
  <tr
    className="cursor-pointer odd:bg-gray-700 even:bg-gray-800"
    onClick={onClick}
  >
    <td>{record.id}</td>
    <td>{record.timestamp.toLocaleString()}</td>
    <td>{record.data}</td>
  </tr>
);

export default RecordRow;
