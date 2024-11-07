import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-3">
          <AccountNavigation />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to={ currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin" }/>} />
          <Route path="/Signin"
            element={<div style={{ width: "300px" }}><Signin /></div>} />
          <Route path="/Profile" 
            element={<div style={{ width: "300px" }}><Profile /></div>} />
          <Route path="/Signup" 
            element={<div style={{ width: "300px" }}><Signup /></div>} />
        </Routes>
      </div>
    </div>
  );
}