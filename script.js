const questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "&lt;script&gt;", correct: true },
      { text: "&lt;scripting&gt;", correct: false },
      { text: "&lt;javascript&gt;", correct: false },
      { text: "&lt;js&gt;", correct: false },
    ],
  },
  {
    question:
      "Which of the following keywords is used to define a variable in Javascript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "Both A and B", correct: true },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "What is the result of '5' + 3 in JavaScript?",
    answers: [
      { text: "8", correct: false },
      { text: "53", correct: true },
      { text: "15", correct: false },
      { text: "NaN", correct: false },
    ],
  },
  {
    question:
      "Which function is used to print a message to the console in JavaScript?",
    answers: [
      { text: "print()", correct: false },
      { text: "console.log()", correct: true },
      { text: "alert()", correct: false },
      { text: "log()", correct: false },
    ],
  },
  {
    question:
      "What will be the output of the following code snippet? print(typeof(NaN));",
    answers: [
      { text: "Object", correct: false },
      { text: "Number", correct: true },
      { text: "String", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: "Which of the following is correct about JavaScript?",
    answers: [
      { text: "JavaScript is an Object-Based language", correct: true },
      { text: "JavaScript is Assembly-language", correct: false },
      { text: "JavaScript is an Object-Oriented language", correct: false },
      { text: "JavaScript is a High-level language", correct: false },
    ],
  },
  {
    question:
      "Which of the following can be used to call a JavaScript Code Snippet?",
    answers: [
      { text: "Function/Method", correct: true },
      { text: "Preprocessor", correct: false },
      { text: "Triggering Event", correct: false },
      { text: "RMI", correct: false },
    ],
  },
  {
    question: "Which of the following scoping type does JavaScript use?",
    answers: [
      { text: "Sequential", correct: false },
      { text: "Segmental", correct: false },
      { text: "Lexical", correct: true },
      { text: "Literal", correct: false },
    ],
  },
  {
    question: "Why JavaScript Engine is needed?",
    answers: [
      { text: "Both Compiling & Interpreting the JavaScript", correct: false },
      { text: "Parsing the javascript", correct: false },
      { text: "Interpreting the JavaScript", correct: true },
      { text: "Compiling the JavaScript", correct: false },
    ],
  },
  {
    question: "Why event handlers is needed in JS?",
    answers: [
      {
        text: "Allows JavaScript code to alter the behaviour of windows",
        correct: true,
      },
      { text: "Adds innerHTML page to the code", correct: false },
      { text: "Change the server location", correct: false },
      {
        text: "Performs handling of exceptions and occurrences",
        correct: false,
      },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
