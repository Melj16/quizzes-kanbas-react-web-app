import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <img src="/images/reactjs.jpg" width={200} />
          <div>
            <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
                CS1234 React JS
            </Link>
            <p className="wd-dashboard-course-title">
                React JS
            </p>
            <Link to="/Kanbas/Courses/1234/Home"> Go </Link>
          </div>
        </div>
        <div className="wd-dashboard-course"> 
            <img src="/images/reactjs.jpg" width={200} />
            <div>
                <Link className="wd-dashboard-course-link"
                    to="/Kanbas/Courses/3000/Home">
                    CS3000 Algorithms and Data
                </Link>
                <p className="wd-dashboard-course-title">
                    Algorithms and Data
                </p>
                <Link to="/Kanbas/Courses/3000/Home"> Go </Link>
            </div>
        </div>
        <div className="wd-dashboard-course"> 
            <img src="/images/reactjs.jpg" width={200} />
            <div>
                <Link className="wd-dashboard-course-link"
                    to="/Kanbas/Courses/1800/Home">
                    CS1800 Discrete Structures
                </Link>
                <p className="wd-dashboard-course-title">
                    Discrete Structures
                </p>
                <Link to="/Kanbas/Courses/1800/Home"> Go </Link>
            </div>
        </div>
        <div className="wd-dashboard-course"> 
            <img src="/images/reactjs.jpg" width={200} />
            <div>
                <Link className="wd-dashboard-course-link"
                    to="/Kanbas/Courses/2800/Home">
                    CS2800 Logic and Computation
                </Link>
                <p className="wd-dashboard-course-title">
                    Logic and Computation
                </p>
                <Link to="/Kanbas/Courses/2800/Home"> Go </Link>
            </div>
        </div>
        <div className="wd-dashboard-course"> 
            <img src="/images/reactjs.jpg" width={200} />
            <div>
                <Link className="wd-dashboard-course-link"
                    to="/Kanbas/Courses/4530/Home">
                    CS4530 Software Engineering
                </Link>
                <p className="wd-dashboard-course-title">
                    Software Engineering
                </p>
                <Link to="/Kanbas/Courses/4530/Home"> Go </Link>
            </div>
        </div>
        <div className="wd-dashboard-course"> 
            <img src="/images/reactjs.jpg" width={200} />
            <div>
                <Link className="wd-dashboard-course-link"
                    to="/Kanbas/Courses/3500/Home">
                    CS3500 Object Oriented Design
                </Link>
                <p className="wd-dashboard-course-title">
                    Object Oriented Design
                </p>
                <Link to="/Kanbas/Courses/3500/Home"> Go </Link>
            </div>
        </div>
        <div className="wd-dashboard-course"> 
            <img src="/images/reactjs.jpg" width={200} />
            <div>
                <Link className="wd-dashboard-course-link"
                    to="/Kanbas/Courses/3650/Home">
                    CS3650 Computer Systems
                </Link>
                <p className="wd-dashboard-course-title">
                    Computer Systems
                </p>
                <Link to="/Kanbas/Courses/3650/Home"> Go </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
