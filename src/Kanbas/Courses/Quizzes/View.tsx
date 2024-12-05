import { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as quizClient from "./client";
import "./QuizView.css";

export default function QuizView() {
    const { qid } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (qid) {
                try {
                    const fetchedQuestions = await quizClient.getQuestions(qid);
                    setQuestions(fetchedQuestions || []);
                } catch (error) {
                    console.error("Error fetching questions:", error);
                    setQuestions([]);
                }
            }
        };

        const fetchQuiz = async () => {
            if (qid) {
                try {
                    const fetchedQuiz = await quizClient.getQuiz(qid);
                    setQuiz(fetchedQuiz);
                } catch (error) {
                    console.error("Error fetching quiz:", error);
                    setQuiz(null);
                }
            }
            setLoading(false);
        };

        fetchQuiz();
        fetchQuestions();
    }, [qid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!quiz) {
        return <div>Quiz not found</div>;
    }

    const renderQuestion = (question: any, index: number) => {
        if (!question) {
            return <p className="unknown-type">Question data is missing</p>;
        }

        return (
            <div key={question._id} className="question-card">
                <div className="question-header">
                    <div className="question-title">Question {index + 1}</div>
                    <div className="question-points">{question.points || 0} pts</div>
                </div>
                <p className="question-text">{question.question || "No question text available"}</p>
                {(() => {
                    switch (question.type) {
                        case "Multiple Choice":
                            return (
                                <ul className="options-list">
                                    {question.choices.map((choice: any, choiceIndex: number) => (
                                        <li key={`${question._id}-choice-${choiceIndex}`} className="option-item">
                                            <input
                                                type="radio"
                                                name={`${question._id}`}
                                                value={`option-${choiceIndex}`}
                                                className="radio-input"
                                            />
                                            {choice || "Option text not available"}
                                        </li>
                                    ))}
                                </ul>
                            );
                        case "True/False":
                            return (
                                <ul className="options-list">
                                    <li className="option-item">
                                        <input
                                            type="radio"
                                            name={`${question._id}-true`}
                                            value="true"
                                            className="radio-input"
                                        />
                                        True
                                    </li>
                                    <li className="option-item">
                                        <input
                                            type="radio"
                                            name={`${question._id}-false`}
                                            value="false"
                                            className="radio-input"
                                        />
                                        False
                                    </li>
                                </ul>
                            );
                        case "Fill-in-the-Blank":
                            return (
                                <div>
                                    <input
                                        type="text"
                                        name={question._id}
                                        placeholder="Type your answer here"
                                        className="fill-blank-input"
                                    />
                                </div>
                            );
                        default:
                            return <p className="unknown-type">Unknown question type</p>;
                    }
                })()}
            </div>
        );
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <h1 className="quiz-title">{quiz.name}</h1>
            <p className="quiz-instructions">{quiz.instructions}</p>
            <hr className="quiz-divider" />

            {quiz.one_at_a_time ? (
                <div>
                    {currentQuestion ? (
                        renderQuestion(currentQuestion, currentQuestionIndex)
                    ) : (
                        <p className="unknown-type">No question available</p>
                    )}
                    <div className="action-buttons">
                        <button
                            className="action-button"
                            disabled={currentQuestionIndex === 0}
                            onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                        >
                            Previous
                        </button>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <button
                                className="action-button"
                                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                            >
                                Next
                            </button>
                        ) : (
                            <div className="submit-quiz">
                                <button className="action-button">Submit Quiz</button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    {questions.map((question, index) => renderQuestion(question, index))}
                    <div className="submit-quiz">
                        <button className="action-button">Submit Quiz</button>
                    </div>
                </div>
            )}
        </div>
    );
}
