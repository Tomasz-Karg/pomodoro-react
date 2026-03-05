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
  RESUME: "RESUME",
  SKIP: "SKIP",
  RESET: "RESET",
  TIMER_FINISHED: "TIMER_FINISHED",
  COMPLETED: "COMPLETED"
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
      action: "startWork",
      duration: 25,
      iterationIncrement: 0
    },

    buttons: [
      {label: "Start", className: "main-button", event: EVENT.START },
    ]
  },

  [MODE.WORKING]: {

    phaseDescription: "Working Phase",
    
    TIMER_FINISHED: {
      target: MODE.PAUSING,
      action: "startPause",
      duration: 5,
      iterationIncrement: 0
    },
    START: {
      target: MODE.WORKING,
      action: "startWork",
      duration: 25,
      iterationIncrement: 0
    },
    PAUSE: {
      target: MODE.WORKING,
      action: "pause"
    },
    RESUME: {
      target: MODE.WORKING,
      action: "resume",
      iterationIncrement: 0
    },
    SKIP: {
      target: MODE.PAUSING,
      action: "startPause",
      duration: 5,
      iterationIncrement: 0
    },
    RESET: {
      target: MODE.WORKING,
      action: "reset",
      duration: 25,
      iterationIncrement: 0
    },
    COMPLETED: {
      target: MODE.IDLE,
      action: "reset",
      duration: 25,
      iterationIncrement: 0,
      resetIteration: true
    },
    
    isRunning: true,

    buttons: [
      {type: "PauseResume", className: "main-button"},
      {label: "Reset", className: "secondary-button", event : EVENT.START},
      {label: "Skip", className: "secondary-button", event : EVENT.SKIP},
      {label: "Finished", className: "secondary-button", event : EVENT.COMPLETED}
    ]
  },

  [MODE.PAUSING]: {

    phaseDescription: "Pause",

    PAUSE: {
      target: MODE.PAUSING,
      action: "pause",
      iterationIncrement: 0
    },
    RESUME: {
      target: MODE.PAUSING,
      action: "resume",
      iterationIncrement: 0
    },
    RESET: {
      target: MODE.PAUSING,
      action: "startPause",
      duration: 5,
      iterationIncrement: 0
    },
    SKIP: {
      target: MODE.WORKING,
      action: "startWork",
      duration: 25,
      iterationIncrement: 1
    },
    TIMER_FINISHED:{
      target: MODE.WORKING,
      action: "startWork",
      duration: 25,
      iterationIncrement: 1
    },

    buttons: [
      {type: "PauseResume", className: "main-button"},
      {label: "Reset", className: "secondary-button", event : EVENT.RESET},
      {label: "Skip", className: "secondary-button", event : EVENT.SKIP}
    ]
  }
}
