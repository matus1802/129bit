import Header from './components/Header.tsx';
import useWsData from './lib/useWsData.tsx';
import RecordRow from './components/RecordRow.tsx';
import { useMemo, useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import isIntervowel from './lib/isIntervowel.ts';
import { type Record } from './lib/useWsData';
import Modal from './components/Modal.tsx';

function App() {
  const { records, lastTimestamp, doStart, doStop, readyState, recording } =
    useWsData();

  const [isOpen, setIsOpen] = useState<Record | null>(null);

  const [showOnlyIntervowels, setShowOnlyIntervowels] =
    useState<boolean>(false);

  const state = useMemo(() => {
    switch (readyState) {
      case ReadyState.UNINSTANTIATED:
        return 'Connecting';
      case ReadyState.CLOSED:
        return 'Closed';
      case ReadyState.CONNECTING:
        return 'Connecting';
      case ReadyState.CLOSING:
        return 'Closing';
      case ReadyState.OPEN:
        return 'Open';
    }
  }, [readyState]);

  const filteredRecords = useMemo(() => {
    let i = 0;
    const returnArray = [];
    while (returnArray.length < 20 && i < records.length) {
      if (
        (showOnlyIntervowels && isIntervowel(records[i].data)) ||
        !showOnlyIntervowels
      ) {
        returnArray.push(records[i]);
      }
      i++;
    }
    return returnArray;
  }, [records, showOnlyIntervowels]);

  return (
    <div className="flex flex-col">
      <p>Websocket state: {state}</p>
      {readyState === ReadyState.OPEN && (
        <>
          <Header
            timestamp={lastTimestamp}
            onStart={doStart}
            onStop={doStop}
            recordingState={recording}
            showOnlyIntervowels={showOnlyIntervowels}
            onSetShowOnlyIntervowels={setShowOnlyIntervowels}
          />
          <table className="dataTable table-auto text-left">
            <thead>
              <tr>
                <th>#</th>
                <th>Time</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <RecordRow
                  key={record.id}
                  record={record}
                  onClick={() => {
                    setIsOpen(record);
                  }}
                />
              ))}
            </tbody>
          </table>
        </>
      )}
      <Modal
        isOpen={Boolean(isOpen)}
        record={isOpen}
        onClose={() => {
          setIsOpen(null);
        }}
      />
    </div>
  );
}

export default App;
