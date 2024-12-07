import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import "./QuizView.css";
import { useSelector } from "react-redux";

export default function GradedQuiz() {
    const { qid, cid } = useParams();
    const [questions, setQuestions] = useState<any[]>([]);
    const [quiz, setQuiz] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<{ [key: string]: any }>({});
    const [answer, setAnswer] = useState<any>(null);
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const navigate = useNavigate();
    const handleSubmitQuiz = async () => {
        let result = null;
        if (qid) {
            if (result) {
                navigate(`/Kanbas/Courses/${cid}/Quizzes`);
            } else {
                console.error("Error submitting quiz");
                return;
            }
        }
    };

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

        const fetchAnswers = async () => {
            if (qid) {
                try {
                    const fetchedAnswers = await quizClient.getAnswers(qid, currentUser._id);
                    setAnswer(fetchedAnswers)
                    setAnswers(fetchedAnswers.answers || []);
                } catch (error) {
                    console.error("Error fetching answers:", error);
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
        fetchAnswers();
    }, [qid, currentUser._id, questions]);

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
                <p className="question-text">
                    {question.question || "No question text available"}
                </p>
                {(() => {
                    switch (question.type) {
                        case "Multiple Choice":
                            return (
                                <ul className="options-list">
                                    {question.choices.map((choice: string, index: number) => (
                                        <li
                                            key={`${question._id}-choice-${index}`}
                                            className="option-item"
                                        >
                                            <input
                                                type="radio"
                                                name={question._id}
                                                id={`option-${index}`}
                                                value={choice}
                                                className="radio-input"
                                                checked={answers[question._id] === choice}
                                                disabled
                                            />
                                            <label htmlFor={`option-${index}`}>{choice}</label>
                                            {question.answer === choice && (
                                            <>
                                                <span className="correct-arrow" style={{ color: 'green' }}>✔</span>
                                                <span className="correct-answer" style={{ color: 'green' }}>Correct Answer</span>
                                            </>
                                        )}
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
                                            name={question._id}
                                            value="true"
                                            className="radio-input"
                                            checked={answers[question._id] === "True"}
                                            disabled
                                        />
                                        True
                                        {question.answer === "True" && (
                                            <>
                                                <span className="correct-arrow" style={{ color: 'green' }}>✔</span>
                                                <span className="correct-answer" style={{ color: 'green' }}>Correct Answer</span>
                                            </>
                                        )}
                                    </li>
                                    <li className="option-item">
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value="false"
                                            className="radio-input"
                                            checked={answers[question._id] === "False"}
                                            disabled
                                        />
                                        False
                                        {question.answer === "False" && (
                                            <>
                                                <span className="correct-arrow" style={{ color: 'green' }}>✔</span>
                                                <span className="correct-answer" style={{ color: 'green' }}>Correct Answer</span>
                                            </>
                                        )}
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
                                        value={answers[question._id]}
                                        disabled
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
            <h3>Grade: {answer && answer.score}/{quiz.points}</h3>
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
                                <button onClick={handleSubmitQuiz} className="action-button">
                                    Submit Quiz
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    {questions.map((question, index) => renderQuestion(question, index))}
                    <div className="submit-quiz">
                        <button onClick={handleSubmitQuiz} className="action-button">
                            Submit Quiz
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
