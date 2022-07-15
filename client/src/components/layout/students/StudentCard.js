import React from "react";
import { Link } from "react-router-dom";
const StudentCard = ({
  student: {
    _id,
    name,
    contactEmail,
    imgUrl,
    branch,
    course,
    passoutYear,
    linkedInUrl,
  },
}) => {
  return (
    //returns the student card with student details
    <div className="developer-card " style={{ textAlign: "center" }}>
      <div className="developer-header">
        <Link to={`/users/${_id}`}>
          <img className="developer-profile-img" src={imgUrl} alt={name} />
        </Link>
      </div>
      <div className="developer-content">
        <Link to={`/users/${_id}`}>
          <h4 style={{ margin: "0" }}>{name}</h4>{" "}
        </Link>
        <ul>
          <li className="tag tag-purple">{branch}</li>
          <li className="tag tag-pink">
            {course} {passoutYear}
          </li>
        </ul>

        {/* <ul>
          {skills.map((skill, index) => {
            return (
              <li
                className="tt-info hover-tt-bottom"
                data-hover={skill}
                key={index}
              >
                {skill}
              </li>
            );
          })}
        </ul> */}

        <div className="developer-links">
          <a href={linkedInUrl} data-hover="LinkedIn" target="blank">
            <i className="fab fa-linkedin tt-info hover-tt-bottom"></i>
          </a>
          <a href={"mailto:" + contactEmail} data-hover="Mail" target="blank">
            <i className="fas fa-envelope tt-info hover-tt-bottom"></i>
          </a>
          <Link to={`/users/${_id}`} data-hover="Profile">
            <i className="fas fa-user"></i>
          </Link>
        </div>
        {/* <div className="developer-profile-action-buttons">
          <Link to={`/users/${_id}`} className="button">
            <i className="fas fa-user"></i> Profile{" "}
          </Link>
          
        </div> */}
      </div>
    </div>
  );
};

export default StudentCard;
