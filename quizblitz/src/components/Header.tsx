interface HeaderProps {
    score: number;
    total: number;
}

export default function Header({ score, total }: HeaderProps) {
    return (
        <header className="header">

            <h1 className="app-title">QuizBlitz</h1>

            <p className="score">Score: {score} / {total}</p>

        </header>
    );
}