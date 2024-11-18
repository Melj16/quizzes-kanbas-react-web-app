import { useLocation } from "react-router";

export default function TOC() {
  const { pathname } = useLocation();
  const links = [
    { label: "Lab 1", path: "#/Labs/Lab1"},
    { label: "Lab 2", path: "#/Labs/Lab2"},
    { label: "Lab 3", path: "#/Labs/Lab3"},
    { label: "Lab 4", path: "#/Labs/Lab4"},
    { label: "Lab 5", path: "#/Labs/Lab5"},
    { label: "Kanbas", path: "#/Kanbas"},
    { label: "My Github", path: "https://github.com/Melj16/kanbas-react-web-app"}
  ];
  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <a id="wd-a" href="#/Labs" className="nav-link">
          Labs
        </a>
      </li>
      {links.map((link) => (
        <li className="nav-item">
          <a href={link.path}
            className={`nav-link ${pathname.includes(link.label.replaceAll(" ","")) ? "active" : ""}`}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}