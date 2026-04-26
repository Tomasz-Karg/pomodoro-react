export function MuteButton( {isMuted, toggleMute} ){
  return (
    <button
      className="mute-button"
      onClick={toggleMute}
    > 
      {isMuted? "Muted" : "Sound On"}
    </button>
  )
}