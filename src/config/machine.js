/* The logic of the different states will be handled by a finite state machine
for this pmodoro project*/

/* Finite list of STATES*/
export const MODE = {
    IDLE: "IDLE",
    WORKING: "WORKING",
    PAUSING: "PAUSING",
};

/* List of EVENTS*/
export const EVENT = {
  START: "START",
  PAUSE: "PAUSE",
  SKIP: "SKIP",
  RESET: "RESET",
  TIMER_FINISHED: "TIMER_FINISHED"
};

/* Machine that contains the transitions */
export const machine = {
  /* Outgoing transitions from the state IDLE */
  [MODE.IDLE]: {

    phaseDescription: "Are you Ready to Pomodoro?",

    /* EVENT START leads to target STATE WORKING*/
    START: {
      target: MODE.WORKING,
      /* Sideeffect is the action "startWork" */
      action: "startWork"
    },

    buttons: [
      {label: "Start", className: "main-button", event: EVENT.START },
    ]
  },

  [MODE.WORKING]: {

    phaseDescription: "Working Phase",
    
    TIMER_FINISHED: {
      target: MODE.PAUSING,
      action: "startPause"
    },
    SKIP: {
      target: MODE.PAUSING,
      action: "startPause"
    },
    RESET: {
      target: MODE.WORKING,
      action: "startWork"
    },
    
    isRunning: true,

    buttons: [
      {label: "Skip", className: "secondary-button", event : EVENT.SKIP}
    ]
  },

  [MODE.PAUSING]: {

    phaseDescription: "Pause",

    TIMER_FINISHED:{
      target: MODE.WORKING,
      action: "startWork"
    },
    SKIP: {
      target: MODE.WORKING,
      action: "startWork"
    },
    RESET: {
      target: MODE.PAUSE,
      action: "startPause"
    },

    buttons: [
      {label: "Skip", className: "secondary-button", event : EVENT.SKIP}
    ]
  }
}
