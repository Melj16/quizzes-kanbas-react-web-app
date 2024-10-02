import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
export default function Account() {
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block me-3">
          <AccountNavigation />
        </div>
        <Routes>
          <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
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