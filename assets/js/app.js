$(document).ready(function($) {

  // Variables
  var counter = 10;
  var currentQuestion = 0;

  var questions = [{
    question: "What is the population of Brazil?",
    choices: ["145 million", "199 million", "182 million", "205 million"],
    correctAnswer: 1
  }, {
    question: "What is 27*14?",
    choices: ["485", "634", "408", "528"],
    correctAnswer: 2
  }, {
    question: "What is the busiest train station in the world?",
    choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
    correctAnswer: 1
  }, {
    question: "What is the longest river?",
    choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    correctAnswer: 0
  }, {
    question: "What is the busiest tube station in the London?",
    choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
    correctAnswer: 0
  }]

  // Hide div's on load
  $('#right-answer').hide();
  $('#wrong-answer').hide();
  $('#trivia-game').hide();

  $('#start-game').on('click', function(e) {
    e.preventDefault();
    $(this).hide();
    displayQuestion();
  });

  function displayQuestion() {

    // Setup question/answer variables
    var question = questions[currentQuestion];
    var correct = question.correctAnswer;

    // Shows #trivia-game container and adds class for animation
    $('#trivia-game').show().addClass('bounceIn');
    $('#question h1').html( question.question );
    $('#answers').html('');

    // Cretes div for each answer
    for ( var i = 0; i < question.choices.length; i++ ) {
      var answerDiv = $('<div class="answer btn btn-default">').text( question.choices[i] );
      $('#answers').append( answerDiv );
    }

    // setInterval( startTimer, 1000);

    // When click on of the answers
    $(document).on('click', '.answer', function(e) {
      var guess = $(this).text();
      console.log(guess);
      checkGuess(guess);
    });


  }



  // Starts Timer
  function startTimer() {
    counter--;
    $('#timer-interval').html(counter);

    if ( counter === 0 ) {
      stopTimer();

      currentQuestion++;
      stopTimer();
      displayQuestion();
    }
  }

  // Stops Timer
  function stopTimer() {
    clearInterval(counter);
    counter = 10;
  }

  function checkGuess( guess ) {

  }

});