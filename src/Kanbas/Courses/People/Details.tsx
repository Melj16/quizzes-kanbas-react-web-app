import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import * as client from "../../Account/client";
import { FaPencil } from "react-icons/fa6";
export default function PeopleDetails() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<any>({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [editing, setEditing] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const saveUser = async () => {
        const [firstName, lastName] = name.split(" ");
        const updatedUser = { ...user, firstName, lastName };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditing(false);
        navigate(-1);
    };
    const saveUserEmail = async () => {
        const updatedUser = { ...user, email };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        setEditEmail(false);
        navigate(-1);
    };
    const saveUserRole = async (userRole: string) => {
        console.log(userRole);
        const updatedUser = { ...user, role: userRole };
        await client.updateUser(updatedUser);
        setUser(updatedUser);
        navigate(-1);
    };
    const deleteUser = async (uid: string) => {
        await client.deleteUser(uid);
        navigate(-1);
    };
    const fetchUser = async () => {
        if (!uid) return;
        const user = await client.findUserById(uid);
        setUser(user);
    };
    useEffect(() => {
        if (uid) fetchUser();
    }, [uid]);
    if (!uid) return null;
    return (
        <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
            <button onClick={() => navigate(-1)} className="btn position-fixed end-0 top-0 wd-close-details">
                <IoCloseSharp className="fs-1" /> </button>
            <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
            <div className="text-danger fs-4">
                {!editing && (
                    <FaPencil onClick={() => setEditing(true)}
                        className="float-end fs-5 mt-2 wd-edit" />)}
                {editing && (
                    <FaCheck onClick={() => saveUser()}
                        className="float-end fs-5 mt-2 me-2 wd-save" />)}
                {!editing && (
                    <div className="wd-name"
                        onClick={() => setEditing(true)}>
                        {user.firstName} {user.lastName}</div>)}
                {user && editing && (
                    <input className="form-control w-50 wd-edit-name"
                        defaultValue={`${user.firstName} ${user.lastName}`}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUser(); }
                        }} />)}
            </div>
            <div>
                {!editEmail && (
                    <FaPencil onClick={() => setEditEmail(true)}
                        className="float-end mt-2 wd-edit" />)}
                {editEmail && (
                    <FaCheck onClick={() => saveUserEmail()}
                        className="float-end mt-2 me-2 wd-save" />)}
                {!editEmail && (
                    <div className="wd-email"
                        onClick={() => setEditEmail(true)}>
                        <b>Email:</b> {user.email}</div>)}
                {user && editEmail && (
                    <input className="form-control w-50 wd-edit-email"
                        type="email"
                        defaultValue={`${user.email}`}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") { saveUserEmail(); }
                        }} />)}
            </div>
            <div className="d-flex">
                <b>Role:</b>
                <select value={user.role} onChange={(e) => saveUserRole(e.target.value)}
                    className="form-select w-50 wd-select-role ms-2" >
                    <option value="">All Roles</option>    <option value="STUDENT">Students</option>
                    <option value="TA">Assistants</option> <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Administrators</option>
                </select>
            </div>
            <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
            <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
            <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span>
            <hr />
            <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
            <button onClick={() => navigate(-1)}
                className="btn btn-secondary float-start float-end me-2 wd-cancel" > Cancel </button>
        </div>
    );
}