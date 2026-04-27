"use strict";
const questions = [
    {
        text: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Jupiter", "Saturn", "Mars"],
        correct: 3,
    },
    {
        text: "What is the capital city of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
    },
    {
        text: "How many sides does a hexagon have?",
        answers: ["5", "6", "7", "8"],
        correct: 1,
    },
    {
        text: "Who painted the Mona Lisa?",
        answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Caravaggio"],
        correct: 1,
    },
    {
        text: "What is the chemical symbol for water?",
        answers: ["O2", "CO2", "H2O", "HO"],
        correct: 2,
    },
];

let currentQuestionIndex = 0;

let score = 0;

const questionNumberEl = document.querySelector(".question-number");
const questionTextEl = document.querySelector(".question-text");
const answersGridEl = document.querySelector(".answers-grid");
const feedbackEl = document.querySelector(".feedback");
const scoreEl = document.querySelector(".score");

function showQuestion(index) {
    const currentQuestion = questions[index];
    questionNumberEl.textContent = `Question ${index + 1} / ${questions.length}`;
    questionTextEl.textContent = currentQuestion.text;
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    answersGridEl.innerHTML = "";
    currentQuestion.answers.forEach((answerText, answerIndex) => {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = answerText;
        button.addEventListener("click", function () {
            checkAnswer(answerIndex);
        });
        answersGridEl.appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const allButtons = answersGridEl.querySelectorAll(".answer-btn");

    allButtons.forEach(function (button) {
        button.disabled = true;
    });
    if (selectedIndex === currentQuestion.correct) {
        score = score + 1;
        allButtons[selectedIndex].classList.add("correct");
        feedbackEl.textContent = "✓ Correct!";
        feedbackEl.classList.add("correct");
    }
    else {
        allButtons[selectedIndex].classList.add("wrong");
        allButtons[currentQuestion.correct].classList.add("correct");
        feedbackEl.textContent = "✗ Wrong!";
        feedbackEl.classList.add("wrong");
    }
    scoreEl.textContent = `Score: ${score} / ${questions.length}`;

    setTimeout(function () {
        currentQuestionIndex = currentQuestionIndex + 1;
        if (currentQuestionIndex < questions.length) {
            showQuestion(currentQuestionIndex);
        }
        else {
            showFinalScore();
        }
    }, 1200);
}

function showFinalScore() {
    questionNumberEl.textContent = "Quiz Complete!";
    questionTextEl.textContent = `You scored ${score} out of ${questions.length}.`;
    answersGridEl.innerHTML = "";
    feedbackEl.textContent = "";
}

showQuestion(currentQuestionIndex);