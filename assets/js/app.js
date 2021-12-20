$(document).ready(($) => {
  var Trivia = function () {
  /*
    * Variables accessible
    * in the class
    */
    var vars = {
      counter: undefined,
      counterInterval: undefined,
      counterRunning: false,
      questionCounter: 0,
      correctAnswer: 0,
      wrongAnswer: 0,
      unanswered: 0,
      currentQuestion: 0,
      questions: undefined,
    };

    //  Load questions from json file.
    var loadQuestions = () => {
      $.getJSON('assets/js/questions.json')
        .done(function (data) {
          vars.questions = data;
        })
        .fail(function () {
          console.log('There was an error loading the questions');
        });
    };

    var eventListeners = () => {
      // When you click #btn-start-game
      $(document).on('click', '.btn-start-game', (e) => {
        $('#start-game').hide();
        $('#trivia-game').show();
        displayQuestion();
      });

      // When answer is clicked
      $(document).on('click', '.answer', (e) => {
        $(e.target).addClass('btn-active');
        var guess = $(e.target).text();
        checkGuess(guess, vars.currentQuestion);
      });
    };

    // Generates each question
    var displayQuestion = () => {
      resetCounter();

      // Check to see if game is over if no more questions
      if (vars.questionCounter === vars.questions.length) {
        stopTimer();
        showScore();
      }

      // Setup currentQuestion
      vars.currentQuestion = vars.questions[vars.questionCounter];

      // Run startTimer function every second if not currently running
      if (!vars.counterRunning) {
        vars.counterInterval = setInterval(startTimer, 1000);
        vars.counterRunning = true;
      }

      // Run function to display current question
      displayCurrentQuestion(vars.currentQuestion);
    };

    // Reset Counter
    var resetCounter = () => {
      vars.counter = 24;

      $('#right-answer, #wrong-answer, #time-out').hide();
      $('#timer-interval').html(vars.counter);
    };

    // Display current question
    var displayCurrentQuestion = (question) => {
      $('#trivia-game').addClass('bounceIn');
      $('#question').text(question.question).addClass('animated bounce');
      $('#answers').empty();

      $.each(question.choices, (index, item) => {
        var answerDiv = $(
          '<div class="answer btn btn-answer animated fadeIn">'
        ).text(item);
        $('#answers').append(answerDiv);
      });
    };

    // Starts Timer
    var startTimer = () => {
      vars.counter--;
      $('#timer-interval').html(vars.counter);

      if (vars.counter === 0) {
        vars.unanswered++;
        $('#time-out')
          .show()
          .addClass('flash')
          .text('Shot Clock Expired, You ran out of time!!!');
        nextQuestion();
      }
    };

    // Stops Timer
    var stopTimer = () => {
      clearInterval(vars.counterInterval);
      vars.counterRunning = false;
    };

    // Checks if guess is correct
    var checkGuess = (guess, question) => {
      var correctNumber = question.correctAnswer;
      var correct = question.choices[correctNumber];

      // Shows #right-answer/#wrong-answer div depending on guess
      if (guess === correct) {
        vars.correctAnswer++;
        $('#right-answer').show().addClass('flash');
        $('#right-answer').text('Swoosh, that is the Correct answer!!!');
      } else {
        vars.wrongAnswer++;
        $('#wrong-answer').show().addClass('flash');
        $('#wrong-answer').text(
          'Brick, that is the Wrong answer!!! The correct answer is: ' + correct
        );
      }

      nextQuestion();
    };

    // Show the next question in questions array
    var nextQuestion = () => {
      stopTimer();
      vars.questionCounter++;

      $('#question').removeClass('bounce');
      $('#trivia-game').removeClass('bounceIn');

      setTimeout(displayQuestion, 2000);
    };

    // Show Score
    var showScore = () => {
      $('.trivia-logo').text('Final Score');
      $('#start-game, #scores').show();
      $('#trivia-game').hide();

      $('.time-out span').text(vars.unanswered);
      $('.wrong-answer span').text(vars.wrongAnswer);
      $('.right-answer span').text(vars.correctAnswer);

      vars.questionCounter = 0;
      vars.correctAnswer = 0;
      vars.wrongAnswer = 0;
      vars.unanswered = 0;
    };

    this.start = () => {
      $('#trivia-game, #scores').hide();
      loadQuestions();
      eventListeners();
    };
  };

  const trivia = new Trivia();
  trivia.start();
});
