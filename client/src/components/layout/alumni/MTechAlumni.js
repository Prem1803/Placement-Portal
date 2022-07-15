import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation, useParams } from "react-router";

const MTechStudents = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const passoutYear = useParams().passoutYear.toString();
  const alumni = location.state;
  const cseAlumni = alumni.filter((alumni) => {
    return alumni.branch === "CSE";
  });
  const eceAlumni = alumni.filter((alumni) => {
    return alumni.branch === "ECE";
  });
  const eeeAlumni = alumni.filter((alumni) => {
    return alumni.branch === "EEE";
  });
  if (!location.state) {
    navigate("/alumni");
  }
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link to={`/alumni/${passoutYear}/mtech/cse`} state={cseAlumni}>
          <div className="csepanelcard" />
        </Link>
        <Link to={`/alumni/${passoutYear}/mtech/ece`} state={eceAlumni}>
          <div className="ecepanelcard" />
        </Link>
        <Link to={`/alumni/${passoutYear}/mtech/eee`} state={eeeAlumni}>
          <div className="eeepanelcard" />
        </Link>
      </div>
    );
  else
    return (
      <div className="not-allowed">
        Sorry, you are not Logged In .Kindly Login In to access this page.
      </div>
    );
};

export default MTechStudents;
