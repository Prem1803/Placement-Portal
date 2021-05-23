import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
const Navbar = ({ title, icon, user, userDetails }) => {
  const history = useHistory();
  const { addToast } = useToasts();

  const logoutUser = () => {
    //logs out the user

    localStorage.removeItem("userInfo"); //removing token from local storage
    addToast("Logged Out SuccessFully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 2000,
    });
    history.push("/"); //redirecting to the homepage

    window.location.reload();
  };

  const token = localStorage.getItem("userInfo");
  if (token === null || token === "null" || token === "")
    return (
      //if token is not present then shows register and login links
      <div>
        <nav className="navbar bg-dark">
          <Link to="/">
            {" "}
            <h1>
              <i className={icon} /> {title}
            </h1>
          </Link>
          <a
            href="javascript:void(0);"
            className="hamburger"
            onClick={() => {
              var x = document.getElementById("mobilenav");
              var y = document.getElementById("navicon");
              if (x.style.display === "block") {
                x.style.display = "none";
                y.classList.toggle("fas");
                y.classList.toggle("fa-times");
                y.classList.toggle("fa");
                y.classList.toggle("fa-bars");
              } else {
                x.style.display = "block";
                y.classList.toggle("fas");
                y.classList.toggle("fa-times");
                y.classList.toggle("fa");
                y.classList.toggle("fa-bars");
              }
            }}
          >
            <i id="navicon" className="fa fa-bars" />
          </a>
          <ul>
            <li>
              <Link to="/">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>

            <li>
              <Link to="/contact">
                <i className="fas fa-phone"></i> Contact Us
              </Link>
            </li>

            <li>
              <Link to="/register">
                <i className="fas fa-user"></i> Register
              </Link>
            </li>
            <li>
              <Link to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
            </li>
          </ul>
        </nav>

        <ul id="mobilenav" style={{ display: "none" }}>
          <li
            onClick={() => {
              var x = document.getElementById("mobilenav");
              x.style.display = "none";
              var y = document.getElementById("navicon");
              y.classList.toggle("fas");
              y.classList.toggle("fa-times");
              y.classList.toggle("fa");
              y.classList.toggle("fa-bars");
            }}
          >
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>

          <li
            onClick={() => {
              var x = document.getElementById("mobilenav");
              x.style.display = "none";
              var y = document.getElementById("navicon");
              y.classList.toggle("fas");
              y.classList.toggle("fa-times");
              y.classList.toggle("fa");
              y.classList.toggle("fa-bars");
            }}
          >
            <Link to="/contact">
              <i className="fas fa-phone"></i> Contact Us
            </Link>
          </li>

          <li
            onClick={() => {
              var x = document.getElementById("mobilenav");
              x.style.display = "none";
              var y = document.getElementById("navicon");
              y.classList.toggle("fas");
              y.classList.toggle("fa-times");
              y.classList.toggle("fa");
              y.classList.toggle("fa-bars");
            }}
          >
            <Link to="/register">
              <i className="fas fa-user"></i> Register
            </Link>
          </li>
          <li
            onClick={() => {
              var x = document.getElementById("mobilenav");
              x.style.display = "none";
              var y = document.getElementById("navicon");
              y.classList.toggle("fas");
              y.classList.toggle("fa-times");
              y.classList.toggle("fa");
              y.classList.toggle("fa-bars");
            }}
          >
            <Link to="/login">
              <i className="fas fa-sign-in-alt"></i> Login
            </Link>
          </li>
        </ul>
        <hr />
        <ul>
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
      </div>
    );
  //otherwise dashboard link is shown
  else
    return (
      <nav className="navbar bg-dark">
        <Link to="/">
          {" "}
          <h1>
            <i className={icon} /> {title}
          </h1>
        </Link>
        <ul>
          <li>
            <Link to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>

          <li>
            <Link to="/contact">
              <i className="fas fa-phone"></i> Contact Us
            </Link>
          </li>

          <li>
            {user.type === 1 && (
              <Link to={`/admindashboard/${user.uid}`}>
                <i className="fas fa-user"></i> Admin
              </Link>
            )}
            {user.type === 0 && (
              <Link to={`/userdashboard/${user.sid}`}>
                <i className="fas fa-user"></i>
                {userDetails.name}
              </Link>
            )}
          </li>
          <li>
            <button
              onClick={logoutUser}
              style={{
                background: "none",
                color: "white",
                border: "none",
                outline: "none",
              }}
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
    );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
Navbar.defaultProps = {
  title: "T&P Cell, Nit Delhi",
  icon: "fas fa-university",
};

export default Navbar;
