$(document).ready(function($) {

  // Variables
  var counter;
  var counterInterval;
  var counterRunning = false;
  var currentQuestion = 0;
  var correctAnswer = 0;
  var wrongAnswer = 0;
  var unanswered = 0;
  var questions = [{
    question: "What is the population of Brazil?",
    choices: ["145 million", "199 million", "182 million", "205 million"],
    correctAnswer: 1
  }, {
    question: "What is 27*14?",
    choices: ["485", "634", "408", "528"],
    correctAnswer: 2
  }, {
    question: "What is the longest river?",
    choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
    correctAnswer: 0
  }, {
    question: "What is the busiest tube station in the London?",
    choices: ["Waterloo", "Baker Street", "Kings Cross", "Victoria"],
    correctAnswer: 0
  }];

  // Hide div on load
  $('#trivia-game').hide();

  // When you click #btn-start-game
  $('#btn-start-game').on('click', function(e) {
    $('#start-game').hide();
    displayQuestion();
  });

  function displayQuestion() {

    console.log(currentQuestion);

    counter = 30;
    $('#timer-interval').html(counter);

    // Setup question/answer variables
    var question = questions[currentQuestion];
    $('#right-answer, #wrong-answer').hide();

    // Run startTimer function every second
    if ( !counterRunning ) {
      counterInterval = setInterval( startTimer, 1000 );
      counterRunning = true;
    }

    // Shows #trivia-game container and adds class for animation
    $('#trivia-game').show().addClass('bounceIn');
    $('#question').text( question.question );
    $('#answers').html('');

    // Cretes div for each answer
    for ( var i = 0; i < question.choices.length; i++ ) {
      var answerDiv = $('<div class="answer btn btn-answer">').text( question.choices[i] );
      $('#answers').append( answerDiv );
    }

    // When click on of the answers
    $(document).on('click', '.answer', function(e) {
      var guess = $(this).text();
      checkGuess( guess, question );
    });

    if ( currentQuestion > questions.length ) {
      console.log('Hello');
    }

  }

  // Starts Timer
  function startTimer() {
    counter--;
    $('#timer-interval').html(counter);

    if ( counter === 0 ) {
      unanswered++;
      nextQuestion();
    }
  }

  // Stops Timer
  function stopTimer() {
    clearInterval( counterInterval );
    counterRunning  = false;
  }

  // Checks if guess is correct
  function checkGuess( guess, question ) {
    var correctNumber = question.correctAnswer;
    var correct = question.choices[correctNumber];

    // Shows #right-answer/#wrong-answer div depending on guess
    if ( guess === correct ) {
      correctAnswer++;
      $('#right-answer').show().addClass('flash');
      $('#right-answer').text('Good Job, that is the Correct answer!!!')
    } else {
      wrongAnswer++;
      $('#wrong-answer').show().addClass('flash');
      $('#wrong-answer').text( 'Nice Try, but that is the Wrong answer!!! The correct answer is: ' + correct );
    }

    nextQuestion();
  }

  // Show the next question in questions array
  function nextQuestion() {
    stopTimer();
    currentQuestion++;
    setTimeout( displayQuestion, 3000);
    $('#trivia-game').removeClass('bounceIn');
  }

});