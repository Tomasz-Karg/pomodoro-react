import { useState, useEffect } from 'react'

import { Timer } from '../components/Timer';
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

  // Set Timer to be paused
  const [isRunning, setIsRunning] = useState(false)

  // Set initial showed time as 25 minutes
  const [timeLeft, setTimeLeft] = useState(timeInMs(25));



  /*TIMER LOGIC, useEffect to Render the Page every time, the state 
   of "time" changes (dependency array). The "time" state gets set 
   and saved every 1000 ms to one less second of its previous value. */

  useEffect( () => {

    if (!isRunning) return;
    if (timeLeft <= 0) {
      
      //TODO play audio
      //audio.play();
      return;
    };
      
    const timeoutId = setTimeout( () => {
      setTimeLeft(time => time-1000)
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isRunning, timeLeft]);

  /* TIMER finished logic*/

  useEffect ( () => {

    if (timeLeft > 0) return;
    if (!isRunning) return;

    // setIsRunning(false);
    
    dispatch(EVENT.TIMER_FINISHED);
    
  },[timeLeft])



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
  


  /* Action Handler */
  const runAction = (action, payload) => {
    switch(action) {
      
      case "startWork":
        setTimeLeft(timeInMs(payload.duration));
        setIsRunning(true);
        
        // React now always uses the latest value to increment from
        // safe pattern for asynchronus React state updates         
        setIteration(prev => prev + payload.iterationIncrement)
        break;

      // all case statements share the same scope, so we isolate const
      // pauseDuration to the local scope with the {} wrapping the case
      case "startPause": {
        /* Implemented the 4th pause to be a 20 min pause */
        const pauseDuration = 
          iteration % 4 === 0 ? 20 : payload.duration
      
        setTimeLeft(timeInMs(pauseDuration));
        setIsRunning(true)
        break;
      }
      
      case "reset":
        setTimeLeft(timeInMs(payload.duration));
        setIsRunning(false);
        break;

      case "pause":
        setIsRunning(false);
        break;
      
      case "resume":
        setIsRunning(true);
        break;

      default:
        break;
    }
  }
  


  return (
      
    <div className='grid-container'>
      <div className='title'>
        Pomodoro Timer
      </div>

      <div className='phase-description'>
        {machine[mode].phaseDescription}
      </div>

      <div className='iteration'>
        iteration #{iteration}
      </div>

      <div className='timer'>
        <Timer timeLeft={timeLeft}/>
      </div>

      <div className='buttons'>
        {/* TODO change index to a reliable alternative for the key*/} 

        {/* Changed => (... to => {... because with the if staement we
        cant use an implicit return anymore */}
        {machine[mode].buttons.map((button, index) => {
          if (button.type === "PauseResume"){
            return(
              <button 
                key = {index}
                className = {button.className}
                // If the Timer is running we should display the "Pause"
                // Button, otherwise the "Resume" Button 
                onClick = {() => dispatch(isRunning ? EVENT.PAUSE : EVENT.RESUME)}
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
            )
          }

          return(
            <button 
              key = {index}
              className = {button.className}
              onClick = {() => dispatch(button.event)}
            >
              {button.label}
            </button>
          )
        })
        }
      </div>

    </div>

  );
}