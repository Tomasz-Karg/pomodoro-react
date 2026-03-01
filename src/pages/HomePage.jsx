import { useState } from 'react'
import { Timer } from '../components/Timer';
import { MODE, MODE_CONFIG } from '../config/modeConfig'

 // 6 Modes: IDLE, WORKING, WORK_ENDED, PAUSING, PAUSE_ENDED and FINISHED



export function HomePage() {

  const [mode, setMode] = useState(MODE.IDLE);

  return (
      
    <div className='grid-container'>
      <div className='title'>
        Pomodoro Timer
      </div>

      <div className='phase-description'>
        {MODE_CONFIG[mode].phaseDescription}
      </div>

      <div className='timer'>
        <Timer durationMinutes={25}/>
      </div>

      <div className='buttons'>
        {/* TODO change index to a reliable alternative for the key*/} 
        
        {MODE_CONFIG[mode].buttons.map((button, index) =>(
          
          <button 
            key = {index}
            className = {button.className}
            onClick = {() => setMode(button.next)}
          >
            {button.label}
          </button>
        ))
        }
      </div>

    </div>

  );
}