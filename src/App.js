import { useEffect, useState } from 'react';
import WAD from './components/WAD'
import { io } from "socket.io-client";
import { DATA_FREQUENCY, NR_AI_PLANES } from './settings';
import './App.css';

/**
 * Head app function
 * @returns WAD
 */
function App() {

  // Socket
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonStatus, setButtonStatus] = useState(true);

  const [setupDone, setSetupDone] = useState(false);


  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io("localhost:5050/", {
        transports: ["websocket"],
        cors: {
          origin: "http://localhost:3000/",
        },
      });

      setSocketInstance(socket);

      socket.on("connect", (data) => {
        console.log(data);
      });

      setLoading(false);

      socket.on("setup", (data) => {
        console.log("Recieved setup:\n", data)
        setSetupDone(true);
      })

      socket.on("disconnect", (data) => {
        console.log(data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [buttonStatus]);

  if (!loading) {
    // Send setup data to xplane
    socketInstance.emit("setup", {
      freq: DATA_FREQUENCY,
      nr_ai: NR_AI_PLANES
    })
    if (setupDone) {
      return (
        <WAD socket={socketInstance} />
      )
    } else {
      return <h1>Waiting for setup</h1>
    }
  } else {
    <p>Loading...</p>
  }
}

export default App;