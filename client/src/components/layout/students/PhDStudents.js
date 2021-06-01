import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const PhDStudents = () => {
  const location = useLocation();
  const { CSE, ECE, EEE, ME, AS } = location.state;

  return (
    <div className="studentcontainer studentpanel">
      <Link to={{ pathname: `/students/phd/cse`, state: Object.entries(CSE) }}>
        <div className="csepanelcard" />
        CSE
      </Link>
      <Link to={{ pathname: `/students/phd/ece`, state: Object.entries(ECE) }}>
        <div className="ecepanelcard" />
        ECE
      </Link>
      <Link to={{ pathname: `/students/phd/eee`, state: Object.entries(EEE) }}>
        <div className="eeepanelcard" />
        EEE
      </Link>
      <Link to={{ pathname: `/students/phd/me`, state: Object.entries(ME) }}>
        <div className="mepanelcard" />
        ME
      </Link>
      <Link to={{ pathname: `/students/phd/as`, state: Object.entries(AS) }}>
        <div className="aspanelcard" />
        AS
      </Link>
    </div>
  );
};

export default PhDStudents;
