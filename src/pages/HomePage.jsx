import { useState, useEffect } from 'react'

import { Timer } from '../components/Timer';
import { TopBar } from '../components/TopBar';
import { ButtonGroup } from '../components/ButtonGroup';
import { MODE, EVENT, machine} from '../config/machine'

export function HomePage() {

  //TODO Implement audio sound when timer hits 0
  //var audio = new Audio('../assets/timer-finished.mp3');

  function timeInMs(time) {
    return time * 60 * 1000
  }

  //TODO increment through every workphase that is not skipped, after
  // every 4th work phase do a big pause, not just a small one
  const [iteration, setIteration] = useState(1);

  //Set initial STATE to IDLE
  const [mode, setMode] = useState(MODE.IDLE);

  // Set idle to one of three phases "idle" | "running" | "paused"
  const [timerStatus, setTimerStatus] = useState("idle");

  // Set initial showed time as 25 minutes
  const [timeLeft, setTimeLeft] = useState(timeInMs(25));

    /* Action Handler */
  const runAction = (action, payload) => {
    switch(action) {
      
      case "INIT_WORK":
        setTimeLeft(timeInMs(payload.duration));
        setTimerStatus("idle");
        
        // React now always uses the latest value to increment from
        // safe pattern for asynchronus React state updates         
        setIteration(prev => prev + payload.iterationIncrement)
        break;

      // all case statements share the same scope, so we isolate const
      // pauseDuration to the local scope with the {} wrapping the case
      case "INIT_BREAK": {
        /* Implemented the 4th pause to be a 20 min pause */
        const pauseDuration = 
          iteration % 4 === 0 ? 20 : payload.duration
      
        setTimeLeft(timeInMs(pauseDuration));
        setTimerStatus("idle")
        break;
      }

      case "PAUSE":
        setTimerStatus("paused");
        break;
      
      case "RESUME":
        setTimerStatus("running");
        break;

      case "RESET":
        setTimeLeft(timeInMs(payload.duration));
        setTimerStatus("idle");
        setIteration(0);
        break;

      default:
        break;
    }
  }



  /* Dispatch function checks the current STATE and 
  deepending on the EVENT moves to the target STATE and 
  calls the ACTION */
  function dispatch(event) {

    /* woudlnt be current state more accurate? */
    const stateDefinition = machine[mode];
    const transition = stateDefinition[event];

    if (!transition) return;

    /* use object destructuring to access target, action and everything
    else into a payload object */
    const { target, action, ...payload} = transition;

    setMode(target);

    runAction(action, payload);
  }

    /*TIMER LOGIC, useEffect to Render the Page every time, the state 
    of "time" changes (dependency array). The "time" state gets set 
    and saved every 1000 ms to one less second of its previous value.
    also including the finish logic*/

  useEffect( () => {

    if (timerStatus === "paused" || timerStatus === "idle") return;
    if (timeLeft <= 0) {
      setTimerStatus("idle")
      dispatch(EVENT.TIMER_FINISHED)
      //TODO play audio
      //audio.play();
      return;
    };
      
    const timeoutId = setTimeout( () => {
      setTimeLeft(time => time-1000)
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [timerStatus, timeLeft]);
  
  return (
      
    <>
      <TopBar />

      <div className='grid-container'>

        <div className='phase-description'>
          {machine[mode].phaseDescription}
        </div>

        <div className='iteration'>
          iteration #{iteration}
        </div>

        <div className='timer'>
          <Timer timeLeft={timeLeft}/>
        </div>

        <div >
          <ButtonGroup
            machine={machine}
            mode={mode}
            timerStatus={timerStatus} 
            dispatch={dispatch}
            EVENT={EVENT}
          />
        </div>

      </div>
    </>

  );
}