import { useState } from "react";
import type { Question } from "../types/Question";

interface QuizLoaderProps {
    onQuizReady: (questions: Question[]) => void;
}

type LoadMethod = "json" | "url";

function validateQuestions(data: unknown): Question[] {
    if (!Array.isArray(data)) {
        throw new Error("Questions must be an array.");
    }

    return data.map((item, index) => {
        if (typeof item.text !== "string" || item.text.trim() === "") {
            throw new Error(`Question ${index + 1} is missing a "text" field.`);
        }
        if (!Array.isArray(item.answers) || item.answers.length < 2) {
            throw new Error(`Question ${index + 1} must have at least 2 answers.`);
        }
        if (typeof item.correct !== "number" || item.correct >= item.answers.length) {
            throw new Error(`Question ${index + 1} has an invalid "correct" index.`);
        }
        return item as Question;
    });
}

export default function QuizLoader({ onQuizReady }: QuizLoaderProps) {
    const [method, setMethod]   = useState<LoadMethod>("json");
    const [jsonInput, setJsonInput] = useState<string>("");
    const [urlInput, setUrlInput]   = useState<string>("");
    const [error, setError]     = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLoad(): Promise<void> {
        setError(null);
        setLoading(true);

        try {
            let parsed: unknown;

            if (method === "json") {
                parsed = JSON.parse(jsonInput);
            } else {
                const response = await fetch(urlInput);
                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
                parsed = await response.json();
            }

            const questions = validateQuestions(parsed);

            if (questions.length > 5) {                                                    // <----
                throw new Error("Maximum 5 questions allowed.");
            }

            onQuizReady(questions);

        } catch (err) {
            if (err instanceof SyntaxError) {
                setError("Invalid JSON — check your formatting and try again.");
            } else if (err instanceof Error) {
                setError(err.message);
            }
        }

        setLoading(false);
    }

    const canSubmit = method === "json" ? jsonInput.trim() !== "" : urlInput.trim() !== "";

    return (
        <div className="card creator-card">
            <h2 className="creator-title">Load Questions</h2>
            <p className="creator-subtitle">Paste JSON or fetch from a URL</p>

            <div className="loader-tabs">
                <button
                    className={`loader-tab ${method === "json" ? "active" : ""}`}
                    onClick={() => { setMethod("json"); setError(null); }}
                >
                    Paste JSON
                </button>
                <button
                    className={`loader-tab ${method === "url" ? "active" : ""}`}
                    onClick={() => { setMethod("url"); setError(null); }}
                >
                    Fetch from URL
                </button>
            </div>

            {method === "json" && (
                <div className="loader-section">
                    <p className="creator-label">Paste your questions as JSON</p>
                    <textarea
                        className="creator-textarea"
                        rows={10}
                        placeholder={`[\n  {\n    "text": "What is 2 + 2?",\n    "answers": ["1", "2", "3", "4"],\n    "correct": 3\n  }\n]`}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                    />
                </div>
            )}

            {method === "url" && (
                <div className="loader-section">
                    <p className="creator-label">Enter the API URL</p>
                    <input
                        className="creator-input"
                        type="text"
                        placeholder="https://example.com/api/questions"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                    />
                    <p className="loader-hint">
                        The URL must return a JSON array of question objects in the same format as above.
                    </p>
                    <p className="loader-hint">
                        https://cdn.jsdelivr.net/gh/OleksandrPass/Quiz_Page@main/quizblitz/questions.json
                    </p>
                </div>
            )}

            {error && <p className="loader-error">{error}</p>}

            <button
                className="btn-next"
                onClick={handleLoad}
                disabled={!canSubmit || loading}
            >
                {loading ? "Loading..." : "Load Questions →"}
            </button>

        </div>
    );
}