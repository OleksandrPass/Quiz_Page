interface ResultCardProps {
    score: number;
    total: number;
    onRestart: () => void;
}

function getFinalMessage(score: number, total: number): string {
    if (score === total) return "Perfect score! You're a genius!";
    if (score >= 3)      return "Great job! Almost there!";
    return                      "Keep practicing, you'll get there!";
}

export default function ResultCard({ score, total, onRestart }: ResultCardProps) {
    return (
        <div className="card">

            <h2 className="result-title">Quiz Complete!</h2>

            <p className="result-label">Your final score</p>
            <p className="final-score">{score} / {total}</p>
            <p className="final-message">{getFinalMessage(score, total)}</p>

            <button className="btn-next" onClick={onRestart}>Play Again</button>

        </div>
    );
}