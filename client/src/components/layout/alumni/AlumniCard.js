import React from "react";
import { Link } from "react-router-dom";
const AlumniCard = ({
  alumni: {
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
    //returns the alumni card
    <div className="developer-card " style={{ textAlign: "center" }}>
      <div className="developer-header">
        <Link to={`/users/${_id}`}>
          <img
            className="developer-profile-img"
            src={require(`../../../uploads/${imgUrl}`).default}
            alt={name}
          />
        </Link>
        {/*  Image of the Alumni */}
      </div>
      <div className="developer-content">
        {/*  Details of the Alumni */}
        <Link to={`/users/${_id}`}>
          <h4 style={{ margin: "0" }}>{name}</h4>
        </Link>
        <ul>
          <li className="tag tag-purple">{branch}</li>
          <li className="tag tag-pink">
            {course} {passoutYear}
          </li>
        </ul>

        <div className="developer-links">
          {/*  Links to the  Alumni's profiles*/}
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
      </div>
    </div>
  );
};

export default AlumniCard;
