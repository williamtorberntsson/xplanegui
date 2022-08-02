import { useEffect, useState } from "react";
import useAudio from "../../useAudio";

/**
 * An example widget. A widget that shows the current time and makes
 * a sound every minute.
 * @component
 * @category Widget
 * @subcategory Status Widget
 * @returns airplane make sound example
 */
const SoundExample = () => {
  const [audio, play] = useAudio('retro_notice.wav');
  const [seconds, setSeconds] = useState();
  const [minutes, setMinutes] = useState();
  const [time, setTime] = useState();

  // Update count every minute
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      console.log(d.getMinutes())
      setSeconds(() => d.getSeconds());
      setMinutes(() => d.getMinutes());
      setTime(() => d.toLocaleString('en-UK', {hour12: false}))
    }, 100);

    return () => {
      clearInterval(id);
    }
  }, []);

  // Runs once every minute
  useEffect(() => {
    play()
  }, [minutes])


  return (
    <div>
      <p>{time}</p>
      <p>Seconds to next beep: {60 - seconds} </p>
    </div>
  )
}
export default SoundExample;