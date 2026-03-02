import { useState, useEffect } from 'react'

import { Timer } from '../components/Timer';
import { MODE, EVENT, machine} from '../config/machine'

export function HomePage() {

  // Timerdurations in MilliSeconds
  const workPhaseDuration = 25 * 60 * 1000;
  const smallPuaseDuration = 5 * 60 * 1000; 
  const bigPauseDuration = 20 * 60 * 1000;

  //TODO increment through every workphase that is not skipped, after
  // every 4th work phase do a big pause, not just a small one
  const iterration = 0;

  //Set initial STATE to IDLE
  const [mode, setMode] = useState(MODE.IDLE);

  const [isRunning, setIsRunning] = useState(false)

  //Set
  const [timeLeft, setTimeLeft] = useState(workPhaseDuration);



  /*TIMER LOGIC, useEffect to Render the Page every time, the state 
   of "time" changes (dependency array). The "time" state gets set 
   and saved every 1000 ms to one less second of its previous value. */

  useEffect( () => {

    if (!isRunning) return;
    if (timeLeft <= 0) return;
      
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

    const { target, action } = transition;

    setMode(target);

    runAction(action);
  }
  


  /* Action Handler */

  const runAction = (action) => {
    switch(action) {
      
      case "startWork":
        setTimeLeft(workPhaseDuration);
        setIsRunning(true);
        break;

      case "startPause": 
        setTimeLeft(smallPuaseDuration);
        setIsRunning(true)
        break;

      /*case "resetPomodoro":
        setTimeLeft*/
      
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

      <div className='timer'>
        <Timer timeLeft={timeLeft}/>
      </div>

      <div className='buttons'>
        {/* TODO change index to a reliable alternative for the key*/} 
        
        {machine[mode].buttons.map((button, index) =>(
          
          <button 
            key = {index}
            className = {button.className}
            onClick = {() => dispatch(button.event)}
          >
            {button.label}
          </button>
        ))
        }
      </div>

    </div>

  );
}