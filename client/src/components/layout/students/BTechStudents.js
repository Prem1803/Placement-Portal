import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const BTechStudents = () => {
  const location = useLocation();
  const { CSE, ECE, EEE } = location.state;

  return (
    <div className="studentcontainer studentpanel">
      <Link
        to={{ pathname: `/students/btech/cse`, state: Object.entries(CSE) }}
      >
        <div className="csepanelcard" />
        CSE
      </Link>
      <Link
        to={{ pathname: `/students/btech/ece`, state: Object.entries(ECE) }}
      >
        <div className="ecepanelcard" />
        ECE
      </Link>
      <Link
        to={{ pathname: `/students/btech/eee`, state: Object.entries(EEE) }}
      >
        <div className="eeepanelcard" />
        EEE
      </Link>
    </div>
  );
};

export default BTechStudents;
