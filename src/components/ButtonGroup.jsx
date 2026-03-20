export function ButtonGroup({ machine, mode, timerStatus, dispatch, EVENT }) {
  return (
    // TODO change index to a reliable alternative for the key* 

    // Changed => (... to => {... because with the if 
    // staement we cant use an implicit return anymore 
    <div className='button-group'>
      {machine[mode].buttons.map((button, index) => {
        if (button.type === "PauseResume") {
          return (
            <button
              key={index}
              className={button.className}
              // If the Timer is running we should display the "Pause"
              // Button, otherwise the "Resume" Button 

              onClick={() => {
                if (timerStatus === "idle") {
                  dispatch(EVENT.START);
                }
                else if (timerStatus === "paused") {
                  dispatch(EVENT.RESUME);
                }
                else if (timerStatus === "running") {
                  dispatch(EVENT.PAUSE);
                }
              }}

            // Decision if Main Button is Start, Pause or Resume
            >
              {timerStatus === "idle"
                ? "Start"
                : timerStatus === "paused"
                  ? "Resume"
                  : "Pause"
              }
            </button>
          )
        }

        return (
          <button
            key={index}
            className={button.className}
            onClick={() => dispatch(button.event)}
          >
            {button.label}
          </button>
        )
      })}
    </div>
  )
}