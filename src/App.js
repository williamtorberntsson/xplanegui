import { useEffect, useState } from 'react';
import WAD from './components/WAD'
import { io } from "socket.io-client";
import { DATA_FREQUENCY, NR_AI_PLANES, USE_XPLANE_DATA } from './settings';
import './App.css';

/**
 * Head app function
 * @returns WAD
 */
function App() {

  // Socket
  const [socketInstance, setSocketInstance] = useState("");
  const [loading, setLoading] = useState(true);

  const [setupDone, setSetupDone] = useState(false);


  useEffect(() => {
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
  }, []);

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
    return (
      <p>Waiting for socket</p> /*<WAD /> */
    )
  }
}

export default App;