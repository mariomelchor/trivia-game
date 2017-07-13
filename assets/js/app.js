$(document).ready(function($) {

  // Variables
  var counter = 30;

  // Hide dives on load
  $('#right-answer').hide();
  $('#wrong-answer').hide();

  // setInterval( startTimer, 1000);

  function startTimer() {
    counter--;
    $('#timer-interval').html(counter);

    if ( counter === 0 ) {
      stopTimer();
      alert("Time Up!");
    }
  }

  function stopTimer() {
    clearInterval(counter);
  }

});