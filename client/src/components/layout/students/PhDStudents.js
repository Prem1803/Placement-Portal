import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";

const PhDStudents = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [CSE, setCSE] = useState([]);
  const [ECE, setECE] = useState([]);
  const [EEE, setEEE] = useState([]);
  const [ME, setME] = useState([]);
  const [AS, setAS] = useState([]);
  useEffect(() => {
    if (location.state) {
      setCSE(location.state.CSE);
      setECE(location.state.ECE);
      setEEE(location.state.EEE);
      setME(location.state.ME);
      setAS(location.state.AS);
    }
  }, [location, location.state]);

  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link to={`/students/phd/cse`} state={Object.entries(CSE)}>
          <div className="csepanelcard" />
        </Link>
        <Link to={`/students/phd/ece`} state={Object.entries(ECE)}>
          <div className="ecepanelcard" />
        </Link>
        <Link to={`/students/phd/eee`} state={Object.entries(EEE)}>
          <div className="eeepanelcard" />
        </Link>
        <Link to={`/students/phd/me`} state={Object.entries(ME)}>
          <div className="mepanelcard" />
        </Link>
        <Link to={`/students/phd/as`} state={Object.entries(AS)}>
          <div className="aspanelcard" />
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

export default PhDStudents;
