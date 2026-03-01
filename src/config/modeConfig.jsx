export const MODE = {
    IDLE: "idle",
    WORKING: "working",
    WORK_ENDED: "workEnded",
    PAUSING: "pausing",
    PAUSE_ENDED: "pauseEnded",
    FINISHED: "finished"
}

export const MODE_CONFIG = {
  [MODE.IDLE]: {
    phaseDescription: "Are you Ready?",
    buttons: [
      {label: "Start", className: "main-button", next: MODE.WORKING },
    ]
  }, 
  
  [MODE.WORKING]: {
    phaseDescription: "Working Phase",
    buttons: [
      {label: "Start", className: "main-button", next: MODE.WORKING },
      {label: "Skip", className: "secondary-button", next: MODE.WORK_ENDED}
    ]
  },

  [MODE.WORK_ENDED]: {
    phaseDescription: "Ready for your pause?",
    buttons: [
      {label: "Start", className: "main-button", next: MODE.PAUSING},
      {label: "Skip", className: "secondary-button", next: MODE.PAUSING}
    ]
  },

  [MODE.PAUSING]: {
    phaseDescription: "Pause",
    buttons: [
      {label: "Start", className: "main-button", next: MODE.PAUSING },
      {label: "Skip", className: "secondary-button", next: MODE.PAUSE_ENDED}
    ]
  },

  [MODE.PAUSE_ENDED]: {
    phaseDescription: "Ready to work?",
    buttons: [
      {label: "Start", className: "main-button", next: MODE.WORKING},
      {label: "Skip", className: "secondary-button", next: MODE.WORKING}
    ]
  },

  [MODE.FINISHED]: {
    phaseDescription: "Ihuuuu, Task finished",
    buttons: [
      {label: "New Pomodoro", className: "main-button", next: MODE.IDLE},
      {label: "Skip", className: "secondary-button", next: MODE.IDLE}
    ]
  }

}
