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

  // Hide div on load
  $('#trivia-game').hide();

  // When you click start Game button
  $('#btn-start-game').on('click', function(e) {
    e.preventDefault();
    $('#start-game').hide();
    displayQuestion();
  });

  function displayQuestion() {

    // Setup question/answer variables
    var question = questions[currentQuestion];
    $('#right-answer').hide();
    $('#wrong-answer').hide();

    // Shows #trivia-game container and adds class for animation
    $('#trivia-game').show().addClass('bounceIn');
    $('#question').text( question.question );
    $('#answers').html('');

    // Cretes div for each answer
    for ( var i = 0; i < question.choices.length; i++ ) {
      var answerDiv = $('<div class="answer btn btn-answer">').text( question.choices[i] );
      $('#answers').append( answerDiv );
    }

    // Run startTimer function every second
    setInterval( startTimer, 1000);

    // When click on of the answers
    $(document).on('click', '.answer', function(e) {
      var guess = $(this).text();
      checkGuess( guess, question );
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
      counter = 10;
      $('#timer-interval').html(counter);
    }
  }

  // Stops Timer
  function stopTimer() {
    clearInterval(counter);
  }

  // Checks if guess is correct
  function checkGuess( guess, question ) {

    var correct = question.correctAnswer;

    // Shows #right-answer/#wrong-answer div depending on guess
    if ( guess === question.choices[correct] ) {
      $('#right-answer').show().addClass('flash');
    } else {
      $('#wrong-answer').show().addClass('flash');
    }
  }

});