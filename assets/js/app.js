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
  
  // Load questions from json file.
  $.getJSON('assets/js/questions.json')
    .done(function(data){
      questions = data;
    })
    .fail(function() {
      console.log('There was an error loading the questions');
    });

  // Hide div on load
  $('#trivia-game').hide();

  // When you click #btn-start-game
  $(document).on('click', '.btn-start-game', function(e) {
    $('#start-game').hide();
    displayQuestion();
  });

  // When aan answer is clicked
  $(document).on('click', '.answer', function(e) {
    $(this).addClass('btn-active');
    var guess = $(this).text();
    checkGuess( guess, currentQuestion );
  });

  // Generates each question
  function displayQuestion() {

    // Reset Counter
    counter = 24;
    $('#timer-interval').html(counter);

    // Hide div on load
    $('#right-answer, #wrong-answer, #time-out').hide();

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

    // Shows #trivia-game container and adds class for animation
    $('#trivia-game').show().addClass('bounceIn');

    // Add question to h1 DOM
    $('#question').text( currentQuestion.question ).addClass('animated bounce').removeClass('trivia-logo');

    // Clear out #answers html next time function is called
    $('#answers').html('');

    // Crate answers function
    createAnswers(currentQuestion);

  }

  // function to display answers
  function createAnswers(question){
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

  function showScore() {

    $('#question').text('Final Score').addClass('trivia-logo');
    $('#answers').html('');

    // Create scores array
    var scores = [{
      text: 'Correct Answers: ',
      points: correctAnswer,
      class: 'right-answer'
    }, {
      text: 'Wrong Answers: ',
      points: wrongAnswer,
      class: 'wrong-answer'
    }, {
      text: 'Unanswered: ',
      points: unanswered,
      class: 'time-out'
    }]

    // Generates html for scores
    for ( var i = 0; i < scores.length; i++ ) {
      var scoreDiv = $('<div class="score '+ scores[i].class +'">');
      scoreDiv.html( scores[i].text + scores[i].points );
      $('#answers').append(scoreDiv);
    }

    questionCounter = 0;
    correctAnswer = 0;
    wrongAnswer = 0;
    unanswered = 0;

    var restart = $('<div id="restart-game" class="btn btn-start-game">').text('New Game');
    $('#answers').append( restart );

  }

});