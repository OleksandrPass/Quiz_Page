interface Question {
    text: string;
    answers: string[];
    correct: number;
}

const questions: Question[] = [
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

let currentQuestionIndex: number = 0;
let score: number = 0;
let hasAnswered: boolean = false;

const questionNumberEl = document.querySelector(".question-number") as HTMLElement;
const questionTextEl = document.querySelector(".question-text") as HTMLElement;
const answersGridEl = document.querySelector(".answers-grid") as HTMLElement;
const feedbackEl = document.querySelector(".feedback") as HTMLElement;
const scoreEl = document.querySelector(".score") as HTMLElement;
const nextButton = document.querySelector(".btn-next") as HTMLButtonElement;
const quizCard = document.querySelector(".quiz-card") as HTMLElement;
const resultCard = document.querySelector(".result-card") as HTMLElement;
const finalScoreEl = document.querySelector(".final-score") as HTMLElement;
const finalMessageEl = document.querySelector(".final-message") as HTMLElement;

function showQuestion(index: number): void {
    const question: Question = questions[index];

    hasAnswered = false;
    nextButton.classList.add("hidden");
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    answersGridEl.innerHTML = "";

    questionNumberEl.textContent = `Question ${index + 1} / ${questions.length}`;
    questionTextEl.textContent = question.text;

    for (let i = 0; i < question.answers.length; i++) {
        const button = document.createElement("button");
        button.className = "answer-btn";
        button.textContent = question.answers[i];
        button.addEventListener("click", function () {
            checkAnswer(i);
        });
        answersGridEl.appendChild(button);
    }
}

function checkAnswer(selectedIndex: number): void {
    if (hasAnswered) {
        return;
    }
    hasAnswered = true;

    const question: Question = questions[currentQuestionIndex];
    const allButtons = answersGridEl.querySelectorAll<HTMLButtonElement>(".answer-btn");

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].disabled = true;
    }

    if (selectedIndex === question.correct) {
        score = score + 1;
        allButtons[selectedIndex].classList.add("correct");
        feedbackEl.textContent = "✓ Correct!";
        feedbackEl.classList.add("correct");
    } else {
        allButtons[selectedIndex].classList.add("wrong");
        allButtons[question.correct].classList.add("correct");
        feedbackEl.textContent = "✗ Wrong!";
        feedbackEl.classList.add("wrong");
    }

    scoreEl.textContent = `Score: ${score} / ${questions.length}`;
    nextButton.classList.remove("hidden");
}

function showResult(): void {
    quizCard.classList.add("hidden");
    resultCard.classList.remove("hidden");

    finalScoreEl.textContent = `${score} / ${questions.length}`;

    if (score === questions.length) {
        finalMessageEl.textContent = "🏆 Perfect score! You're a genius!";
    } else if (score >= 3) {
        finalMessageEl.textContent = "🎉 Great job! Almost there!";
    } else {
        finalMessageEl.textContent = "📚 Keep practicing, you'll get there!";
    }
}

nextButton.addEventListener("click", function () {
    currentQuestionIndex = currentQuestionIndex + 1;

    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
});

showQuestion(currentQuestionIndex);