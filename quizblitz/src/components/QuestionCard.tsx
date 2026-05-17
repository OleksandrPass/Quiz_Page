interface QuestionCardProps {
    questionText: string;
    answers: string[];
    correctIndex: number;
    questionNumber: number;
    totalQuestions: number;
    selectedIndex: number | null;
    onAnswerClick: (index: number) => void;
    onNextClick: () => void;
}

export default function QuestionCard({
                                         questionText,
                                         answers,
                                         correctIndex,
                                         questionNumber,
                                         totalQuestions,
                                         selectedIndex,
                                         onAnswerClick,
                                         onNextClick,
                                     }: QuestionCardProps) {

    const hasAnswered = selectedIndex !== null;
    const isCorrect = selectedIndex === correctIndex;

    return (
        <main className="card">

            <p className="question-number">
                Question {questionNumber} / {totalQuestions}
            </p>

            <h2 className="question-text">{questionText}</h2>

            <div className="answers-grid">
                {answers.map((answer, index) => (
                    <button
                        key={index}
                        className={`answer-btn ${
                            hasAnswered && index === correctIndex ? "correct" :
                                hasAnswered && index === selectedIndex ? "wrong" : ""
                        }`}
                        onClick={() => onAnswerClick(index)}
                        disabled={hasAnswered}
                    >
                        {answer}
                    </button>
                ))}
            </div>

            {hasAnswered && (
                <p className={`feedback ${isCorrect ? "correct" : "wrong"}`}>
                    {isCorrect ? "Correct!" : "Wrong!"}
                </p>
            )}

            {hasAnswered && (
                <button className="btn-next" onClick={onNextClick}>
                    {questionNumber < totalQuestions ? "Next Question →" : "See Results"}
                </button>
            )}

        </main>
    );
}