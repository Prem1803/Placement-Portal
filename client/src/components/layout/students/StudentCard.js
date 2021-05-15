import React from "react";
import { Link } from "react-router-dom";
const StudentCard = ({
  student: {
    _id,
    name,
    contactEmail,
    imgUrl,
    branch,
    batch,
    description,

    skills,
    linkedInUrl,
    githubUrl,
    portfolioWebsite,
    resumeUrl,
  },
}) => {
  return (
    //returns the student card with student details
    <div className="developer-card " style={{ textAlign: "center" }}>
      <div className="developer-header">
        <img
          className="developer-profile-img"
          src={require(`../../../uploads/${imgUrl}`).default}
          alt={name}
        />
      </div>
      <div className="developer-content">
        <h4 style={{ margin: "0" }}>{name}</h4>
        <ul>
          <li className="tag tag-purple">{branch}</li>
          <li className="tag tag-pink">{batch}</li>
        </ul>
        <p>{description}</p>

        <ul>
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
        </ul>

        <div className="developer-links">
          <a href={linkedInUrl} data-hover="LinkedIn" target="blank">
            <i className="fab fa-linkedin tt-info hover-tt-bottom"></i>
          </a>

          <a href={portfolioWebsite} data-hover="Website" target="blank">
            <i className="fa fa-globe tt-info hover-tt-bottom"></i>
          </a>
          <a href={"mailto:" + contactEmail} data-hover="Mail" target="blank">
            <i className="fas fa-envelope tt-info hover-tt-bottom"></i>
          </a>
          <a href={githubUrl} data-hover="Github" target="blank">
            <i className="fab fa-github tt-info hover-tt-bottom"></i>
          </a>
        </div>
        <div className="developer-profile-action-buttons">
          <Link to={`/users/${_id}`} className="button">
            <i className="fas fa-user"></i> Profile{" "}
          </Link>
          <a href={resumeUrl} className="button  " target="blank">
            <i className="fas fa-file"></i> Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
