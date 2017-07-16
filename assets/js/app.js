$(document).ready(function($) {

  // Variables
  var counter;
  var counterInterval;
  var counterRunning = false;
  var questionCounter = 0;
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

  // Generates each question
  function displayQuestion() {

    // Reset Counter
    counter = 10;
    $('#timer-interval').html(counter);

    // Setup currentQuestion
    currentQuestion = questions[questionCounter];

    console.log(questionCounter);
    console.log(currentQuestion);

    // Hide div on load
    $('#right-answer, #wrong-answer').hide();

    // Run startTimer function every second if not currently running
    if ( !counterRunning ) {
      counterInterval = setInterval( startTimer, 1000 );
      counterRunning = true;
    }

    // Shows #trivia-game container and adds class for animation
    $('#trivia-game').show().addClass('bounceIn');

    // Add question to h1 DOM
    $('#question').text( currentQuestion.question );

    // Clear out #answers html next time function is called
    $('#answers').html('');

    // Cretes div for each answer
    for ( var i = 0; i < currentQuestion.choices.length; i++ ) {
      var answerDiv = $('<div class="answer btn btn-answer">').text( currentQuestion.choices[i] );
      $('#answers').append( answerDiv );
    }

    // When click on an answer
    $('.answer').on('click', function(e) {
      $(this).addClass('btn-active');
      var guess = $(this).text();
      checkGuess( guess, currentQuestion );
    });

    if ( questionCounter > questions.length ) {
      console.log('Done');
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
      $('#right-answer').text('Good Job, that is the Correct answer!!!');
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
    questionCounter++;

    console.log( 'Answered Correct : ' + correctAnswer );
    console.log( 'Answered Wrong : ' + wrongAnswer );
    console.log( 'Unanswered : ' + unanswered );
    setTimeout( displayQuestion, 4000 );
    $('#trivia-game').removeClass('bounceIn');
  }

});