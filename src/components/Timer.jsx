import { useState, useEffect} from 'react';

export function Timer( {durationMinutes} ){

  // Transform our Timerduration from Minutes to MilliSeconds
  const [time, setTime] = useState(parseInt(durationMinutes) * 60 * 1000);

  //useEffect to Render the Page every time, the state of "time" changes (dependency array). And the
  //"time" state gets set and saved every 1000 ms to one less second of its previous value.  
  useEffect( () => {

    if (time <= 0) return;

    const timeoutId = setTimeout( () => {
      setTime(time => time-1000)
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [time]);

  function getFormatedTime(time){ 
    let total_secconds = parseInt(Math.floor(time / 1000))
    let minutes = Math.floor(total_secconds / 60)
    let formatedMinutes = minutes.toString().padStart(2, '0');
    let seconds = total_secconds % 60
    let formatedSeconds = seconds.toString().padStart(2, '0');
    return `${formatedMinutes} : ${formatedSeconds}`;
  };


  return(
    <div>
      {getFormatedTime(time)}
    </div>
  );
}