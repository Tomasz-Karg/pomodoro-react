<>
      {/* IDLE -> WORKING */}
      {mode === MODE.IDLE && (
        <>
        <div class="grid-container">

      <div class="title">
        Pomodoro Timer
      </div>
          <div class="phase-description">
            Are you ready?
          </div>
          <div class="timer">
            <Timer durationMinutes={25}/>
          </div>
          <div class="buttons">
            <button className="main-button"
              onClick={() => { 
                setMode(MODE.WORKING); 
              }
            }
            >
              Start
            </button>
          </div>
           </div>
        </>
      )}


      {/* WORKING -> WORK_ENDED
          WORKING -> FINISHED */}
      {mode === MODE.WORKING && (
        <div>
          <div class="phase-description">
            Working
          </div>
          <div class="timer">
            <Timer durationMinutes={25}/>
          </div>
          <div class="buttons">
            <button className="main-button"
              onClick={() => { setMode(MODE.WORK_ENDED) }}
            >
              Skip
            </button>
            <button className="secondary-button"
              onClick={() => { setMode(MODE.FINISHED) }}
            >
              Pomodoro finished
            </button>
          </div>
        </div>
      )}

      
      {/* WORK_ENDED -> PAUSING */}
      {mode === MODE.WORK_ENDED && (
        
        <>
          <div class="phase-description">
            Pause
          </div>

          <div class="timer">
            <Timer durationMinutes={5}/>
          </div>

          <div class="buttons">
            <button className="main-button"
              onClick={() => { setMode(MODE.PAUSING) }}
            >
              Ready for your Pause?
            </button>
          </div>
        </>
        )}

      {/* PAUSING -> PAUSE_ENDED */}
      {mode === MODE.PAUSING && (
        <>
          <div class="phase-description">
            Pause
          </div>

          <div class="timer">
            <Timer durationMinutes={5}/>
          </div>
          <div class="buttons">
            <button className="secondary-button"
              onClick={() => { setMode(MODE.PAUSE_ENDED) }}
            >
              Skip
            </button>
          </div>
        </>
      )}

      {/* PAUSE_ENDED -> WORKING */}
      {mode === MODE.PAUSE_ENDED && (

        <>
        <div class="phase-description">
            Are you ready?
          </div>
          <div class="timer">
            <Timer durationMinutes={25}/>
          </div>


          <div class="buttons">
            <button className="main-button"
              onClick={() => { setMode(MODE.WORKING) }}
            >
              Ready to continiue?
            </button>
          </div>
        </>