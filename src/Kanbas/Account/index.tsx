import { Routes, Route, Navigate } from "react-router";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import AccountNavigation from "./Navigation";
import { useSelector } from "react-redux";
import Users from "./Users";
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
          <Route path="/" element={<Navigate to={currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"} />} />
          <Route path="/Signin" element={<div><Signin /></div>} />
          <Route path="/Profile" element={<div><Profile /></div>} />
          <Route path="/Signup" element={<div><Signup /></div>} />
          <Route path="/Users" element={<div><Users /></div>} />
          <Route path="/Users/:uid" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
}