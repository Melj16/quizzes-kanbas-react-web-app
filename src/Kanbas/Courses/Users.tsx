import { useParams } from "react-router";
import * as courseClient from "./client";
import * as userClient from "../Account/client";
import { useEffect, useState } from "react";
import PeopleTable from "./People/Table";
export default function Users() {
    const { cid } = useParams();
    const { uid } = useParams();
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("");
    const fetchUsers = async () => {
        try {
            if (cid) {
                const users = await courseClient.findUsersForCourse(cid);
                setUsers(users);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [uid])
    return (
        <div>
            <PeopleTable users={users} />
        </div>
    );
}