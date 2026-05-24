import { useState } from "react";
import type { Question } from "../types/Question";
interface QuizCreatorProps {
    onQuizReady: (questions: Question[]) => void;
}

const MAX_QUESTIONS = 5;

const emptyQuestion = (): Question => ({
    text: "",
    answers: ["", "", "", ""],
    correct: 0,
});

export default function QuizCreator({ onQuizReady }: QuizCreatorProps) {
    const [questions, setQuestions] = useState<Question[]>([emptyQuestion()]);

    function updateQuestionText(qIndex: number, value: string): void {
        const updated = [...questions];
        updated[qIndex] = { ...updated[qIndex], text: value };
        setQuestions(updated);
    }

    function updateAnswer(qIndex: number, aIndex: number, value: string): void {
        const updated = [...questions];
        const updatedAnswers = [...updated[qIndex].answers];
        updatedAnswers[aIndex] = value;
        updated[qIndex] = { ...updated[qIndex], answers: updatedAnswers };
        setQuestions(updated);
    }

    function updateCorrect(qIndex: number, value: number): void {
        const updated = [...questions];
        updated[qIndex] = { ...updated[qIndex], correct: value };
        setQuestions(updated);
    }

    function addQuestion(): void {
        if (questions.length < MAX_QUESTIONS) {
            setQuestions([...questions, emptyQuestion()]);
        }
    }

    function removeQuestion(qIndex: number): void {
        setQuestions(questions.filter((_, i) => i !== qIndex));
    }

    function handleStart(): void {
        onQuizReady(questions);
    }

    const isFormValid = questions.every(
        (q) => q.text.trim() !== "" && q.answers.every((a) => a.trim() !== "")
    );

    return (
        <div className="card creator-card">
            <h2 className="creator-title">Build Your Quiz</h2>
            <p className="creator-subtitle">Add up to {MAX_QUESTIONS} questions</p>

            {questions.map((question, qIndex) => (
                <div key={qIndex} className="creator-question">

                    <div className="creator-question-header">
                        <span className="question-number">Question {qIndex + 1}</span>
                        {questions.length > 1 && (
                            <button className="btn-remove" onClick={() => removeQuestion(qIndex)}>
                                ✕ Remove
                            </button>
                        )}
                    </div>

                    <input
                        className="creator-input"
                        type="text"
                        placeholder="Enter your question..."
                        value={question.text}
                        onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                    />

                    <p className="creator-label">Answers — select the correct one</p>

                    {question.answers.map((answer, aIndex) => (
                        <div key={aIndex} className="creator-answer-row">
                            <input
                                type="radio"
                                name={`correct-${qIndex}`}
                                checked={question.correct === aIndex}
                                onChange={() => updateCorrect(qIndex, aIndex)}
                            />
                            <input
                                className="creator-input"
                                type="text"
                                placeholder={`Answer ${aIndex + 1}`}
                                value={answer}
                                onChange={(e) => updateAnswer(qIndex, aIndex, e.target.value)}
                            />
                        </div>
                    ))}

                </div>
            ))}

            <div className="creator-actions">
                {questions.length < MAX_QUESTIONS && (
                    <button className="btn-add" onClick={addQuestion}>
                        + Add Question
                    </button>
                )}
                <button className="btn-next" onClick={handleStart} disabled={!isFormValid}>
                    Start Quiz →
                </button>
            </div>

        </div>
    );
}