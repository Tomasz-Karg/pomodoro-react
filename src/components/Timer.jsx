export function Timer({ timeLeft }){

// a function just to display the timeLeft that is given in the function call
  function getFormatedTime(time){ 
    let total_seconds = parseInt(Math.floor(time / 1000))
    let minutes = Math.floor(total_seconds / 60)
    let formatedMinutes = minutes.toString().padStart(2, '0');
    let seconds = total_seconds % 60
    let formatedSeconds = seconds.toString().padStart(2, '0');
    return `${formatedMinutes} : ${formatedSeconds}`;
  };

  return(
    <div>
      {getFormatedTime( timeLeft )}
    </div>
  );
}
