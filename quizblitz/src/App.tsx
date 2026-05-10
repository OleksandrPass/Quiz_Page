import { useState } from "react";
import "./App.css";

// --- Types ---

interface Question {
    text: string;
    answers: string[];
    correct: number;
}

// --- Data ---

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

// --- Helper ---

function getFinalMessage(score: number, total: number): string {
    if (score === total) return "🏆 Perfect score! You're a genius!";
    if (score >= 3)      return "🎉 Great job! Almost there!";
    return                      "📚 Keep practicing, you'll get there!";
}

// --- App Component ---

export default function App() {
    const [currentIndex, setCurrentIndex]     = useState<number>(0);
    const [score, setScore]                   = useState<number>(0);
    const [selectedIndex, setSelectedIndex]   = useState<number | null>(null);
    const [isFinished, setIsFinished]         = useState<boolean>(false);

    const question: Question   = questions[currentIndex];
    const hasAnswered: boolean = selectedIndex !== null;

    function handleAnswer(index: number): void {
        if (hasAnswered) return;
        setSelectedIndex(index);
        if (index === question.correct) {
            setScore(score + 1);
        }
    }

    function handleNext(): void {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
            setSelectedIndex(null);
        } else {
            setIsFinished(true);
        }
    }

    function getAnswerClass(index: number): string {
        if (!hasAnswered)               return "answer-btn";
        if (index === question.correct) return "answer-btn correct";
        if (index === selectedIndex)    return "answer-btn wrong";
        return "answer-btn";
    }

    // --- Result screen ---

    if (isFinished) {
        return (
            <div className="page">
                <div className="card">
                    <h2 className="result-title">Quiz Complete!</h2>
                    <p className="result-label">Your final score</p>
                    <p className="final-score">{score} / {questions.length}</p>
                    <p className="final-message">{getFinalMessage(score, questions.length)}</p>
                </div>
            </div>
        );
    }

    // --- Quiz screen ---

    return (
        <div className="page">

            <header className="header">
                <h1 className="app-title">⚡ QuizBlitz</h1>
                <p className="score">Score: {score} / {questions.length}</p>
            </header>

            <main className="card">

                <p className="question-number">
                    Question {currentIndex + 1} / {questions.length}
                </p>

                <h2 className="question-text">{question.text}</h2>

                <div className="answers-grid">
                    {question.answers.map(function (answer: string, index: number) {
                        return (
                            <button
                                key={index}
                                className={getAnswerClass(index)}
                                onClick={function () { handleAnswer(index); }}
                                disabled={hasAnswered}
                            >
                                {answer}
                            </button>
                        );
                    })}
                </div>

                {hasAnswered && (
                    <p className={selectedIndex === question.correct ? "feedback correct" : "feedback wrong"}>
                        {selectedIndex === question.correct ? "✓ Correct!" : "✗ Wrong!"}
                    </p>
                )}

                {hasAnswered && (
                    <button className="btn-next" onClick={handleNext}>
                        {currentIndex + 1 < questions.length ? "Next Question →" : "See Results"}
                    </button>
                )}

            </main>
        </div>
    );
}