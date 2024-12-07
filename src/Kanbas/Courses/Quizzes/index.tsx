import { BsGripVertical } from "react-icons/bs";
import QuizControls from "./QuizControls";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as courseClient from "../client";
import * as quizClient from "./client";
import { setQuizzes, createQuiz } from "./reducer";
import { useEffect } from "react";
import { RxRocket } from "react-icons/rx";
import QuizLessonControlButtons from "./QuizLessonControlButtons";

export default function Quizzes() {
    const { cid } = useParams<{ cid: string }>();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();

    const fetchAnswers = async (quizId: string) => {
        const answers = await quizClient.getAnswersForQuiz(quizId, currentUser._id);
        return answers
    }

    const fetchQuizzes = async () => {
        let quizList = await courseClient.findQuizzesForCourse(cid as string);
        if(currentUser.role === 'STUDENT') {
            quizList = quizList.filter((quiz: any) => quiz.published);
        }
        const quizzesWithScores = await Promise.all(quizList.map(async (quiz: any) => {
            const answers = await fetchAnswers(quiz._id);
            return { ...quiz, score: answers.score };
        }));
        dispatch(setQuizzes(quizzesWithScores));
    };

    const checkAvailableDate = (available: string, until: string) => {
        const currentDate = new Date();
        const availableDate = new Date(available);
        const untilDate = new Date(until);
        if (availableDate > currentDate) {
            return `Not available until ${availableDate.toDateString().split(' ').slice(1).join(' ')}`;
        }
        else if (untilDate < currentDate) {
            return `Closed`;
        }
        else {
            return `Available until ${untilDate.toDateString().split(' ').slice(1).join(' ')}`;
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <div className="wd-quizzes">
            <QuizControls courseId={cid || ''} /><br /><br /><hr />
            <ul id="wd-quizzes-list-group" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 fs-5 border border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <b>Assignment Quizzes</b>
                    </div>
                    <ul id="wd-lessons" className="list-group rounded-0">
                        {quizzes.length === 0 && <li
                                className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between"
                                style={{ width: "100%" }}>
                                    No quizzes {currentUser.role === "FACULTY" && "press +Quiz to add quiz"}</li>}
                        {quizzes.map((quiz: any) => (
                            <li
                                className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between"
                                style={{ width: "100%" }}
                            >
                                <div className="align-content-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <RxRocket className="text-success me-2 fs-3" />
                                </div>
                                <div className="flex-grow-1 px-2">
                                    <a className="wd-quiz-link link-dark text-decoration-none"
                                        href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                                        <b>{quiz.name}</b>
                                    </a>
                                    <p>
                                        <b>{checkAvailableDate(quiz.available, quiz.until)}</b>
                                         <b> Due</b> {new Date(new Date(quiz.due).setDate(new Date(quiz.due).getDate() + 1)).toDateString().split(' ').slice(1).join(' ')}
                                         &nbsp;| {quiz.show_answers && quiz.score ? `${quiz.score} / ${quiz.points}` : quiz.points} pts
                                        &nbsp;| {quiz.number_of_questions} questions
                                    </p>
                                </div>
                                <div className="align-content-center justify-content-end">
                                {(currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN') && (
                                    <QuizLessonControlButtons courseId={cid || ''} quizId={quiz._id.toString()} published={quiz.published} />)}
                                </div>
                            </li>
                        ))
                        }
                    </ul>
                </li>
            </ul>
        </div>
    );
}