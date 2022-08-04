import { useEffect, useState } from "react";

/**
 * A widget that shows the current time.
 * @component
 * @category Widget
 * @subcategory Status Widget
 * @returns airplane make sound example
 */
const Time = () => {
  const [time, setTime] = useState();

  // Update time 2 times/second
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setTime(() => d.toLocaleString('en-UK', {hour12: false}))
    }, 500);

    return () => {
      clearInterval(id);
    }
  }, []);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  )
}
export default Time;