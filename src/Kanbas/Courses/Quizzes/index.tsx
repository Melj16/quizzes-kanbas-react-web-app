import { BsGripVertical } from "react-icons/bs";
import QuizControls from "./QuizControls";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import * as courseClient from "../client";
import { setQuizzes } from "./reducer";
import { useEffect } from "react";
import { RxRocket } from "react-icons/rx";
import QuizLessonControlButtons from "./QuizLessonControlButtons";

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const assignments = await courseClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(assignments));
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
            <QuizControls /><br /><br /><hr />
            <ul id="wd-quizzes-list-group" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 fs-5 border border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <b>Assignment Quizzes</b>
                    </div>
                    <ul id="wd-lessons" className="list-group rounded-0">
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
                                        &nbsp;| <b>Due</b> {new Date(quiz.due).toDateString().split(' ').slice(1).join(' ')}
                                        &nbsp;| {quiz.points || 0} pts
                                        &nbsp;| {quiz.number_of_questions} questions
                                    </p>
                                </div>
                                <div className="align-content-center justify-content-end">
                                    <QuizLessonControlButtons />
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