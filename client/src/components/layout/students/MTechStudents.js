import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const MTechStudents = ({ user }) => {
  const location = useLocation();
  const { CSE, ECE, EEE } = location.state;
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link
          to={{ pathname: `/students/mtech/cse`, state: Object.entries(CSE) }}
        >
          <div className="csepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/students/mtech/ece`, state: Object.entries(ECE) }}
        >
          <div className="ecepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/students/mtech/eee`, state: Object.entries(EEE) }}
        >
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
