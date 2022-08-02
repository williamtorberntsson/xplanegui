import { useEffect, useMemo, useState } from "react"

/**
 * Custom Hook to play audio.
 * @function
 * @param {string} filename filename for audio file 
 * @returns {Array<*, function>}
 */
const useAudio = (filename) => {
  const audio = useMemo(() => new Audio(require(`../assets/sound/${filename}`)), [filename]);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    audio.currentTime = 0;
    audio.play();
  }

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    }
  }, [audio])
  
  return [playing, play]
}
export default useAudio;