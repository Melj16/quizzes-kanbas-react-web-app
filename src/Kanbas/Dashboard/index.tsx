import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
        <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-5 mt-0">
                <div className="col wd-dashboard-course" style={{ width: "310px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/1234/Home">
                            <img src="/images/webdev.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS1234 Web Development
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Full Stack Software Developer
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>    
                <div className="col wd-dashboard-course" style={{ width: "310px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/3000/Home">
                            <img src="/images/algo.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS3000 Algorithms and Data
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Algorithms and Data
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col wd-dashboard-course" style={{ width: "310px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/1800/Home">
                            <img src="/images/discretestructures.png" className="border-bottom" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS1800 Discrete Structures
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Discrete Structures
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col wd-dashboard-course" style={{ width: "310px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/2800/Home">
                            <img src="/images/logicandcomp.png" className="border-bottom" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS2800 Logic and Computation
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Logic and Computation
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col wd-dashboard-course" style={{ width: "310px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/4530/Home">
                            <img src="/images/softwareengineering.jpeg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS4530 Software Engineering
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Software Engineering
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col wd-dashboard-course" style={{ width: "310px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/3500/Home">
                            <img src="/images/oop.png" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS3500 Object Oriented Design
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Object Oriented Design
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col wd-dashboard-course" style={{ width: "310px" }}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                            to="/Kanbas/Courses/3650/Home">
                            <img src="/images/systems.jpg" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS3650 Computer Systems
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Computer Systems
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
