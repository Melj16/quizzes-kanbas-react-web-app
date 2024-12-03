import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useParams } from "react-router";

export default function QuizLessonControlButtons(    
    { quizId }:
    {
        quizId: string;
    }) {
    const {cid} = useParams();
    return (
        <div>
            <div className="dropdown dropend float-end">
                <GreenCheckmark />
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
                        <a className="dropdown-item" href={`#/Kanbas/Courses/${cid}/Quizzes/${quizId}`}>
                            Edit
                            <FaPencilAlt className="float-end" />
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="">
                            Delete
                            <FaTrash className="float-end" />
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="">
                            Publish
                            <IoIosCheckmarkCircle className="float-end fs-5"/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}