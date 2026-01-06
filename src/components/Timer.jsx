import { useState, useEffect} from 'react';

export function Timer( {durationMinutes} ){


  const [time, setTime] = useState(parseInt(durationMinutes) * 60 * 1000);

  useEffect( () => {

    if (time < 0) return;

    const timeoutId = setTimeout( () => {
      setTime(time => time-1000)
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [time]);




  return(
    <div>
      {time}
    </div>
  );
}