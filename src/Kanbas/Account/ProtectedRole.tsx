import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as db from "../Database";
export default function ProtectedRole({ children }: { children: any }) {
    const isFaculty = (currentUser: any) => {
        return (currentUser.role === 'FACULTY');
    }
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    if (isFaculty(currentUser)) {
        return children;
    } else {
        return null;
    }
}