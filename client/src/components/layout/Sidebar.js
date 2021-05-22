import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ children, user, userDetails, token }) => {
  const [isActive, setActive] = useState("false");

  const handleToggle = () => {
    //handles the toggle of the side bar
    setActive(!isActive);
  };
  if (isActive) {
    if (user && user.type === 1)
      //is the user is an admin then admin dashboard link is shown
      return (
        <div className="dash_container">
          <div className="sidebar bg-dark">
            <nav className="clearfix s-navbar">
              <ul className="no_style">
                <li>
                  <i
                    className="fas fa-chevron-circle-left "
                    style={{ float: "right", fontSize: "24px" }}
                    onClick={handleToggle}
                  ></i>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/announcements`}>
                    <i className="fas fa-bullhorn"></i> Announcements
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/blogs`}>
                    <i className="fab fa-blogger"></i> Blogs
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/projects`}>
                    <i className="fas fa-project-diagram"></i> Projects
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/students`}>
                    <i className="fas fa-users"></i> Students
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/alumni`}>
                    <i className="fas fa-user-graduate"></i> Alumni
                  </Link>
                </li>
                <li>
                  <Link
                    className="sidebar_links"
                    to={`/admindashboard/${user.uid}`}
                  >
                    <i className="fas fa-th-large"></i> Admin Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="dash_content">{children}</div>
        </div>
      );
    else if (user && user.type === 0)
      // otherwise the user dahboard link is shown
      return (
        <div className="dash_container">
          <div className="sidebar bg-dark">
            <nav className="clearfix s-navbar">
              <ul className="no_style">
                <li>
                  <i
                    className="fas fa-chevron-circle-left "
                    style={{ float: "right", fontSize: "24px" }}
                    onClick={handleToggle}
                  ></i>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/announcements`}>
                    <i className="fas fa-bullhorn"></i> Announcements
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/blogs`}>
                    <i className="fab fa-blogger"></i> Blogs
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/projects`}>
                    <i className="fas fa-project-diagram"></i> Projects
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/students`}>
                    <i className="fas fa-users"></i> Students
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/alumni`}>
                    <i className="fas fa-user-graduate"></i> Alumni
                  </Link>
                </li>
                <li>
                  <Link
                    className="sidebar_links"
                    to={`/userdashboard/${user.sid}`}
                  >
                    <i className="fas fa-th-large"></i> User Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="dash_content">{children}</div>
        </div>
      );
    //if the user is not logged in
    else
      return (
        <div className="dash_container">
          <div className="sidebar bg-dark">
            <nav className="clearfix s-navbar">
              <ul className="no_style">
                <li>
                  <i
                    className="fas fa-chevron-circle-left "
                    style={{ float: "right", fontSize: "24px" }}
                    onClick={handleToggle}
                  ></i>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/announcements`}>
                    <i className="fas fa-bullhorn"></i> Announcements
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/blogs`}>
                    <i className="fab fa-blogger"></i> Blogs
                  </Link>
                </li>
                {/* <li>
                  <Link className="sidebar_links" to={`/projects`}>
                    <i className="fas fa-project-diagram"></i> Projects
                  </Link>
                </li> */}
                <li>
                  <Link className="sidebar_links" to={`/students`}>
                    <i className="fas fa-users"></i> Students
                  </Link>
                </li>
                <li>
                  <Link className="sidebar_links" to={`/alumni`}>
                    <i className="fas fa-user-graduate"></i> Alumni
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="dash_content">{children}</div>
        </div>
      );
  } else
    return (
      <div className="dash_container">
        <ul className="no_style">
          <li>
            <i
              className="fas fa-chevron-circle-right "
              style={{
                float: "right",
                fontSize: "24px",
                paddingTop: "3rem",
                paddingLeft: "1rem",
                paddingRight: "0",
                marginRight: "0",
                zIndex: "1",
              }}
              onClick={handleToggle}
            ></i>
          </li>
        </ul>
        <div className="dash_content">{children}</div>
      </div>
    );
};

export default Sidebar;
