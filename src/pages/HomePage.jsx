import { useState } from 'react'
import { Timer } from '../components/Timer';

 // 6 Modes: IDLE, WORKING, WORK_ENDED, PAUSING, PAUSE_ENDED and FINISHED

  const MODE = Object.freeze({
  IDLE: "idle",
  WORKING: "working",
  WORK_ENDED: "workEnded",
  PAUSING: "pausing",
  PAUSE_ENDED: "pauseEnded",
  FINISHED: "finished"
})

export function HomePage() {

  const [mode, setMode] = useState(MODE.IDLE);

  return (
    <div>

      {/* IDLE -> WORKING */}
      {mode === MODE.IDLE && (
        <>
          <button className="button"
            onClick={() => { 
              setMode(MODE.WORKING); 
            }
          }
          >
            Start
          </button>
        </>
      )}


      {/* WORKING -> WORK_ENDED
          WORKING -> FINISHED */}
      {mode === MODE.WORKING && (
        <div>
          <div>
            <Timer className="blink" durationMinutes={1}/>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode(MODE.WORK_ENDED) }}
            >
              Skip
            </button>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode(MODE.FINISHED) }}
            >
              Pomodoro finished
            </button>
          </div>
        </div>
      )}

      
      {/* WORK_ENDED -> PAUSING */}
      {mode === MODE.WORK_ENDED && (
        <button className="button"
          onClick={() => { setMode(MODE.PAUSING) }}
        >
          Ready for your Pause?
        </button>)}

      {/* PAUSING -> PAUSE_ENDED */}
      {mode === MODE.PAUSING && (
        <>
          <div>
            <Timer durationMinutes={5}/>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode(MODE.PAUSE_ENDED) }}
            >
              Skip
            </button>
          </div>
        </>
      )}

      {/* PAUSE_ENDED -> WORKING */}
      {mode === MODE.PAUSE_ENDED && (
        <button className="button"
          onClick={() => { setMode(MODE.WORKING) }}
        >
          Ready to continiue?
        </button>)}

      {/* FINISHED -> IDLE */}
      {mode === 'finished' && (


        <div>
          <div>
            <label>Ihuuuu, Task finished!</label>
          </div>
          <div>
            <button className="button"
              onClick={() => { setMode(MODE.IDLE) }}
            >
              Return
            </button>
          </div>

        </div>
      )}

    </div>
  );
}