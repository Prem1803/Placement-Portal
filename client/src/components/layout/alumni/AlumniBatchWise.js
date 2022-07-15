import React from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

const AlumniBatchWise = ({ user }) => {
  const passoutYear = useParams().passoutYear.toString();
  const location = useLocation();
  const navigate = useNavigate();
  const alumni = location.state;
  if (!location.state) {
    navigate("/alumni");
  }
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link to={`/alumni/${passoutYear}/btech`} state={alumni.BTech}>
          <div className="btechpanelcard" />
        </Link>
        <Link to={`/alumni/${passoutYear}/mtech`} state={alumni.MTech}>
          <div className="mtechpanelcard" />
        </Link>
        <Link to={`/alumni/${passoutYear}/phd`} state={alumni.PhD}>
          <div className="phdpanelcard" />
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

export default AlumniBatchWise;
