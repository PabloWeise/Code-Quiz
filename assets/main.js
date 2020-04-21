


// Array of objects that contains questions, options and answers

var questions = [
  {
    text: "Which was the first gaming console ?",
    options: ["Atari", "Sega Genesis", " Super Nintendo", "Playstation"],
    answer: "Atari",
  },

  {
    text:
      "Which iconic videogame character originated as a simple placeholder?",
    options: ["Todd", "Mario", "Kirby", "Yoshi"],
    answer: "Kirby",
  },

  {
    text:
      "Which videogame is considered to be the original third-person shooter?",
    options: ["Doom", "Wolfenstein", "Quake", "Blake Stone"],
    answer: "Wolfenstein",
  },

  {
    text:
      'Which "Mortal Kombat" character has the ability to transform into a dragon?',
    options: ["Johnny Cage", "Kung Lao", "Riaden", "Liu Kang"],
    answer: "Liu Kang",
  },
];


// declaring variables 
var currQuestionNum = 0;
var numCorrect = 0;
var timer = null;
var questionContainer = document.getElementById("question-container");
var questionTextEl = document.getElementById("question-text");
var option1Button = document.getElementById("option1");
var option2Button = document.getElementById("option2");
var option3Button = document.getElementById("option3");
var option4Button = document.getElementById("option4");
var buttons = document.querySelectorAll(".btn-warning");
var scoreTextEl = document.getElementById("scoreText");
var resultsPage = document.getElementById("results-page");
var submitBtn =  document.getElementById("submit-btn");
var highScoresPage = document.getElementById("high-scores-page");
var initialsInput = document.getElementById("initials");
var highScoreText = document.getElementById ("highScoreText")


//displayQuestion grabs the properties of each object and displays it the buttons 
function displayQuestion(questionNum) {
  questionTextEl.textContent = questions[questionNum].text;

  option1Button.textContent = questions[questionNum].options[0];
  option2Button.textContent = questions[questionNum].options[1];
  option3Button.textContent = questions[questionNum].options[2];
  option4Button.textContent = questions[questionNum].options[3];
}

//displays results and hides the questions (This was a trick given by a tutor)
function displayResult(){
  clearInterval(timer);
resultsPage.classList.remove("hide");
questionContainer.classList.add("hide");
}


//This functions starts the timer. Has local variables and methods
function startTimer() {
  var timeLeft = 30;
  // Update the count down every 1 second
  timer = setInterval(function () {
    
    document.getElementById("timer").innerHTML = timeLeft + "s ";
    timeLeft--;
    // If statment that displays "Expired" when the countdown is finihsed
    if (timeLeft < 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Game Over";
    }
  }, 1000);
}


//for loop ()
for (var button of buttons) {
  button.addEventListener("click", function (event) {
    
      var answer = event.target.innerText;
      var correctAnswer = questions[currQuestionNum].answer;
      
      if(answer == correctAnswer){
          numCorrect++;
          scoreTextEl.innerText = "Your score is:" + numCorrect

      }
    currQuestionNum = currQuestionNum + 1;
    if(currQuestionNum >= questions.length){
        displayResult();
    }
    displayQuestion(currQuestionNum);
  });
}



//This event listener  starts and displays the questions and the timer
document.getElementById("start").addEventListener("click", function () {
  currQuestionNum = 0;
  numCorrect = 0;
  resultsPage.classList.add("hide");
  highScoresPage.classList.add("hide");
questionContainer.classList.remove("hide");
  displayQuestion(currQuestionNum);
  startTimer();
});


submitBtn.addEventListener("click",function(){
  var initialsText = initialsInput.value;
  localStorage.setItem(initialsText, numCorrect);
  for (let index = 0; index < localStorage.length; index++) {
    var initials = localStorage.key(index)
    const score = localStorage.getItem(initials);
    var scoreText = initials + " " + score;
    var li = document.createElement("li");
    li.innerHTML = scoreText
    highScoreText.appendChild(li);
  }
  resultsPage.classList.add("hide");
  highScoresPage.classList.remove("hide");
});
 document.getElementById("clear").addEventListener("click", function(){
   localStorage.clear()
   highScoreText.innerHTML = " "
 })