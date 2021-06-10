import React from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";

const PhDStudents = ({ user }) => {
  const location = useLocation();
  const history = useHistory();

  const { CSE, ECE, EEE, ME, AS } = location.state;
  if (location.state === undefined) {
    history.push("/students");
  }
  if (Object.keys(user).length !== 0)
    return (
      <div className="studentcontainer studentpanel">
        <Link
          to={{ pathname: `/students/phd/cse`, state: Object.entries(CSE) }}
        >
          <div className="csepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/students/phd/ece`, state: Object.entries(ECE) }}
        >
          <div className="ecepanelcard" />
        </Link>
        <Link
          to={{ pathname: `/students/phd/eee`, state: Object.entries(EEE) }}
        >
          <div className="eeepanelcard" />
        </Link>
        <Link to={{ pathname: `/students/phd/me`, state: Object.entries(ME) }}>
          <div className="mepanelcard" />
        </Link>
        <Link to={{ pathname: `/students/phd/as`, state: Object.entries(AS) }}>
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
