import { useState } from "react";
import "./App.css";

import type { Question } from "./types/Question";
import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard";
import ResultCard from "./components/ResultCard.tsx";
import QuizCreator from "./components/QuizCreator";

type Screen = "home" | "creator" | "quiz" | "result";

const defaultQuestions: Question[] = [
    {
        text: "Which planet is known as the Red Planet?",
        answers: ["Venus", "Jupiter", "Saturn", "Mars"],
        correct: 3
    },
    {
        text: "What is the capital city of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2
    },
    {
        text: "How many sides does a hexagon have?",
        answers: ["5", "6", "7", "8"],
        correct: 1
    },
    {
        text: "Who painted the Mona Lisa?",
        answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Caravaggio"],
        correct: 1
    },
    {
        text: "What is the chemical symbol for water?",
        answers: ["O2", "CO2", "H2O", "HO"],
        correct: 2
    }
];

export default function App() {
    const [screen, setScreen]               = useState<Screen>("home");
    const [questions, setQuestions]         = useState<Question[]>(defaultQuestions);
    const [currentIndex, setCurrentIndex]   = useState<number>(0);
    const [score, setScore]                 = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const question = questions[currentIndex];

    function startQuiz(qs: Question[]): void {
        setQuestions(qs);
        setCurrentIndex(0);
        setScore(0);
        setSelectedIndex(null);
        setScreen("quiz");
    }

    function handleAnswerClick(index: number): void {
        if (selectedIndex !== null) return;
        setSelectedIndex(index);
        if (index === question.correct) {
            setScore(score + 1);
        }
    }

    function handleNextClick(): void {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
            setSelectedIndex(null);
        } else {
            setScreen("result");
        }
    }

    function handleRestart(): void {
        setScreen("home");
    }

    return (
        <div className="page">

            <Header score={score} total={questions.length} />

            {screen === "home" && (
                <div className="card home-card">
                    <h2 className="creator-title">Welcome to QuizBlitz </h2>
                    <p className="creator-subtitle">Choose how you want to play</p>
                    <div className="home-buttons">
                        <button className="btn-next" onClick={() => startQuiz(defaultQuestions)}>
                            Play Default Quiz
                        </button>
                        <button className="btn-add" onClick={() => setScreen("creator")}>
                            ️Create My Own Quiz
                        </button>
                    </div>
                </div>
            )}

            {screen === "creator" && (
                <QuizCreator onQuizReady={(qs) => startQuiz(qs)} />
            )}

            {screen === "quiz" && (
                <QuestionCard
                    questionText={question.text}
                    answers={question.answers}
                    correctIndex={question.correct}
                    questionNumber={currentIndex + 1}
                    totalQuestions={questions.length}
                    selectedIndex={selectedIndex}
                    onAnswerClick={handleAnswerClick}
                    onNextClick={handleNextClick}
                />
            )}

            {screen === "result" && (
                <ResultCard
                    score={score}
                    total={questions.length}
                    onRestart={handleRestart}
                />
            )}

        </div>
    );
}