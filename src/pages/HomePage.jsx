import { useState } from 'react'
import { CountDownTimer } from '../components/CountDownTimer';


const MODE = Object.freeze({
  IDLE: "idle",
  WORKING: "working",
  WORK_ENDED: "workEnded",
  PAUSING: "pausing",
  PAUSE_ENDED: "pauseEnded",
  FINISHED: "finished"
})


export function HomePage() {

  // 6 Modes: idle, working, workEnded, pausing, pauseEnded and finished
  const [mode, setMode] = useState(MODE.IDLE);

//Add comments, use constMode insted of just strings
//add timer

  return (
    <div>

      {mode === MODE.IDLE && (
        <button className="button"
          onClick={() => { 
            setMode(MODE.WORKING); 
          }
        }
        >
          Start
        </button>)}

      {mode === 'working' && (
        <div>
          <div>
            <CountDownTimer durationMinutes={25}/>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode('confirmPause') }}
            >
              Skip
            </button>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode('finished') }}
            >
              Pomodoro finished
            </button>
          </div>
        </div>
      )}

      {mode === 'confirmPause' && (
        <button className="button"
          onClick={() => { setMode('pausing') }}
        >
          Ready for your Pause?
        </button>)}

      {mode === 'pausing' && (
        <>
          <div>
            <CountDownTimer durationMinutes={5}/>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode('confirmWorking') }}
            >
              Skip
            </button>
          </div>
        </>
      )}

      {mode === 'confirmWorking' && (
        <button className="button"
          onClick={() => { setMode('working') }}
        >
          Ready to continiue?
        </button>)}

      {mode === 'finished' && (


        <div>
          <div>
            <label>Ihuuuu, Task finished!</label>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode('idle') }}
            >
              Return
            </button>
          </div>

        </div>
      )}

    </div>
  );
}