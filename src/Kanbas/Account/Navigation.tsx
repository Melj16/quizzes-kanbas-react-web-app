import { Link, useLocation } from "react-router-dom";
export default function AccountNavigation() {
  const { pathname } = useLocation();
  const links = ["Signin", "Signup", "Profile"];
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 flex-fill">
      {links.map((link) => (
        <Link key={link} to={`/Kanbas/Account/${link}`}
          className={`list-group-item border border-0 ${pathname.includes(link) ? "active" : "text-danger"}`}>
          {link}
        </Link>
      ))}
    </div>
  );
}
