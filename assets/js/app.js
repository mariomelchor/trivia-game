$(document).ready(function($) {

  // Variables
  var counter;
  var counterInterval;
  var counterRunning = false;
  var questionCounter = 0;
  var correctAnswer = 0;
  var wrongAnswer = 0;
  var unanswered = 0;
  var questions;
  var currentQuestion;
  
  // Load questions from json file.
  $.getJSON('assets/js/questions.json')
    .done(function(data){
      questions = data;
    })
    .fail(function() {
      console.log('There was an error loading the questions');
    });

  // Hide div on load
  $('#trivia-game, #scores').hide();

  // When you click #btn-start-game
  $(document).on('click', '.btn-start-game', function(e) {
    $('#start-game').hide();
    $('#trivia-game').show();
    displayQuestion();
  });

  // When answer is clicked
  $(document).on('click', '.answer', function(e) {
    $(this).addClass('btn-active');
    var guess = $(this).text();
    checkGuess( guess, currentQuestion );
  });

  // Generates each question
  function displayQuestion() {

    resetCounter();

    // Check to see if game is over if no more questions
    if ( questionCounter === questions.length ) {
      stopTimer();
      showScore();
      return;
    }

    // Setup currentQuestion
    currentQuestion = questions[questionCounter];

    // Run startTimer function every second if not currently running
    if ( !counterRunning ) {
      counterInterval = setInterval( startTimer, 1000 );
      counterRunning = true;
    }

    // Run function to display current question
    displayCurrentQuestion(currentQuestion);

  }

  // Reset Counter
  function resetCounter(){
    counter = 24;

    $('#right-answer, #wrong-answer, #time-out').hide();
    $('#timer-interval').html(counter);
  }

  // function to display current question
  function displayCurrentQuestion(question){

    $('#trivia-game').addClass('bounceIn');
    $('#question').text( question.question ).addClass('animated bounce');
    $('#answers').empty();

    for ( var i = 0; i < question.choices.length; i++ ) {
      var answerDiv = $('<div class="answer btn btn-answer animated fadeIn">').text( question.choices[i] );
      $('#answers').append( answerDiv );
    }
  }

  // Starts Timer
  function startTimer() {
    counter--;
    $('#timer-interval').html(counter);

    if ( counter === 0 ) {
      unanswered++;
      $('#time-out').show().addClass('flash');
      $('#time-out').text('Shot Clock Expired, You ran out of time!!!');
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
      $('#right-answer').text('Swoosh, that is the Correct answer!!!');
    } else {
      wrongAnswer++;
      $('#wrong-answer').show().addClass('flash');
      $('#wrong-answer').text( 'Brick, that is the Wrong answer!!! The correct answer is: ' + correct );
    }

    nextQuestion();

  }

  // Show the next question in questions array
  function nextQuestion() {
    stopTimer();
    questionCounter++;
    $('#question').removeClass('bounce');

    setTimeout( displayQuestion, 2000 );
    $('#trivia-game').removeClass('bounceIn');
  }

  // Show Score
  function showScore() {

    $('.trivia-logo').text('Final Score');
    $('#start-game, #scores').show();
    $('#trivia-game').hide();
    
    $('.time-out span').text(unanswered);
    $('.wrong-answer span').text(wrongAnswer);
    $('.right-answer span').text(correctAnswer);

    questionCounter = 0;
    correctAnswer = 0;
    wrongAnswer = 0;
    unanswered = 0;

  }

});