import useWebSocket from 'react-use-websocket';
import { useCallback, useEffect, useState } from 'react';

export type WsMessage = {
  timeStamp?: string;
  data?: [string];
  info?: string;
};

export type Record = {
  id: number;
  timestamp: Date;
  data: string;
};

export type Recording = 'Started' | 'Stopped' | 'Waiting';

const WS_URL = 'wss://devel01.129bit.cz:7070/ws';

const useWsData = () => {
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);

  const [records, setRecords] = useState<Record[]>([]);
  const [lastTimestamp, setLastTimestamp] = useState<string | undefined>();
  const [recording, setRecording] = useState<Recording>('Stopped');

  useEffect(() => {
    if (lastMessage?.data) {
      const wsData = JSON.parse(lastMessage.data) as WsMessage;
      if (wsData.timeStamp) {
        setLastTimestamp(wsData.timeStamp);
      }
      if (wsData.info) {
        if (wsData.info === 'Started') {
          setRecording('Started');
        } else if (wsData.info === 'Stopped') {
          setRecording('Stopped');
        }
      }
      if (wsData.data) {
        setRecords(($records) => {
          let lastRecordId = $records.length ? $records[0].id : 0;
          return [
            ...wsData.data
              ?.map((data) => ({
                timestamp: new Date(),
                data,
                id: ++lastRecordId,
              }))
              .reverse()!,
            ...$records,
          ];
        });
      }
    }
  }, [lastMessage, setRecords]);

  const doStart = useCallback(() => {
    if (readyState && recording === 'Stopped') {
      setRecording('Waiting');
      sendMessage(JSON.stringify({ command: 'start' }));
    }
  }, [readyState, sendMessage, recording]);

  const doStop = useCallback(() => {
    if (readyState && recording === 'Started') {
      setRecording('Waiting');
      sendMessage(JSON.stringify({ command: 'stop' }));
    }
  }, [readyState, sendMessage, recording]);

  return {
    doStart,
    doStop,
    readyState,
    lastTimestamp,
    records,
    recording,
  };
};

export default useWsData;
