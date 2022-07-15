import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";

const MTechStudents = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [CSE, setCSE] = useState([]);
  const [ECE, setECE] = useState([]);
  const [EEE, setEEE] = useState([]);
  useEffect(() => {
    if (location.state) {
      setCSE(location.state.CSE);
      setECE(location.state.ECE);
      setEEE(location.state.EEE);
    }
  }, [location, location.state]);

  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link to={`/students/mtech/cse`} state={Object.entries(CSE)}>
          <div className="csepanelcard" />
        </Link>
        <Link to={`/students/mtech/ece`} state={Object.entries(ECE)}>
          <div className="ecepanelcard" />
        </Link>
        <Link to={`/students/mtech/eee`} state={Object.entries(EEE)}>
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
