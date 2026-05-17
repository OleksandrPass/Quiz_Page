import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import QuestionCard from "./components/QuestionCard.tsx";
import ResultCard from "./components/ResultsCard";

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

export default function App() {
    const [currentIndex, setCurrentIndex]   = useState<number>(0);
    const [score, setScore]                 = useState<number>(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isFinished, setIsFinished]       = useState<boolean>(false);

    const question: Question = questions[currentIndex];

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
            setIsFinished(true);
        }
    }

    return (
        <div className="page">

            <Header
                score={score}
                total={questions.length}
            />

            {isFinished ? (
                <ResultCard
                    score={score}
                    total={questions.length}
                />
            ) : (
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

        </div>
    );
}