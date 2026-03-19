/* The logic of the different states will be handled by a finite state machine
for this pmodoro project*/

/* Finite list of STATES*/
export const MODE = {
    IDLE: "IDLE",
    WORK: "WORK",
    BREAK: "BREAK"
};

export const ACTION = {
  INIT_WORK: "INIT_WORK",
  INIT_BREAK: "INIT_BREAK",
  PAUSE: "PAUSE",
  RESUME: "RESUME",
  RESET: "RESET"
}

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
      target: MODE.WORK,
      /* Sideeffect is the action "initiateWork" */
      action: ACTION.INIT_WORK,
      duration: 25,
      iterationIncrement: 0
    },

    buttons: [
      {label: "Start", className: "main-button", event: EVENT.START },
    ]
  },

  [MODE.WORK]: {

    phaseDescription: "Working Phase",
    
    START: {
      target: MODE.WORK,
      action: ACTION.RESUME,
      duration: 25,
      iterationIncrement: 0
    },
    PAUSE: {
      target: MODE.WORK,
      action: ACTION.PAUSE
    },
    RESUME: {
      target: MODE.WORK,
      action: ACTION.RESUME,
      iterationIncrement: 0
    },
    SKIP: {
      target: MODE.BREAK,
      action: ACTION.INIT_BREAK,
      duration: 5,
      iterationIncrement: 0
    },
    RESET: {
      target: MODE.WORK,
      action: ACTION.INIT_WORK,
      duration: 25,
      iterationIncrement: 0
    },
    TIMER_FINISHED: {
      target: MODE.BREAK,
      action: ACTION.INIT_BREAK,
      duration: 5,
      iterationIncrement: 0
    },
    COMPLETED: {
      target: MODE.IDLE,
      action: ACTION.RESET,
      duration: 25,
      iterationIncrement: 0,
      resetIteration: true
    },

    buttons: [
      {type: "PauseResume", className: "main-button"},
      {label: "Reset", className: "secondary-button", event : EVENT.RESET},
      {label: "Skip", className: "secondary-button", event : EVENT.SKIP},
      {label: "Finished", className: "secondary-button", event : EVENT.COMPLETED}
    ]
  },

  [MODE.BREAK]: {

    phaseDescription: "Break",

    START: {
      target: MODE.BREAK,
      action: ACTION.RESUME,
      duration: 5,
      iterationIncrement: 0
    },
    PAUSE: {
      target: MODE.BREAK,
      action: ACTION.PAUSE,
      iterationIncrement: 0
    },
    RESUME: {
      target: MODE.BREAK,
      action: ACTION.RESUME,
      iterationIncrement: 0
    },
    RESET: {
      target: MODE.BREAK,
      action: ACTION.INIT_BREAK,
      duration: 5,
      iterationIncrement: 0
    },
    SKIP: {
      target: MODE.WORK,
      action: ACTION.INIT_WORK,
      duration: 25,
      iterationIncrement: 1
    },
    TIMER_FINISHED:{
      target: MODE.WORK,
      action: ACTION.INIT_WORK,
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
