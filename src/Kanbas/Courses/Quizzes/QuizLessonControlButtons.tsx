import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import * as quizClient from "./client";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteQuiz } from "./reducer";

export default function QuizLessonControlButtons({ courseId, quizId, published }:
    { courseId: string; quizId: string; published: boolean }) {
        const [publish, setPublish] = useState<any>(published);
        const dispatch = useDispatch();
        const handleDeleteQuiz = () => {
            dispatch(deleteQuiz(quizId));
            quizClient.deleteQuiz(quizId);
        }
        const handlePublishQuiz = async (bool: boolean) => {
            const result = await quizClient.updateQuiz(quizId, { published: bool });
            console.log(result);
            if (result.modifiedCount === 1) {
                setPublish(bool);
            }
        }
        const navigate = useNavigate();
        const handleEditQuiz = () => {
        navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
        }
    return (
        <div>
            <div className="dropdown dropend float-end">
                {publish ? ( <GreenCheckmark /> ) : (<IoIosCloseCircle className="text-danger" />) }
                <button
                    id="wd-quiz-lesson-control-btn"
                    className="btn border border-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <IoEllipsisVertical className="fs-4" />
                </button>
                <ul className="dropdown-menu p-0" aria-labelledby="wd-quiz-lesson-control-btn">
                    <li>
                        <button className="dropdown-item" onClick={() => handleEditQuiz()}>
                            Edit
                            <FaPencilAlt className="float-end" />
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => handleDeleteQuiz()}>
                            Delete
                            <FaTrash className="float-end" />
                        </button>
                    </li>
                    {publish ? (
                        <li>
                            <button className="dropdown-item" onClick={() => handlePublishQuiz(false)}>
                                Unpublish
                                <IoIosCloseCircle className="float-end fs-5"/>
                            </button>
                        </li>
                    ) : (
                        <li>
                            <button className="dropdown-item" onClick={() => handlePublishQuiz(true)}>
                                Publish
                                <IoIosCheckmarkCircle className="float-end fs-5"/>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}