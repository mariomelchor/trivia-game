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
    question: "What is the regulation height for a basketball hoop?",
    choices: ["8 feet", "9 feet", "10 feet", "11 feet"],
    correctAnswer: 2
  }, {
    question: "Which basketball team did Michael Jordan play for in college?",
    choices: ["University of North Carolina", "Michigan State University", "Stanford University", "University of Southern California"],
    correctAnswer: 0
  }, {
    question: "What NBA player scored 100 points on March 2, 1962?",
    choices: ["Bill Russel", "Kareem Abdul-Jabbar", "Elgin Baylor", "Wilt Chamberlain"],
    correctAnswer: 3
  }, {
    question: "Who was the first player in NBA history to be elected league MVP by a unanimous vote?",
    choices: ["Lebron James", "Stephen Curry", "Magic Johnson", "Michael Jordan"],
    correctAnswer: 1
  }, {
    question: "What team owns the longest winning streak in NBA history?",
    choices: ["Golden State Warriors", "Los Angeles Lakers", "Miami Heat", "Chicago Bulls"],
    correctAnswer: 1
  }, {
    question: "Who was the youngest player to score 10,000 points in the NBA?",
    choices: ["Wilt Chamberlain", "Michael Jordan", "Lebron James", "Kobe Bryant"],
    correctAnswer: 2
  }];

  // Hide div on load
  $('#trivia-game').hide();

  // When you click #btn-start-game
  $(document).on('click', '.btn-start-game', function(e) {
    $('#start-game').hide();
    displayQuestion();
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

    // Cretes div for each answer
    for ( var i = 0; i < currentQuestion.choices.length; i++ ) {
      var answerDiv = $('<div class="answer btn btn-answer animated fadeIn">').text( currentQuestion.choices[i] );
      $('#answers').append( answerDiv );
    }

    // When click on an answer
    $('.answer').on('click', function(e) {
      $(this).addClass('btn-active');
      var guess = $(this).text();
      $('#answers').html('');
      checkGuess( guess, currentQuestion );
    });

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
      console.log('Right: ' + correctAnswer);
      $('#right-answer').show().addClass('flash');
      $('#right-answer').text('Swoosh, that is the Correct answer!!!');
    } else {
      wrongAnswer++;
      console.log('Wrong: ' + wrongAnswer);
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

    setTimeout( displayQuestion, 4000 );
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