"use strict";
const title = document.querySelector(".app-title");
console.log("QuizBlitz loaded:", title.textContent);
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
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const answersGrid = document.querySelector(".answers-grid");
function renderQuestion(index) {
    const q = questions[index];
    questionNumber.textContent = `Question ${index + 1} / ${questions.length}`;
    questionText.textContent = q.text;
    answersGrid.innerHTML = "";
    q.answers.forEach((answer) => {
        const btn = document.createElement("button");
        btn.classList.add("answer-btn");
        btn.textContent = answer;
        answersGrid.appendChild(btn);
    });
}
renderQuestion(0);
