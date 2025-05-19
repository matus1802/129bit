# 129bit homework

This project is developed with ViteJS, TailwindCSS and react-use-websocket.
Use npm v20.

Application will try to connect to WS. You can see the state in the first line (`Websocket state`).

If WS is open, then you can see the last timestamp from WS, two buttons - Start, Stop and only-intervowels filter checkbox.
To send start command, click Start button. To send stop command, click Stop button. Always only allowed buttons are enabled:
 - when sending command to BE, then both buttons are disabled, 
 - when start command sent and confirmed (= receiving records), only stop button is enabled
 - when stop command sent and confirmed, only start button is enabled

The table has three columns 
 - #id of the record in the local "db". Id is incremented when new record is received from BE
 - timestamp
 - data

The table shows max 20 rows. Each row is clickable and opens modal with two lines: Record and YES/NO (isIntervowel).


To install:

`npm i`

To run the project - vite will show you the url:

`npm run dev`

There is also one simple unit test. To run it:

`npm run test`

